using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.Application.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _repository;

        public DepartmentService(IDepartmentRepository repository)
        {
            _repository = repository;
        }

        public List<Department> GetAllDepartments()
        {
            return _repository.GetAllDepartments();
        }

        public Department GetDepartmentById(int id)
        {
            return _repository.GetDepartmentById(id);
        }

        public void AddDepartment(Department department)
        {
            _repository.AddDepartment(department);
        }

        public void UpdateDepartment(Department department)
        {
            _repository.UpdateDepartment(department);
        }

        public void DeleteDepartment(int id)
        {
            var department = _repository.GetDepartmentById(id);

            if (department != null)
            {
                _repository.DeleteDepartment(department);
            }
        }
    }
}