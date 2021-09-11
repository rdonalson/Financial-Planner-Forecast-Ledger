using FPFL.API.Data.Context;
using FPFL.API.Data.Domain;
using FPFL.API.Infrastructure.ItemDetail.Interface;
using FPFL.API.Infrastructure.ItemDetail.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.ItemDetail.Repository
{
    /// <summary>
    ///     Initial Amount Repository
    /// </summary>
    public class RepoInitialAmount : IRepoInitialAmount
    {
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly FPFLContext _context;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPFLContext: Setup the Data Context</param>
        public RepoInitialAmount(FPFLContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Get a specific Initial Amount by User OID
        ///     There will always only be one per User
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Task<InitialAmount>: The requested Initial Amount</returns>
        public async Task<Item> GetInitialAmount(Guid userId)
        {
            try
            {
                return await _context.Items.SingleOrDefaultAsync(
                    e => e.UserId == userId && e.FkItemType == (int)Enums.ItemTypes.InitialAmount
                );
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }

        /// <summary>
        ///     Add new Initial Amount 
        ///     Since there is only one record for each user, supply in the User OID and check to
        ///     make sure that a records doesn't already exist.
        /// </summary>
        /// <param name="initialAmount">Item: The input Initial Amount Model</param>
        /// <returns>Task<bool>: Was the Initial Amount created? T/F</returns>
        public async Task<bool> PostInitialAmount(Item initialAmount)
        {
            try
            {
                if (!InitialAmountExists(initialAmount.UserId))
                {
                    _context.Items.Add(initialAmount);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    _log.Info($"Initial Amount already exists for this user: {initialAmount.UserId}");
                    return true;
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Update Existing Initial Amount
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <param name="initialAmount">InitialAmount: The input Initial Amount Model</param>
        /// <returns>Task<bool>: Was Initial Amount Updated?</returns>
        public async Task<bool> PutInitialAmount(Guid userId, Item initialAmount)
        {
            try
            {
                _context.Entry(initialAmount).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!InitialAmountExists(userId))
                {
                    _log.Error("Initial Amount not found");
                    return false;
                }
                _log.Error(ex.ToString());
                return false;
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Verify whether the Initial Amount for this UserId exists
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <returns>Boolean: Does the InitialAmount Exist?</returns>
        private bool InitialAmountExists(Guid userId)
        {
            return _context.Items.Any(
                e => e.UserId == userId && e.FkItemType == (int)Enums.ItemTypes.InitialAmount
            );
        }

    }
}
