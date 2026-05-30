using System.ComponentModel.DataAnnotations;

namespace WMS.Domain.Entities
{
    public class Announcement
    {
        public int AnnouncementId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        [StringLength(100)]
        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;

        public bool IsActive { get; set; } = true;
    }
}