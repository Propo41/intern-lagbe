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
using MongoDB.Bson.Serialization;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

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
        public ActionResult UpdateProfile(Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Payload { StatusCode = 400, StatusDescription = "Invalid inputs. Please check if you have entered the information correctly" });
            }
            if (company != null)
            {
                company.Id = _authUser.CompanyId;
                Payload res = _companyService.UpdateCompanyProfile(company);
                return Ok(res);
            }
            else
            {
                return BadRequest(new { error = "Internal server error" });
            }
        }


        // api/company/profile/image
        // creates a signed url for uploading a profile image
        [HttpGet("profile/image")]
        public ActionResult GetSignedUrl()
        {
            UploadCare uploadCare = _companyService.GetSignedUrl();
            return uploadCare != null ? Ok(uploadCare) : BadRequest(new { error = "Couldn't generate a secured URL for uploading files to cloud" });
        }

        // GET api/company/profile
        // fetches the company info in profile tab
        [HttpGet("profile")]
        public ActionResult GetCompanyProfile()
        {
            Company res = _companyService.GetCompanyProfile(_authUser.CompanyId);
            return res != null ? Ok(res) : BadRequest(new { error = "Company doesn't exist or there could be a problem. Please refresh the page" });
        }


        // GET api/company
        [HttpGet]
        public ActionResult GetJobPostings()
        {
            List<Job> res = _companyService.FetchJobPostings(_authUser.CompanyId);
            return res != null ? Ok(res) : BadRequest(new { error = "Company doesn't exist or there could be a problem. Please refresh the page" });
        }

        // GET api/company/profile-completion
        [HttpGet("profile-completion")]
        async public Task<ActionResult> GetProfileStatus()
        {
            Console.Write("auth user companyid: ");
            Console.WriteLine(_authUser.CompanyId);
            bool res = await _companyService.GetProfileStatus(_authUser.CompanyId);
            return Ok(res);
        }

        // POST api/company/job/status
        [HttpPost("job/status")]
        public ActionResult UpdateJobStatus(IFormCollection form)
        {

            string id = form["id"];
            bool isAvailable = form["isAvailable"] == "true" ? true : false;

            if (id != null && id != "")
            {
                Payload res = _companyService.UpdateJobStatus(id, isAvailable);
                return res != null ? Ok(res) : BadRequest(res);
            }
            else
            {
                return BadRequest(new { error = "Job ID is invalid" });
            }
        }

        [HttpPost]
        [Route("job")]
        async public Task<ActionResult> Create(Job job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Payload { StatusCode = 400, StatusDescription = "Invalid inputs. Please check if you have entered the information correctly" });
            }

            Console.Write("auth user companyid: ");
            Console.WriteLine(_authUser.CompanyId);
            job.CompanyId = _authUser.CompanyId;
            Job res = await _companyService.CreateJobPosting(job);
            return res != null ? Ok(new { status = 200, description = "Job created successfully!" }) :
                BadRequest(new { error = "Couldn't create job. Did you setup your profile?" });
        }

        /* DELETES a job  */
        [HttpDelete]
        [Route("job")]
        public ActionResult Delete(IFormCollection form)
        {
            string id = form["id"];
            Console.WriteLine("Deleting: ", id);
            Payload res = _companyService.DeleteJob(id);
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