using FPFL.API.Data.Context;
using FPFL.API.Data.Domain;
using FPFL.API.Infrastructure.Display.Interface;
using FPFL.API.Infrastructure.ItemDetail.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.Display.Repository
{
    /// <summary>
    ///     Display Repository
    /// </summary>
    public class RepoDisplay : IRepoDisplay
    {
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly FPFLContext _context;
        private readonly IDataTransformation _dataTransformation;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPFLContext: Setup the Data Context</param>
        public RepoDisplay(FPFLContext context)
        {
            _context = context;
            _dataTransformation = new DataTransformation();
        }

        /// <summary>
        ///     Calls the "spCreateLedgerReadout" stored procedure which returns a flatfile of data item
        ///     that then supplied to the DataTransformation class that will transform the data into
        ///     a form that can be used by the UI Ledger and Chart
        /// </summary>
        /// <param name="timeFrameBegin">DateTime</param>
        /// <param name="timeFrameEnd">DateTime</param>
        /// <param name="userId">Guid</param>
        /// <param name="groupingTranform">bool</param>
        /// <returns>async Task<List<LedgerVM>></returns>
        public async Task<List<LedgerVM>> CreateLedger(DateTime timeFrameBegin, DateTime timeFrameEnd, Guid userId, bool groupingTranform)
        {
            try
            {
                List<Ledger> ledger = await _context.Ledgers.FromSqlInterpolated($"EXEC [ItemDetail].[spCreateLedgerReadout] {timeFrameBegin}, {timeFrameEnd}, {userId}, {groupingTranform}").ToListAsync();
                return _dataTransformation.TransformLedgerData(ledger);
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }

    }
}
