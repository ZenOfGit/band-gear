using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
         ICountryRepository CountryRepository {get;}

         Task<bool> SaveAsync();
    }
}