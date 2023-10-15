using FPFL.API.Data.Domain;
using FPFL.API.Data.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.ItemDetail.Interface
{
	/// <summary>
	///     Period Repository Interface 
	/// </summary>
	public interface IRepoPeriods
	{
		Task<Period> GetPeriod(int id);
		Task<List<PeriodDTO>> GetPeriods();
	}
}
