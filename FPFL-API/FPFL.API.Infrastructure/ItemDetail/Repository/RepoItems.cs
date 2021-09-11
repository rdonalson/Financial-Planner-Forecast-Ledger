using FPFL.API.Data.Context;
using FPFL.API.Data.Domain;
using FPFL.API.Infrastructure.ItemDetail.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static FPFL.API.Infrastructure.ItemDetail.Models.Enums;

namespace FPFL.API.Infrastructure.ItemDetail.Repository
{
    /// <summary>
    ///     Items Repository
    /// </summary>
    public class RepoItems : IRepoItems
    {
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly FPFLContext _context;

        /// <summary>
        ///     Constructor
        /// </summary>
        /// <param name="context">FPFLContext: Setup the Data Context</param>
        public RepoItems(FPFLContext context)
        {
            _context = context;
        }

        /// <summary>
        ///     Return List of Credits or Debits for given User using the View VwItem
        /// </summary>
        /// <param name="userId">Guid: Authorized User OID</param>
        /// <param name="itemType">int: itemType, Credit or Debit</param>
        /// <returns>Task<List<VwItem>>: Asynchronous List of Items for the Authorized User</returns>
        public async Task<List<VwItem>> GetItems(Guid userId, int itemType)
        {
            try
            {
                return await _context.VwItems.Where(
                        d => d.UserId == userId && d.FkItemType == itemType
                    ).ToListAsync();
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }

        /// <summary>
        ///     Get a specific Item, Credit or Debit using the View vwItems
        /// </summary>
        /// <param name="id">int: Id of the record item</param>
        /// <returns>Task<VwItem>: Asynchronous return of the requested Item</returns>
        public async Task<VwItem> GetItem(int id)
        {
            try
            {
                return await _context.VwItems.SingleOrDefaultAsync(c => c.Id == id);
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return null;
            }
        }

        /// <summary>
        ///     Update Existing Item
        /// </summary>
        /// <param name="id">int: Item Id</param>
        /// <param name="item">Item: The Edited Item Model</param>
        /// <returns>Task<bool>: Was Item Updated?</returns>
        public async Task<bool> PutItem(int id, Item item)
        {
            try
            {
                _context.Entry(item).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ItemExists(id))
                {
                    _log.Error("Item not found");
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
        ///     Add new Item
        /// </summary>
        /// <param name="item">Item: The input Item Model</param>
        /// <returns>Task<bool>: Was the Item created? T/F</returns>
        public async Task<bool> PostItem(Item item)
        {
            try
            {
                _context.Items.Add(item);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Delete a specific Item
        /// </summary>
        /// <param name="id">int: Id of the Item</param>
        /// <returns>Task<bool>: Was the Item Deleted?</returns>
        public async Task<bool> DeleteItem(int id)
        {
            try
            {
                var item = await _context.Items.FindAsync(id);
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                return false;
            }
        }

        /// <summary>
        ///     Verify Item exists
        /// </summary>
        /// <param name="id">int: Item Id</param>
        /// <returns>Boolean: Does the Item Exist?</returns>
        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}
