using System;
using Microsoft.AspNetCore.Mvc;
using InternFinder.Models;
using InternFinder.Helpers;
using InternFinder.Services;

/* 
 * 
 */
namespace InternFinder.Controllers
{
    [ApiController]
    [Route("auth/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;

        public UserController(IUserService _userService, IEmailService _emailService)
        {
            this._userService = _userService;
            this._emailService = _emailService;
        }

        // registers user if user does not exist
        [HttpPost]
        [Route("register")]
        public ActionResult Create(User user)
        {

            if (!Util.isDomainValid(user.Email))
            {
                return BadRequest(new ResponseStatus { StatusCode = 400, StatusDescription = "Please enter an organizational email address." });
            }
            ResponseStatus res = _userService.isUserExist(user.Email);
            if (res.User == null)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(12));
                _userService.Create(user);
                Console.WriteLine(user.Id);
                ResponseStatus responseStatus = _emailService.Service(user.Email, user.Id, "confirmation");
                return Ok(new { responseStatus });
            }
            else
            {
                return Conflict(new ResponseStatus { StatusCode = 403, StatusDescription = "User already exists. Please try a different email or login to your existing account." });
            }

        }

        /* triggered when user clicks on the link sent to their email for confirmation */
        [Route("verify")]
        [HttpGet]
        public ActionResult VerifyToken(string token, string uid)
        {
            Console.WriteLine("endpoint triggered");

            if (Util.isUidTokenValid(token))
            {
                // token is valid, now make the user verified
                _userService.VerifyUser(uid);
                return Ok(new ResponseStatus { StatusCode = 200, StatusDescription = "Token validation success. Your account has become verified. Please log in." });
            }
            else
            {
                return BadRequest(new ResponseStatus { StatusCode = 403, StatusDescription = "Invalid token or the token has been expired." });
            }

        }


        [Route("login")]
        [HttpPost]
        public ActionResult Login(User user)
        {
            ResponseStatus res = _userService.Authenticate(user.Email, user.Password);
            switch (res.StatusCode)
            {
                case 200:
                    return Ok(new ResponseStatus { StatusCode = 200, StatusDescription = "Login success.", Token = res.Token });
                case 403:
                    ResponseStatus responseStatus = _emailService.Service(res.User.Email, res.User.Id, "confirmation");
                    return Unauthorized(new { statusDescription = res.StatusDescription });
                default:
                    return Unauthorized(res);
            }

        }

    }
}