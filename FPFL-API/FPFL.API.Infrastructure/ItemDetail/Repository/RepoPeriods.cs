using FPFL.API.Data.Context;
using FPFL.API.Data.Domain;
using FPFL.API.Infrastructure.ItemDetail.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
		/// <returns>Task<List<Period>>: List of Period for the Authorized User</returns>
		public async Task<List<Period>> GetPeriods()
		{
			try
			{
				return await _context.Periods.ToListAsync();
			}
			catch (Exception ex)
			{
				_log.Error(ex.ToString());
				return null;
			}
		}

		/// <summary>
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
