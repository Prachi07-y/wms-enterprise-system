using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface IRoleService
    {
        List<Role> GetAllRoles();

        Role GetRoleById(int id);

        void AddRole(Role role);

        void UpdateRole(Role role);

        void DeleteRole(int id);
    }
}