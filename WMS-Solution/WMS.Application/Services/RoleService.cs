using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.Application.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _repository;

        public RoleService(IRoleRepository repository)
        {
            _repository = repository;
        }

        public List<Role> GetAllRoles()
        {
            return _repository.GetAllRoles();
        }

        public Role GetRoleById(int id)
        {
            return _repository.GetRoleById(id);
        }

        public void AddRole(Role role)
        {
            _repository.AddRole(role);
        }

        public void UpdateRole(Role role)
        {
            _repository.UpdateRole(role);
        }

        public void DeleteRole(int id)
        {
            var role = _repository.GetRoleById(id);

            if (role != null)
            {
                _repository.DeleteRole(role);
            }
        }
    }
}