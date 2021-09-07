using System.Security.Cryptography.X509Certificates;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using InternFinder.Models;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MongoDB.Bson.Serialization;
using MongoDB.Bson;
using InternFinder.Helpers;
using System.Threading.Tasks;
using EllipticCurve;
using System.ComponentModel;
using System.Net.Http;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace InternFinder.Services
{
    public interface IAdminService
    {
        Task<About> GetDashboardInfo();
        List<User> GetUsers();
        Payload EditUser(User user);
        List<Job> GetJobPosts();
        Payload EditJob(Job job);
        Task<Payload> DeleteJob(string id, string companyId);

    }


    public class AdminService : IAdminService
    {
        private readonly IMongoCollection<User> _userCollection;
        private readonly IMongoCollection<Company> _companyCollection;
        private readonly IMongoCollection<Job> _jobCollection;
        private readonly IMongoCollection<Report> _reportCollection;
        private readonly IMongoCollection<Applicant> _applicationCollection;

        private readonly string _secretKey;
        private readonly int _tokenExpiryTime;
        private readonly string uploadCareSecret;
        private readonly string uploadCarePubKey;
        private readonly int uploadCareExpiry;

        public AdminService(IConfiguration config, IMongoClient client)
        {
            var databaseName = config["ConnectionStrings:DatabaseName"];
            var db = client.GetDatabase(databaseName);
            _userCollection = db.GetCollection<User>("Users");
            _companyCollection = db.GetCollection<Company>("Company");
            _jobCollection = db.GetCollection<Job>("Job_Postings");
            _reportCollection = db.GetCollection<Report>("Reports");
            _applicationCollection = db.GetCollection<Applicant>("Applicants");
            _tokenExpiryTime = Int32.Parse(config["JWT:ExpiresIn"]);

            uploadCarePubKey = config["UploadCare:PubKey"];
            uploadCareSecret = config["UploadCare:Secret"];
            uploadCareExpiry = int.Parse(config["UploadCare:Expiry"]);
        }

        public async Task<About> GetDashboardInfo()
        {
            var companyCount = await _companyCollection.CountDocumentsAsync(new BsonDocument());
            var jobCount = await _jobCollection.CountDocumentsAsync(new BsonDocument());
            var reportsCount = await _reportCollection.CountDocumentsAsync(new BsonDocument());
            var usersCount = await _userCollection.CountDocumentsAsync(new BsonDocument());
            var applicantCount = await _applicationCollection.CountDocumentsAsync(new BsonDocument());

            return new About
            {
                TotalCompanies = companyCount,
                TotalJobsPosted = jobCount,
                TotalReports = reportsCount,
                TotalUsers = usersCount,
                TotalApplicants = applicantCount
            };
        }

        public List<User> GetUsers()
        {
            var projection = Builders<User>.Projection.
                Include("Id").
                Include("Email").
                Include("IsVerified").
                Include("CreatedAt").
                Include("CompanyId").
                Include("Role");
            var result = _userCollection.Find(x => true).Project(projection).ToListAsync().Result;
            List<User> users = new List<User>();

            foreach (var item in result)
                users.Add(BsonSerializer.Deserialize<User>(item));

            return users;
        }


        public List<Job> GetJobPosts()
        {
            var projection = Builders<Job>.Projection.
                Include("Id").
                Include("Email").
                Include("IsVerified").
                Include("CreatedAt").
                Include("CompanyId").
                Include("Role");
            var result = _jobCollection.Find(x => true).ToListAsync().Result;
            /*   List<Job> users = new List<Job>();

              foreach (var item in result)
                  users.Add(BsonSerializer.Deserialize<Job>(item)); */

            return result;
        }


        public Payload EditUser(User user)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", user.Id);
                var update = Builders<User>.Update.
                        Set("Email", user.Email).
                        Set("Role", user.Role).
                        Set("IsVerified", user.IsVerified);

                var res = _userCollection.UpdateOne(filter, update);
                return new Payload { StatusCode = 200, StatusDescription = "User updated successfully" };

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return new Payload { StatusCode = 500, StatusDescription = e.Message };
            }

        }

        public Payload EditJob(Job job)
        {
            try
            {
                var filter = Builders<Job>.Filter.Eq("Id", job.Id);
                var update = Builders<Job>.Update.
                        Set("Title", job.Title).
                        Set("Address", job.Address).
                        Set("District", job.District).
                        Set("Requirements", job.Requirements).
                        Set("ContactEmail", job.ContactEmail).
                        Set("ContactPhone", job.ContactPhone).
                        Set("IsAvailable", job.IsAvailable);

                var res = _jobCollection.UpdateOne(filter, update);
                return new Payload { StatusCode = 200, StatusDescription = "Job updated successfully" };

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return new Payload { StatusCode = 500, StatusDescription = e.Message };
            }

        }

        async public Task<Payload> DeleteJob(string id, string companyId)
        {
            try
            {
                var filter = Builders<Job>.Filter.Eq("Id", id);
                await DeleteApplicantsByJob(id);

                var isJobAvailable = await IsJobAvailable(id);
                var result = _jobCollection.DeleteOne(filter);
                // if job is unavailable, then decrementing the available job count of the company will be 
                // done twice, which will result in an inaccurate count.
                // since when toggling the job status, we are decrementing the count
                if (isJobAvailable)
                {
                    await UpdateJobCount(companyId, -1);
                }

                return new Payload { StatusCode = 200, StatusDescription = "Job deleted successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }

        async private Task<bool> IsJobAvailable(string jobId)
        {
            try
            {
                // first check the current job status
                var filter = Builders<Job>.Filter.Eq("Id", jobId);
                var projection = Builders<Job>.Projection.
                    Include("IsAvailable");
                var result = await _jobCollection.Find(filter).Project(projection).FirstOrDefaultAsync();
                Job job = BsonSerializer.Deserialize<Job>(result);
                return job.IsAvailable;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }


        async private Task<Payload> DeleteApplicantsByJob(string jobId)
        {
            try
            {
                var filter = Builders<Applicant>.Filter.Eq("JobId", jobId);
                var result = await _applicationCollection.FindAsync(filter).Result.ToListAsync();

                List<string> applicantFiles = new List<string>();
                foreach (var item in result)
                {
                    applicantFiles.Add(item.ResumeUrl.Split('/')[3]);
                }

                var res = await DeleteApplicantFiles(applicantFiles);
                if (res == null)
                {
                    Console.WriteLine("batch delete error: Couldn't delete resume files from upload care");
                }

                await _applicationCollection.DeleteManyAsync(filter);
                return new Payload { StatusCode = 200, StatusDescription = "Applicants deleted successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }


        // https://uploadcare.com/api-refs/rest-api/v0.5.0/#operation/filesDelete    
        async private Task<String> DeleteApplicantFiles(List<string> applicantFiles)
        {
            try
            {
                Console.WriteLine("Deleting multiple files..");
                string URL = $"https://api.uploadcare.com/files/storage/";
                HttpClient client = new HttpClient();
                // the following headers are required for the uploadcare API
                client.DefaultRequestHeaders.Add("Accept", "application/vnd.uploadcare-v0.5+json");
                client.DefaultRequestHeaders.Add("Authorization", $"Uploadcare.Simple {uploadCarePubKey}:{uploadCareSecret}");

                // putting the files in the body of the request
                var serializedParam = JsonConvert.SerializeObject(applicantFiles);
                var content = new StringContent(serializedParam, Encoding.UTF8, "application/json");

                // batch DELETE request
                await client.SendAsync(new HttpRequestMessage(HttpMethod.Delete, URL) { Content = content });
                Console.WriteLine("Delete success.");

                return "Success";
            }
            catch (System.Exception ex)
            {
                // TODO
                Console.WriteLine(ex);
                return null;
            }


        }


        /* increases or decreases the available job count of the user */
        async private Task<Payload> UpdateJobCount(string companyId, int count)
        {
            try
            { // first get the existing job count
                var filter = Builders<Company>.Filter.Eq("Id", companyId);
                var projection = Builders<Company>.Projection.
                    Include("AvailableJobCount");
                var result = await _companyCollection.Find(filter).Project(projection).FirstOrDefaultAsync();
                Company company = BsonSerializer.Deserialize<Company>(result);

                // update the job count
                var currentJobCount = company.AvailableJobCount + count;
                Console.WriteLine("currentJobCount: " + currentJobCount);
                if (currentJobCount < 0) currentJobCount = 0;

                // update the count in the database
                var filter2 = Builders<Company>.Filter.Eq("Id", companyId);
                var update = Builders<Company>.Update.Set("AvailableJobCount", currentJobCount);
                var res = await _companyCollection.UpdateOneAsync(filter, update);
                Console.WriteLine("updated job count");

                return new Payload { StatusCode = 200, StatusDescription = "Job count updated successfully." };


            }
            catch (System.Exception e)
            {
                throw new Exception("Couldn't update the job count", e);
            }
        }

    }
}