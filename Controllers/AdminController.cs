using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using InternFinder.Models;
using InternFinder.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;
using InternFinder.Helpers;

namespace InternFinder.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AdminController : Controller
    {
        private readonly IUserService _userService;
        private readonly IAdminService _adminService;

        public AdminController(IUserService _userService, IAdminService _adminService)
        {
            this._userService = _userService;
            this._adminService = _adminService;
        }

        // get dashboard info
        [Route("dashboard")]
        [HttpGet]
        async public Task<About> GetDashboard()
        {
            return await _adminService.GetDashboardInfo();
        }

        // fetch landing page and about us content
        [Route("dynamic-content")]
        [HttpGet]
        public ActionResult GetDynamicContent() 
        {
            return Ok(_adminService.GetDynamicContent());
        }

        // GET district list
        [HttpGet("districts")]
        public ActionResult GetDistricts()
        {
            return Ok(_adminService.GetDistricts());
        }

        // GET company-categories
        [HttpGet("company-categories")]
        public ActionResult GetCompanyCategories()
        {
            return Ok(_adminService.GetCompanyCategories());
        }

        // get all users
        [Route("users")]
        [HttpGet]
        public List<User> GetUsers()
        {
            return _adminService.GetUsers();
        }

        // edit user
        [Route("user")]
        [HttpPut]
        public Payload EditUser(User user)
        {
            return _adminService.EditUser(user);
        }

        // get all job posts
        [Route("jobs")]
        [HttpGet]
        public List<Job> GetJobPosts()
        {
            return _adminService.GetJobPosts();
        }

        // edit job post
        [Route("job")]
        [HttpPut]
        public Payload EditJobPost(Job job)
        {
            return _adminService.EditJob(job);
        }

        // @param: id, companyId
        // delete job post
        [Route("job")]
        [HttpDelete]
        async public Task<Payload> DeleteJob(FormCollection form)
        {
            var id = form["id"];
            var companyId = form["companyId"];

            return await _adminService.DeleteJob(id, companyId);
        }


        // @param: id, companyId
        // delete job post
        [Route("user")]
        [HttpDelete]
        public string DeleteUser(IFormCollection form)
        {
            var id = form["id"]; // user id
            Console.WriteLine(id);

            return "todo";
        }

        // @param: list<string>
        // add job categories
        [Route("job-category")]
        [HttpPut]
        public Payload AddJobCategory(About about)
        {
            return _adminService.AddJobCategories(about);

        }

        // @param: list<string>
        // add company categories
        [Route("company-category")]
        [HttpPut]
        public Payload AddCompanyCategory(About about)
        {
            return _adminService.AddCompanyCategories(about);

        }

        // @param: list<string>
        // add districts
        [Route("districts")]
        [HttpPut]
        public Payload AddDistricts(About about)
        {
            return _adminService.AddDistricts(about);

        }

        // @param: list<string>
        // add remuneration
        [Route("remuneration")]
        [HttpPut]
        public Payload AddRemuneration(About about)
        {
            return _adminService.AddRemuneration(about);

        }

        // @param: list<string>
        // add remuneration
        [Route("landingpage")]
        [HttpPost]
        public Payload AddLandingPageContent([FromForm] About about)
        {
            return _adminService.UpdateLandingPageContent(about);

        }

        [Route("about-us")]
        [HttpPost]
        public Payload AddAboutUs([FromForm] About about)
        {
            return _adminService.UpdateAboutUs(about);

        }

        // get all reports
        [Route("reports")]
        [HttpGet]
        public List<Report> GetReports()
        {
            return _adminService.GetReports();
        }

        /* DELETES a report  */
        [HttpDelete]
        [Route("report/delete")]
        async public Task<ActionResult> DeleteReport(IFormCollection form)
        {
            string id = form["id"];
            Console.WriteLine("Deleting report: ", id);
            Payload res = await _adminService.DeleteReport(id);
            return res != null ? Ok(res) :
                    new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Internal server error"));
        }

        // get all applicants
        [Route("applicants")]
        [HttpGet]
        public List<Applicant> GetApplicants()
        {
            return _adminService.GetApplicants();
        }

        /* DELETES an applicant  */
        [HttpDelete]
        [Route("applicant/delete")]
        async public Task<ActionResult> DeleteApplicant(IFormCollection form)
        {
            string id = form["id"];
            Console.WriteLine("Deleting: ", id);
            Payload res = await _adminService.DeleteApplicant(id);
            return res != null ? Ok(res) :
                    new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Internal server error"));

        }

        // get all companies
        [Route("companies")]
        [HttpGet]
        public List<Company> GetAllCompanies()
        {
            return _adminService.GetAllCompanies();
        }

        /* DELETES a company along with it's job and applicants  */
        [HttpDelete]
        [Route("company/delete")]
        async public Task<ActionResult> DeleteCompany(IFormCollection form)
        {
            string id = form["id"];
            Console.WriteLine("Deleting company: ", id);
            Payload res = await _adminService.DeleteCompany(id);
            return res != null ? Ok(res) :
                    new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Internal server error"));

        }

        // updates user profile and set value of profileCompletion to true
        [HttpPost]
        [Route("company/profile")]
        async public Task<ActionResult> UpdateProfile([FromForm] Company company)
        {

            // company.Id = _authUser.CompanyId;
            Payload res = await _adminService.UpdateCompanyProfile(company);
            return Ok(res);
        }

    }
}