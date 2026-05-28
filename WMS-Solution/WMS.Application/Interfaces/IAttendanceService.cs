using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface IAttendanceService
    {
        List<Attendance> GetAllAttendance();

        Attendance GetAttendanceById(int id);

        void AddAttendance(Attendance attendance);

        void UpdateAttendance(Attendance attendance);

        void DeleteAttendance(int id);
    }
}