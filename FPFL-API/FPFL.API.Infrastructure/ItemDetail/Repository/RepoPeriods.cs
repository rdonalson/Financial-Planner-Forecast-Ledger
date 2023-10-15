using FPFL.API.Data.Context;
using FPFL.API.Data.Domain;
using FPFL.API.Data.DTO;
using FPFL.API.Infrastructure.ItemDetail.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.ItemDetail.Repository
{
	/// <summary>
	///     Period Repository
	/// </summary>
	public class RepoPeriods : IRepoPeriods
	{
		private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
		private readonly FPFLContext _context;

		/// <summary>
		///     Constructor
		/// </summary>
		/// <param name="context">FPFLContext: Setup the Data Context</param>
		public RepoPeriods(FPFLContext context)
		{
			_context = context;
		}

		/// <summary>
		///     Return List of all Periods for use in UI Period Selectors
		/// </summary>
		/// <returns>Task<List<PeriodDTO>>: List of Periods</returns>
		public async Task<List<PeriodDTO>> GetPeriods()
		{
			try
			{
				return await _context.Periods
					.Select(p => new PeriodDTO
					{
						Id = p.Id,
						Name = p.Name
					})
					.ToListAsync();
			}
			catch (Exception ex)
			{
				_log.Error(ex.ToString());
				return null;
			}
		}

		/// <summary>
		///		**Note: Deprecated once use Redux Pattern was implemented on the UI.  
		///				Once retrieved Periods are now stored in the reducer
		///     Get a specific Period
		/// </summary>
		/// <param name="id">int: Id of the record item</param>
		/// <returns>Task<Period>: The requested Period</returns>
		public async Task<Period> GetPeriod(int id)
		{
			try
			{
				return await _context.Periods.FindAsync(id);
			}
			catch (Exception ex)
			{
				_log.Error(ex.ToString());
				return null;
			}
		}
	}
}
