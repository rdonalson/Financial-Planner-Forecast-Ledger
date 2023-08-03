using FPFL.API.Data.Domain;
using FPFL.API.Data.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.ItemDetail.Interface
{
	/// <summary>
	///     Items Repository Interface 
	/// </summary>
	public interface IRepoItems
	{
		Task<List<ItemDTO>> GetItems(Guid userId, int itemType);
		Task<bool> PutItem(int id, Item item);
		Task<int?> PostItem(Item item);
		Task<bool> DeleteItem(int id);
	}
}

/* Archive
 
 Task<List<VwItem>> GetItems(Guid userId, int itemType);
 Task<VwItem> GetItem(int id);
 
 */