using WMS.Domain.Entities;

namespace WMS.Application.Interfaces
{
    public interface IClientRepository
    {
        List<Client> GetAllClients();

        Client GetClientById(int id);

        void AddClient(Client client);

        void UpdateClient(Client client);

        void DeleteClient(Client client);
    }
}