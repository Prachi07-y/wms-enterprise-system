using Microsoft.AspNetCore.Mvc;
using WMS.Application.DTOs;
using WMS.Application.Interfaces;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var token = _authService.Authenticate(request);

            if (token == null)
            {
                return Unauthorized("Invalid username or password");
            }

            return Ok(new
            {
                Token = token
            });
        }
    }
}