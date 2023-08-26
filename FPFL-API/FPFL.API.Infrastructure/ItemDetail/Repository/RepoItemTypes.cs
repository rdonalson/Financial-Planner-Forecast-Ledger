using FPFL.API.Data.Context;
using FPFL.API.Data.DTO;
using FPFL.API.Infrastructure.ItemDetail.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.ItemDetail.Repository
{
	public class RepoItemTypes : IRepoItemTypes
	{
		private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
		private readonly FPFLContext _context;

		/// <summary>
		///     Constructor
		/// </summary>
		/// <param name="context">FPFLContext: Setup the Data Context</param>
		public RepoItemTypes(FPFLContext context)
		{
			_context = context;
		}

		/// <summary>
		///		Return List of all ItemTypes used in all FE Features
		/// </summary>
		/// <returns>Task<List<ItemTypeDTO>>: List of ItemTypes </returns>
		public async Task<List<ItemTypeDTO>> GetItemTypes()
		{
			try
			{
				return await _context.ItemTypes
					.Select(it => new ItemTypeDTO
					{
						Id = it.Id,
						Name = it.Name
					})
					.ToListAsync();
			}
			catch (Exception ex)
			{
				_log.Error(ex.ToString());
				return null;
			}
		}
	}
}
