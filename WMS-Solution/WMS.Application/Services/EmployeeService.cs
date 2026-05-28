using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using WMS.Infrastructure.Repositories;

namespace WMS.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeService(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public List<Employee> GetAllEmployees()
        {
            return _repository.GetAllEmployees();
        }

        public Employee GetEmployeeById(int id)
        {
            return _repository.GetEmployeeById(id);
        }

        public void AddEmployee(Employee employee)
        {
            _repository.AddEmployee(employee);
        }

        public void UpdateEmployee(Employee employee)
        {
            _repository.UpdateEmployee(employee);
        }

        public void DeleteEmployee(int id)
        {
            var employee = _repository.GetEmployeeById(id);

            if (employee != null)
            {
                _repository.DeleteEmployee(employee);
            }
        }
        public List<Employee> SearchByName(string name)
        {
            return _repository.SearchByName(name);
        }

        public List<Employee> SearchByDepartment(int departmentId)
        {
            return _repository.SearchByDepartment(departmentId);
        }

        public List<Employee> SearchByRole(int roleId)
        {
            return _repository.SearchByRole(roleId);
        }
    }
}