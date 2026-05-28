using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories
{
    public class LeaveRepository : ILeaveRepository
    {
        private readonly WMSDbContext _context;

        public LeaveRepository(WMSDbContext context)
        {
            _context = context;
        }

        public List<Leave> GetAllLeaves()
        {
            return _context.Leaves.ToList();
        }

        public Leave GetLeaveById(int id)
        {
            return _context.Leaves.Find(id);
        }

        public void AddLeave(Leave leave)
        {
            _context.Leaves.Add(leave);

            _context.SaveChanges();
        }

        public void UpdateLeave(Leave leave)
        {
            _context.Leaves.Update(leave);

            _context.SaveChanges();
        }

        public void DeleteLeave(Leave leave)
        {
            _context.Leaves.Remove(leave);

            _context.SaveChanges();
        }
    }
}