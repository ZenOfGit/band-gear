using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ICountryRepository
    {
         Task<IEnumerable<Country>> GetCountriesAsync();
         void AddCountry(Country country);
         void DeleteCountry(int CountryId);
    }
}