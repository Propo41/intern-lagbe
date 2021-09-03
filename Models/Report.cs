using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternFinder.Models
{
    public class Report
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string JobId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId { get; set; }

        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                                          @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                                          @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
                                          ErrorMessage = "Email is not valid")]
        [Required(ErrorMessage = "Contact Email is required")]
        public string ContactEmail { get; set; }

        [StringLength(3400, ErrorMessage = "Please explain more regarding your report", MinimumLength = 10)]
        [Required(ErrorMessage = "Proper reasoning is required")]
        public string Reason { get; set; }


    }
}