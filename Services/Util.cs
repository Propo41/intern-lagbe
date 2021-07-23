using System;
using System.Linq;

namespace InternFinder.Services
{
    public static class Util
    {
        public static string GenerateToken()
        {
            byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
            byte[] key = Guid.NewGuid().ToByteArray();
            return Convert.ToBase64String(time.Concat(key).ToArray());
        }
        public static bool isTokenValid(string token)
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

    }
}