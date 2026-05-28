using Microsoft.EntityFrameworkCore;
using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly WMSDbContext _context;

        public EmployeeRepository(WMSDbContext context)
        {
            _context = context;
        }

        public List<Employee> GetAllEmployees()
        {
            return _context.Employees.ToList();
        }

        public Employee GetEmployeeById(int id)
        {
            return _context.Employees.Find(id);
        }

        public void AddEmployee(Employee employee)
        {
            _context.Employees.Add(employee);

            _context.SaveChanges();
        }

        public void UpdateEmployee(Employee employee)
        {
            _context.Employees.Update(employee);

            _context.SaveChanges();
        }

        public void DeleteEmployee(Employee employee)
        {
            _context.Employees.Remove(employee);

            _context.SaveChanges();
        }

        public List<Employee> SearchByName(string name)
        {
            return _context.Employees
                .Where(e => e.FirstName.Contains(name)
                         || e.LastName.Contains(name))
                .ToList();
        }

        public List<Employee> SearchByDepartment(int departmentId)
        {
            return _context.Employees
                .Where(e => e.DepartmentId == departmentId)
                .ToList();
        }

        public List<Employee> SearchByRole(int roleId)
        {
            return _context.Employees
                .Where(e => e.RoleId == roleId)
                .ToList();
        }
    }
}