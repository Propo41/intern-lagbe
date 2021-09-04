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
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using InternFinder.Helpers;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using System.IO;

namespace InternFinder.Services
{

    public interface IGeneralService
    {
        List<Company> GetAllCompanies();
        About GetLandingPageContent();
        About GetAboutUs();
        Payload UpdateInfo(About about);
        Company GetCompanyInfo(string companyId);
        List<Job> GetCompanyJobPostings(string companyId);
        About GetDistricts();
        About GetCompanyCategories();
        About GetJobCategories();
        About GetRemuneration();
        Task<Payload> ApplyJob(Applicant applicant);
        UploadCare GetSignedUrl();
        Payload isSubscriberExist(string email);
        Subscriber SubscribeNewsletter(Subscriber subscriber);
        Task<Payload> ReportJob(Report report);
    }

    public class GeneralService : IGeneralService
    {

        private readonly IMongoCollection<Company> _companyCollection;
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IMongoCollection<About> _aboutCollection;
        private readonly IMongoCollection<Job> _jobCollection;
        private readonly IMongoCollection<Applicant> _applicantCollection;
        private readonly IMongoCollection<Subscriber> _subscriberCollection;
        private readonly IMongoCollection<Report> _reportCollection;
        private readonly string uploadCareSecret;
        private readonly string uploadCarePubKey;
        private readonly int uploadCareExpiry;
        private readonly string _landingPageId = "61014b844108b9c6fe0468ac";


        public GeneralService(IConfiguration config, IMongoClient client)
        {
            var databaseName = config["ConnectionStrings:DatabaseName"];
            var db = client.GetDatabase(databaseName);
            uploadCarePubKey = config["UploadCare:PubKey"];
            uploadCareSecret = config["UploadCare:Secret"];
            uploadCareExpiry = int.Parse(config["UploadCare:Expiry"]);
            _aboutCollection = db.GetCollection<About>("About");
            _companyCollection = db.GetCollection<Company>("Company");
            _usersCollection = db.GetCollection<User>("Users");
            _jobCollection = db.GetCollection<Job>("Job_Postings");
            _applicantCollection = db.GetCollection<Applicant>("Applicants");
            _subscriberCollection = db.GetCollection<Subscriber>("Subscribers");
            _reportCollection = db.GetCollection<Report>("Reports");
        }

        public List<Company> GetAllCompanies()
        {
            var projection = Builders<Company>.Projection.
                Include("Name").
                Include("OfficeAddress").
                Include("District").
                Include("ProfilePictureUrl").
                Include("AvailableJobCount").
                Include("Category").
                Include("IsProfileComplete");
            // A user's profile will be complete iff the user is verified
            var result = _companyCollection.Find(company => true && company.IsProfileComplete == true).Project(projection).ToList();
            // deserialize all items of result
            List<Company> companies = new List<Company>();
            foreach (var item in result)
                companies.Add(BsonSerializer.Deserialize<Company>(item));
            return companies;
        }

        public About GetLandingPageContent()
        {
            var filter = Builders<About>.Filter.Eq("Id", _landingPageId);
            var projection = Builders<About>.Projection.Exclude("AboutUs").Exclude("Id");
            var result = _aboutCollection.Find<About>(filter).Project(projection).FirstOrDefault();
            return BsonSerializer.Deserialize<About>(result);
        }

        public About GetAboutUs()
        {
            var filter = Builders<About>.Filter.Eq("Id", _landingPageId);
            var projection = Builders<About>.Projection.Include("AboutUs").Exclude("Id");
            var result = _aboutCollection.Find<About>(filter).Project(projection).FirstOrDefault();
            return BsonSerializer.Deserialize<About>(result);
        }

