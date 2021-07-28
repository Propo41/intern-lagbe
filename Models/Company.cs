using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternFinder.Models
{
    public class Company
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }
        [RegularExpression(@"^\d{3}-\d{3}-\d{4}$")]
        [Required(ErrorMessage = "Contact is required")]
        public string Contact { get; set; } // phone number
        [Required(ErrorMessage = "District is required")]
        public string District { get; set; }
        [Required(ErrorMessage = "Your office address is required")]
        public string OfficeAddress { get; set; }
        [Required(ErrorMessage = "You have to select an image")]
        [Url]
        public string ProfilePictureUrl { get; set; }

        [BsonDefaultValue(false)]
        public bool IsProfileComplete { get; set; }
        [Range(0, 20)]
        [BsonDefaultValue(0)]
        public int AvailableJobCount { get; set; }

    }
}