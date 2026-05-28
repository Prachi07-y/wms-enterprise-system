using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface IEmployeeService
    {
        List<Employee> GetAllEmployees();
        List<Employee> SearchByName(string name);

        List<Employee> SearchByDepartment(int departmentId);

        List<Employee> SearchByRole(int roleId);

        Employee GetEmployeeById(int id);

        void AddEmployee(Employee employee);

        void UpdateEmployee(Employee employee);

        void DeleteEmployee(int id);
    }
}
