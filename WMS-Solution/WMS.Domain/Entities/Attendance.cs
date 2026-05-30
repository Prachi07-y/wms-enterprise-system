using System.ComponentModel.DataAnnotations;

namespace WMS.Domain.Entities
{
    public class Attendance
    {
        public int AttendanceId { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public DateTime? CheckIn { get; set; }

        public DateTime CheckOut { get; set; }

        [Required]
        public string Status { get; set; }
    }
}