using FPFL.API.Data.Context;
using FPFL.API.Data.Domain;
using FPFL.API.Data.DTO;
using FPFL.API.Infrastructure.ItemDetail.Interface;
using FPFL.API.Infrastructure.ItemDetail.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPFL.API.Web.Controllers.ItemDetail
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class PeriodsController : ControllerBase
	{
		static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
		private readonly IRepoPeriods _repoPeriod;

		/// <summary>
		///     Periods Controller Constructor
		/// </summary>
		/// <param name="context">FPNgContext: Setup the Data Context</param>
		public PeriodsController(FPFLContext context)
		{
			_repoPeriod = new RepoPeriods(context);
		}

		/// <summary>
		///     Gets all of the Periods for use in UI Selectors
		///     GET: api/Periods
		/// </summary>
		/// <returns>Task<ActionResult<List<PeriodDTO>>></returns>
		[HttpGet]
		public async Task<ActionResult<List<PeriodDTO>>> GetPeriods()
		{
			HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
			return await _repoPeriod.GetPeriods();
		}

		/// <summary>
		///     Get a specific Period
		///     GET: api/Periods/{id}
		/// </summary>
		/// <param name="id">int: Id of the record item</param>
		/// <returns>Task<ActionResult<Period>>: The requested Period</returns>
		[HttpGet("{id}")]
		public async Task<ActionResult<Period>> GetPeriod(int id)
		{
			HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
			var period = await _repoPeriod.GetPeriod(id);

			if (period == null)
			{
				return NotFound();
			}
			return period;
		}


	}
}
