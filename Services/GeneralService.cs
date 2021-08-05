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


namespace InternFinder.Services
{

    public interface IGeneralService
    {
        List<Company> GetAllCompanies();
        About GetLandingPageContent();
        About GetAboutUs();
        About Create(About about);
        Company GetCompanyInfo(string companyId);
        List<Job> GetCompanyJobPostings(string companyId);
        // Task<Applicant> ApplyJob(Applicant applicant);
    }

    public class GeneralService : IGeneralService
    {

        private readonly IMongoCollection<Company> _companyCollection;
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IMongoCollection<About> _aboutCollection;
        private readonly IMongoCollection<Job> _jobCollection;
        private readonly IMongoCollection<Applicant> _applicantCollection;

        private readonly string _landingPageId = "61014b844108b9c6fe0468ac";


        public GeneralService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("HyphenDb"));
            var db = client.GetDatabase("HyphenDb");
            _aboutCollection = db.GetCollection<About>("About");
            _companyCollection = db.GetCollection<Company>("Company");
            _usersCollection = db.GetCollection<User>("Users");
            _jobCollection = db.GetCollection<Job>("Job_Postings");
            _applicantCollection = db.GetCollection<Applicant>("Applicants");
        }

        public List<Company> GetAllCompanies()
        {
            var projection = Builders<Company>.Projection.
                Include("Name").
                Include("OfficeAddress").
                Include("District").
                Include("ProfilePictureUrl").
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

        public About Create(About about)
        {
            _aboutCollection.InsertOne(about);
            return about;
        }

        public Company GetCompanyInfo(string companyId) {
            try
            {
                var filter = Builders<Company>.Filter.Eq("Id", companyId);
                var projection = Builders<Company>.Projection.
                    Include("Name").
                    Include("Description").
                    Include("Contact").
                    Include("OfficeAddress").
                    Include("AvailableJobCount").
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

        public List<Job> GetCompanyJobPostings(string companyId) {
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

        // async public Task<Applicant> ApplyJob(Applicant applicant)
        // {
        //     // // only allow user to create a job iff profile is complete
        //     // Payload payload = await GetProfileConfig(job.CompanyId);

        //     // if (!payload.Data1)
        //     // {
        //     //     Console.WriteLine("Couldn't create a job post. User needs to create a profile first");
        //     //     return null;
        //     // };

        //     Console.WriteLine(applicant.ToJson());
        //     try
        //     {
        //         Console.Write("job.CompanyId: ");
        //         Console.WriteLine(applicant.CompanyId);

        //         _applicantCollection.InsertOne(applicant);
        //         return applicant;
        //     }
        //     catch (Exception e)
        //     {
        //         Console.WriteLine(e);
        //         return null;
        //     }
        // }

    }
}