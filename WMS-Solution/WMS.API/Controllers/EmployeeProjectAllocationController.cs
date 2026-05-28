using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeProjectAllocationController : ControllerBase
    {
        private readonly IEmployeeProjectAllocationService _service;

        public EmployeeProjectAllocationController(IEmployeeProjectAllocationService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var allocation = _service.GetById(id);

            if (allocation == null)
            {
                return NotFound();
            }

            return Ok(allocation);
        }

        [HttpPost]
        public IActionResult Add(EmployeeProjectAllocation allocation)
        {
            _service.Add(allocation);

            return Ok(allocation);
        }

        [HttpPut]
        public IActionResult Update(EmployeeProjectAllocation allocation)
        {
            _service.Update(allocation);

            return Ok(allocation);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);

            return Ok();
        }
    }
}