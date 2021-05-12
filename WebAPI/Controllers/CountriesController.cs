using System.Threading.Tasks;/*  */
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class CountriesController : ControllerBase
   {
      private readonly IUnitOfWork uow;

      public CountriesController(IUnitOfWork uow)
      {
         this.uow = uow;
      }

      // GET api/countries
      [HttpGet]
      public async Task<IActionResult> GetCountries()
      {
         var countries = await uow.CountryRepository.GetCountriesAsync();
         return Ok(countries);
      }

/*       // POST api/country/add?countryName=Canada
      [HttpPost("add")]
      POST api/country?countryName=Canada
      POST api/country/Ireland
      [HttpPost]  // Could add a different endpint like addname here but we will just use the one to add an object

      // POST api/countries/Ireland
       [HttpPost("{countryname}")]
      public async Task<IActionResult> AddCountry(string countryName)
      {
         Country country = new Country();
         country.Name = countryName;
         await dc.Countries.AddAsync(country);
         await dc.SaveChangesAsync();
         return Ok(country);
      } */

      // POST api/countries -- POST the data in JSON format
      [HttpPost]
      public async Task<IActionResult> AddCountry(Country country)
      {
         uow.CountryRepository.AddCountry(country);
         await uow.SaveAsync();
         return StatusCode(201);
      }

      // DELETE api/countries/1
      [HttpDelete("{id}")]
      public async Task<IActionResult> DeleteCountry(int id)
      {
         uow.CountryRepository.DeleteCountry(id);
         await uow.SaveAsync();
         return Ok(id);
      }
   }
}