namespace FPFL.API.Infrastructure.ItemDetail.Models
{
    public class ItemVM
	{
		public int? RollupKey { get; set; }
		public int? Year { get; set; }
		public int? ItemKey { get; set; }
		public string OccurrenceDate { get; set; }
		public int FkItemType { get; set; }
		public string ItemType { get; set; }
		public string Period { get; set; }
		public string Name { get; set; }
		public double? Amount { get; set; }
	}
}
