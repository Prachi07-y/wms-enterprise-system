using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _service;

        public ProjectController(IProjectService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllProjects());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var project = _service.GetProjectById(id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpPost]
        public IActionResult AddProject(Project project)
        {
            _service.AddProject(project);

            return Ok(project);
        }

        [HttpPut]
        public IActionResult UpdateProject(Project project)
        {
            _service.UpdateProject(project);

            return Ok(project);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProject(int id)
        {
            _service.DeleteProject(id);

            return Ok();
        }
    }
}