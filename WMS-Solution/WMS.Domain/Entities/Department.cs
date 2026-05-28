using System.ComponentModel.DataAnnotations;

namespace WMS.Domain.Entities
{
    public class Department
    {
        public int DepartmentId { get; set; }

        [Required]
        [StringLength(100)]
        public string DepartmentName { get; set; }

        [StringLength(255)]
        public string Description { get; set; }
    }
}