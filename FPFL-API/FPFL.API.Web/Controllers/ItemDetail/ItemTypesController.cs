using FPFL.API.Data.Context;
using FPFL.API.Data.DTO;
using FPFL.API.Infrastructure.ItemDetail.Interface;
using FPFL.API.Infrastructure.ItemDetail.Repository;
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
	public class ItemTypesController : ControllerBase
	{
		static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
		private readonly IRepoItemTypes _repoItemTypes;

		/// <summary>
		///		ItemTypes Controller Constuctor
		/// </summary>
		/// <param name="context">FPNgContext: Setup the Data Context</param>
		public ItemTypesController(FPFLContext context)
		{
			_repoItemTypes = new RepoItemTypes(context);
		}

		/// <summary>
		///     Gets all of the ItemTypes for use in all FE Features
		///     GET: api/ItemTypes
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
