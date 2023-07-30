using FPFL.API.Data.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.ItemDetail.Interface
{
	/// <summary>
	///     Period Repository Interface 
	/// </summary>
	public interface IRepoPeriod
	{
		Task<Period> GetPeriod(int id);
		Task<List<Period>> GetPeriods();
	}
}
