using System.ComponentModel.DataAnnotations;

namespace WMS.Domain.Entities
{
    public class Project
    {
        public int ProjectId { get; set; }

        [Required]
        [StringLength(100)]
        public string ProjectName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [Required]
        public string Status { get; set; }
    }
}