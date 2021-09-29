using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternFinder.Models
{
    public class Company
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        [StringLength(1500, ErrorMessage = "Please enter a proper description of your company", MinimumLength = 50)]
        public string Description { get; set; }

        [RegularExpression(@"(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$", ErrorMessage = "Enter a correct Bangladeshi phone number")]
        [Required]
        public string Contact { get; set; } // phone number validation in bangladeshi format
        [Required]
        public string District { get; set; }
        [Required]
        [StringLength(150, ErrorMessage = "Please select a correct category", MinimumLength = 3)]
        public string Category { get; set; }
        [Required]
        public string OfficeAddress { get; set; }
        [Url]
        public string ProfilePictureUrl { get; set; }

        [BsonDefaultValue(false)]
        public bool IsProfileComplete { get; set; }
        [Range(0, 20)]
        [BsonDefaultValue(0)]
        public int AvailableJobCount { get; set; }
        public IFormFile ProfilePicture { get; set; }
        [BsonDefaultValue(true)]
        public Boolean isActive { get; set; }

    }
}