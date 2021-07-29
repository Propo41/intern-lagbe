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
            if (!ModelState.IsValid)
            {
                return BadRequest(new Payload { StatusCode = 400, StatusDescription = "Invalid inputs. Please check if you have entered the information correctly" });
            }

            if (!Util.isDomainValid(user.Email))
            {
                return BadRequest(new Payload { StatusCode = 400, StatusDescription = "Please enter an organizational email address." });
            }
            Payload res = _userService.isUserExist(user.Email);
            if (res.User == null)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(12));
                _userService.Create(user);
                Console.WriteLine(user.Id);
                Payload responseStatus = _emailService.Service(user.Email, user.Id, "confirmation");
                return Ok(new { responseStatus });
            }
            else
            {
                return Conflict(new Payload { StatusCode = 403, StatusDescription = "User already exists. Please try a different email or login to your existing account." });
            }

        }

        /* triggered when user clicks on the link sent to their email for confirmation */
        [Route("verify")]
        [HttpGet]
        public ActionResult VerifyToken(string token, string uid)
        {
            Console.WriteLine("endpoint triggered");
            if (token == null || uid == null || token.Length == 0 || uid.Length == 0)
            {
                return BadRequest(new Payload { StatusCode = 400, StatusDescription = "Bad Request" });
            }

            if (Util.isUidTokenValid(token))
            {
                // token is valid, now make the user verified
                _userService.VerifyUser(uid);
                return Ok(new Payload { StatusCode = 200, StatusDescription = "Token validation success. Your account has become verified. Please log in." });
            }
            else
            {
                return BadRequest(new Payload { StatusCode = 403, StatusDescription = "Invalid token or the token has been expired." });
            }

        }


        [Route("login")]
        [HttpPost]
        public ActionResult Login(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Payload { StatusCode = 400, StatusDescription = "Invalid inputs. Please check if you have entered the information correctly" });
            }

            Payload res = _userService.Authenticate(user.Email, user.Password);
            switch (res.StatusCode)
            {
                case 200:
                    return Ok(new Payload { StatusCode = 200, StatusDescription = "Login success.", Token = res.Token });
                case 403:
                    Payload responseStatus = _emailService.Service(res.User.Email, res.User.Id, "confirmation");
                    return new UnauthorizedObjectResult(new ErrorResult("Verification error", 403, res.StatusDescription));
                default:
                    return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, res.StatusDescription));
            }


        }

    }
}