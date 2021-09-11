using Microsoft.EntityFrameworkCore.Migrations;

namespace FPFL.API.Data.Migrations
{
    public partial class alter_view_vwItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER VIEW [ItemDetail].[vwItems]
                AS
                    SELECT c.[Id], 
						c.[UserId],
                        c.[Name], 
                        c.[Amount], 
						c.[FkItemType],
						it.[Name] AS [ItemType], 
                        c.[FkPeriod], 
                        p.[Name] AS [Period], 
                        c.[BeginDate], 
                        c.[EndDate], 
                        c.[WeeklyDOW], 
                        c.[EverOtherWeekDOW], 
                        c.[BiMonthlyDay1], 
                        c.[BiMonthlyDay2], 
                        c.[MonthlyDOM], 
                        c.[Quarterly1Month], 
                        c.[Quarterly1Day], 
                        c.[Quarterly2Month], 
                        c.[Quarterly2Day], 
                        c.[Quarterly3Month], 
                        c.[Quarterly3Day], 
                        c.[Quarterly4Month], 
                        c.[Quarterly4Day], 
                        c.[SemiAnnual1Month], 
                        c.[SemiAnnual1Day], 
                        c.[SemiAnnual2Month], 
                        c.[SemiAnnual2Day], 
                        c.[AnnualMOY], 
                        c.[AnnualDOM], 
                        c.[DateRangeReq]
                    FROM [ItemDetail].[Items] AS c WITH(NOLOCK)
					INNER JOIN [ItemDetail].[ItemTypes] AS it WITH(NOLOCK) ON c.[FkItemType] = it.[Id]
                    LEFT OUTER JOIN [ItemDetail].[Periods] AS p WITH(NOLOCK) ON c.[FkPeriod] = p.[Id]
                GO
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER VIEW [ItemDetail].[vwItems]
                AS
                    SELECT c.[Id], 
						c.[UserId],
                        c.[Name], 
                        c.[Amount], 
						c.[FkItemType],
						it.[Name] AS [ItemType], 
                        c.[FkPeriod], 
                        p.[Name] AS [Period], 
                        c.[BeginDate], 
                        c.[EndDate], 
                        c.[WeeklyDOW], 
                        c.[EverOtherWeekDOW], 
                        c.[BiMonthlyDay1], 
                        c.[BiMonthlyDay2], 
                        c.[MonthlyDOM], 
                        c.[Quarterly1Month], 
                        c.[Quarterly1Day], 
                        c.[Quarterly2Month], 
                        c.[Quarterly2Day], 
                        c.[Quarterly3Month], 
                        c.[Quarterly3Day], 
                        c.[Quarterly4Month], 
                        c.[Quarterly4Day], 
                        c.[SemiAnnual1Month], 
                        c.[SemiAnnual1Day], 
                        c.[SemiAnnual2Month], 
                        c.[SemiAnnual2Day], 
                        c.[AnnualMOY], 
                        c.[AnnualDOM], 
                        c.[DateRangeReq]
                    FROM [ItemDetail].[Items] AS c WITH(NOLOCK)
					INNER JOIN [ItemDetail].[ItemTypes] AS it WITH(NOLOCK) ON c.[FkItemType] = it.[Id]
                    INNER JOIN [ItemDetail].[Periods] AS p WITH(NOLOCK) ON c.[FkPeriod] = p.[Id]
                GO
            ");
        }
    }
}
