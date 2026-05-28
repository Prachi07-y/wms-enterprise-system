using WMS.Application.DTOs;
using WMS.Application.DTOs;
namespace WMS.Application.Interfaces

{
    public interface IAuthService
    {
        string Authenticate(WMS.Application.DTOs.LoginRequest request);
    }
}
