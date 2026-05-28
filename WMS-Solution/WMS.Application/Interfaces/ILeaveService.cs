using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface ILeaveService
    {
        List<Leave> GetAllLeaves();

        Leave GetLeaveById(int id);

        void AddLeave(Leave leave);

        void UpdateLeave(Leave leave);

        void DeleteLeave(int id);
    }
}