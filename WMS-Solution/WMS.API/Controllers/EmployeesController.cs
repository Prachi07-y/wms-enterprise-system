using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using Microsoft.AspNetCore.Authorization;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;

        public EmployeesController(IEmployeeService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(_service.GetAllEmployees());
        }

        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            _service.AddEmployee(employee);

            return Ok(employee);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, Employee employee)
        {
            employee.EmployeeId = id;

            _service.UpdateEmployee(employee);

            return Ok(employee);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            _service.DeleteEmployee(id);

            return Ok("Employee deleted successfully");
        }

        [HttpGet("search/name/{name}")]
        public IActionResult SearchByName(string name)
        {
            return Ok(_service.SearchByName(name));
        }

        [HttpGet("search/department/{departmentId}")]
        public IActionResult SearchByDepartment(int departmentId)
        {
            return Ok(_service.SearchByDepartment(departmentId));
        }

        [HttpGet("search/role/{roleId}")]
        public IActionResult SearchByRole(int roleId)
        {
            return Ok(_service.SearchByRole(roleId));
        }
    }
}