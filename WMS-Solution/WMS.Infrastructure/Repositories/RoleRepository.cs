using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly WMSDbContext _context;

        public RoleRepository(WMSDbContext context)
        {
            _context = context;
        }

        public List<Role> GetAllRoles()
        {
            return _context.Roles.ToList();
        }

        public Role GetRoleById(int id)
        {
            return _context.Roles.Find(id);
        }

        public void AddRole(Role role)
        {
            _context.Roles.Add(role);

            _context.SaveChanges();
        }

        public void UpdateRole(Role role)
        {
            _context.Roles.Update(role);

            _context.SaveChanges();
        }

        public void DeleteRole(Role role)
        {
            _context.Roles.Remove(role);

            _context.SaveChanges();
        }
    }
}