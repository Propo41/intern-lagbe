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
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : Controller
    {

        private readonly EmailService emailService;
        private readonly UserService userService;

        public CompanyController(UserService userService, EmailService emailService)
        {
            this.userService = userService;
            this.emailService = emailService;
        }


        // registers user if user does not exist
        [HttpPost]
        [AllowAnonymous]
        [Route("profile/update")]
        public ActionResult UpdateProfile(User user)
        {
            if (user != null)
            {
                ResponseStatus res = userService.UpdateUserProfile(user);
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }
        }

    }
}