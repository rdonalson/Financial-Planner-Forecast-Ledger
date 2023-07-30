using System.Collections.Generic;

namespace FPFL.API.Data.Domain
{
	public partial class Period
	{
		public Period()
		{
			Items = new HashSet<Item>();
		}

		public int Id { get; set; }
		public string Name { get; set; }

		public virtual ICollection<Item> Items { get; set; }
	}
}
