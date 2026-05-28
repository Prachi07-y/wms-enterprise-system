using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace WMS.Domain.Entities
{
    public class EmployeeProjectAllocation
    {
        [Key]
        
        public int AllocationId { get; set; }

        [Required]
        public int EmpId { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [Required]
        public DateTime AssignedOn { get; set; }

        public string Status { get; set; }
    }
}