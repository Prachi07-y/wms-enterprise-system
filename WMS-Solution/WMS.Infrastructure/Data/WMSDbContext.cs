using Microsoft.EntityFrameworkCore;
using WMS.Domain.Entities;

namespace WMS.Infrastructure.Data
{
    public class WMSDbContext : DbContext
    {
        public WMSDbContext(DbContextOptions<WMSDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<EmployeeProjectAllocation> EmployeeProjectAllocations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(

                new Role
                {
                    RoleId = 101,
                    RoleName = "Admin",
                    Description = "System Administrator"
                },

                new Role
                {
                    RoleId = 102,
                    RoleName = "Manager",
                    Description = "Department Manager"
                },

                new Role
                {
                    RoleId = 103,
                    RoleName = "Employee",
                    Description = "Regular Employee"
                }
            );

            modelBuilder.Entity<Department>().HasData(

                new Department
                {
                    DepartmentId = 101,
                    DepartmentName = "Human Resources",
                    Description = "HR Department"
                },

                new Department
                {
                    DepartmentId = 102,
                    DepartmentName = "IT",
                    Description = "IT Department"
                }
            );

            base.OnModelCreating(modelBuilder);
        }

    }
}