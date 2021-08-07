using System.Threading.Tasks;
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
using InternFinder.Helpers;
using MongoDB.Bson.Serialization;
using System.Runtime.Serialization.Formatters;

namespace InternFinder.Services
{
    public interface IUserService
    {
        Payload Authenticate(string email, string password);
        Payload isUserExist(string email);
        Payload VerifyUser(string uid);
        User GetById(string uid);
        User Create(User user);
        bool ChangePassword(string password, string uid, string token);
        Task<bool> IsTokenValid(string uid, string token);
    }


    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _userCollection;
        private readonly IMongoCollection<Company> _companyCollection;

        private readonly string _secretKey;
        private readonly int _tokenExpiryTime;

        public UserService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("HyphenDb"));
            var db = client.GetDatabase("HyphenDb");
            _userCollection = db.GetCollection<User>("Users");
            _companyCollection = db.GetCollection<Company>("Company");
            _secretKey = config["JWT:Secret"];
            _tokenExpiryTime = Int32.Parse(config["JWT:ExpiresIn"]);
        }

        public Payload isUserExist(string email)
        {
            var filter = Builders<User>.Filter.Eq("Email", email);
            var userDoc = _userCollection.Find(filter).FirstOrDefaultAsync();
            return new Payload { User = userDoc.Result };
        }

        /*  
        This method will take email and password passed from 
        login form or in our case request body, and check if credentials 
        are valid and if so, it will create the token with data we want inside it. 
        Method looks like this: 
        */
        public Payload Authenticate(string email, string password)
        {
            var user = _userCollection.Find(u => u.Email == email).FirstOrDefault();
            // user doesn't exist
            if (user == null)
            {
                Console.WriteLine(email + " doesnt exist");
                return new Payload { StatusCode = 404, StatusDescription = "User doesn't exist." };
            }
            else
            {
                // decoding hash password
                bool isPasswordVerified = BCrypt.Net.BCrypt.Verify(password, user.Password);
                if (!isPasswordVerified)
                {
                    Console.WriteLine("Password is incorrect");
                    return new Payload { StatusCode = 400, StatusDescription = "Password is incorrect. Did you forget your password?" };

                }

                if (user.IsVerified)
                {
                    Console.WriteLine(email + " is  verified");
                    // create token
                    string token = Util.GenerateToken(user, _secretKey, "Company", _tokenExpiryTime);
                    return new Payload { StatusCode = 200, StatusDescription = "User is verified. Logging in", Token = token };
                }
                else
                {
                    Console.WriteLine(email + " is not verified");
                    // user is not verified
                    // prompt user to verify their account
                    return new Payload { StatusCode = 403, StatusDescription = "You have not verified your account yet. Please check your email for a verification process." };
                }
            }


        }

        async public Task<bool> IsTokenValid(string uid, string token)
        {
            // check if token has been expired or not
            if (Util.isUidTokenValid(token, 10))
            {
                // now check if token was used before by the user
                var filter = Builders<User>.Filter.Eq("Id", uid);
                var user = await _userCollection.Find(filter).FirstOrDefaultAsync();

                if (user == null)
                    return false;

                if (user.Token == token)
                    return false;

                return true;

            }
            return false;



        }

        public Payload VerifyUser(string uid)
        {
            try
            {
                Company company = new Company();
                _companyCollection.InsertOne(company);

                var filter = Builders<User>.Filter.Eq("Id", uid);
                var update = Builders<User>.Update.
                    Set("IsVerified", true).
                    Set("CompanyId", company.Id);
                var res = _userCollection.UpdateOneAsync(filter, update);

                Console.WriteLine(res.Result);

                return new Payload { StatusCode = 200, StatusDescription = "User verified." };
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return new Payload { StatusCode = 500, StatusDescription = "Internal Server Error" };
            }

        }

        /* return user or null */
        public User GetById(string uid)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", uid);
                return _userCollection.Find(filter).FirstOrDefault();
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }

        }

        public bool ChangePassword(string password, string uid, string token)
        {
            try
            {
                var hashPassword = BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt(12));

                var filter = Builders<User>.Filter.Eq("Id", uid);
                var update = Builders<User>.Update.Set("Password", hashPassword).Set("Token", token);
                var res = _userCollection.UpdateOneAsync(filter, update);

                return true;
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }

        }

        /* creates a new user and a company instance in the database */
        public User Create(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(12));
            /* @debug remove it */
            Company company = new Company();
            /* @debug remove it */
            _companyCollection.InsertOne(company);
            user.CompanyId = company.Id;
            _userCollection.InsertOne(user);
            return user;
        }
    }
}