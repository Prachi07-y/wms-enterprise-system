using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService _service;

        public ClientsController(IClientService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllClients());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var client = _service.GetClientById(id);

            if (client == null)
                return NotFound();

            return Ok(client);
        }

        [HttpPost]
        public IActionResult AddClient(Client client)
        {
            _service.AddClient(client);

            return Ok(client);
        }

        [HttpPut]
        public IActionResult UpdateClient(Client client)
        {
            _service.UpdateClient(client);

            return Ok(client);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteClient(int id)
        {
            _service.DeleteClient(id);

            return Ok(new
            {
                message = "Client deleted successfully"
            });
        }
    }
}