        public Payload UpdateInfo(About about)
        {
            try
            {
                var filter = Builders<About>.Filter.Eq("Id", _landingPageId);
                var update = Builders<About>.Update.
                    Set("Districts", about.Districts).
                    Set("JobCategories", about.JobCategories).
                    Set("CompanyCategories", about.CompanyCategories).
                    Set("Remuneration", about.Remuneration).
                    Set("Title", about.Title).
                    Set("Subtitle", about.Subtitle).
                    Set("SocialMediaFacebook", about.SocialMediaFacebook).
                    CurrentDate("lastModified");

                var res = _aboutCollection.UpdateOneAsync(filter, update);
                return new Payload { StatusCode = 200, StatusDescription = "Job status updated successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new Payload { StatusCode = 500, StatusDescription = "Internal Server Error" };
            }

        }

        public Company GetCompanyInfo(string companyId)
        {
            try
            {
                var filter = Builders<Company>.Filter.Eq("Id", companyId);
                var projection = Builders<Company>.Projection.
                    Include("Name").
                    Include("Description").
                    Include("Contact").
                    Include("OfficeAddress").
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

        public List<Job> GetCompanyJobPostings(string companyId)
        {
            try
            {
                var filter = Builders<Job>.Filter.Eq("CompanyId", companyId);
                var projection = Builders<Job>.Projection.
                        Include("Title").
                        Include("Address").
                        Include("District").
                        Include("IsAvailable").
                        Include("Requirements").
                        Include("ContactEmail").
                        Include("ContactPhone");
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

        public About GetDistricts()
        {
            var filter = Builders<About>.Filter.Eq("Id", _landingPageId);
            var projection = Builders<About>.Projection.Include("Districts").Exclude("Id");
            var result = _aboutCollection.Find<About>(filter).Project(projection).FirstOrDefault();
            return BsonSerializer.Deserialize<About>(result);
        }

        public About GetCompanyCategories()
        {
            var filter = Builders<About>.Filter.Eq("Id", _landingPageId);
            var projection = Builders<About>.Projection.Include("CompanyCategories").Exclude("Id");
            var result = _aboutCollection.Find<About>(filter).Project(projection).FirstOrDefault();
            return BsonSerializer.Deserialize<About>(result);

        }

        public About GetJobCategories()
        {
            var filter = Builders<About>.Filter.Eq("Id", _landingPageId);
            var projection = Builders<About>.Projection.Include("JobCategories").Exclude("Id");
            var result = _aboutCollection.Find<About>(filter).Project(projection).FirstOrDefault();
            return BsonSerializer.Deserialize<About>(result);

        }

        public About GetRemuneration()
        {
            var filter = Builders<About>.Filter.Eq("Id", _landingPageId);
            var projection = Builders<About>.Projection.Include("Remuneration").Exclude("Id");
            var result = _aboutCollection.Find<About>(filter).Project(projection).FirstOrDefault();
            return BsonSerializer.Deserialize<About>(result);

        }

        public UploadCare GetSignedUrl()
        {
            KeyValuePair<string, string> pair = Util.GenerateSignature(uploadCareSecret, uploadCareExpiry);
            return new UploadCare { Signature = pair.Value, Expiry = pair.Key, PubKey = uploadCarePubKey };
        }

        /* checks if an applicant has applied to the job before. It checks against their email.
        @todo: find better implementations */
        async public Task<bool> IsApplicantValid(Applicant applicant)
        {
            var filter = Builders<Applicant>.Filter.Eq("ContactEmail", applicant.ContactEmail);

            var result = await _applicantCollection.FindAsync(filter);
            foreach (var item in result.ToList())
            {

                if (item.JobId == applicant.JobId)
                {
                    return false;
                }

            }
            return true;
        }

        async public Task<Payload> ApplyJob(Applicant applicant)
        {
            try
            {
                // first check if the applicant has submitted to the job before
                bool applicantStatus = await IsApplicantValid(applicant);
                if (!applicantStatus)
                {
                    return new Payload { StatusCode = 400, StatusDescription = "You have already applied to this job. Please sit tight and wait for your call." };
                }

                var fileUrl = await Util.UploadFile(applicant.File, uploadCareSecret, uploadCareExpiry, uploadCarePubKey);
                if (fileUrl != null)
                {
                    applicant.ResumeUrl = fileUrl;
                    _applicantCollection.InsertOne(applicant);
                    return new Payload { StatusCode = 200, StatusDescription = "You have applied to job successfully!" };
                }
                return new Payload { StatusCode = 400, StatusDescription = "Internal server error" };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new Payload { StatusCode = 400, StatusDescription = e.Message };

            }
        }

        // checks if subscriber has already subscribed
        public Payload isSubscriberExist(string email)
        {
            var filter = Builders<Subscriber>.Filter.Eq("Email", email);
            var doc = _subscriberCollection.Find(filter).FirstOrDefaultAsync();
            return new Payload { Subscriber = doc.Result };
        }

        public Subscriber SubscribeNewsletter(Subscriber subscriber)
        {
            _subscriberCollection.InsertOne(subscriber);
            return subscriber;
        }

        async public Task<Payload> ReportJob(Report report)
        {
            try
            {
                _reportCollection.InsertOne(report);
                return new Payload { StatusCode = 200, StatusDescription = "Your report has been submitted." };
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new Payload { StatusCode = 400, StatusDescription = e.Message };

            }
        }
    }
}