using FPFL.API.Data.Context;
using FPFL.API.Infrastructure.Display.Interface;
using FPFL.API.Infrastructure.Display.Repository;
using FPFL.API.Infrastructure.ItemDetail.Models;
using FPFL.API.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPFL.API.Web.Controllers.Display
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DisplayController : ControllerBase
    {
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
        private readonly IRepoDisplay _repoDisplay;

        /// <summary>
        ///     Display Controller Constructorz
        /// </summary>
        /// <param name="context">FPNgContext: Setup the Data Context</param>
        public DisplayController(FPFLContext context)
        {
            _repoDisplay = new RepoDisplay(context);
        }

        /// <summary>
        ///     Calls the "Create Ledger Readout" procedure that generates the Ledger Output;
        ///     which contains a forecasted Cronological list of credit/debit transactions with a running total 
        ///     out to a future point in time.
        ///     The timeframe is set by the user
        ///     Setting GroupingTransform to true will summarize the data for Date Ranges beyond 3 months
        /// -------------------------------------------------------------
        /// EXEC @return_value = [ItemDetail].[spCreateLedgerReadout]
        ///     @TimeFrameBegin = '2021-01-01',
        ///     @TimeFrameEnd = '2021-12-31',
        ///     @UserId = '8fdbe29e-f25f-450d-b179-92973e2bf7ba',
        ///     @GroupingTranform = false
        /// </summary>
        /// <param name="input">LedgerParams: Parameters for input into procedure</param>
        /// <returns>Task<ActionResult<List<LedgerVM>>>: A ledger of financial tansactions for the Authorized User</returns>
        [HttpPost]
        public async Task<ActionResult<List<LedgerVM>>> CreateLedger(LedgerParams input)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            return await _repoDisplay.CreateLedger(input.TimeFrameBegin, input.TimeFrameEnd, input.UserId, input.GroupingTransform);
        }
    }

}
