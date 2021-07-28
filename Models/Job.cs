using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternFinder.Models
{
    public class Job
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }

        [Required(ErrorMessage = "District is required")]
        public string District { get; set; }

        public bool IsAvailable { get; set; } = true;

        [Required(ErrorMessage = "Requirements is required")]
        public string Requirements { get; set; }

        [Required(ErrorMessage = "ContactEmail is required")]
        public string ContactEmail { get; set; }

        [Required(ErrorMessage = "ContactPhone is required")]
        public string ContactPhone { get; set; }


    }
}