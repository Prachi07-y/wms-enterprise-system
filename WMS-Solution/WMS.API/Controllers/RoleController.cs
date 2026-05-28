using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _service;

        public RoleController(IRoleService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllRoles());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var role = _service.GetRoleById(id);

            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

        [HttpPost]
        public IActionResult AddRole(Role role)
        {
            _service.AddRole(role);

            return Ok(role);
        }

        [HttpPut]
        public IActionResult UpdateRole(Role role)
        {
            _service.UpdateRole(role);

            return Ok(role);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRole(int id)
        {
            _service.DeleteRole(id);

            return Ok();
        }
    }
}