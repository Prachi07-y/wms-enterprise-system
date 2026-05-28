using WMS.Application.Interfaces;
using WMS.Domain.Entities;

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
    }
}