using FPFL.API.Data.DTO;
using FPFL.API.Infrastructure.ItemDetail.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPFL.API.Web.Controllers.ItemDetail
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class ItemTypeController : Controller
	{
		static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
		private readonly IRepoItemTypes _repoItemTypes;

		/// <summary>
		///		ItemTypes Controller Constuctor
		/// </summary>
		/// <param name="repoItemTypes">FPNgContext: Setup the Data Context</param>
		public ItemTypeController(IRepoItemTypes repoItemTypes)
		{
			_repoItemTypes = repoItemTypes;
		}

		/// <summary>
		///     Gets all of the ItemTypes for use in all FE Features
		///     GET: api/Periods
		/// </summary>
		/// <returns>Task<ActionResult<List<ItemTypeDTO>>></returns>
		[HttpGet]
		public async Task<ActionResult<List<ItemTypeDTO>>> GetItemTypes()
		{
			HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
			return await _repoItemTypes.GetItemTypes();
		}
	}
}
