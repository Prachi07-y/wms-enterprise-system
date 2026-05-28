using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.Application.Services
{
    public class EmployeeProjectAllocationService : IEmployeeProjectAllocationService
    {
        private readonly IEmployeeProjectAllocationRepository _repository;

        public EmployeeProjectAllocationService(IEmployeeProjectAllocationRepository repository)
        {
            _repository = repository;
        }

        public List<EmployeeProjectAllocation> GetAll()
        {
            return _repository.GetAll();
        }

        public EmployeeProjectAllocation GetById(int id)
        {
            return _repository.GetById(id);
        }

        public void Add(EmployeeProjectAllocation allocation)
        {
            _repository.Add(allocation);
        }

        public void Update(EmployeeProjectAllocation allocation)
        {
            _repository.Update(allocation);
        }

        public void Delete(int id)
        {
            var allocation = _repository.GetById(id);

            if (allocation != null)
            {
                _repository.Delete(allocation);
            }
        }
    }
}