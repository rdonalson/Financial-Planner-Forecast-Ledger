﻿using FPFL.API.Data.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FPFL.API.Infrastructure.ItemDetail.Interface
{
    /// <summary>
    ///     Items Repository Interface 
    /// </summary>
    public interface IRepoItems
    {
        Task<List<VwItem>> GetItems(Guid userId, int itemType);
        Task<VwItem> GetItem(int id);
        Task<bool> PutItem(int id, Item item);
        Task<bool> PostItem(Item item);
        Task<bool> DeleteItem(int id);
    }
}
