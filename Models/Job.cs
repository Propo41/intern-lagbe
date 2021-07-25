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

        public string Title { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public bool IsAvailable { get; set; } = true;
        public string Requirements { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }


    }
}