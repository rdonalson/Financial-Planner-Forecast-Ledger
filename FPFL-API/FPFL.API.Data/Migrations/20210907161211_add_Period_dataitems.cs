using Microsoft.EntityFrameworkCore.Migrations;

namespace FPFL.API.Data.Migrations
{
    public partial class add_Period_dataitems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DELETE FROM [ItemDetail].[Periods]
                GO
                INSERT [ItemDetail].[Periods] ([Id], [Name]) VALUES (1, N'One Time Occurrence')
                GO
                INSERT [ItemDetail].[Periods] ([Id], [Name]) VALUES (2, N'Daily')
                GO
                INSERT [ItemDetail].[Periods] ([Id], [Name]) VALUES (3, N'Weekly')
                GO
                INSERT [ItemDetail].[Periods] ([Id], [Name]) VALUES (4, N'Every Two Weeks')
                GO
                INSERT [ItemDetail].[Periods] ([Id], [Name]) VALUES (5, N'Bi-Monthly')
                GO
                INSERT [ItemDetail].[Periods] ([Id], [Name]) VALUES (6, N'Monthly')
                GO
                INSERT [ItemDetail].[Periods] ([Id], [Name]) VALUES (7, N'Quarterly')
                GO
                INSERT [ItemDetail].[Periods] ([Id], [Name]) VALUES (8, N'Semi-Annually')
                GO
                INSERT [ItemDetail].[Periods] ([Id], [Name]) VALUES (9, N'Annually')
                GO
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DELETE FROM [ItemDetail].[Periods]
                GO
            ");
        }
    }
}
