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

namespace InternFinder.Services
{
    public class CompanyService
    {

        private readonly IMongoCollection<User> users;
        private readonly IMongoCollection<Job> jobPostings;


        public CompanyService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("HyphenDb"));
            var db = client.GetDatabase("HyphenDb");
            users = db.GetCollection<User>("Users");
            jobPostings = db.GetCollection<Job>("Job_Postings");
        }

        public ResponseStatus UpdateCompanyProfile(User user)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", user.Id);
                var update = Builders<User>.Update.
                        Set("Name", user.Name).
                        Set("CompanyDescription", user.CompanyDescription).
                        Set("Contact", user.Contact).
                        Set("OfficeAddress", user.OfficeAddress).
                        Set("District", user.District).
                        Set("IsProfileComplete", true);
                var res = users.UpdateOne(filter, update);
                Console.WriteLine(res);
                return new ResponseStatus { StatusCode = 200, StatusDescription = "Company profile updated successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new ResponseStatus { StatusCode = 500, StatusDescription = "Internal Server Error" };
            }
        }

        public User GetCompanyProfile(string companyId)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", companyId);
                var projection = Builders<User>.Projection.
                    Include("Name").
                    Include("CompanyDescription").
                    Include("Contact").
                    Include("OfficeAddress").
                    Include("District");
                var result = users.Find(filter).Project(projection).FirstOrDefault();
                return BsonSerializer.Deserialize<User>(result);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }


        }


        public bool GetProfileStatus(string companyId)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", companyId);
                var projection = Builders<User>.Projection.Include("IsProfileComplete").Include("Id");
                var result = users.Find<User>(filter).Project(projection).FirstOrDefault();
                User user = BsonSerializer.Deserialize<User>(result);
                return user.IsProfileComplete;

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
                var result = jobPostings.Find(filter).Project(projection).ToList();
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

        public Job CreateJobPosting(Job job)
        {
            try
            {
                jobPostings.InsertOne(job);
                return job;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }


        public ResponseStatus UpdateJobStatus(string jobId, bool status)
        {
            try
            {
                var filter = Builders<Job>.Filter.Eq("Id", jobId);
                var update = Builders<Job>.Update.Set("IsAvailable", status);
                var res = jobPostings.UpdateOneAsync(filter, update);
                return new ResponseStatus { StatusCode = 200, StatusDescription = "Job status updated successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new ResponseStatus { StatusCode = 500, StatusDescription = "Internal Server Error" };
            }
        }


        public ResponseStatus DeleteJob(string jobId)
        {
            try
            {
                var filter = Builders<Job>.Filter.Eq("Id", jobId);
                var result = jobPostings.DeleteOne(filter);
                return new ResponseStatus { StatusCode = 200, StatusDescription = "Job deleted successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }





    }
}