using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface IProjectRepository
    {
        List<Project> GetAllProjects();

        Project GetProjectById(int id);

        void AddProject(Project project);

        void UpdateProject(Project project);

        void DeleteProject(Project project);
    }
}