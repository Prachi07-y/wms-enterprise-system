using System.ComponentModel.DataAnnotations;

namespace WMS.Domain.Entities
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        public DateTime DOB { get; set; }

        [Required]
        public DateTime DOJ { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        [Required]
        public int RoleId { get; set; }

        [Required]
        public string Status { get; set; }
    }
}