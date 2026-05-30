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
        void CheckIn(int employeeId);

        void CheckOut(int employeeId);
        object GetMonthlyAttendance(int employeeId, int year, int month);
    }
}