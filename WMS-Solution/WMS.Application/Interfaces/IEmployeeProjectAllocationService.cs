using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface IEmployeeProjectAllocationService
    {
        List<EmployeeProjectAllocation> GetAll();

        EmployeeProjectAllocation GetById(int id);

        void Add(EmployeeProjectAllocation allocation);

        void Update(EmployeeProjectAllocation allocation);

        void Delete(int id);
    }
}