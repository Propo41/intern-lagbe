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


namespace InternFinder.Services
{

    public interface IGeneralService
    {
        List<Company> GetAllCompanies();
        About GetLandingPageContent();
        About GetAboutUs();
        About Create(About about);
    }

    public class GeneralService : IGeneralService
    {

        private readonly IMongoCollection<Company> _companyCollection;
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IMongoCollection<About> _aboutCollection;
        private readonly string _landingPageId = "61014b844108b9c6fe0468ac";


        public GeneralService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("HyphenDb"));
            var db = client.GetDatabase("HyphenDb");
            _aboutCollection = db.GetCollection<About>("About");
            _companyCollection = db.GetCollection<Company>("Company");
            _usersCollection = db.GetCollection<User>("User");

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

    }
}