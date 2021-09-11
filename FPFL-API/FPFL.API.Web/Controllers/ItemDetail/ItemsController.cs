using FPFL.API.Data.Context;
using FPFL.API.Data.Domain;
using FPFL.API.Infrastructure.ItemDetail.Interface;
using FPFL.API.Infrastructure.ItemDetail.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPFL.API.Web.Controllers.ItemDetail
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
        private readonly IRepoItems _repoItems;

        /// <summary>
        ///     Credits Controller Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public ItemsController(FPFLContext context)
        {
            _repoItems = new RepoItems(context);
        }

        /// <summary>
        ///     Return List of Items, Credits or Debits, for given User using the View vwItems
        ///     GET: api/Items/{userId}/list/{itemType}
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <param name="itemType">int: itemType, Credit or Debit</param>
        /// <returns>Task<ActionResult<List<VwItem>>>: Asynchronous List of Items for the Authorized User</returns>
        [HttpGet("{userId}/list/{itemType}")]
        public async Task<ActionResult<List<VwItem>>> GetItems(Guid userId, int itemType)
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            return await _repoItems.GetItems(userId, itemType);
        }

        /// <summary>
        ///     Get a specific Item
        ///     GET: api/Items/{id}
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<ActionResult<VwItem>>: Asynchronous return of the requested Item</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<VwItem>> GetCredit(int id)
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            VwItem item = await _repoItems.GetItem(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        /// <summary>
        ///     Update Existing Item
        ///     PUT: api/Items/{id}
        ///     Item Model in the payload
        /// </summary>
        /// <param name="id">int: Item Id</param>
        /// <param name="item">Credit: The Edited Item Model</param>
        /// <returns>Task<IActionResult>: Action State</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            if (id != item.Id)
            {
                return BadRequest();
            }

            bool result = await _repoItems.PutItem(id, item);
            return result ? (IActionResult)Accepted() : NotFound();
        }

        /// <summary>
        ///     Add new Item
        ///     POST: api/Items
        ///     New Item Model in the payload
        /// </summary>
        /// <param name="item">Item: The input Item Model</param>
        /// <returns>Task<ActionResult<Item>>: Return the new Item & Action State</returns>
        [HttpPost]
        public async Task<ActionResult<Item>> PostCredit(Item item)
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            bool result = await _repoItems.PostItem(item);
            return result ? Created("Created", item) : (ActionResult<Item>)BadRequest();
        }

        /// <summary>
        ///     Delete a specific Item
        ///     DELETE: api/Credits/5
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<IActionResult>: Action State</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            bool result = await _repoItems.DeleteItem(id);
            return result ? (IActionResult)Accepted() : NotFound();
        }

    }
}
