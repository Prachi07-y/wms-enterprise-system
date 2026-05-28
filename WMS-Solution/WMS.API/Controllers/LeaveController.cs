using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LeaveController : ControllerBase
    {
        private readonly ILeaveService _service;

        public LeaveController(ILeaveService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllLeaves());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var leave = _service.GetLeaveById(id);

            if (leave == null)
            {
                return NotFound();
            }

            return Ok(leave);
        }

        [HttpPost]
        public IActionResult AddLeave(Leave leave)
        {
            _service.AddLeave(leave);

            return Ok(leave);
        }

        [HttpPut]
        public IActionResult UpdateLeave(Leave leave)
        {
            _service.UpdateLeave(leave);

            return Ok(leave);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteLeave(int id)
        {
            _service.DeleteLeave(id);

            return Ok();
        }
        [HttpPut("approve/{id}")]
        public IActionResult ApproveLeave(int id)
        {
            var leave = _service.GetLeaveById(id);

            if (leave == null)
            {
                return NotFound();
            }

            leave.Status = "Approved";

            _service.UpdateLeave(leave);

            return Ok(leave);
        }

        [HttpPut("reject/{id}")]
        public IActionResult RejectLeave(int id)
        {
            var leave = _service.GetLeaveById(id);

            if (leave == null)
            {
                return NotFound();
            }

            leave.Status = "Rejected";

            _service.UpdateLeave(leave);

            return Ok(leave);
        }
    }
}