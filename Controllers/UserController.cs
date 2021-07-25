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

namespace dotnet_web_api_demo.Controllers
{
    [Authorize]
    [ApiController]
    [Route("auth/[controller]")]
    public class UserController : Controller
    {
        private readonly EmailService emailService;
        private readonly UserService userService;

        public UserController(UserService userService, EmailService emailService)
        {
            this.userService = userService;
            this.emailService = emailService;
        }

        // registers user if user does not exist
        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public ActionResult Create(User user)
        {

            if (!Util.isDomainValid(user.Email))
            {
                return BadRequest(new ResponseStatus { StatusCode = 400, StatusDescription = "Please enter an organizational email address." });
            }
            ResponseStatus res = userService.isUserExist(user.Email);
            if (res.User == null)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(12));
                userService.Create(user);
                Console.WriteLine(user.Id);
                ResponseStatus responseStatus = emailService.Service(user.Email, user.Id, "confirmation");
                return Ok(new { responseStatus, user.Id });
            }
            else
            {
                return Conflict(new ResponseStatus { StatusCode = 403, StatusDescription = "User already exists. Please try a different email or login to your existing account." });
            }

        }

        [AllowAnonymous]
        [Route("verify")]
        [HttpGet]
        public ActionResult VerifyToken(string token, string uid)
        {
            Console.WriteLine("endpoint triggered");

            if (Util.isTokenValid(token))
            {
                // token is valid, now make the user verified
                userService.VerifyUser(uid);
                return Ok(new ResponseStatus { StatusCode = 200, StatusDescription = "Token validation success. Your account has become verified. Please log in." });
            }
            else
            {
                return BadRequest(new ResponseStatus { StatusCode = 403, StatusDescription = "Invalid token or the token has been expired." });
            }

        }

        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public ActionResult Login(User user)
        {
            ResponseStatus res = userService.Authenticate(user.Email, user.Password);
            switch (res.StatusCode)
            {
                case 200:
                    return Ok(new ResponseStatus { StatusCode = 200, StatusDescription = "Login success.", Token = res.Token, Uid = res.User.Id });
                case 403:
                    ResponseStatus responseStatus = emailService.Service(res.User.Email, res.User.Id, "confirmation");
                    return Unauthorized(new { statusDescription = res.StatusDescription, Uid = res.User.Id });
                default:
                    return Unauthorized(res);
            }

        }

    }
}