using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly WMSDbContext _context;

        public DepartmentRepository(WMSDbContext context)
        {
            _context = context;
        }

        public List<Department> GetAllDepartments()
        {
            return _context.Departments.ToList();
        }

        public Department GetDepartmentById(int id)
        {
            return _context.Departments.Find(id);
        }

        public void AddDepartment(Department department)
        {
            _context.Departments.Add(department);

            _context.SaveChanges();
        }

        public void UpdateDepartment(Department department)
        {
            _context.Departments.Update(department);

            _context.SaveChanges();
        }

        public void DeleteDepartment(Department department)
        {
            _context.Departments.Remove(department);

            _context.SaveChanges();
        }
    }
}