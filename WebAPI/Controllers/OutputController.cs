using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OutputController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "MIDI Out", "Line Out 1/8\"", "Line Out 1/4\"", "Audio Out RCA", "Headphones", "USB", "HDMI" };

        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "MIDI Out";
        }
    }
}
