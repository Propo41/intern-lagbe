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



/* Note that here we are hardcoding collection name etc.
Like I mentioned, in real life you’d be getting these from appsettings.json file. */
namespace InternFinder.Services
{
    public interface IUserService
    {
        ResponseStatus Authenticate(string email, string password);
        ResponseStatus isUserExist(string email);
        ResponseStatus VerifyUser(string uid);
        User GetById(string uid);
        User Create(User user);
    }


    public class UserService: IUserService
    {
        private readonly IMongoCollection<User> _users;
        private readonly string _secretKey;
        private readonly int _tokenExpiryTime;

        public UserService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("HyphenDb"));
            var db = client.GetDatabase("HyphenDb");
            _users = db.GetCollection<User>("Users");
            _secretKey = config["JWT:Secret"];
            _tokenExpiryTime = Int32.Parse(config["JWT:ExpiresIn"]);
        }

        public ResponseStatus isUserExist(string email)
        {
            var filter = Builders<User>.Filter.Eq("Email", email);
            var userDoc = _users.Find(filter).FirstOrDefaultAsync();
            return new ResponseStatus { User = userDoc.Result };
        }

        /*  
        This method will take email and password passed from 
        login form or in our case request body, and check if credentials 
        are valid and if so, it will create the token with data we want inside it. 
        Method looks like this: 
        */
        public ResponseStatus Authenticate(string email, string password)
        {
            var user = _users.Find(u => u.Email == email).FirstOrDefault();
            // user doesn't exist
            if (user == null)
            {
                Console.WriteLine(email + " doesnt exist");
                return new ResponseStatus { StatusCode = 404, StatusDescription = "User doesn't exist." };
            }
            else
            {
                bool verified = BCrypt.Net.BCrypt.Verify(password, user.Password);
                if (!verified)
                {
                    Console.WriteLine("Password is incorrect");
                    return new ResponseStatus { StatusCode = 403, StatusDescription = "Password is incorrect. Did you forget your password?" };

                }

                if (user.IsVerified)
                {
                    Console.WriteLine(email + " is  verified");
                    // create token
                    string token = Util.GenerateToken(user, _secretKey, "Company", _tokenExpiryTime);
                    return new ResponseStatus { StatusCode = 200, StatusDescription = "User is verified. Logging in", Token = token };
                }
                else
                {
                    Console.WriteLine(email + " is not verified");
                    // user is not verified
                    // prompt user to verify their account
                    return new ResponseStatus { StatusCode = 403, StatusDescription = "You have not verified your account yet. Please check your email for a verification process." };
                }
            }


        }

        public ResponseStatus VerifyUser(string uid)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", uid);
                var update = Builders<User>.Update.Set("IsVerified", true);
                var res = _users.UpdateOneAsync(filter, update);
                Console.WriteLine(res.Result);

                return new ResponseStatus { StatusCode = 200, StatusDescription = "User verified." };
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return new ResponseStatus { StatusCode = 500, StatusDescription = "Internal Server Error" };
            }

        }

        /* return user or null */
        public User GetById(string uid)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", uid);
                return _users.Find(filter).FirstOrDefault();
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }

        }

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }
    }
}