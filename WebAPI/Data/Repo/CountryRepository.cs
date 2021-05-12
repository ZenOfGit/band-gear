using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
   public class CountryRepository : ICountryRepository
   {
      private readonly DataContext dc;

      public CountryRepository(DataContext dc)
       {
         this.dc = dc;
      }
      public void AddCountry(Country country)
      {
         dc.Countries.Add(country);
      }

      public void DeleteCountry(int CountryId)
      {
         var country = dc.Countries.Find(CountryId);
         dc.Countries.Remove(country);
      }

      public async Task<IEnumerable<Country>> GetCountriesAsync()
      {
         return await dc.Countries.ToListAsync();
      }

   }
}