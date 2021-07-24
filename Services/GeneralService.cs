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

namespace InternFinder.Services
{
    public class GeneralService
    {

        private readonly IMongoCollection<User> usersCollection;
        private readonly IMongoCollection<About> aboutCollection;


        public GeneralService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("HyphenDb"));
            var db = client.GetDatabase("HyphenDb");
            usersCollection = db.GetCollection<User>("Users");
            aboutCollection = db.GetCollection<About>("About");
        }

        public List<User> GetAllCompanies() => usersCollection.Find(user => true).ToList();

        public About GetLandingPageContent()
        {
            var filter = Builders<About>.Filter.Eq("Id", "60fbe7a19b54db5f15dc8855");
            var projection = Builders<About>.Projection.Exclude("AboutUs").Exclude("Id");
            var result = aboutCollection.Find<About>(filter).Project(projection).FirstOrDefault();
            return BsonSerializer.Deserialize<About>(result);
        }

        public About GetAboutUs() 
        {
            var filter = Builders<About>.Filter.Eq("Id", "60fbe7a19b54db5f15dc8855");
            var projection = Builders<About>.Projection.Include("AboutUs").Exclude("Id");
            var result = aboutCollection.Find<About>(filter).Project(projection).FirstOrDefault();
            return BsonSerializer.Deserialize<About>(result);
        }


        public About Create(About about)
        {
            aboutCollection.InsertOne(about);
            return about;
        }

    }
}