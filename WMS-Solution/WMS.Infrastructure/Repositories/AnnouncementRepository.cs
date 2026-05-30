using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly WMSDbContext _context;

        public AnnouncementRepository(WMSDbContext context)
        {
            _context = context;
        }

        public List<Announcement> GetAllAnnouncements()
        {
            return _context.Announcements.ToList();
        }

        public Announcement GetAnnouncementById(int id)
        {
            return _context.Announcements.Find(id);
        }

        public void AddAnnouncement(Announcement announcement)
        {
            _context.Announcements.Add(announcement);
            _context.SaveChanges();
        }

        public void UpdateAnnouncement(Announcement announcement)
        {
            _context.Announcements.Update(announcement);
            _context.SaveChanges();
        }

        public void DeleteAnnouncement(Announcement announcement)
        {
            _context.Announcements.Remove(announcement);
            _context.SaveChanges();
        }
    }
}