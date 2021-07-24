using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternFinder.Models
{
    public class About
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string AboutUs { get; set; }
        public string SocialMediaFacebook { get; set; }

    }
}