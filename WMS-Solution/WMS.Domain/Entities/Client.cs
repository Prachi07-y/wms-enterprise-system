using System.ComponentModel.DataAnnotations;

namespace WMS.Domain.Entities
{
    public class Client
    {
        public int ClientId { get; set; }

        [Required]
        [StringLength(100)]
        public string ClientName { get; set; }

        public string? ClientAddress { get; set; }

        public decimal? ClientPhoneNumber { get; set; }

        [StringLength(50)]
        public string? ClientLocation { get; set; }

        public bool Status { get; set; } = true;
    }
}