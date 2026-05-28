using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface ILeaveRepository
    {
        List<Leave> GetAllLeaves();

        Leave GetLeaveById(int id);

        void AddLeave(Leave leave);

        void UpdateLeave(Leave leave);

        void DeleteLeave(Leave leave);
    }
}