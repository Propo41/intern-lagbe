using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternFinder.Models
{
    public class User
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                                    @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                                    @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
                                    ErrorMessage = "Email is not valid")]
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(255, ErrorMessage = "Password must be between 5 and 255 characters", MinimumLength = 7)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId { get; set; } // foreign key

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonDefaultValue(false)]
        public bool IsVerified { get; set; }

        public string Token { get; set; }

        [BsonDefaultValue("Company")]
        public string Role { get; set; }

    }
}