using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using InternFinder.Models;
using System.Linq;
using InternFinder.Helpers;

namespace InternFinder.Services
{

    class TemplateData
    {
        [JsonProperty("user")]
        public string User { get; set; }

        [JsonProperty("button_url")]
        public string ButtonUrl { get; set; }

    }

    public interface IEmailService
    {
        Payload Service(string email, string uid, string type);
        Task SendEmail(string email, string token, string uid, string type, string subject, string content);
    }

    public class EmailService : IEmailService
    {
        private readonly string apiKey;
        private readonly string emailFromName;
        private readonly string emailFromEmail;
        private readonly string templateIdConfirmation;

        public EmailService(IConfiguration config)
        {
            apiKey = config["EmailService:SENDGRID_API_KEY"];
            emailFromName = config["EmailService:SENDGRID_FROM_NAME"];
            emailFromEmail = config["EmailService:SENDGRID_FROM_EMAIL"];
            templateIdConfirmation = config["EmailService:SENDGRID_CONFIRMATION_TEMPLATE"];

        }

        public Payload Service(string email, string uid, string type)
        {
            if (type == "confirmation")
            {
                try
                {
                    SendEmail(email, Util.GenerateUidToken(), uid, "verify-email", "Email Confirmation",
                         "Verify your email address to get started with our website.").Wait();
                    return new Payload { StatusCode = 200, StatusDescription = "Email sent" };
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return new Payload { StatusCode = 500, StatusDescription = "Email couldn't be sent" };
                }
            }
            else if (type == "forgotpassword")
            {
                try
                {
                    SendEmail(email, Util.GenerateUidToken(), uid, "change-password", "Reset your Password",
                        "Please click on the link to change your password. Note that the link will be expired in 8 minutes.").Wait();
                    return new Payload { StatusCode = 200, StatusDescription = "Email sent" };
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return new Payload { StatusCode = 500, StatusDescription = "Email couldn't be sent" };
                }
            }
            return null;

        }

        public async Task SendEmail(string email, string token, string uid, string type, string subject, string plainTextContent)
        {
            // print to console
            Console.WriteLine($"Sending email to {email}");
            Console.WriteLine($"token: {token}");
            Console.WriteLine($"https://internlagbe.azurewebsites.net/auth/user/{type}?token={token}&&uid={uid}");

            Console.WriteLine(apiKey);
            Console.WriteLine(emailFromEmail);

            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(emailFromEmail, emailFromName);
            var to = new EmailAddress(email, email.Split('@')[0]);
            var htmlContent = plainTextContent;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            var dynamicTemplateData = new TemplateData
            {
                User = email.Split('@')[0],
                ButtonUrl = $"https://internlagbe.azurewebsites.net/auth/user/{type}?token={token}&&uid={uid}",

            };
            msg.SetTemplateId(templateIdConfirmation);
            msg.SetTemplateData(dynamicTemplateData);

            var response = await client.SendEmailAsync(msg);
        }


    }

}