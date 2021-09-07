using System;
using System.Collections.Generic;
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
        public List<string> Districts { get; set; }
        public List<string> JobCategories { get; set; }
        public List<string> CompanyCategories { get; set; }
        public List<string> Remuneration { get; set; }

        public long TotalReports { get; set; }
        public long TotalUsers { get; set; }
        public long TotalCompanies { get; set; }
        public long TotalJobsPosted { get; set; }
        public long TotalApplicants { get; set; }
    }

}