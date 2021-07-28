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

namespace InternFinder.Services
{
    public interface ICompanyService
    {
        Task<Payload> UpdateCompanyProfile(Company company);
        UploadCare GetSignedUrl();
        Company GetCompanyProfile(string companyId);
        Task<bool> GetProfileStatus(string companyId);
        List<Job> FetchJobPostings(string companyId);
        Task<Job> CreateJobPosting(Job job);
        Payload UpdateJobStatus(string jobId, bool status);
        Payload DeleteJob(string jobId);
        Job GetJobDetails(string jobId);
        Job UpdateJobDetails(Job job, string jobId);
    }

    public class CompanyService : ICompanyService
    {

        private readonly IMongoCollection<User> _userCollection;
        private readonly IMongoCollection<Job> _jobCollection;
        private readonly IMongoCollection<Company> _companyCollection;
        private readonly string uploadCareSecret;
        private readonly string uploadCarePubKey;
        private readonly int uploadCareExpiry;


        public CompanyService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("HyphenDb"));
            var db = client.GetDatabase("HyphenDb");
            uploadCarePubKey = config["UploadCare:PubKey"];
            uploadCareSecret = config["UploadCare:Secret"];
            uploadCareExpiry = int.Parse(config["UploadCare:Expiry"]);
            _userCollection = db.GetCollection<User>("Users");
            _jobCollection = db.GetCollection<Job>("Job_Postings");
            _companyCollection = db.GetCollection<Company>("Company");

        }

        /* Updates a company instance. Note, the company document is created when the user is created. 
        Also, deletes any current image that is saved previously*/
        async public Task<Payload> UpdateCompanyProfile(Company company)
        {
            try
            {
                // check if user has any existing images stored in the database
                string url = GetCompanyImage(company.Id);
                if (url != null)
                {
                    // delete the image from the uploadcare server
                    // extracting the uid from the url
                    var imageUuid = url.Split('/')[4];
                    await Util.DeleteImage(imageUuid, uploadCarePubKey, uploadCareSecret);
                }

                var filter = Builders<Company>.Filter.Eq("Id", company.Id);
                var update = Builders<Company>.Update.
                        Set("Name", company.Name).
                        Set("Description", company.Description).
                        Set("Contact", company.Contact).
                        Set("OfficeAddress", company.OfficeAddress).
                        Set("District", company.District).
                        Set("ProfilePictureUrl", company.ProfilePictureUrl).
                        Set("IsProfileComplete", true);
                var res = _companyCollection.UpdateOne(filter, update);

                return new Payload { StatusCode = 201, StatusDescription = "Company profile updated successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new Payload { StatusCode = 500, StatusDescription = "Internal Server Error" };
            }
        }

        /* return the company image url stored in the database.
        returns null if no image found */
        private string GetCompanyImage(string companyId)
        {
            var filter = Builders<Company>.Filter.Eq("Id", companyId);
            var projection = Builders<Company>.Projection.Include("ProfilePictureUrl");
            var result = _companyCollection.Find(filter).Project(projection).FirstOrDefault();
            Company company = BsonSerializer.Deserialize<Company>(result);
            return company.ProfilePictureUrl;

        }

        public UploadCare GetSignedUrl()
        {
            KeyValuePair<string, string> pair = Util.GenerateSignature(uploadCareSecret, uploadCareExpiry);
            return new UploadCare { Signature = pair.Value, Expiry = pair.Key, PubKey = uploadCarePubKey };

        }

        public Company GetCompanyProfile(string companyId)
        {
            try
            {
                var filter = Builders<Company>.Filter.Eq("Id", companyId);
                var projection = Builders<Company>.Projection.
                    Include("Name").
                    Include("Description").
                    Include("Contact").
                    Include("OfficeAddress").
                    Include("ProfilePictureUrl").
                    Include("District");
                var result = _companyCollection.Find(filter).Project(projection).FirstOrDefault();
                return BsonSerializer.Deserialize<Company>(result);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }


        }


        async public Task<bool> GetProfileStatus(string companyId)
        {
            try
            {
                var filter = Builders<Company>.Filter.Eq("Id", companyId);
                var projection = Builders<Company>.Projection.
                    Include("IsProfileComplete").
                    Include("Id");
                var options = new FindOptions<Company> { Projection = projection };

                var result = await _companyCollection.FindAsync<Company>(filter, options);
                Company company = result.ToList()[0];
                Console.Write("profileStatus: ");
                Console.WriteLine(company.IsProfileComplete);

                return company.IsProfileComplete;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }


        }

        public List<Job> FetchJobPostings(string companyId)
        {
            try
            {
                var filter = Builders<Job>.Filter.Eq("CompanyId", companyId);
                var projection = Builders<Job>.Projection.
                        Include("Title").
                        Include("Address").
                        Include("District").
                        Include("IsAvailable");
                var result = _jobCollection.Find(filter).Project(projection).ToList();
                List<Job> postings = new List<Job>();
                foreach (var item in result)
                    postings.Add(BsonSerializer.Deserialize<Job>(item));

                return postings;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }

        async public Task<Job> CreateJobPosting(Job job)
        {
            // only allow user to create a job iff profile is complete
            bool profileStatus = await GetProfileStatus(job.CompanyId);

            if (!profileStatus)
            {
                Console.WriteLine("Couldn't create a job post. User needs to create a profile first");
                return null;
            };

            Console.WriteLine(job.ToJson());
            try
            {
                Console.Write("job.CompanyId: ");
                Console.WriteLine(job.CompanyId);

                _jobCollection.InsertOne(job);
                return job;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Payload UpdateJobStatus(string jobId, bool status)
        {
            try
            {
                var filter = Builders<Job>.Filter.Eq("Id", jobId);
                var update = Builders<Job>.Update.Set("IsAvailable", status);
                var res = _jobCollection.UpdateOneAsync(filter, update);
                return new Payload { StatusCode = 200, StatusDescription = "Job status updated successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new Payload { StatusCode = 500, StatusDescription = "Internal Server Error" };
            }
        }

        public Payload DeleteJob(string jobId)
        {
            try
            {
                var filter = Builders<Job>.Filter.Eq("Id", jobId);
                var result = _jobCollection.DeleteOne(filter);
                return new Payload { StatusCode = 200, StatusDescription = "Job deleted successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Job GetJobDetails(string jobId)
        {
            try
            {
                var filter = Builders<Job>.Filter.Eq("Id", jobId);
                var projection = Builders<Job>.Projection.
                    Include("Title").
                    Include("Address").
                    Include("District").
                    Include("Requirements").
                    Include("ContactEmail").
                    Include("ContactPhone");
                var result = _jobCollection.Find(filter).Project(projection).FirstOrDefault();
                return BsonSerializer.Deserialize<Job>(result);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Job UpdateJobDetails(Job job, string jobId)
        {
            try
            {
                if (jobId == job.Id)
                {
                    var filter = Builders<Job>.Filter.Eq("Id", jobId);
                    var update = Builders<Job>.Update.
                            Set("Title", job.Title).
                            Set("Address", job.Address).
                            Set("District", job.District).
                            Set("Requirements", job.Requirements).
                            Set("ContactEmail", job.ContactEmail).
                            Set("ContactPhone", job.ContactPhone);
                    var res = _jobCollection.UpdateOne(filter, update);
                    Console.WriteLine(res);
                    return job;
                }
                else
                {
                    Console.WriteLine("job id did't match");
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}