using System;

namespace FPFL.API.Data.Domain
{
	public partial class Ledger
	{
		public int RollupKey { get; set; }
		public int Year { get; set; }
		public DateTime WDate { get; set; }
		public double CreditSummary { get; set; }
		public double DebitSummary { get; set; }
		public double Net { get; set; }
		public double RunningTotal { get; set; }
		public DateTime? OccurrenceDate { get; set; }
		public int FkItemType { get; set; }
		public string ItemType { get; set; }
		public string PeriodName { get; set; }
		public string Name { get; set; }
		public double? Amount { get; set; }
	}
}
