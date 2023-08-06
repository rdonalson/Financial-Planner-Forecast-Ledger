using Microsoft.EntityFrameworkCore.Migrations;

namespace FPFL.API.Data.Migrations
{
	public partial class create_items_constraint : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql(@"
                ALTER TABLE [ItemDetail].[Items]  
                ADD CONSTRAINT [DF_Items_DateRangeReq]  DEFAULT ((0)) FOR [DateRangeReq]
                GO
            ");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql(@"
                ALTER TABLE [ItemDetail].[Items]   
                DROP CONSTRAINT [DF_Items_DateRangeReq] 
                GO
            ");
		}
	}
}
