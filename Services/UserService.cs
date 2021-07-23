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


/* Note that here we are hardcoding collection name etc.
Like I mentioned, in real life you’d be getting these from appsettings.json file. */
namespace dotnet_web_api_demo.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> users;
        private readonly string key;
        private readonly int tokenExpiryTime;
        public UserService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("HyphenDb"));
            var db = client.GetDatabase("HyphenDb");
            users = db.GetCollection<User>("Users");
            key = config["JWT:Secret"];
            tokenExpiryTime = Int32.Parse(config["JWT:ExpiresIn"]);
        }

        public ResponseStatus isUserExist(string email)
        {
            var filter = Builders<User>.Filter.Eq("Email", email);
            var userDoc = users.Find(filter).FirstOrDefaultAsync();
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
            var user = users.Find(u => u.Email == email && u.Password == password).FirstOrDefault();
            // user doesn't exist
            if (user == null)
            {
                return new ResponseStatus { StatusCode = 404, StatusDescription = "User doesn't exist." };
            }
            else
            {
                if (user.IsVerified)
                {
                    // create token
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var tokenKey = Encoding.ASCII.GetBytes(key);
                    var tokenDescriptor = new SecurityTokenDescriptor()
                    {
                        Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Email, email), }),
                        Expires = DateTime.UtcNow.AddMinutes(tokenExpiryTime),
                        SigningCredentials = new SigningCredentials(
                            new SymmetricSecurityKey(tokenKey),
                            SecurityAlgorithms.HmacSha256Signature
                        )
                    };

                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    return new ResponseStatus { StatusCode = 200, StatusDescription = "User is verified. Logging in", Token = tokenHandler.WriteToken(token), User = user };
                }
                else
                {
                    // user is not verified
                    // prompt user to verify their account
                    return new ResponseStatus { StatusCode = 403, StatusDescription = "User is not verified. Verify the user.", User = user };
                }
            }


        }

        public ResponseStatus VerifyUser(string uid)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", uid);
                var update = Builders<User>.Update.Set("IsVerified", true);
                var res = users.UpdateOneAsync(filter, update);
                Console.WriteLine(res.Result);

                return new ResponseStatus { StatusCode = 200, StatusDescription = "User verified." };
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return new ResponseStatus { StatusCode = 500, StatusDescription = "Internal Server Error" };
            }

        }


        public ResponseStatus UpdateUserProfile(User user)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", user.Id);
                var update = Builders<User>.Update.
                        Set("Name", user.Name).
                        Set("CompanyDescription", user.CompanyDescription).
                        Set("Contact", user.Contact).
                        Set("OfficeAddress", user.OfficeAddress).
                        Set("District", user.District);
                var res = users.UpdateOneAsync(filter, update);
                Console.WriteLine(res.Result);
                return new ResponseStatus { StatusCode = 200, StatusDescription = "Company profile updated successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new ResponseStatus { StatusCode = 500, StatusDescription = "Internal Server Error" };
            }
        }

        public List<User> GetAllCompanies() => users.Find(user => true).ToList();

      /*   async public List<User> Get()
        {
            var projection = Builders<User>.Projection.Exclude(u => u.Password);
            var companies = await users.Find(user => true).
                                    Project(projection).
                                    ToListAsync();

            return companies;
        } */

        public User GetUser(string id) => users.Find<User>(user => user.Id == id).FirstOrDefault();

        public User Create(User user)
        {
            users.InsertOne(user);
            return user;
        }
    }
}