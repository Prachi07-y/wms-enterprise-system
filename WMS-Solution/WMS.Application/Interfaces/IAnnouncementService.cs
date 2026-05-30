using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface IAnnouncementService
    {
        List<Announcement> GetAllAnnouncements();

        Announcement GetAnnouncementById(int id);

        void AddAnnouncement(Announcement announcement);

        void UpdateAnnouncement(Announcement announcement);

        void DeleteAnnouncement(int id);
    }
}