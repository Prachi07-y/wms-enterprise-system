using WMS.Application.Interfaces;
using WMS.Domain.Entities;

namespace WMS.Application.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IAnnouncementRepository _repository;

        public AnnouncementService(IAnnouncementRepository repository)
        {
            _repository = repository;
        }

        public List<Announcement> GetAllAnnouncements()
        {
            return _repository.GetAllAnnouncements();
        }

        public Announcement GetAnnouncementById(int id)
        {
            return _repository.GetAnnouncementById(id);
        }

        public void AddAnnouncement(Announcement announcement)
        {
            _repository.AddAnnouncement(announcement);
        }

        public void UpdateAnnouncement(Announcement announcement)
        {
            _repository.UpdateAnnouncement(announcement);
        }

        public void DeleteAnnouncement(int id)
        {
            var announcement = _repository.GetAnnouncementById(id);

            if (announcement != null)
            {
                _repository.DeleteAnnouncement(announcement);
            }
        }
    }
}
