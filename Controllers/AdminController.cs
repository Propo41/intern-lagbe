using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using InternFinder.Models;
using InternFinder.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace InternFinder.Controllers
{
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

    }
}