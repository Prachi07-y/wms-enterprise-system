using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;

using System.Text;

using WMS.Application.DTOs;

using WMS.Application.Interfaces;

using WMS.Infrastructure.Data;

namespace WMS.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly WMSDbContext _context;

        private readonly IConfiguration _configuration;

        public AuthService(
            WMSDbContext context,
            IConfiguration configuration
        )
        {
            _context = context;

            _configuration = configuration;
        }

        public string Authenticate(
            LoginRequest request
        )
        {
            var user =
                _context.Users.FirstOrDefault(u =>

                    u.Username ==
                    request.Username

                    &&

                    u.Password ==
                    request.Password

                );

            // INVALID LOGIN

            if (user == null)
            {
                return null;
            }

            // JWT TOKEN HANDLER

            var tokenHandler =
                new JwtSecurityTokenHandler();

            // SECRET KEY

            var key =
                Encoding.ASCII.GetBytes(

                    _configuration["Jwt:Key"]

                );

            // TOKEN CONFIGURATION

            var tokenDescriptor =
                new SecurityTokenDescriptor
                {
                    Subject =
                        new ClaimsIdentity(new[]
                        {
                            // USERNAME

                            new Claim(
                                ClaimTypes.Name,
                                user.Username
                            ),

                            // ROLE

                            new Claim(
                                ClaimTypes.Role,
                                user.Role
                            ),

                            // EMPLOYEE ID

                            new Claim(
                                "Employeeid",

                                user.Employeeid?
                                    .ToString()

                                ?? ""
                            )
                        }),

                    Expires =
                        DateTime.UtcNow
                            .AddHours(2),

                    Issuer =
                        _configuration[
                            "Jwt:Issuer"
                        ],

                    Audience =
                        _configuration[
                            "Jwt:Audience"
                        ],

                    SigningCredentials =
                        new SigningCredentials(

                            new SymmetricSecurityKey(
                                key
                            ),

                            SecurityAlgorithms
                                .HmacSha256Signature
                        )
                };

            // CREATE TOKEN

            var token =
                tokenHandler.CreateToken(
                    tokenDescriptor
                );

            // RETURN JWT STRING

            return tokenHandler.WriteToken(
                token
            );
        }
    }
}