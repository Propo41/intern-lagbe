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
        async public Task<ActionResult> UpdateProfile(Company company)
        {
            System.Console.WriteLine("input correct");
            company.Id = _authUser.CompanyId;
            Payload res = await _companyService.UpdateCompanyProfile(company);
            return Ok(res);
        }


        // api/company/profile/image
        // creates a signed url for uploading a profile image
        [HttpGet("profile/image")]
        public ActionResult GetSignedUrl()
        {
            UploadCare uploadCare = _companyService.GetSignedUrl();
            return uploadCare != null ? Ok(uploadCare) : new BadRequestObjectResult(
                new ErrorResult("Couldn't process your request", 400, "Couldn't generate a secured URL for uploading files to cloud"));
        }

        // GET api/company/profile
        // fetches the company info in profile tab
        [HttpGet("profile")]
        public ActionResult GetCompanyProfile()
        {
            Company res = _companyService.GetCompanyProfile(_authUser.CompanyId);
            return res != null ? Ok(res) :
                new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Company doesn't exist or there could be a problem. Please refresh the page"));
        }


        // GET api/company
        [HttpGet]
        public ActionResult GetJobPostings()
        {
            List<Job> res = _companyService.FetchJobPostings(_authUser.CompanyId);
            return res != null ? Ok(res) :
                    new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Company doesn't exist or there could be a problem. Please refresh the page"));
        }

        // GET api/company/profile-completion
        [HttpGet("profile-config")]
        async public Task<ActionResult> GetProfileStatus()
        {
            Console.Write("auth user companyid: ");
            Console.WriteLine(_authUser.CompanyId);
            Payload res = await _companyService.GetProfileConfig(_authUser.CompanyId);
            return Ok(new { status = res.Data1, profilePictureUrl = res.Data2, name = res.Data3, email=_authUser.Email});
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
                return res != null ? Ok(res) :
                        new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, res.StatusDescription));
            }
            else
            {
                return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Job ID is invalid"));
            }
        }

        [HttpPost]
        [Route("job")]
        async public Task<ActionResult> Create(Job job)
        {
            Console.Write("auth user companyid: ");
            Console.WriteLine(_authUser.CompanyId);
            job.CompanyId = _authUser.CompanyId;
            Job res = await _companyService.CreateJobPosting(job);
            return res != null ? Ok(new { status = 200, description = "Job created successfully!" }) :
                        new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Couldn't create job. Did you setup your profile?"));

        }

        /* DELETES a job  */
        [HttpDelete]
        [Route("job")]
        public ActionResult Delete(IFormCollection form)
        {
            string id = form["id"];
            Console.WriteLine("Deleting: ", id);
            Payload res = _companyService.DeleteJob(id);
            return res != null ? Ok(res) :
                    new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Internal server error"));

        }


        // GET api/company/job/{jobId}
        // fetches individual job's detail
        [HttpGet("job/{jobId}")]
        public ActionResult GetJobDetails(string jobId)
        {
            if (jobId != null && jobId != "")
            {
                Job res = _companyService.GetJobDetails(jobId);
                return res != null ? Ok(res) :
                        new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Job doesn't exist or there could be a problem. Please refresh the page"));

            }
            else
            {
                return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Job ID is invalid."));

            }
        }

        // POST api/company/job/{jobId}/edit 
        // updates individual job's detail
        // [HttpPost]
        // [Route("job/edit")]
        // public ActionResult UpdateJobDetails(Job job)
        // {
        //     if (job != null && job.CompanyId == _authUser.CompanyId)
        //     {
        //         System.Console.WriteLine("input correct");

        //         Payload res = _companyService.UpdateJobDetails(job);
        //         return res != null ? Ok(res) :
        //                             new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Failed to edit job post. Please try again"));
        //     }
        //     else
        //     {
        //         return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Cannot edit. Job ID is invalid"));
        //     }
        // }

        // GET api/company/applicants
        [HttpGet]
        [Route("applicants")]
        public ActionResult GetApplicants()
        {
            List<Applicant> res = _companyService.GetApplicants(_authUser.CompanyId);
            return res != null ? Ok(res) :
                    new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Company doesn't exist or there could be a problem. Please refresh the page"));
        }

        /* DELETES an applicant  */
        [HttpDelete]
        [Route("applicant")]
        async public Task<ActionResult> DeleteApplicant(IFormCollection form)
        {
            string id = form["id"];
            Console.WriteLine("Deleting: ", id);
            Payload res = await _companyService.DeleteApplicant(id);
            return res != null ? Ok(res) :
                    new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Internal server error"));

        }

    }
}