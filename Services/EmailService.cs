using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using InternFinder.Models;
using System.Linq;
using InternFinder.Services;

namespace dotnet_web_api_demo.Services
{

    class TemplateData
    {
        [JsonProperty("user")]
        public string User { get; set; }

        [JsonProperty("button_url")]
        public string ButtonUrl { get; set; }

    }

    public class EmailService
    {
        private readonly string apiKey;
        private readonly string emailFromName;
        private readonly string emailFromEmail;

        public EmailService(IConfiguration config)
        {
            apiKey = config["EmailService:SENDGRID_API_KEY"];
            emailFromName = config["EmailService:SENDGRID_FROM_NAME"];
            emailFromEmail = config["EmailService:SENDGRID_FROM_EMAIL"];
        }

        public ResponseStatus Service(string email, string uid, string type)
        {
            if (type == "confirmation")
            {
                try
                {
                    //SendVerificationEmail(email, Util.GenerateToken(), uid).Wait();
                    return new ResponseStatus { StatusCode = 200, StatusDescription = "Email sent" };
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return new ResponseStatus { StatusCode = 500, StatusDescription = "Email couldn't be sent" };
                }


            }
            return null;

        }

        async Task SendVerificationEmail(string email, string token, string uid)
        {
            // print to console
            Console.WriteLine($"Sending email to {email}");
            Console.WriteLine($"token: {token}");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(emailFromEmail, emailFromName);
            var subject = "Email Confirmation";
            var to = new EmailAddress(email, email.Split('@')[0]);
            var plainTextContent = "Verify your email address to get started with our website.";
            var htmlContent = "<strong>Verify</strong>  your email address to get started with our website.";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var dynamicTemplateData = new TemplateData
            {
                User = email.Split('@')[0],
                ButtonUrl = $"http://localhost:5000/auth/user/verify?token={token}&&uid={uid}",

            };
            msg.SetTemplateId("d-b99af81ce9654555a1397cb750c9ba98");
            msg.SetTemplateData(dynamicTemplateData);

            var response = await client.SendEmailAsync(msg);
        }
    }

}