using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternFinder.Models
{
    public class Applicant
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string JobId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                                          @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                                          @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
                                          ErrorMessage = "Email is not valid")]
        [Required(ErrorMessage = "Contact Email is required")]
        public string ContactEmail { get; set; }

        [RegularExpression(@"(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$", ErrorMessage = "Enter a correct Bangladeshi phone number")]
        [Required(ErrorMessage = "Contact Phone is required")]
        public string ContactPhone { get; set; }

        [Url]
        public string ResumeUrl { get; set; }

        [BsonIgnore]
        public string IPAddress { get; set; }

        [BsonIgnore]
        public IFormFile File { get; set; }

    }
}