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

        [StringLength(80, ErrorMessage = "Please enter a meaningful title", MinimumLength = 25)]
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }

        [StringLength(150, ErrorMessage = "Please enter a proper address", MinimumLength = 25)]
        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }

        [StringLength(20, ErrorMessage = "Please choose a correct district", MinimumLength = 5)]
        [Required(ErrorMessage = "District is required")]
        public string District { get; set; }

        public bool IsAvailable { get; set; } = true;

        [StringLength(3500, ErrorMessage = "Please write a meaningful description with a minimum characters of 450", MinimumLength = 450)]
        [Required(ErrorMessage = "Requirements is required")]
        public string Requirements { get; set; }

        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                                          @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                                          @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
                                          ErrorMessage = "Email is not valid")]
        [Required(ErrorMessage = "ContactEmail is required")]
        public string ContactEmail { get; set; }

        [RegularExpression(@"(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$", ErrorMessage = "Enter a correct Bangladeshi phone number")]
        [Required(ErrorMessage = "ContactPhone is required")]
        public string ContactPhone { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Remuneration { get; set; }


    }
}