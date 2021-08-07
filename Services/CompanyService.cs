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

namespace InternFinder.Services
{
    public interface ICompanyService
    {
        Task<Payload> UpdateCompanyProfile(Company company);
        UploadCare GetSignedUrl();
        Company GetCompanyProfile(string companyId);
        Task<Payload> GetProfileConfig(string companyId);
        List<Job> FetchJobPostings(string companyId);
        Task<Job> CreateJobPosting(Job job);
        Task<Payload> UpdateJobStatus(string jobId, bool status, string companyId);
        Payload DeleteJob(string jobId);
        Job GetJobDetails(string jobId);
        Payload UpdateJobDetails(Job job);
    }

    public class CompanyService : ICompanyService
    {

        private readonly IMongoCollection<User> _userCollection;
        private readonly IMongoCollection<Job> _jobCollection;
        private readonly IMongoCollection<Company> _companyCollection;
        private readonly string uploadCareSecret;
        private readonly string uploadCarePubKey;
        private readonly int uploadCareExpiry;
        private readonly string _landingPageId = "61014b844108b9c6fe0468ac";
        private readonly IMongoCollection<About> _aboutCollection;


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
            _aboutCollection = db.GetCollection<About>("About");


        }

        /* Updates a company instance. Note, the company document is created when the user is created. 
        Also, deletes any current image that is saved previously*/
        async public Task<Payload> UpdateCompanyProfile(Company company)
        {
            Console.Write("image from server: ");
            Console.WriteLine(company.ProfilePictureUrl);
            try
            {
                // check if user has any existing images stored in the database
                string url = GetCompanyImage(company.Id);
                if (url != null)
                {
                    // CHECK if user uploaded a new picture
                    // if old url = new url, then it means user did not upload a new picture
                    // if not, then delete the old picture
                    if (!url.Equals(company.ProfilePictureUrl))
                    {
                        Console.WriteLine("deleteing file");
                        // delete the image from the uploadcare server
                        // extracting the uid from the url
                        string imageUuid = url.Split('/')[3];
                        await DeleteImage(imageUuid, uploadCarePubKey, uploadCareSecret);
                    }

                }

                var filter = Builders<Company>.Filter.Eq("Id", company.Id);
                var update = Builders<Company>.Update.
                        Set("Name", company.Name).
                        Set("Description", company.Description).
                        Set("Contact", company.Contact).
                        Set("OfficeAddress", company.OfficeAddress).
                        Set("District", company.District).
                        Set("Category", company.Category).
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
                    Include("AvailableJobCount").
                    Include("Category").
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
        /*
        Gets the IsProfileComplete and Preview Url and company name if exist
        @Data1 = IsProfileComplete 
        @Data2 = ProfilePictureUrl
        @Data3 = Name
        */
        async public Task<Payload> GetProfileConfig(string companyId)
        {
            try
            {
                var filter = Builders<Company>.Filter.Eq("Id", companyId);
                var projection = Builders<Company>.Projection.
                    Include("IsProfileComplete").
                    Include("ProfilePictureUrl").
                    Include("Name").
                    Include("Id");
                var options = new FindOptions<Company> { Projection = projection };

                var result = await _companyCollection.FindAsync<Company>(filter, options);
                Company company = result.ToList()[0];
                Console.Write("profileStatus: ");
                Console.WriteLine(company.IsProfileComplete);

                return new Payload { Data1 = company.IsProfileComplete, Data2 = company.ProfilePictureUrl, Data3 = company.Name };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
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
            Payload payload = await GetProfileConfig(job.CompanyId);

            if (!payload.Data1)
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
                await UpdateJobCount(job.CompanyId, 1);
                return job;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        /* increases or decreases the available job count of the user */
        async public Task<Payload> UpdateJobCount(string companyId, int count)
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


        async public Task<Payload> UpdateJobStatus(string jobId, bool status, string companyId)
        {
            try
            {
                // first check the current job status
                var filter = Builders<Job>.Filter.Eq("Id", jobId);
                var projection = Builders<Job>.Projection.
                    Include("IsAvailable");
                var result = await _jobCollection.Find(filter).Project(projection).FirstOrDefaultAsync();
                Job job = BsonSerializer.Deserialize<Job>(result);
                // if the existing job status is not the same as the new status, then update it
                if (job.IsAvailable != status)
                {
                    var filter2 = Builders<Job>.Filter.Eq("Id", jobId);
                    var update = Builders<Job>.Update.Set("IsAvailable", status);
                    var res = _jobCollection.UpdateOneAsync(filter2, update);
                    // update the available job count of the company as well
                    await UpdateJobCount(companyId, status ? 1 : -1);
                    return new Payload { StatusCode = 200, StatusDescription = "Job status updated successfully." };
                }
                return new Payload { StatusCode = 200, StatusDescription = $"Job status not updated as it's already {status}" };

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
                    Include("CompanyId").
                    Include("IsAvailable").
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

        public Payload UpdateJobDetails(Job job)
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
                        Set("ContactPhone", job.ContactPhone);
                var res = _jobCollection.UpdateOne(filter, update);

                return new Payload { StatusCode = 201, StatusDescription = "Job post updated successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new Payload { StatusCode = 500, StatusDescription = "Internal Server Error" };
            }
        }

        /* https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/console-webapiclient
               https://uploadcare.com/api-refs/rest-api/v0.5.0/#section/Authentication/Uploadcare.Simple */
        public static async Task DeleteImage(string uuid, string publicKey, string secretKey)
        {
            Console.Write("Deleting file: ");
            Console.WriteLine(uuid);
            string URL = $"https://api.uploadcare.com/files/{uuid}/storage/";
            HttpClient client = new HttpClient();
            // the following headers are required for the uploadcare API
            client.DefaultRequestHeaders.Add("Accept", "application/vnd.uploadcare-v0.5+json");
            client.DefaultRequestHeaders.Add("Authorization", $"Uploadcare.Simple {publicKey}:{secretKey}");

            // DELETE request
            var response = await client.DeleteAsync(URL);
        }

    }
}

/* 

"https://ucarecdn.com/61d6fc53-138e-48d5-866b-cf04021fb765/"

correct: c31a98e1-5650-4e71-ba48-c08fc309d55f
old:     c31a98e1-5650-4e71-ba48-c08fc309d55f
 */