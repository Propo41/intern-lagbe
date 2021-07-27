using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using InternFinder.Models;
using Microsoft.AspNetCore.Authorization;
using InternFinder.Services;
using Newtonsoft.Json;
using MongoDB.Bson;
using Microsoft.AspNetCore.Http;

namespace InternFinder.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : Controller
    {

        private readonly IEmailService _emailService;
        private readonly IUserService _userService;
        private readonly ICompanyService _companyService;
        private readonly User _authUser;

        public CompanyController(IUserService _userService, IEmailService emailService, ICompanyService companyService)
        {
            this._userService = _userService;
            this._emailService = emailService;
            this._companyService = companyService;
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            _authUser = (User)_httpContextAccessor.HttpContext.Items["User"];
        }


        // POST api/company/profile 
        // updates user profile and set value of profileCompletion to true
        [HttpPost]
        [Route("profile")]
        public ActionResult UpdateProfile(User user)
        {
            if (user != null)
            {
                user.Id = _authUser.Id;
                ResponseStatus res = _companyService.UpdateCompanyProfile(user);
                return Ok(res);
            }
            else
            {
                return BadRequest(new { error = "Internal server error" });
            }
        }

        // GET api/company/profile
        // fetches the company info in profile tab
        [HttpGet("profile")]
        public ActionResult GetCompanyProfile()
        {
            User res = _companyService.GetCompanyProfile(_authUser.Id);
            return res != null ? Ok(res) : BadRequest(new { error = "Company doesn't exist or there could be a problem. Please refresh the page" });

        }


        // GET api/company
        [HttpGet]
        public ActionResult GetJobPostings()
        {
            List<Job> res = _companyService.FetchJobPostings(_authUser.Id);
            return res != null ? Ok(res) : BadRequest(new { error = "Company doesn't exist or there could be a problem. Please refresh the page" });
        }

        // GET api/company/profile-completion
        [HttpGet("profile-completion")]
        public ActionResult GetProfileStatus()
        {
            bool res = _companyService.GetProfileStatus(_authUser.Id);
            return Ok(res);

        }

        [HttpPost("job/status")]
        public ActionResult UpdateJobStatus(Job job)
        {
            if (job.Id != null && job.Id != "")
            {
                ResponseStatus res = _companyService.UpdateJobStatus(job.Id, job.IsAvailable);
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
            job.CompanyId = _authUser.Id;
            Job res = _companyService.CreateJobPosting(job);
            return res != null ? Ok(new { status = 200, description = "Job created successfully!" }) : BadRequest(new { error = "Couldn't create job" });
        }

        /* DELETES a job  */
        [HttpDelete]
        [Route("job")]
        public ActionResult Delete(Job job)
        {
            Console.WriteLine("Deleting: ", job.Id);
            ResponseStatus res = _companyService.DeleteJob(job.Id);
            return res != null ? Ok(res) : BadRequest(new { error = "Couldn't delete job" });
        }


        // GET api/company/job/{jobId}
        // fetches individual job's detail
        [HttpGet("job/{jobId}")]
        public ActionResult GetJobDetails(string jobId)
        {
            if (jobId != null && jobId != "")
            {
                Job res = _companyService.GetJobDetails(jobId);
                return res != null ? Ok(res) : BadRequest(new { error = "Job doesn't exist or there could be a problem. Please refresh the page" });
            }
            else
            {
                return BadRequest(new { error = "Job ID is invalid" });
            }
        }

        // POST api/company/job/{jobId}/edit 
        // updates individual job's detail
        [HttpPost("job/{jobId}/edit")]
        public ActionResult UpdateJobDetails(Job job, string jobId)
        {
            if (jobId != null && jobId != "")
            {
                Job res = _companyService.UpdateJobDetails(job, jobId);
                return res != null ? Ok(res) : BadRequest(new { error = "Failed to edit job post. Please try again" });
            }
            else
            {
                return BadRequest(new { error = "Cannot edit. Job ID is invalid" });
            }
        }

    }
}