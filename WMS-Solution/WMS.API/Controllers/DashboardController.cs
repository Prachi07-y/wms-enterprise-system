using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.DTOs;
using WMS.Infrastructure.Data;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly WMSDbContext _context;

        public DashboardController(WMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetDashboardData()
        {
            var dashboard = new DashboardDto
            {
                TotalEmployees = _context.Employees.Count(),

                TotalAttendance = _context.Attendances.Count(),

                PendingLeaves = _context.Leaves.Count(l => l.Status == "Pending"),

                ActiveEmployees = _context.Employees.Count(e => e.Status == "Active")
            };

            return Ok(dashboard);
        }
    }
}