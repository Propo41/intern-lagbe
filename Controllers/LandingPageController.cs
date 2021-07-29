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
        public ActionResult Create(About about) => Ok(_generalService.Create(about));

    }
}