using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using InternFinder.Models;
using Microsoft.IdentityModel.Tokens;

namespace InternFinder.Helpers
{
    public static class Util
    {
        /* generates a token for the forgot password view, or email confirmation view */
        public static string GenerateUidToken()
        {
            byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
            byte[] key = Guid.NewGuid().ToByteArray();
            return Convert.ToBase64String(time.Concat(key).ToArray());
        }
        /* validates a token for the forgot password view */
        public static bool isUidTokenValid(string token, int minutesToExpire)
        {
            Console.WriteLine("Util: validating token");

            try
            {
                // replace any white spaces with + in token
                string newToken = token.Replace(" ", "+");
                byte[] data = Convert.FromBase64String(newToken);
                DateTime when = DateTime.FromBinary(BitConverter.ToInt64(data, 0));
                Console.WriteLine(when);
                // if when is more than 50 minutes old, return false
                if (DateTime.UtcNow.Subtract(when).TotalMinutes > minutesToExpire)
                {
                    Console.WriteLine("invalid token");

                    return false;
                }

                Console.WriteLine("valid token");

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("invalid token");

                Console.WriteLine(e.Message);
                return false;
            }


        }

        public static bool isDomainValid(string email)
        {
            int indexOfAt = email.IndexOf('@');
            //You do need to check the index is within the string
            if (indexOfAt >= 0 && indexOfAt < email.Length - 1)
            {
                string host = email.Substring(indexOfAt + 1);
                // if host is not a common email provider, then return true
                if (!(host == "gmail.com" || host == "hotmail.com" || host == "live.com" || host == "outlook.com" || host == "yahoo.com" || host == "msn.com"))
                {
                    return true;
                }
                return false;
            }
            return false;
        }

        public static string GenerateToken(User user, string secret, string role, int expiryTime)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim("role", role) }),
                Expires = DateTime.UtcNow.AddYears(expiryTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static string ValidateToken(string token, string secret)
        {
            if (token == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == "id").Value;

                // return user id from JWT token if validation successful
                return userId;
            }
            catch
            {
                // return null if validation fails
                return null;
            }
        }

        // key -> expire
        // value -> signature
        public static KeyValuePair<string, string> GenerateSignature(string secret, int expiry)
        {
            TimeSpan expiryTime = TimeSpan.FromMinutes(expiry);
            var expire = (DateTimeOffset.UtcNow.ToUnixTimeSeconds() + expiryTime.TotalSeconds).ToString(CultureInfo.InvariantCulture);
            var signature = StringToMD5(secret + expire);

            return new KeyValuePair<string, string>(expire, signature);

        }

        // implicit call
        private static string StringToMD5(string s)
        {
            using (var md5 = MD5.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(s);
                var hashBytes = md5.ComputeHash(bytes);
                return HexStringFromBytes(hashBytes);
            }
        }
        // implict call
        private static string HexStringFromBytes(byte[] bytes)
        {
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }

    }

}