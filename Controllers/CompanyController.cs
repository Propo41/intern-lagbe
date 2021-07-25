using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using InternFinder.Models;
using dotnet_web_api_demo.Services;
using Microsoft.AspNetCore.Authorization;
using InternFinder.Services;
using Newtonsoft.Json;
using MongoDB.Bson;

namespace InternFinder.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : Controller
    {

        private readonly EmailService emailService;
        private readonly UserService userService;
        private readonly CompanyService companyService;

        public CompanyController(UserService userService, EmailService emailService, CompanyService companyService)
        {
            this.userService = userService;
            this.emailService = emailService;
            this.companyService = companyService;
        }


        // POST api/company/profile 
        // updates user profile and set value of profileCompletion to true
        [HttpPost]
        [Route("profile")]
        public ActionResult UpdateProfile(User user)
        {
            if (user != null)
            {
                ResponseStatus res = companyService.UpdateCompanyProfile(user);
                return Ok(res);
            }
            else
            {
                return BadRequest(new { error = "Internal server error" });
            }
        }

        // GET api/company/profile
        // fetches the company info
        [HttpGet("profile/{id}")]
        public ActionResult GetCompanyProfile(string id)
        {
            if (id != null && id != "")
            {
                User res = companyService.GetCompanyProfile(id);
                return res != null ? Ok(res) : BadRequest(new { error = "Company doesn't exist or there could be a problem. Please refresh the page" });
            }
            else
            {
                return BadRequest(new { error = "Company ID supplied is invalid" });
            }
        }


        // GET api/company/{companyID}
        [HttpGet("{companyId}")]
        public ActionResult GetJobPostings(string companyId)
        {
            if (companyId != null && companyId != "")
            {
                List<Job> res = companyService.FetchJobPostings(companyId);
                return res != null ? Ok(res) : BadRequest(new { error = "Company doesn't exist or there could be a problem. Please refresh the page" });
            }
            else
            {
                return BadRequest(new { error = "Company ID supplied is invalid" });
            }
        }

        // GET api/company/profile-completion/{companyID}
        [HttpGet("profile-completion/{companyId}")]
        public ActionResult GetProfileStatus(string companyId)
        {

            if (companyId != null && companyId != "")
            {
                bool res = companyService.GetProfileStatus(companyId);
                return Ok(res);
            }
            else
            {
                return BadRequest(new { error = "Company ID supplied is invalid" });
            }
        }

        [HttpPost("job/status")]
        public ActionResult UpdateJobStatus(Job job)
        {
            if (job.Id != null && job.Id != "")
            {
                ResponseStatus res = companyService.UpdateJobStatus(job.Id, job.IsAvailable);
                return res != null ? Ok(res) : BadRequest(res);
            }
            else
            {
                return BadRequest(new { error = "Job ID is invalid" });
            }
        }

        [HttpPost]
        [Route("job")]
        public ActionResult Create(Job job)
        {
            Job res = companyService.CreateJobPosting(job);
            return res != null ? Ok(new { status = 200, description = "Job created successfully!" }) : BadRequest(new { error = "Couldn't create job" });
        }

        [HttpDelete]
        [Route("job")]
        public ActionResult Delete(Job job)
        {
            Console.WriteLine("Deleting: ", job.Id);
            ResponseStatus res = companyService.DeleteJob(job.Id);
            return res != null ? Ok(res) : BadRequest(new { error = "Couldn't delete job" });
        }




    }
}