using Microsoft.EntityFrameworkCore.Migrations;

namespace FPFL.API.Data.Migrations
{
	public partial class add_ItemType_dataitems : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql(@"
                DELETE FROM [ItemDetail].[ItemTypes]
                GO
                INSERT [ItemDetail].[ItemTypes] ([Id], [Name]) VALUES (1, N'Credit')
                GO
                INSERT [ItemDetail].[ItemTypes] ([Id], [Name]) VALUES (2, N'Debit')
                GO
                INSERT [ItemDetail].[ItemTypes] ([Id], [Name]) VALUES (3, N'InitialAmount')
                GO
            ");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql(@"
                DELETE FROM [ItemDetail].[ItemTypes]
                GO
            ");
		}
	}
}
