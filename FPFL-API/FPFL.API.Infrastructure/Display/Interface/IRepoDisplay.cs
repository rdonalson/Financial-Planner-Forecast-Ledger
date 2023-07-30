using FPFL.API.Infrastructure.ItemDetail.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.Display.Interface
{
	public interface IRepoDisplay
	{
		Task<List<LedgerVM>> CreateLedger(DateTime timeFrameBegin, DateTime timeFrameEnd, Guid userId, bool groupingTranform);
	}
}