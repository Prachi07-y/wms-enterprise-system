using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories
{
    public class EmployeeProjectAllocationRepository : IEmployeeProjectAllocationRepository
    {
        private readonly WMSDbContext _context;

        public EmployeeProjectAllocationRepository(WMSDbContext context)
        {
            _context = context;
        }

        public List<EmployeeProjectAllocation> GetAll()
        {
            return _context.EmployeeProjectAllocations.ToList();
        }

        public EmployeeProjectAllocation GetById(int id)
        {
            return _context.EmployeeProjectAllocations.Find(id);
        }

        public void Add(EmployeeProjectAllocation allocation)
        {
            _context.EmployeeProjectAllocations.Add(allocation);

            _context.SaveChanges();
        }

        public void Update(EmployeeProjectAllocation allocation)
        {
            _context.EmployeeProjectAllocations.Update(allocation);

            _context.SaveChanges();
        }

        public void Delete(EmployeeProjectAllocation allocation)
        {
            _context.EmployeeProjectAllocations.Remove(allocation);

            _context.SaveChanges();
        }
    }
}