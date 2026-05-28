using WMS.Application.Interfaces;
using WMS.Domain.Entities;
using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly WMSDbContext _context;

        public ProjectRepository(WMSDbContext context)
        {
            _context = context;
        }

        public List<Project> GetAllProjects()
        {
            return _context.Projects.ToList();
        }

        public Project GetProjectById(int id)
        {
            return _context.Projects.Find(id);
        }

        public void AddProject(Project project)
        {
            _context.Projects.Add(project);

            _context.SaveChanges();
        }

        public void UpdateProject(Project project)
        {
            _context.Projects.Update(project);

            _context.SaveChanges();
        }

        public void DeleteProject(Project project)
        {
            _context.Projects.Remove(project);

            _context.SaveChanges();
        }
    }
}