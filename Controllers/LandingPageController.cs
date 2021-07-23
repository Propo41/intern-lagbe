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
        private readonly UserService userService;

        public LandingPageController(UserService userService, EmailService emailService)
        {
            this.userService = userService;
            this.emailService = emailService;
        }

        // fetches all company list
        [HttpGet]
        [Route("companies")]
        public ActionResult GetCompanyList()
        {
            return Ok(userService.GetAllCompanies());
        }


        // fetch landing page content
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(userService.GetAllCompanies());
        }




    }
}