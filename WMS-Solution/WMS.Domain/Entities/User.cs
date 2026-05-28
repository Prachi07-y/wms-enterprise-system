namespace WMS.Domain.Entities
{
    public class User
    {
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        // LINK TO EMPLOYEE

        public int? Employeeid { get; set; }
    }
}