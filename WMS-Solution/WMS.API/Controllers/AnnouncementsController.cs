using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AnnouncementsController : ControllerBase
    {
        private readonly IAnnouncementService _service;

        public AnnouncementsController(IAnnouncementService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllAnnouncements());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var announcement = _service.GetAnnouncementById(id);

            if (announcement == null)
                return NotFound();

            return Ok(announcement);
        }

        [HttpPost]
        public IActionResult AddAnnouncement(Announcement announcement)
        {
            _service.AddAnnouncement(announcement);

            return Ok(announcement);
        }

        [HttpPut]
        public IActionResult UpdateAnnouncement(Announcement announcement)
        {
            _service.UpdateAnnouncement(announcement);

            return Ok(announcement);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAnnouncement(int id)
        {
            _service.DeleteAnnouncement(id);

            return Ok(new
            {
                message = "Announcement deleted successfully"
            });
        }
    }
}