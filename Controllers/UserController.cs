using System;
using Microsoft.AspNetCore.Mvc;
using InternFinder.Models;
using InternFinder.Helpers;
using InternFinder.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

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
                return new BadRequestObjectResult(new ErrorResult("Invalid input", 400, "Please enter an organizational email address."));
            }
            Payload res = _userService.isUserExist(user.Email);
            if (res.User == null)
            {
                _userService.Create(user);
                Console.WriteLine(user.Id);
                Payload responseStatus = _emailService.Service(user.Email, user.Id, "confirmation");
                return Ok(new { responseStatus });
            }
            else
            {
                return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 403, "User already exists. Please try a different email or login to your existing account."));
            }

        }

        /* triggered when user clicks on the link sent to their email for confirmation */
        [Route("verify-email")]
        [HttpGet]
        public ActionResult VerifyToken(string token, string uid)
        {
            Console.WriteLine("endpoint triggered");
            if (token == null || uid == null || token.Length == 0 || uid.Length == 0)
            {
                return new BadRequestObjectResult(new ErrorResult("Invalid request", 400, "Token is invalid or expired."));
            }

            if (Util.isUidTokenValid(token, 50))
            {
                // token is valid, now make the user verified
                _userService.VerifyUser(uid);
                return Ok(new Payload { StatusCode = 200, StatusDescription = "Token validation success. Your account has become verified. Please log in." });
            }
            else
            {
                return new BadRequestObjectResult(new ErrorResult("Invalid request", 403, "Invalid token or the token has been expired."));
            }

        }


        /* forgot password: when user enters an email  */
        [Route("forgot-password")]
        [HttpPost]
        public ActionResult ForgotPassword(IFormCollection form)
        {
            string email = form["email"];
            Console.WriteLine(email);
            if (email == null || email == "" || !Util.isDomainValid(email))
            {
                return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Please enter a correct email"));
            }

            Payload res = _userService.isUserExist(email);
            if (res.User == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "A user doesn't exist associated with the given email address"));
            }
            else
            {
                Payload responseStatus = _emailService.Service(email, res.User.Id, "forgotpassword");
                return Ok(responseStatus);
            }

        }

        // GET /auth/user/forgot-password?token=<token>&&uid=<uid>
        //forgot password token validation 
        [Route("forgot-password")]
        [HttpGet]
        async public Task<ActionResult> IsTokenValid(string token, string uid)
        {
            Console.WriteLine("validating token");
            Console.WriteLine(token);
            var isValid = await _userService.IsTokenValid(uid, token);

            if (isValid)
            {
                return Ok(new Payload { StatusCode = 200, StatusDescription = "Token validation success. Please enter your new password" });
            }
            else
            {
                return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Token is invalid"));
            }
        }


        /* forgot password > new password */
        [Route("forgot-password/new")]
        [HttpPost]
        async public Task<ActionResult> ChangePassword(IFormCollection form)
        {
            string password = form["password"];
            string uid = form["uid"];
            string token = form["token"];

            var isValid = await _userService.IsTokenValid(uid, token);
            Console.WriteLine("token validation: " + isValid);

            if (password == null || password == "" || uid == null || uid == "" || !isValid)
            {
                return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Please enter a valid password"));
            }

            if (_userService.ChangePassword(password, uid, token))
            {
                return Ok(new Payload { StatusCode = 200, StatusDescription = "Password changed successfully" });
            }
            return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, "Internal server error"));
        }



        [Route("login")]
        [HttpPost]
        public ActionResult Login(User user)
        {
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