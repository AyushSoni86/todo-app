using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace Todo_App.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ToDoItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ToDoItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItemModel>>> GetToDoItems()
        {
            return await _context.ToDoItems.ToListAsync();
        }


        // GET: api/ToDoItem/email

        [HttpGet("{email}")]
        public async Task<ActionResult<IEnumerable<ToDoItemModel>>> GetToDoItemsByUser(string email)
        {
            var userToDoItems = await _context.ToDoItems
                .Where(item => item.Email == email)
                .ToListAsync();

            if (userToDoItems == null || userToDoItems.Count == 0)
            {
                return NotFound($"No ToDoItems found for user '{email}'.");
            }

            return userToDoItems;
        }

        // GET: api/ToDoItem/email/id

        [HttpGet("{email}/{id}")]
        public async Task<ActionResult<ToDoItemModel>> GetToDoItemModel(string email, int id)
        {
            var toDoItemModel = await _context.ToDoItems
                .Where(item => item.Email == email && item.ItemId == id)
                .FirstOrDefaultAsync();

            if (toDoItemModel == null)
            {
                return NotFound();
            }

            return toDoItemModel;
        }


        // PUT: api/ToDoItem/email/5
      
        [HttpPut("{email}/{id}")]
        public async Task<IActionResult> PutToDoItemModel(string email, int id, ToDoItemModel toDoItemModel)
        {
            if (id != toDoItemModel.ItemId || email != toDoItemModel.Email)
            {
                return BadRequest();
            }

            _context.Entry(toDoItemModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoItemModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ToDoItem/email

        [HttpPost("{email}")]
        public async Task<ActionResult<ToDoItemModel>> PostToDoItemModel(string email, [FromBody]ToDoItemModel toDoItemModel)
        {
            // Set the EmailUser property from the request
            toDoItemModel.Email = email;

            // Set the Date property to the current date
            toDoItemModel.Date = DateTime.Now;

            _context.ToDoItems.Add(toDoItemModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetToDoItemModel", new { email, id = toDoItemModel.ItemId }, toDoItemModel);
        }

        // DELETE: api/ToDoItem/user/5
        
        [HttpDelete("{email}/{id}")]
        public async Task<IActionResult> DeleteToDoItemModel(string email, int id)
        {
            var toDoItemModel = await _context.ToDoItems
                .Where(item => item.Email == email && item.ItemId == id)
                .FirstOrDefaultAsync();

            if (toDoItemModel == null)
            {
                return NotFound();
            }

            _context.ToDoItems.Remove(toDoItemModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool ToDoItemModelExists(int id)
        {
            return _context.ToDoItems.Any(e => e.ItemId == id);
        }
    }
}
