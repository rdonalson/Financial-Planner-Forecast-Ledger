using FPFL.API.Data.Context;
using FPFL.API.Data.Domain;
using FPFL.API.Infrastructure.ItemDetail.Interface;
using FPFL.API.Infrastructure.ItemDetail.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System;
using System.Threading.Tasks;

namespace FPFL.API.Web.Controllers.ItemDetail
{
    /// <summary>
    ///     The Initial Amount Controller
    /// </summary>
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InitialAmountController : ControllerBase
    {
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
        private readonly IRepoInitialAmount _repoInitialAmount;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public InitialAmountController(FPFLContext context)
        {
            _repoInitialAmount = new RepoInitialAmount(context);
        }

        /// <summary>
        ///     Get a specific InitialAmount with the User OID
        ///     GET: api/InitialAmounts/{userId}
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<ActionResult<Item>>: The requested Debit</returns>
        [HttpGet("{userId}")]
        public async Task<ActionResult<Item>> GetInitialAmount(Guid userId)
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            return await _repoInitialAmount.GetInitialAmount(userId);
        }

        /// <summary>
        ///     Add new Initial Amount
        ///     POST: api/InitialAmounts
        ///     New Debit Model in the payload
        /// </summary>
        /// <param name="initialAmount">Item: The input Initial Amount Model</param>
        /// <returns>Task<ActionResult<Item>>: Return the new Debit & Action State</returns>
        [HttpPost]
        public async Task<ActionResult<Item>> PostInitialAmount(Item initialAmount)
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            bool result = await _repoInitialAmount.PostInitialAmount(initialAmount);
            return result ? Created("Created", initialAmount) : (ActionResult<Item>)BadRequest();
        }

        /// <summary>
        ///     Update Existing initial Amount
        ///     PUT: api/Credits/{userId}
        ///     initial Amount Model in the payload
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <param name="initialAmount">Item: The Edited Initial Amount Model</param>
        /// <returns>Task<IActionResult>: Action State</returns>
        [HttpPut("{userId}")]
        public async Task<IActionResult> PutInitialAmount(Guid userId, Item initialAmount)
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            if (userId != initialAmount.UserId)
            {
                return BadRequest();
            }
            bool result = await _repoInitialAmount.PutInitialAmount(userId, initialAmount);
            return result ? (IActionResult)Accepted() : NotFound();
        }
    }
}
