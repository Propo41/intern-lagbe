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
                    return new UnauthorizedObjectResult(new ErrorResult("Verification error", 403, res.StatusDescription));
                default:
                    return new BadRequestObjectResult(new ErrorResult("Couldn't process your request", 400, res.StatusDescription));
            }
        }

    }
}