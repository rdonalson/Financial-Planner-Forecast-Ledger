using System.Collections.Generic;

namespace FPFL.API.Data.Domain
{
	public partial class ItemType
	{
		public ItemType()
		{
			Items = new HashSet<Item>();
		}

		public int Id { get; set; }
		public string Name { get; set; }
		public virtual ICollection<Item> Items { get; set; }
	}
}
