using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using System.Linq;

namespace WMS.Application.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _repository;

        public AttendanceService(IAttendanceRepository repository)
        {
            _repository = repository;
        }

        public List<Attendance> GetAllAttendance()
        {
            return _repository.GetAllAttendance();
        }

        public Attendance GetAttendanceById(int id)
        {
            return _repository.GetAttendanceById(id);
        }

        public void AddAttendance(Attendance attendance)
        {
            _repository.AddAttendance(attendance);
        }

        public void UpdateAttendance(Attendance attendance)
        {
            _repository.UpdateAttendance(attendance);
        }

        public void DeleteAttendance(int id)
        {
            var attendance = _repository.GetAttendanceById(id);

            if (attendance != null)
            {
                _repository.DeleteAttendance(attendance);
            }
        }
        public void CheckIn(int employeeId)
        {
            var attendance = new Attendance
            {
                EmployeeId = employeeId,
                Date = DateTime.Today,
                CheckIn = DateTime.Now,
                Status = "Present"
            };

            _repository.AddAttendance(attendance);
        }
        public void CheckOut(int employeeId)
        {
            var attendance = _repository
                .GetAllAttendance()
                .FirstOrDefault(a =>
                    a.EmployeeId == employeeId &&
                    a.Date.Date == DateTime.Today);

            if (attendance != null)
            {
                attendance.CheckOut = DateTime.Now;

                _repository.UpdateAttendance(attendance);
            }
        }
        public object GetMonthlyAttendance(int employeeId, int year, int month)
        {
            var records = _repository
                .GetAllAttendance()
                .Where(a =>
                    a.EmployeeId == employeeId &&
                    a.Date.Year == year &&
                    a.Date.Month == month)
                .ToList();

            var totalPresent = records.Count(a => a.Status == "Present");

            var totalAbsent = records.Count(a => a.Status == "Absent");

            var totalDays = records.Count;

            var attendancePercentage =
                totalDays == 0 ? 0 :
                (double)totalPresent / totalDays * 100;

            return new
            {
                EmployeeId = employeeId,
                Year = year,
                Month = month,
                TotalPresent = totalPresent,
                TotalAbsent = totalAbsent,
                AttendancePercentage = Math.Round(attendancePercentage, 2),
                Records = records
            };
        }
    }

}