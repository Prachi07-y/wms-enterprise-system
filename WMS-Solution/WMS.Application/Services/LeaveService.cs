using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.Application.Services
{
    public class LeaveService : ILeaveService
    {
        private readonly ILeaveRepository _repository;

        public LeaveService(ILeaveRepository repository)
        {
            _repository = repository;
        }

        public List<Leave> GetAllLeaves()
        {
            return _repository.GetAllLeaves();
        }

        public Leave GetLeaveById(int id)
        {
            return _repository.GetLeaveById(id);
        }

        public void AddLeave(Leave leave)
        {
            _repository.AddLeave(leave);
        }

        public void UpdateLeave(Leave leave)
        {
            _repository.UpdateLeave(leave);
        }

        public void DeleteLeave(int id)
        {
            var leave = _repository.GetLeaveById(id);

            if (leave != null)
            {
                _repository.DeleteLeave(leave);
            }
        }
    }
}