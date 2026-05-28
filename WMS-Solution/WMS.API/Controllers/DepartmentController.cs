using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _service;

        public DepartmentController(IDepartmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllDepartments());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var department = _service.GetDepartmentById(id);

            if (department == null)
            {
                return NotFound();
            }

            return Ok(department);
        }

        [HttpPost]
        public IActionResult AddDepartment(Department department)
        {
            _service.AddDepartment(department);

            return Ok(department);
        }

        [HttpPut]
        public IActionResult UpdateDepartment(Department department)
        {
            _service.UpdateDepartment(department);

            return Ok(department);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            _service.DeleteDepartment(id);

            return Ok();
        }
    }
}