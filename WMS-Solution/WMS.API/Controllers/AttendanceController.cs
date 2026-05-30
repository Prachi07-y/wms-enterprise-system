using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _service;

        public AttendanceController(IAttendanceService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllAttendance());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var attendance = _service.GetAttendanceById(id);

            if (attendance == null)
            {
                return NotFound();
            }

            return Ok(attendance);
        }

        [HttpPost]
        public IActionResult AddAttendance(Attendance attendance)
        {
            _service.AddAttendance(attendance);

            return Ok(attendance);
        }

        [HttpPut]
        public IActionResult UpdateAttendance(Attendance attendance)
        {
            _service.UpdateAttendance(attendance);

            return Ok(attendance);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAttendance(int id)
        {
            _service.DeleteAttendance(id);

            return Ok();
        }
        [HttpPost("checkin/{employeeId}")]
        public IActionResult CheckIn(int employeeId)
        {
            _service.CheckIn(employeeId);

            return Ok("Checked In Successfully");
        }
        [HttpPost("checkout/{employeeId}")]
        public IActionResult CheckOut(int employeeId)
        {
            _service.CheckOut(employeeId);

            return Ok("Checked Out Successfully");
        }
        [HttpGet("monthly/{employeeId}/{year}/{month}")]
        public IActionResult GetMonthlyAttendance(
     int employeeId,
     int year,
     int month)
        {
            return Ok(
                _service.GetMonthlyAttendance(
                    employeeId,
                    year,
                    month));
        }

    }
}