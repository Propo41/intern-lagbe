using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace InternFinder.Models
{
    public class ResponseStatus
    {
        public int StatusCode { get; set; }
        public string StatusDescription { get; set; }
        public string Token { get; set; }
        public User User { get; set; }
        public string Uid { get; set; }


    }
}