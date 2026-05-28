using WMS.Domain.Entities;

namespace WMS.Infrastructure.Repositories
{
    public interface IEmployeeRepository
    {
        List<Employee> GetAllEmployees();
        List<Employee> SearchByName(string name);

        List<Employee> SearchByDepartment(int departmentId);

        List<Employee> SearchByRole(int roleId);

        Employee GetEmployeeById(int id);

        void AddEmployee(Employee employee);

        void UpdateEmployee(Employee employee);

        void DeleteEmployee(Employee employee);
    }
}
