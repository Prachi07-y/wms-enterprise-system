using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface IDepartmentService
    {
        List<Department> GetAllDepartments();

        Department GetDepartmentById(int id);

        void AddDepartment(Department department);

        void UpdateDepartment(Department department);

        void DeleteDepartment(int id);
    }
}