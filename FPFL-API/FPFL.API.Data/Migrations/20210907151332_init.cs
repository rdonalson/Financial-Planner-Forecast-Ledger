using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace FPFL.API.Data.Migrations
{
	public partial class init : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.EnsureSchema(
				name: "ItemDetail");

			migrationBuilder.CreateTable(
				name: "ItemTypes",
				schema: "ItemDetail",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false),
					Name = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_ItemTypes", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "Periods",
				schema: "ItemDetail",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false),
					Name = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Periods", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "Items",
				schema: "ItemDetail",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
					Name = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: true),
					Amount = table.Column<decimal>(type: "money", nullable: true),
					FkItemType = table.Column<int>(type: "int", nullable: true),
					FkPeriod = table.Column<int>(type: "int", nullable: true),
					BeginDate = table.Column<DateTime>(type: "date", nullable: true),
					EndDate = table.Column<DateTime>(type: "date", nullable: true),
					WeeklyDow = table.Column<int>(type: "int", nullable: true),
					EverOtherWeekDow = table.Column<int>(type: "int", nullable: true),
					BiMonthlyDay1 = table.Column<int>(type: "int", nullable: true),
					BiMonthlyDay2 = table.Column<int>(type: "int", nullable: true),
					MonthlyDom = table.Column<int>(type: "int", nullable: true),
					Quarterly1Month = table.Column<int>(type: "int", nullable: true),
					Quarterly1Day = table.Column<int>(type: "int", nullable: true),
					Quarterly2Month = table.Column<int>(type: "int", nullable: true),
					Quarterly2Day = table.Column<int>(type: "int", nullable: true),
					Quarterly3Month = table.Column<int>(type: "int", nullable: true),
					Quarterly3Day = table.Column<int>(type: "int", nullable: true),
					Quarterly4Month = table.Column<int>(type: "int", nullable: true),
					Quarterly4Day = table.Column<int>(type: "int", nullable: true),
					SemiAnnual1Month = table.Column<int>(type: "int", nullable: true),
					SemiAnnual1Day = table.Column<int>(type: "int", nullable: true),
					SemiAnnual2Month = table.Column<int>(type: "int", nullable: true),
					SemiAnnual2Day = table.Column<int>(type: "int", nullable: true),
					AnnualMoy = table.Column<int>(type: "int", nullable: true),
					AnnualDom = table.Column<int>(type: "int", nullable: true),
					DateRangeReq = table.Column<bool>(type: "bit", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Items", x => x.Id);
					table.ForeignKey(
						name: "FK_Items_ItemType",
						column: x => x.FkItemType,
						principalSchema: "ItemDetail",
						principalTable: "ItemTypes",
						principalColumn: "Id",
						onDelete: ReferentialAction.Restrict);
					table.ForeignKey(
						name: "FK_Items_Periods",
						column: x => x.FkPeriod,
						principalSchema: "ItemDetail",
						principalTable: "Periods",
						principalColumn: "Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Items_FkItemType",
				schema: "ItemDetail",
				table: "Items",
				column: "FkItemType");

			migrationBuilder.CreateIndex(
				name: "IX_Items_FkPeriod",
				schema: "ItemDetail",
				table: "Items",
				column: "FkPeriod");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Items",
				schema: "ItemDetail");

			migrationBuilder.DropTable(
				name: "ItemTypes",
				schema: "ItemDetail");

			migrationBuilder.DropTable(
				name: "Periods",
				schema: "ItemDetail");
		}
	}
}
