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

namespace InternFinder.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LandingPageController : Controller
    {
        private readonly EmailService emailService;
        private readonly GeneralService generalService;

        public LandingPageController(GeneralService service, EmailService emailService)
        {
            this.generalService = service;
            this.emailService = emailService;
        }

        // fetches all company list
        [HttpGet]
        [Route("companies")]
        public ActionResult GetCompanyList()
        {
            return Ok(generalService.GetAllCompanies());
        }

        // fetch landing page content
        [HttpGet]
        public ActionResult GetLandingPageContent() => Ok(generalService.GetLandingPageContent());

        [HttpGet]
        [Route("about")]
        public ActionResult GetAboutUs() => Ok(generalService.GetAboutUs());

        // create landing page content
        // @ FOR ADMINS ONLY
        // @ Role based authentication
        [HttpPost]
        public ActionResult Create(About about) => Ok(generalService.Create(about));

    }
}