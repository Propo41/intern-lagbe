using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
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
        public static bool isUidTokenValid(string token)
        {
            byte[] data = Convert.FromBase64String(token);
            DateTime when = DateTime.FromBinary(BitConverter.ToInt64(data, 0));
            Console.WriteLine(when);
            // if when is more than 50 minutes old, return false
            if (DateTime.UtcNow.Subtract(when).TotalMinutes > 50)
            {
                return false;
            }

            return true;
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
            Console.WriteLine("Validating token... ");
            //Console.WriteLine(token);

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

    }

}