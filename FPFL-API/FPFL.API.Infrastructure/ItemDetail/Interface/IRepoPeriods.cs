using FPFL.API.Data.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.ItemDetail.Interface
{
    /// <summary>
    ///     Period Repository Interface 
    /// </summary>
    public interface IRepoPeriods
    {
        Task<Period> GetPeriod(int id);
        Task<List<Period>> GetPeriods();
    }
}
