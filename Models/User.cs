using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternFinder.Models
{
    public class User
    {


        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonRequired]
        [BsonElement("Email")]
        public string Email { get; set; }
        [BsonRequired]
        [BsonElement("Password")]
        public string Password { get; set; }

        public string Name { get; set; }

        public string CompanyDescription { get; set; }
        public string Contact { get; set; }

        public string District { get; set; }

        public string OfficeAddress { get; set; }
        [BsonDefaultValue(false)]
        public bool IsVerified { get; set; }

        [BsonDefaultValue(0)]
        public int AvailableJobCount { get; set; }

    }
}