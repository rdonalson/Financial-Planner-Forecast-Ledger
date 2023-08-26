using FPFL.API.Data.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.ItemDetail.Interface
{
	/// <summary>
	///		ItemType Repository Interface 
	/// </summary>
	public interface IRepoItemTypes
	{
		Task<List<ItemTypeDTO>> GetItemTypes();
	}
}