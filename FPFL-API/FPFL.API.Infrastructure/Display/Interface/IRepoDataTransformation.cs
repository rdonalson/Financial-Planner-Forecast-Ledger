using FPFL.API.Data.Domain;
using FPFL.API.Infrastructure.ItemDetail.Models;
using System.Collections.Generic;

namespace FPFL.API.Infrastructure.Display.Interface
{
	public interface IRepoDataTransformation
	{
		List<LedgerVM> TransformLedgerData(List<Ledger> ledger);
	}
}