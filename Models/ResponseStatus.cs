using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace InternFinder.Models
{
    public class Payload
    {
        public int StatusCode { get; set; }
        public string StatusDescription { get; set; }
        public string Token { get; set; }
        public User User { get; set; }
        public Subscriber Subscriber { get; set; }
        public string Uid { get; set; }
        public bool Data1 { get; set; }
        public string Data2 { get; set; }
        public string Data3 { get; set; }
        public string Data4 { get; set; }


    }
}