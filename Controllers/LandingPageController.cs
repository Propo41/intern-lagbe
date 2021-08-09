using System.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using InternFinder.Models;
using InternFinder.Helpers;
using InternFinder.Services;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using System.Threading.Tasks;
using System.IO;

namespace InternFinder.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LandingPageController : Controller
    {
        private readonly IGeneralService _generalService;
        private readonly IEmailService _emailService;

        public LandingPageController(IGeneralService _generalService, IEmailService _emailService)
        {
            this._generalService = _generalService;
            this._emailService = _emailService;
        }

        // fetches all company list
        [HttpGet]
        [Route("companies")]
        public ActionResult GetCompanyList()
        {
            return Ok(_generalService.GetAllCompanies());
        }

        // fetch landing page content
        [HttpGet]
        public ActionResult GetLandingPageContent() => Ok(_generalService.GetLandingPageContent());


        [HttpGet]
        [Route("about")]
        public ActionResult GetAboutUs()
        {
            return Ok(_generalService.GetAboutUs());
        }

        // create landing page content
        // @ FOR ADMINS ONLY
        // @ Role based authentication
        [HttpPost]
        public ActionResult UpdateInfo(About about) => Ok(_generalService.UpdateInfo(about));

        // GET api/landingpage/company/{companyId}
        // fetches individual company's information and job postings
        [HttpGet("company/{companyId}")]
        public ActionResult GetCompanyInfo(string companyId)
        {
            Company res = _generalService.GetCompanyInfo(companyId);
            return res != null ? Ok(res) : BadRequest(new { error = "Company doesn't exist or there could be a problem. Please refresh the page" });
        }

        // GET api/landingpage/company/{companyId}/jobs
        //fetches individual company's job postings
        [HttpGet("company/{companyId}/jobs")]
        public ActionResult GetCompanyJobPostings(string companyId)
        {
            List<Job> res = _generalService.GetCompanyJobPostings(companyId);
            return res != null ? Ok(res) : BadRequest(new { error = "Company doesn't exist or there could be a problem. Please refresh the page" });
        }

        // GET api/landingpage/districts
        [HttpGet("districts")]
        public ActionResult GetDistricts()
        {
            return Ok(_generalService.GetDistricts());
            //return res != null ? Ok(res) : BadRequest(new { error = "Company doesn't exist or there could be a problem. Please refresh the page" });
        }

        // GET api/landingpage/company-categories
        [HttpGet("company-categories")]
        public ActionResult GetCompanyCategories()
        {
            return Ok(_generalService.GetCompanyCategories());
        }

        // GET api/landingpage/job-categories
        [HttpGet("job-categories")]
        public ActionResult GetJobCategories()
        {
            return Ok(_generalService.GetJobCategories());
        }

        // GET api/landingpage/job-categories
        [HttpGet("remuneration")]
        public ActionResult GetRemuneration()
        {
            return Ok(_generalService.GetRemuneration());
        }


        // POST api/landingpage/company/job/apply
        [HttpPost]
        [Route("company/job/apply")]
        async public Task<ActionResult> ApplyJob(IFormCollection form)
        {

            Applicant applicant = new Applicant
            {
                ContactEmail = form["email"],
                Name = form["name"],
                ContactPhone = form["contact"],
                IPAddress = form["ip"],
                JobId = form["jobId"],
                CompanyId = form["companyId"]
            };
            if (!TryValidateModel(applicant, nameof(Applicant)))
            {
                Console.WriteLine("model is invalid");
                return new BadRequestObjectResult(new ErrorResult("Invalid inputs", 400, "Please make sure you have entered correct values."));

            }

            List<IFormFile> files = form.Files.ToList();
            if (files.Count == 0)
                return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "You must provide a resume file before applying"));

            if (files[0].Length > 5000000)
                return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Resume file size must be less than 5MB"));

            IFormFile file = files[0];

            Payload res = await _generalService.ApplyJob(applicant, file);
            return res.StatusCode == 200 ? Ok(new { status = res.StatusCode, description = res.StatusDescription }) :
                        new BadRequestObjectResult(new ErrorResult("Couldn't process your request", res.StatusCode, res.StatusDescription));

        }

    }
}