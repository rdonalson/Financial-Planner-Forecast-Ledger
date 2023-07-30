using FPFL.API.Data.Domain;
using System;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.ItemDetail.Interface
{
	public interface IRepoInitialAmount
	{
		Task<Item> GetInitialAmount(Guid userId);
		Task<bool> PostInitialAmount(Item initialAmount);
		Task<bool> PutInitialAmount(Guid userId, Item initialAmount);
	}
}