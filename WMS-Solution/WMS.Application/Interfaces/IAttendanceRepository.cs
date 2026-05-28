using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface IAttendanceRepository
    {
        List<Attendance> GetAllAttendance();

        Attendance GetAttendanceById(int id);

        void AddAttendance(Attendance attendance);

        void UpdateAttendance(Attendance attendance);

        void DeleteAttendance(Attendance attendance);
    }
}