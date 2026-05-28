using System.ComponentModel.DataAnnotations;

namespace WMS.Domain.Entities
{
    public class Leave
    {
        public int LeaveId { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public string LeaveType { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [StringLength(255)]
        public string Reason { get; set; }

        [Required]
        public string Status { get; set; }
    }
}