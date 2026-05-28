using System.ComponentModel.DataAnnotations;

namespace WMS.Domain.Entities
{
    public class Role
    {
        public int RoleId { get; set; }

        [Required]
        [StringLength(50)]
        public string RoleName { get; set; }

        [StringLength(150)]
        public string Description { get; set; }
    }
}