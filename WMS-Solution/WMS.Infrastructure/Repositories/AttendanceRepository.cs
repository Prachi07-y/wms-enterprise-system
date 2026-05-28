using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly WMSDbContext _context;

        public AttendanceRepository(WMSDbContext context)
        {
            _context = context;
        }

        public List<Attendance> GetAllAttendance()
        {
            return _context.Attendances.ToList();
        }

        public Attendance GetAttendanceById(int id)
        {
            return _context.Attendances.Find(id);
        }

        public void AddAttendance(Attendance attendance)
        {
            _context.Attendances.Add(attendance);

            _context.SaveChanges();
        }

        public void UpdateAttendance(Attendance attendance)
        {
            _context.Attendances.Update(attendance);

            _context.SaveChanges();
        }

        public void DeleteAttendance(Attendance attendance)
        {
            _context.Attendances.Remove(attendance);

            _context.SaveChanges();
        }
    }
}