USE [FPFL]
GO
EXEC sys.sp_dropextendedproperty @name=N'MS_DiagramPaneCount' , @level0type=N'SCHEMA',@level0name=N'ItemDetail', @level1type=N'VIEW',@level1name=N'vwItems'
GO
EXEC sys.sp_dropextendedproperty @name=N'MS_DiagramPane1' , @level0type=N'SCHEMA',@level0name=N'ItemDetail', @level1type=N'VIEW',@level1name=N'vwItems'
GO
/****** Object:  StoredProcedure [ItemDetail].[spCreateLedgerReadout]    Script Date: 9/24/2021 8:01:39 AM ******/
DROP PROCEDURE [ItemDetail].[spCreateLedgerReadout]
GO
ALTER TABLE [ItemDetail].[Items] DROP CONSTRAINT [FK_Items_Periods]
GO
ALTER TABLE [ItemDetail].[Items] DROP CONSTRAINT [FK_Items_ItemType]
GO
ALTER TABLE [ItemDetail].[Items] DROP CONSTRAINT [DF_Items_DateRangeReq]
GO
/****** Object:  Index [IX_Items_FkPeriod]    Script Date: 9/24/2021 8:01:39 AM ******/
DROP INDEX [IX_Items_FkPeriod] ON [ItemDetail].[Items]
GO
/****** Object:  Index [IX_Items_FkItemType]    Script Date: 9/24/2021 8:01:39 AM ******/
DROP INDEX [IX_Items_FkItemType] ON [ItemDetail].[Items]
GO

/****** Object:  View [ItemDetail].[vwItems]    Script Date: 9/24/2021 8:01:39 AM ******/
DROP VIEW [ItemDetail].[vwItems]
GO
/****** Object:  Table [ItemDetail].[Items]    Script Date: 9/24/2021 8:01:39 AM ******/
DROP TABLE [ItemDetail].[Items]
GO
/****** Object:  Table [ItemDetail].[Periods]    Script Date: 9/24/2021 8:01:39 AM ******/
DROP TABLE [ItemDetail].[Periods]
GO
/****** Object:  Table [ItemDetail].[ItemTypes]    Script Date: 9/24/2021 8:01:39 AM ******/
DROP TABLE [ItemDetail].[ItemTypes]
GO
/****** Object:  Schema [ItemDetail]    Script Date: 9/24/2021 8:01:39 AM ******/
DROP SCHEMA [ItemDetail]
GO
USE [master]
GO
/****** Object:  Database [FPFL]    Script Date: 9/24/2021 8:01:39 AM ******/
DROP DATABASE [FPFL]
GO
/****** Object:  Database [FPFL]    Script Date: 9/24/2021 8:01:39 AM ******/
CREATE DATABASE [FPFL]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FPFL', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.APPLICATION\MSSQL\DATA\FPFL.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FPFL_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.APPLICATION\MSSQL\DATA\FPFL_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [FPFL] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FPFL].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FPFL] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FPFL] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FPFL] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FPFL] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FPFL] SET ARITHABORT OFF 
GO
ALTER DATABASE [FPFL] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FPFL] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FPFL] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FPFL] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FPFL] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FPFL] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FPFL] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FPFL] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FPFL] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FPFL] SET  ENABLE_BROKER 
GO
ALTER DATABASE [FPFL] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FPFL] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FPFL] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FPFL] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FPFL] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FPFL] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [FPFL] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FPFL] SET RECOVERY FULL 
GO
ALTER DATABASE [FPFL] SET  MULTI_USER 
GO
ALTER DATABASE [FPFL] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FPFL] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FPFL] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FPFL] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FPFL] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'FPFL', N'ON'
GO
ALTER DATABASE [FPFL] SET QUERY_STORE = OFF
GO
USE [FPFL]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [FPFL]
GO
/****** Object:  Schema [ItemDetail]    Script Date: 9/24/2021 8:01:39 AM ******/
CREATE SCHEMA [ItemDetail]
GO
/****** Object:  Table [ItemDetail].[ItemTypes]    Script Date: 9/24/2021 8:01:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ItemDetail].[ItemTypes](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](25) NOT NULL,
 CONSTRAINT [PK_ItemTypes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [ItemDetail].[Periods]    Script Date: 9/24/2021 8:01:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ItemDetail].[Periods](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](75) NOT NULL,
 CONSTRAINT [PK_Periods] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [ItemDetail].[Items]    Script Date: 9/24/2021 8:01:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ItemDetail].[Items](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](75) NULL,
	[Amount] [money] NULL,
	[FkItemType] [int] NULL,
	[FkPeriod] [int] NULL,
	[BeginDate] [date] NULL,
	[EndDate] [date] NULL,
	[WeeklyDow] [int] NULL,
	[EverOtherWeekDow] [int] NULL,
	[BiMonthlyDay1] [int] NULL,
	[BiMonthlyDay2] [int] NULL,
	[MonthlyDom] [int] NULL,
	[Quarterly1Month] [int] NULL,
	[Quarterly1Day] [int] NULL,
	[Quarterly2Month] [int] NULL,
	[Quarterly2Day] [int] NULL,
	[Quarterly3Month] [int] NULL,
	[Quarterly3Day] [int] NULL,
	[Quarterly4Month] [int] NULL,
	[Quarterly4Day] [int] NULL,
	[SemiAnnual1Month] [int] NULL,
	[SemiAnnual1Day] [int] NULL,
	[SemiAnnual2Month] [int] NULL,
	[SemiAnnual2Day] [int] NULL,
	[AnnualMoy] [int] NULL,
	[AnnualDom] [int] NULL,
	[DateRangeReq] [bit] NOT NULL,
 CONSTRAINT [PK_Items] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [ItemDetail].[vwItems]    Script Date: 9/24/2021 8:01:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

                CREATE VIEW [ItemDetail].[vwItems]
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

INSERT [ItemDetail].[ItemTypes] ([Id], [Name]) VALUES (1, N'Credit')
GO
INSERT [ItemDetail].[ItemTypes] ([Id], [Name]) VALUES (2, N'Debit')
GO
INSERT [ItemDetail].[ItemTypes] ([Id], [Name]) VALUES (3, N'InitialAmount')
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
/****** Object:  Index [IX_Items_FkItemType]    Script Date: 9/24/2021 8:01:39 AM ******/
CREATE NONCLUSTERED INDEX [IX_Items_FkItemType] ON [ItemDetail].[Items]
(
	[FkItemType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Items_FkPeriod]    Script Date: 9/24/2021 8:01:39 AM ******/
CREATE NONCLUSTERED INDEX [IX_Items_FkPeriod] ON [ItemDetail].[Items]
(
	[FkPeriod] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [ItemDetail].[Items] ADD  CONSTRAINT [DF_Items_DateRangeReq]  DEFAULT ((0)) FOR [DateRangeReq]
GO
ALTER TABLE [ItemDetail].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_ItemType] FOREIGN KEY([FkItemType])
REFERENCES [ItemDetail].[ItemTypes] ([Id])
ON UPDATE CASCADE
GO
ALTER TABLE [ItemDetail].[Items] CHECK CONSTRAINT [FK_Items_ItemType]
GO
ALTER TABLE [ItemDetail].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Periods] FOREIGN KEY([FkPeriod])
REFERENCES [ItemDetail].[Periods] ([Id])
ON UPDATE CASCADE
GO
ALTER TABLE [ItemDetail].[Items] CHECK CONSTRAINT [FK_Items_Periods]
GO
/****** Object:  StoredProcedure [ItemDetail].[spCreateLedgerReadout]    Script Date: 9/24/2021 8:01:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*===========================================================================================
-- Author:			Rick Donalson
-- Create date:		12/30/2015
-- Version 1:		02/07/2016 Added Grouping Transforms
-- Version 2:		03/21/2021 Added UserId Guid to tables, views & this Procedure
-- Version 3:		08/21/2021 Added Script to create Default Zero Initial Amount for logged
						in user if one is not already present in [ItemDetail].[InitialAmount] 
-- Version 4:		09/06/2021 Consolidated Credits, Debits and InitialAmount into a single
						table, 'Items'.  All three data types were similar in field names
						The different types were defined by a new Table, 'ItemTypes';
							1	Credit
							2	Debit
							3	InitialAmount 
						A new foreign key was created in the Items table, 'FkItemType'.
						Rewrote Description 
-------------------------------------------------------------------------------------------
-- Description: This procedure compiles all the user's debits and credits
--	into flat table with daily summaries and a running total.  
--	This flat table is in a chronological ledger arrangement with the sequential 
--	occurrances of every debit and credit within the user's selected timeframe.
--	All items will have these properties; occurrance date, daily summary, running total, 
--	individual amount and period type. 
--	The occurrance date, daily summary and running total will be repeated 
--	for every item that occurred on the given date.  
--	The individual amount and period type will distinct to that item.
--	The procedure's output is supplied to a PrimeNg Line Chart and RowExpand Table
--	This is the pathway used; procedure 'spCreateLedgerReadout' 
--					->	Imported into an Entity Framework DbContext object 'FPFLContext'
--							in 'FPFL.API.Data'
--					->	Managed in a Domain-Repository pattern located in 'FPFL.API.Infrastructure'
--					->	to a WebMethod and then to an jQuery ajax call.
--	Sequences in this procedure:
--		1.	Get the user's debits and credits and put them in the single table, '@ItemDetail'.
--				The table has a field 'ItemType', intended to aid in their deliniation; 
--				'1' for Credits and '2' for Debits.
--		2.	Generate a chronological list of all dates within the User's selected timeframe 
--				and store them in the '@LedgerMain' table.
--		3.	Iterate through the items in the '@ItemDetail' with the Cursor 'curItemDetail'.  
--				a.	Within the cursor's body there is 9 different sections for the 9 different 
--						periods:
--								Period	Description
--								------	--------------
--								1				One Time Occurrence
--								2				Daily
--								3				Weekly
--								4				Every Two Weeks
--								5				Bi-Monthly
--								6				Monthly
--								7				Quarterly
--								8				Semi-Annually
--								9				Annually
--						Each is designed to generate the necessary occurrance dates for the 
--						specific period type.
--				b.	Once the occurrence dates are generated in a specific section, transfer the 
--						item data to the '@LedgerDetail' table along with the primary key 'PkLMain' 
--						from the '@LedgerMain' table, which placed in the field 'FkLMain'.
--		4.	Summarized the Item Amounts in the '@LedgerDetail' table for a given occurrance   
--				date and update the 'Net' field in the '@LedgerMain' table for that date.
--		5.	Get the Initial Account Balance from the User's InitialAmount in the Items table.
--		6.	Iterate through all the occurrance dates and updating the 'RunningTotal' 
--				by adding the 'Net' from the current date to the 'RunningTotal' from the 
--				sequentially earlier date and updating the 'RunningTotal' in the current.
--		7.	Adjust the Groupings to match the Time Frame input by the user,
--				Use the parameter 'GroupingTranform' to turn it on or off
--				a.	If '@GroupingTranform' is 1 (True) or 'on' then calculate the type of rollup for 
--						the output based on the input time frame range in months.  
--						This is for the Timeline Chart and is designed to keep the data density down
--						so the chart tooltip popup display retains its useability.
--
--						Days			Automatic Grouping Transforms
--						---------------	-----------------------------
--										<= 60		Daily
--						> 60		-	<= 360		Weekly
--						> 360		-	<= 1090		Monthly
--						> 1090		-	<= 2850		Quarterly
--						> 2850						Yearly
--
--				b.	If '@GroupingTranform' is 0 (False) then calculate the Daily rollup
--						irregardless of the time frame. 
--						This is primarily for the Ledger Display.
--						Here you want all the Daily detail for user review and audit.
--===========================================================================================*/
CREATE PROCEDURE [ItemDetail].[spCreateLedgerReadout] (
	@TimeFrameBegin DATE, 
	@TimeFrameEnd DATE,
	@UserId uniqueidentifier,
	@GroupingTranform BIT
) AS
BEGIN
	SET NOCOUNT ON;
	/* Diagnostic - Convert procedure into script and uncomment */
	--DECLARE @TimeFrameBegin DATE, @TimeFrameEnd DATE, @UserId uniqueidentifier, @GroupingTranform BIT;
	--SET @TimeFrameBegin = '2021-08-01';
	--SET @TimeFrameEnd = '2024-08-01';
	--SET @UserId = '8fdbe29e-f25f-450d-b179-92973e2bf7ba'; --'8fdbe29e-f25f-450d-b179-92973e2bf7ba' 
	--SET @GroupingTranform	= 1;
	--SET @GroupingTranform	= 0;

	/* Local Declarations */
	DECLARE @ItemDetail TABLE (
		Id INT NOT NULL PRIMARY KEY CLUSTERED,
		[Name] NVARCHAR(75) NULL,
		Amount FLOAT NULL,
		FkItemType INT NOT NULL,
		ItemType NVARCHAR(25) NULL,
		FkPeriod INT NOT NULL,
		PeriodName NVARCHAR(75) NULL,
		BeginDate DATE NULL,
		EndDate DATE NULL,
		WeeklyDOW INT NULL,
		EverOtherWeekDOW INT NULL,
		BiMonthlyDay1 INT NULL,
		BiMonthlyDay2 INT NULL,
		MonthlyDOM INT NULL,
		Quarterly1Month INT NULL,
		Quarterly1Day INT NULL,
		Quarterly2Month INT NULL,
		Quarterly2Day INT NULL,
		Quarterly3Month INT NULL,
		Quarterly3Day INT NULL,
		Quarterly4Month INT NULL,
		Quarterly4Day INT NULL,
		SemiAnnual1Month INT NULL,
		SemiAnnual1Day INT NULL,
		SemiAnnual2Month INT NULL,
		SemiAnnual2Day INT NULL,
		AnnualMOY INT NULL,
		AnnualDOM INT NULL,
		DateRangeReq BIT NOT NULL
	);

	/*==========================================================================
	--	Get the list of Credits & Debits
	==========================================================================*/
	/* Get a list of the Credits that are Every other Week */
	INSERT INTO @ItemDetail (
			Id,
			[Name],
			Amount,
			FkItemType,
			ItemType,
			FkPeriod,
			PeriodName,
			BeginDate,
			EndDate,
			WeeklyDOW,
			EverOtherWeekDOW,
			BiMonthlyDay1,
			BiMonthlyDay2,
			MonthlyDOM,
			Quarterly1Month,
			Quarterly1Day,
			Quarterly2Month,
			Quarterly2Day,
			Quarterly3Month,
			Quarterly3Day,
			Quarterly4Month,
			Quarterly4Day,
			SemiAnnual1Month,
			SemiAnnual1Day,
			SemiAnnual2Month,
			SemiAnnual2Day,
			AnnualMOY,
			AnnualDOM,
			DateRangeReq
	)
	SELECT 
			[Id], 
            [Name], 
			/*----------------------------------------------------------------
			--	Debit Amounts are positive when entered in the UI, so 
			--	make them negative here for calculation and display purposes
			----------------------------------------------------------------*/
			CASE [FkItemType] 
				WHEN 2 THEN ([Amount] * -1)
				ELSE [Amount]
			END AS [Amount],	
			[FkItemType],
			[ItemType], 
            [FkPeriod], 
            [Period], 
            [BeginDate], 
            [EndDate], 
            [WeeklyDOW], 
            [EverOtherWeekDOW], 
            [BiMonthlyDay1], 
            [BiMonthlyDay2], 
            [MonthlyDOM], 
            [Quarterly1Month], 
            [Quarterly1Day], 
            [Quarterly2Month], 
            [Quarterly2Day], 
            [Quarterly3Month], 
            [Quarterly3Day], 
            [Quarterly4Month], 
            [Quarterly4Day], 
            [SemiAnnual1Month], 
            [SemiAnnual1Day], 
            [SemiAnnual2Month], 
            [SemiAnnual2Day], 
            [AnnualMOY], 
            [AnnualDOM], 
            [DateRangeReq]
	FROM [ItemDetail].[vwItems] WITH(NOLOCK)
	WHERE [FkItemType] IN(1,2)
	AND [UserId] = @UserId;

	/* Diagnostic */
	--SELECT * FROM @ItemDetail;

	--/* Local Declarations */
	DECLARE @workingDate DATE;
	DECLARE @LedgerMain TABLE (
		PkLMain INT IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
		WDate DATE NULL,
		[Week] INT NULL,
		[Month] INT NULL,
		[Quarter] INT NULL,
		[Year] INT NULL,
		CreditSummary FLOAT NULL DEFAULT(0),
		DebitSummary FLOAT NULL DEFAULT(0),
		Net FLOAT NULL DEFAULT(0),
		RunningTotal FLOAT NULL DEFAULT(0)
	);
	DECLARE @LedgerDetail TABLE (
		PkLDetail INT IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
		FkLMain INT NULL,
		FkWeek INT NULL,
		FkMonth INT NULL,
		FkQuarter INT NULL,
		FkYear INT NULL,
		OccurrenceDate DATE NULL,
		FkItemType INT NULL,
		ItemType NVARCHAR(25) NULL,
		PeriodName NVARCHAR(75) NULL,
		[Name] NVARCHAR(75) NULL,
		Amount FLOAT NULL
	);
	DECLARE @ItemDates TABLE (
		FkItemType INT NOT NULL,
		ItemType NVARCHAR(25) NULL,
		FkItemDetail INT NOT NULL,
		OccurrenceDate DATE NOT NULL,
		[Name] NVARCHAR(75) NULL,
		Amount FLOAT NULL,
		PRIMARY KEY CLUSTERED (FkItemType, FkItemDetail, OccurrenceDate)
	);

	/* Initialization of Working date for parent table, '@LedgerMain', with list of Dates within time frame */
	SET @workingDate = @TimeFrameBegin;

	/*-------------------------------------------------------------
	--	Initialize the working table with dates within the timeframe
	-------------------------------------------------------------*/
	WHILE (@workingDate < @TimeFrameEnd)
	BEGIN
		SET @workingDate = DATEADD(DAY,1,@workingDate);
		INSERT INTO @LedgerMain (
			WDate	
			,[Week]
			,[Month]
			,[Quarter]
			,[Year]
		) 
		VALUES (
			@workingDate
			,DATEPART(WK, @workingDate)
			,DATEPART(MM, @workingDate)
			,DATEPART(QQ, @workingDate)
			,DATEPART(YY, @workingDate)
		);
	END;

	/* Diagnostic */
	--SELECT * FROM @LedgerMain;

	--/*==========================================================================
	----	Begin cycling through the Credits & Debits
	----	Calculate their occurrence dates, match them with the sequential dates
	----	in the @LedgerMain table, then get the row id for that date and insert
	----	into the @LedgerDetail foreign key.
	--==========================================================================*/
	--/* Declarations & Initializations */
	DECLARE @Month VARCHAR(2), @Day VARCHAR(2);
	DECLARE 	
		@FkItemDetail INT,
		@Name NVARCHAR(75),
		@Amount FLOAT,
		@FkItemType INT,
		@ItemType NVARCHAR(25),
		@FkPeriod INT,
		@PeriodName NVARCHAR(75),
		@BeginDate DATE,
		@EndDate DATE,
		@WeeklyDOW INT,
		@EverOtherWeekDOW INT,
		@BiMonthlyDay1 INT,
		@BiMonthlyDay2 INT,
		@MonthlyDOM INT,
		@Quarterly1Month INT,
		@Quarterly1Day INT,
		@Quarterly2Month INT,
		@Quarterly2Day INT,
		@Quarterly3Month INT,
		@Quarterly3Day INT,
		@Quarterly4Month INT,
		@Quarterly4Day INT,
		@SemiAnnual1Month INT,
		@SemiAnnual1Day INT,
		@SemiAnnual2Month INT,
		@SemiAnnual2Day INT,
		@AnnualMOY INT,
		@AnnualDOM INT,
		@DateRangeReq BIT;

	DECLARE curItemDetail CURSOR FAST_FORWARD READ_ONLY LOCAL FOR
	SELECT 
		ID
		,[Name]
		,Amount
		,FkItemType
		,ItemType
		,FkPeriod
		,PeriodName
		,BeginDate
		,EndDate
		,WeeklyDOW
		,EverOtherWeekDOW
		,BiMonthlyDay1
		,BiMonthlyDay2
		,MonthlyDOM
		,Quarterly1Month
		,Quarterly1Day
		,Quarterly2Month
		,Quarterly2Day
		,Quarterly3Month
		,Quarterly3Day
		,Quarterly4Month
		,Quarterly4Day
		,SemiAnnual1Month
		,SemiAnnual1Day
		,SemiAnnual2Month
		,SemiAnnual2Day
		,AnnualMOY
		,AnnualDOM
		,DateRangeReq
	FROM @ItemDetail; 

	/* Open cursor and get first record */
	OPEN curItemDetail;
	FETCH NEXT FROM curItemDetail
	INTO 	
		@FkItemDetail
		,@Name
		,@Amount
		,@FkItemType
		,@ItemType
		,@FkPeriod
		,@PeriodName
		,@BeginDate
		,@EndDate
		,@WeeklyDOW
		,@EverOtherWeekDOW
		,@BiMonthlyDay1
		,@BiMonthlyDay2
		,@MonthlyDOM
		,@Quarterly1Month
		,@Quarterly1Day
		,@Quarterly2Month
		,@Quarterly2Day
		,@Quarterly3Month
		,@Quarterly3Day
		,@Quarterly4Month
		,@Quarterly4Day
		,@SemiAnnual1Month
		,@SemiAnnual1Day
		,@SemiAnnual2Month
		,@SemiAnnual2Day
		,@AnnualMOY
		,@AnnualDOM
		,@DateRangeReq;

	/* Diagnostic */
	--PRINT '@TimeFrameBegin: ' + CONVERT(VARCHAR, @TimeFrameBegin) + CHAR(13)
	--		+ '@TimeFrameEnd: ' + CONVERT(VARCHAR, @TimeFrameEnd);

	/* Begin looping */
	WHILE (@@FETCH_STATUS = 0) BEGIN
		/*-------------------------------------------------------------
		-- If there is no timeframe on item, then set @EndDate 
		-- to @TimeFrameEnd date 
		-------------------------------------------------------------*/
		IF (@DateRangeReq = 0)
			SET @EndDate = @TimeFrameEnd;
		IF (@BeginDate IS NULL)
			SET @workingDate = @TimeFrameBegin;
		ELSE
			SET @workingDate = @BeginDate;

		/* Diagnostic */
		--PRINT '@DateRangeReq: ' + CONVERT(VARCHAR, @DateRangeReq) + CHAR(9) 
		--		+ '@BeginDate: ' + ISNULL(CONVERT(VARCHAR, @BeginDate), '          ') + CHAR(9) 
		--		+ '@EndDate: ' + ISNULL(CONVERT(VARCHAR, @EndDate), '          ') + CHAR(9) 
		--		+ '@workingDate: ' + ISNULL(CONVERT(VARCHAR, @workingDate), '          ') + CHAR(9) 
		--		+ '@FkPeriod: ' + ISNULL(CONVERT(VARCHAR, @FkPeriod), ' '); 

		/*==========================================================================
		-- Begin:	Period (1) - One Time Occurrence
		==========================================================================*/
		IF (@FkPeriod = 1) BEGIN
			/*-------------------------------------------------------------
			--	Get the occurrence dates for this item
			-------------------------------------------------------------*/
			INSERT INTO @ItemDates ( 
				FkItemType,
				ItemType,
				FkItemDetail, 
				OccurrenceDate, 
				[Name],
				Amount ) 
			VALUES (
				@FkItemType,
				@ItemType,
				@FkItemDetail, 
				@workingDate, 
				@Name,
				@Amount); 
					
			/* Diagnostic */
			--SELECT * FROM @ItemDates;

			INSERT INTO @LedgerDetail (
				FkLMain
				,FkWeek
				,FkMonth
				,FkQuarter
				,FkYear
				,OccurrenceDate
				,FkItemType
				,ItemType
				,PeriodName
				,[Name]
				,Amount 
			)
			SELECT 
				lm.PkLMain
				,lm.[Week]
				,lm.[Month]
				,lm.[Quarter]
				,lm.[Year]
				,id.OccurrenceDate
				,id.FkItemType
				,id.ItemType
				,@PeriodName
				,id.[Name]
				,id.Amount
			FROM @LedgerMain AS lm
			INNER JOIN @ItemDates AS id
			ON lm.WDate = id.OccurrenceDate; 
		END;
		/*==========================================================================
		-- End:		Period (1) - One Time Occurrence
		==========================================================================*/

		/*==========================================================================
		-- Begin:	Period (2) - Daily
		==========================================================================*/
		IF (@FkPeriod = 2) BEGIN
			/*-------------------------------------------------------------
			--	Set the working date
			-------------------------------------------------------------*/
			SET @workingDate = DATEADD(DAY,1,@workingDate);

			/*-------------------------------------------------------------
			--	Get the occurrence dates for this item
			-------------------------------------------------------------*/
			WHILE (@workingDate < @EndDate)
			BEGIN
				INSERT INTO @ItemDates ( 
					FkItemType,
					ItemType,
					FkItemDetail, 
					OccurrenceDate, 
					[Name],
					Amount ) 
				VALUES (
					@FkItemType,
					@ItemType,
					@FkItemDetail, 
					@workingDate, 
					@Name,
					@Amount); 

				/* Diagnostic */
				--PRINT @workingDate;

				/* Advance One Day */
				SET @workingDate = DATEADD(DAY,1,@workingDate); 
			END;
		
			/* Diagnostic */
			--SELECT * FROM @ItemDates;
			INSERT INTO @LedgerDetail (
				FkLMain
				,FkWeek
				,FkMonth
				,FkQuarter
				,FkYear
				,OccurrenceDate
				,FkItemType
				,ItemType
				,PeriodName
				,[Name]
				,Amount 
			)
			SELECT 
				lm.PkLMain
				,lm.[Week]
				,lm.[Month]
				,lm.[Quarter]
				,lm.[Year]
				,id.OccurrenceDate
				,id.FkItemType
				,id.ItemType
				,@PeriodName
				,id.[Name]
				,id.Amount
			FROM @LedgerMain AS lm
			INNER JOIN @ItemDates AS id
			ON lm.WDate = id.OccurrenceDate; 
		END;
		/*==========================================================================
		-- End:		Period (2) - Daily
		==========================================================================*/

		/*==========================================================================
		-- Begin: Period (3) - Weekly
		==========================================================================*/
		IF (@FkPeriod = 3) BEGIN
			/*-------------------------------------------------------------
			--	Find the Day of the Week for this item's first occurrence
			--	and set the working date with that value.
			-------------------------------------------------------------*/
			WHILE (@workingDate < @EndDate)
			BEGIN
				SET @workingDate = DATEADD(DAY,1,@workingDate);
				IF(DATEPART(WEEKDAY,@workingDate) = @WeeklyDOW) 
					BREAK;
				 ELSE
					CONTINUE;
			END;

			/*-------------------------------------------------------------
			--	Get the occurrence dates for this item
			-------------------------------------------------------------*/
			WHILE (@workingDate < @EndDate)
			BEGIN
				INSERT INTO @ItemDates ( 
					FkItemType,
					ItemType,
					FkItemDetail, 
					OccurrenceDate, 
					[Name],
					Amount ) 
				VALUES (
					@FkItemType,
					@ItemType,
					@FkItemDetail, 
					@workingDate, 
					@Name,
					@Amount); 

				/* Diagnostic */
				--PRINT @workingDate;

				/* Advance One Week */
 				SET @workingDate = DATEADD(WEEK,1,@workingDate);
			END;
		
			/* Diagnostic */
			--SELECT * FROM @ItemDates;
			INSERT INTO @LedgerDetail (
				FkLMain
				,FkWeek
				,FkMonth
				,FkQuarter
				,FkYear
				,OccurrenceDate
				,FkItemType
				,ItemType
				,PeriodName
				,[Name]
				,Amount 
			)
			SELECT 
				lm.PkLMain
				,lm.[Week]
				,lm.[Month]
				,lm.[Quarter]
				,lm.[Year]
				,id.OccurrenceDate
				,id.FkItemType
				,id.ItemType
				,@PeriodName
				,id.[Name]
				,id.Amount
			FROM @LedgerMain AS lm
			INNER JOIN @ItemDates AS id
			ON lm.WDate = id.OccurrenceDate; 
		END;
		/*==========================================================================
		-- End:		Period (3) - Weekly
		==========================================================================*/
	
		/*==========================================================================
		-- Begin:	Period (4) - Every Two Weeks
		==========================================================================*/
		IF (@FkPeriod = 4) BEGIN
			/*-------------------------------------------------------------
			--	Find the Day of the Week for this item's first occurrence
			--	and set the working date with that value.
			-------------------------------------------------------------*/
			WHILE (@workingDate < @EndDate)
			BEGIN
				SET @workingDate = DATEADD(DAY,1,@workingDate);
				IF(DATEPART(WEEKDAY,@workingDate) = @EverOtherWeekDOW) 
					BREAK;
				 ELSE
					CONTINUE;
			END;

			/*-------------------------------------------------------------
			--	Get the occurrence dates for this item
			-------------------------------------------------------------*/
			WHILE (@workingDate < @EndDate)
			BEGIN
				INSERT INTO @ItemDates ( 
					FkItemType,
					ItemType,
					FkItemDetail, 
					OccurrenceDate, 
					[Name],
					Amount ) 
				VALUES (
					@FkItemType,
					@ItemType,
					@FkItemDetail, 
					@workingDate, 
					@Name,
					@Amount); 

				/* Diagnostic */
				--PRINT @workingDate;
							
				/* Advance Two Weeks */
 				SET @workingDate = DATEADD(WEEK,2,@workingDate);
			END;
		
			/* Diagnostic */
			--SELECT * FROM @ItemDates;
			INSERT INTO @LedgerDetail (
				FkLMain
				,FkWeek
				,FkMonth
				,FkQuarter
				,FkYear
				,OccurrenceDate
				,FkItemType
				,ItemType
				,PeriodName
				,[Name]
				,Amount 
			)
			SELECT 
				lm.PkLMain
				,lm.[Week]
				,lm.[Month]
				,lm.[Quarter]
				,lm.[Year]
				,id.OccurrenceDate
				,id.FkItemType
				,id.ItemType
				,@PeriodName
				,id.[Name]
				,id.Amount
			FROM @LedgerMain AS lm
			INNER JOIN @ItemDates AS id
			ON lm.WDate = id.OccurrenceDate; 
		END;
		/*==========================================================================
		-- End:		Period (4) - Every Two Weeks
		==========================================================================*/
	
		/*==========================================================================
		-- Begin:	Period (5) - Bi-Monthly
		==========================================================================*/
		IF (@FkPeriod = 5) BEGIN
			/*-------------------------------------------------------------
			--	Find the first and second monthly occurrences
			-------------------------------------------------------------*/
			WHILE (@workingDate < @EndDate)
			BEGIN
				IF(DATEPART(DAY, @workingDate) = @BiMonthlyDay1) OR (DATEPART(DAY, @workingDate) = @BiMonthlyDay2) BEGIN 
					/*-------------------------------------------------------------
					--	Get the occurrence dates for this item
					-------------------------------------------------------------*/
					INSERT INTO @ItemDates ( 
						FkItemType,
						ItemType,
						FkItemDetail, 
						OccurrenceDate, 
						[Name],
						Amount ) 
					VALUES (
						@FkItemType,
						@ItemType,
						@FkItemDetail, 
						@workingDate, 
						@Name,
						@Amount); 
						END;
					/* Advance One Day */
					SET @workingDate = DATEADD(DAY,1,@workingDate); 
			END;
				
			/* Diagnostic */
			--SELECT * FROM @ItemDates;
			INSERT INTO @LedgerDetail (
				FkLMain
				,FkWeek
				,FkMonth
				,FkQuarter
				,FkYear
				,OccurrenceDate
				,FkItemType
				,ItemType
				,PeriodName
				,[Name]
				,Amount 
			)
			SELECT 
				lm.PkLMain
				,lm.[Week]
				,lm.[Month]
				,lm.[Quarter]
				,lm.[Year]
				,id.OccurrenceDate
				,id.FkItemType
				,id.ItemType
				,@PeriodName
				,id.[Name]
				,id.Amount
			FROM @LedgerMain AS lm
			INNER JOIN @ItemDates AS id
			ON lm.WDate = id.OccurrenceDate; 
		END;
		/*==========================================================================
		-- End:		Period (5) - Bi-Monthly
		==========================================================================*/

		/*==========================================================================
		-- Begin:	Period (6) - Monthly
		==========================================================================*/
		IF (@FkPeriod = 6) BEGIN
			/*-------------------------------------------------------------
			--	Find the monthly occurrences
			-------------------------------------------------------------*/
			WHILE (@workingDate < @EndDate)
			BEGIN
				IF(DATEPART(DAY, @workingDate) = @MonthlyDOM) BEGIN 
					/*-------------------------------------------------------------
					--	Get the occurrence dates for this item
					-------------------------------------------------------------*/
					INSERT INTO @ItemDates ( 
						FkItemType,
						ItemType,
						FkItemDetail, 
						OccurrenceDate, 
						[Name],
						Amount ) 
					VALUES (
						@FkItemType,
						@ItemType,
						@FkItemDetail, 
						@workingDate, 
						@Name,
						@Amount); 
				END;
				/* Advance One Day */
				SET @workingDate = DATEADD(DAY,1,@workingDate); 
			END;
				
			/* Diagnostic */
			--SELECT * FROM @ItemDates;
			INSERT INTO @LedgerDetail (
				FkLMain
				,FkWeek
				,FkMonth
				,FkQuarter
				,FkYear
				,OccurrenceDate
				,FkItemType
				,ItemType
				,PeriodName
				,[Name]
				,Amount 
			)
			SELECT 
				lm.PkLMain
				,lm.[Week]
				,lm.[Month]
				,lm.[Quarter]
				,lm.[Year]
				,id.OccurrenceDate
				,id.FkItemType
				,id.ItemType
				,@PeriodName
				,id.[Name]
				,id.Amount
			FROM @LedgerMain AS lm
			INNER JOIN @ItemDates AS id
			ON lm.WDate = id.OccurrenceDate; 
		END;
		/*==========================================================================
		-- End:		Period (6) - Monthly
		==========================================================================*/
	
		/*==========================================================================
		-- Begin:	Period (7) - Quarterly
		==========================================================================*/
		IF (@FkPeriod = 7) BEGIN
			/*-------------------------------------------------------------
			--	Find the Quarterly occurrences by combining the current year
			--	with the Quarterly Month and Day integer value to create the
			--	Quarterly dates, then cycle through the days of the period
			--	and when there is a match insert the Quarterly Item.
			-------------------------------------------------------------*/
			WHILE (@workingDate < @EndDate)
			BEGIN
				/* Find the month & the day*/			
				SET @Month = DATEPART(MONTH,@workingDate);
				SET @Day = DATEPART(DAY,@workingDate);		

				IF(@Month = @Quarterly1Month AND @Day = @Quarterly1Day) 
					OR (@Month = @Quarterly2Month AND @Day = @Quarterly2Day) 
					OR (@Month = @Quarterly3Month AND @Day = @Quarterly3Day) 
					OR (@Month = @Quarterly4Month AND @Day = @Quarterly4Day) BEGIN 
					/*-------------------------------------------------------------
					--	Get the occurrence dates for this item
					-------------------------------------------------------------*/
					INSERT INTO @ItemDates ( 
						FkItemType,
						ItemType,
						FkItemDetail, 
						OccurrenceDate, 
						[Name],
						Amount ) 
					VALUES (
						@FkItemType,
						@ItemType,
						@FkItemDetail, 
						@workingDate, 
						@Name,
						@Amount); 
				END;
				/* Advance One Day */
				SET @workingDate = DATEADD(DAY,1,@workingDate); 
			END;
						
			/* Diagnostic */
			--SELECT * FROM @ItemDates;
			INSERT INTO @LedgerDetail (
				FkLMain
				,FkWeek
				,FkMonth
				,FkQuarter
				,FkYear
				,OccurrenceDate
				,FkItemType
				,ItemType
				,PeriodName
				,[Name]
				,Amount 
			)
			SELECT 
				lm.PkLMain
				,lm.[Week]
				,lm.[Month]
				,lm.[Quarter]
				,lm.[Year]
				,id.OccurrenceDate
				,id.FkItemType
				,id.ItemType
				,@PeriodName
				,id.[Name]
				,id.Amount
			FROM @LedgerMain AS lm
			INNER JOIN @ItemDates AS id
			ON lm.WDate = id.OccurrenceDate; 	
		END;
		/*==========================================================================
		-- End:		Period (7) - Quarterly
		==========================================================================*/
	
		/*==========================================================================
		-- Begin:	Period (8) - Semi-Annually
		==========================================================================*/
		IF (@FkPeriod = 8) BEGIN
			/*-------------------------------------------------------------
			--	Find the Quarterly occurrences by combining the current year
			--	with the Quarterly Month and Day integer value to create the
			--	Quarterly dates, then cycle through the days of the period
			--	and when there is a match insert the Quarterly Item.
			-------------------------------------------------------------*/
			WHILE (@workingDate < @EndDate)
			BEGIN
				/* Find the month & the day*/			
				SET @Month = DATEPART(MONTH,@workingDate);
				SET @Day = DATEPART(DAY,@workingDate);		

				IF(@Month = @SemiAnnual1Month AND @Day = @SemiAnnual1Day) 
					OR (@Month = @SemiAnnual2Month AND @Day = @SemiAnnual2Day) BEGIN 
					/*-------------------------------------------------------------
					--	Get the occurrence dates for this item
					-------------------------------------------------------------*/
					INSERT INTO @ItemDates ( 
						FkItemType,
						ItemType,
						FkItemDetail, 
						OccurrenceDate, 
						[Name],
						Amount ) 
					VALUES (
						@FkItemType,
						@ItemType,
						@FkItemDetail, 
						@workingDate, 
						@Name,
						@Amount); 
					END;
					/* Advance One Day */
					SET @workingDate = DATEADD(DAY,1,@workingDate); 
			END;
						
			/* Diagnostic */
			--SELECT * FROM @ItemDates;
			INSERT INTO @LedgerDetail (
				FkLMain
				,FkWeek
				,FkMonth
				,FkQuarter
				,FkYear
				,OccurrenceDate
				,FkItemType
				,ItemType
				,PeriodName
				,[Name]
				,Amount 
			)
			SELECT 
				lm.PkLMain
				,lm.[Week]
				,lm.[Month]
				,lm.[Quarter]
				,lm.[Year]
				,id.OccurrenceDate
				,id.FkItemType
				,id.ItemType
				,@PeriodName
				,id.[Name]
				,id.Amount
			FROM @LedgerMain AS lm
			INNER JOIN @ItemDates AS id
			ON lm.WDate = id.OccurrenceDate; 
		END;
		/*==========================================================================
		-- End:		Period (8) - Semi-Annually
		==========================================================================*/

		/*==========================================================================
		-- Begin:	Period (9) - Annually
		==========================================================================*/
		IF (@FkPeriod = 9) BEGIN
			/*-------------------------------------------------------------
			--	Find the Quarterly occurrences by combining the current year
			--	with the Quarterly Month and Day integer value to create the
			--	Quarterly dates, then cycle through the days of the period
			--	and when there is a match insert the Quarterly Item.
			-------------------------------------------------------------*/
			WHILE (@workingDate < @EndDate)
			BEGIN
				/* Find the month & the day*/			
				SET @Month = DATEPART(MONTH,@workingDate);
				SET @Day = DATEPART(DAY,@workingDate);		

				IF(@Month = @AnnualMOY AND @Day = @AnnualDOM) BEGIN 
					/*-------------------------------------------------------------
					--	Get the occurrence dates for this item
					-------------------------------------------------------------*/
					INSERT INTO @ItemDates ( 
						FkItemType,
						ItemType,
						FkItemDetail, 
						OccurrenceDate, 
						[Name],
						Amount ) 
					VALUES (
						@FkItemType,
						@ItemType,
						@FkItemDetail, 
						@workingDate, 
						@Name,
						@Amount); 
				END;
				/* Advance One Day */
				SET @workingDate = DATEADD(DAY,1,@workingDate); 
			END;
						
			/* Diagnostic */
			--SELECT * FROM @ItemDates;
			INSERT INTO @LedgerDetail (
				FkLMain
				,FkWeek
				,FkMonth
				,FkQuarter
				,FkYear
				,OccurrenceDate
				,FkItemType
				,ItemType
				,PeriodName
				,[Name]
				,Amount 
			)
			SELECT 
				lm.PkLMain
				,lm.[Week]
				,lm.[Month]
				,lm.[Quarter]
				,lm.[Year]
				,id.OccurrenceDate
				,id.FkItemType
				,id.ItemType
				,@PeriodName
				,id.[Name]
				,id.Amount
			FROM @LedgerMain AS lm
			INNER JOIN @ItemDates AS id
			ON lm.WDate = id.OccurrenceDate; 
		END;
		/*==========================================================================
		-- End:		Period (9) - Annually
		==========================================================================*/

		/* Reset Table for next group of dates */
		DELETE FROM @ItemDates;

		/*==========================================================================
		-- Get Next Row
		==========================================================================*/
		FETCH NEXT FROM curItemDetail
		INTO 	
			@FkItemDetail
			,@Name
			,@Amount
			,@FkItemType
			,@ItemType
			,@FkPeriod
			,@PeriodName
			,@BeginDate
			,@EndDate
			,@WeeklyDOW
			,@EverOtherWeekDOW
			,@BiMonthlyDay1
			,@BiMonthlyDay2
			,@MonthlyDOM
			,@Quarterly1Month
			,@Quarterly1Day
			,@Quarterly2Month
			,@Quarterly2Day
			,@Quarterly3Month
			,@Quarterly3Day
			,@Quarterly4Month
			,@Quarterly4Day
			,@SemiAnnual1Month
			,@SemiAnnual1Day
			,@SemiAnnual2Month
			,@SemiAnnual2Day
			,@AnnualMOY
			,@AnnualDOM
			,@DateRangeReq;
	END;

	CLOSE curItemDetail;
	DEALLOCATE curItemDetail;
	/*==========================================================================
	-- End of Credit & Debit Cycling
	==========================================================================*/

	/*==========================================================================
	-- Begin Summary & Running Total Updates
	==========================================================================*/
	/*-------------------------------------------------------------
	--	Summarize the items for each day and update the daily 
	--	amount
	-------------------------------------------------------------*/
	UPDATE @LedgerMain 
	SET	CreditSummary = ISNULL(credits.CreditSummary,0),
		DebitSummary = ISNULL(debits.DebitSummary,0),
		Net = ld.Net	
	FROM @LedgerMain AS lm
	INNER JOIN (
			SELECT 
				FkLMain,
				SUM(Amount) AS Net					-- Daily Net Summary
			FROM @LedgerDetail 
			GROUP BY FkLMain
	) AS ld
	ON lm.PkLMain = ld.FkLMain
	LEFT OUTER JOIN (
			SELECT 
				FkLMain,
				SUM(Amount) AS CreditSummary		-- Daily Credit Summary
			FROM @LedgerDetail 
			WHERE FkItemType = 1
			GROUP BY FkLMain
	) AS credits
	ON lm.PkLMain = credits.FkLMain
	LEFT OUTER JOIN (
			SELECT 
				FkLMain,
				SUM(Amount) AS DebitSummary			-- Daily Debit Summary
			FROM @LedgerDetail 
			WHERE FkItemType = 2
			GROUP BY FkLMain
	) AS debits
	ON lm.PkLMain = debits.FkLMain;

	/* Diagnostic */
	--SELECT 
	--	FkLMain,
	--	SUM(Amount) AS CreditSummary				-- Daily Credit Summary
	--FROM @LedgerDetail 
	--WHERE FkItemType = 1
	--GROUP BY FkLMain

	/* Diagnostic */
	--SELECT 
	--	FkLMain,
	--	SUM(Amount) AS DebitSummary				-- Daily Debit Summary
	--FROM @LedgerDetail 
	--WHERE FkItemType = 2
	--GROUP BY FkLMain

	/* Diagnostic */
	--SELECT 
	--	FkLMain,
	--	SUM(Amount) AS Net								-- Daily Net Summary
	--FROM @LedgerDetail 
	--GROUP BY FkLMain

	/*-------------------------------------------------------------
	--	Get the initial checking balance
	-------------------------------------------------------------*/
	DECLARE @InitialAmount FLOAT;
	SELECT @InitialAmount = Amount 
	FROM ItemDetail.Items
	WHERE FkItemType = 3	
	AND UserId = @UserId;

	/* Diagnostic */
	--PRINT '@InitialAmount: ' + ISNULL(CONVERT(VARCHAR, @InitialAmount), '-') 

	/* If Initial Amount record doesn't exist, then create one with a default value of zero */
	IF (@InitialAmount IS NULL) BEGIN
		/* Diagnostic */
		--PRINT '@InitialAmount: IS NULL'
		INSERT ItemDetail.Items (
			[UserId], 
			[Amount],
			FkItemType
		) 
		VALUES (
			@UserId
			,0
			,3
		)
		SET @InitialAmount = 0
		/* Diagnostic */
		--PRINT '@InitialAmount default created: ' + CONVERT(VARCHAR, @InitialAmount)
	END

	/*-------------------------------------------------------------
	--	Update the running total in @LedgerMain
	-------------------------------------------------------------*/
	/* Local declarations & Initializations */
	DECLARE @PkLMain INT, @WDate DATE, @Net FLOAT, @RunningTotal FLOAT;

	/* Initialize running total with Initial Amount */
	SET @RunningTotal = @InitialAmount;

	/* Initialize cursor */
	DECLARE curRunningTotal CURSOR LOCAL FOR
	SELECT PkLMain, WDate, Net
	FROM @LedgerMain ORDER BY WDate FOR UPDATE OF RunningTotal;

	/* Open cursor */
	OPEN curRunningTotal;

	/* Get first record */
	FETCH NEXT FROM curRunningTotal 
	INTO @PkLMain, @WDate, @Net;

	/* Begin looping */
	WHILE (@@FETCH_STATUS = 0) BEGIN
	
		/* Diagnostic */
		--PRINT '-----------' + CHAR(13) + '** Before **' + CHAR(13) 
		--		+	'@Net: ' + ISNULL(CONVERT(VARCHAR, @Net), '-') + CHAR(9) 
		--		+ '@RunningTotal: ' + ISNULL(CONVERT(VARCHAR, @RunningTotal), '-') 

		/* Update running total */
		SET @RunningTotal = @RunningTotal + @Net;
		/* Update running total in @LedgerMain table */
		UPDATE @LedgerMain SET RunningTotal = @RunningTotal WHERE CURRENT OF curRunningTotal;

		/* Diagnostic */
		--PRINT '** After **' + CHAR(13) 
		--		+	'@Net: ' + ISNULL(CONVERT(VARCHAR, @Net), '-') + CHAR(9) 
		--		+ '@RunningTotal: ' + ISNULL(CONVERT(VARCHAR, @RunningTotal), '-') 

		/* Get next record */
		FETCH NEXT FROM curRunningTotal 
		INTO @PkLMain, @WDate, @Net;  
	END;

	/* Close cursor & Release memory */
	CLOSE curRunningTotal;
	DEALLOCATE curRunningTotal;

	/* Diagnostic */
	--SELECT * FROM @LedgerMain;
	--SELECT * FROM @LedgerDetail ORDER BY FkLMain;

	/*==========================================================================
	-- End Summary Calculations
	==========================================================================*/

	/*==========================================================================
	-- Begin Grouping Transforms
	==========================================================================*/
	/*-------------------------------------------------------------------------
	-- If '@GroupingTranform' is True then calculate the type of rollup for 
	-- the output based on the input time frame range in Days.  
	--	
	-- Days				Grouping Transforms
	-- ---------------	-------------------
	--					<= 60		Daily
	--	> 60		-	<= 360		Weekly
	--	> 360		-	<= 1090		Monthly
	--	> 1090		-	<= 2850		Quarterly
	--	> 2850						Yearly
	--------------------------------------------------------------------------*/
	/* Local Delcarations */
	DECLARE @TFRange INT, 
		@DailyCutoff INT, 
		@WeeklyCutoff INT, 
		@MonthlyCutoff INT, 
		@QuarterlyCutoff INT;
	DECLARE	@LedgerMainRollup TABLE (
		ID INT NOT NULL IDENTITY(1,1) PRIMARY KEY CLUSTERED,
		RollupKey INT NULL,
		[Year] INT NULL,
		WDate DATE NULL,
		CreditSummary FLOAT NULL,
		DebitSummary FLOAT NULL,
		Net FLOAT NULL,
		RunningTotal FLOAT NULL
	);
	/* Determing the time frame range in Days */
	SET @TFRange = DATEDIFF(DAY, @TimeFrameBegin, @TimeFrameEnd);
	/* Diagnostic */
	--SET @TFRange = 30;
	--PRINT '@TFRange: ' + ISNULL(CONVERT(VARCHAR, @TFRange), '-')  + ' Days'

	/* In days */
	SET @DailyCutoff = 60; 
	SET @WeeklyCutoff = 350;
	SET @MonthlyCutoff = 1090;
	SET @QuarterlyCutoff = 2850; 
	/*-------------------------------------------------------------------------
	-- If '@GroupingTranform' is 1 (True) then calculate the type of rollup. 
	-- This is primarily for the Timeline Chart and is designed to keep the 
	-- data density down so the chart tooltip remains useability.
	--------------------------------------------------------------------------*/
	IF @GroupingTranform = 1 BEGIN
		IF @TFRange	<= @DailyCutoff BEGIN
			/*-------------------------------------------------------------
			--	Daily Rollup
			-------------------------------------------------------------*/
			SELECT 
				lm.PkLMain AS RollupKey
				,lm.[Year] AS [Year]
				,lm.WDate
				,lm.CreditSummary
				,lm.DebitSummary
				,lm.Net
				,lm.RunningTotal
				,ld.OccurrenceDate
				,ISNULL(ld.FkItemType,0) AS FkItemType
				,ISNULL(ld.ItemType,'-') AS ItemType
				,ISNULL(ld.PeriodName,'-') AS PeriodName
				,ISNULL(ld.[Name],'-') AS [Name]
				,ISNULL(ld.Amount,0) AS Amount
			FROM @LedgerMain AS lm
			LEFT OUTER JOIN @LedgerDetail AS ld
			ON lm.PkLMain = ld.FkLMain				-- For daily only @LedgerMain Primary Key is needed
			ORDER BY lm.WDate, ld.OccurrenceDate; 

		END;	/* End of Daily */

		ELSE IF @TFRange > @DailyCutoff AND @TFRange <= @WeeklyCutoff BEGIN
			/*-------------------------------------------------------------
			--	Weekly Rollup
			-------------------------------------------------------------*/
			INSERT INTO @LedgerMainRollup	(
					RollupKey,
					[Year],
					WDate,
					CreditSummary,
					DebitSummary,
					Net,
					RunningTotal
			)
			SELECT 
				lm.[Week] AS RollupKey
				,lm.[Year] AS [Year]
				,MAX(lm.WDate) AS WDate
				,SUM(lm.CreditSummary) AS CreditSummary
				,SUM(lm.DebitSummary) AS DebitSummary
				,SUM(lm.CreditSummary) + SUM(lm.DebitSummary) AS Net
				,(	
						SELECT lm2.RunningTotal	
						FROM @LedgerMain lm2
						WHERE MAX(lm.WDate)	= lm2.WDate
				) AS RunningTotal
			FROM @LedgerMain AS lm
			GROUP BY lm.[Week], lm.[Year];

			/* Diagnostic */
			--SELECT * FROM @LedgerMainRollup ORDER BY WDate;

			SELECT 
				lmr.RollupKey
				,lmr.[Year] AS [Year]
				,lmr.WDate
				,lmr.CreditSummary
				,lmr.DebitSummary
				,lmr.Net
				,lmr.RunningTotal
				,ld.OccurrenceDate
				,ISNULL(ld.FkItemType,0) AS FkItemType
				,ISNULL(ld.ItemType,'-') AS ItemType
				,ISNULL(ld.PeriodName,'-') AS PeriodName
				,ISNULL(ld.[Name],'-') AS [Name]
				,ISNULL(ld.Amount,0) AS Amount
			FROM @LedgerMainRollup AS lmr
			LEFT OUTER JOIN @LedgerDetail ld	
			ON lmr.RollupKey = ld.FkWeek			-- For Weekly two keys are needed, Week and Year
				AND lmr.[Year]	= ld.FkYear
			ORDER BY lmr.WDate,ld.OccurrenceDate; 
					
		END;	/* End of Weekly */

		ELSE IF @TFRange > @WeeklyCutoff AND @TFRange <= @MonthlyCutoff	BEGIN
			/*-------------------------------------------------------------
			--	Monthly Rollup
			-------------------------------------------------------------*/
			INSERT INTO @LedgerMainRollup	(
					RollupKey,
					[Year],
					WDate,
					CreditSummary,
					DebitSummary,
					Net,
					RunningTotal
			)
			SELECT 
				lm.[Month] AS RollupKey
				,lm.[Year] AS [Year]
				,MAX(lm.WDate) AS WDate
				,SUM(lm.CreditSummary) AS CreditSummary
				,SUM(lm.DebitSummary) AS DebitSummary
				,SUM(lm.CreditSummary) + SUM(lm.DebitSummary) AS Net
				,(	
						SELECT lm2.RunningTotal	
						FROM @LedgerMain lm2
						WHERE MAX(lm.WDate)	= lm2.WDate
				) AS RunningTotal
			FROM @LedgerMain AS lm
			GROUP BY lm.[Month], lm.[Year];

			/* Diagnostic */
			--SELECT * FROM @LedgerMainRollup ORDER BY WDate;

			SELECT 
				lmr.RollupKey
				,lmr.[Year] AS [Year]
				,lmr.WDate
				,lmr.CreditSummary
				,lmr.DebitSummary
				,lmr.Net
				,lmr.RunningTotal
				,ld.OccurrenceDate
				,ISNULL(ld.FkItemType,0) AS FkItemType
				,ISNULL(ld.ItemType,'-') AS ItemType
				,ISNULL(ld.PeriodName,'-') AS PeriodName
				,ISNULL(ld.[Name],'-') AS [Name]
				,ISNULL(ld.Amount,0) AS Amount
			FROM @LedgerMainRollup AS lmr
			LEFT OUTER JOIN @LedgerDetail ld	
			ON lmr.RollupKey = ld.FkMonth			-- For Monthly two keys are needed, Month and Year	
				AND lmr.[Year]	= ld.FkYear		
			ORDER BY lmr.WDate,ld.OccurrenceDate; 
			 			
		END;	/* End of Monthly */

		ELSE IF @TFRange > @MonthlyCutoff AND @TFRange <= @QuarterlyCutoff	BEGIN
			/*-------------------------------------------------------------
			--	Quarterly Rollup
			-------------------------------------------------------------*/
			INSERT INTO @LedgerMainRollup	(
					RollupKey,
					[Year],
					WDate,
					CreditSummary,
					DebitSummary,
					Net,
					RunningTotal
			)
			SELECT 
				lm.[Quarter] AS RollupKey
				,lm.[Year] AS [Year]
				,MAX(lm.WDate) AS WDate
				,SUM(lm.CreditSummary) AS CreditSummary
				,SUM(lm.DebitSummary) AS DebitSummary
				,SUM(lm.CreditSummary) + SUM(lm.DebitSummary) AS Net
				,(	
						SELECT lm2.RunningTotal	
						FROM @LedgerMain lm2
						WHERE MAX(lm.WDate)	= lm2.WDate
				) AS RunningTotal
			FROM @LedgerMain AS lm
			GROUP BY lm.[Quarter], lm.[Year];

			/* Diagnostic */
			--SELECT * FROM @LedgerMainRollup ORDER BY WDate;

			SELECT 
				lmr.RollupKey
				,lmr.[Year] AS [Year]
				,lmr.WDate
				,lmr.CreditSummary
				,lmr.DebitSummary
				,lmr.Net
				,lmr.RunningTotal
				,ld.OccurrenceDate
				,ISNULL(ld.FkItemType,0) AS FkItemType
				,ISNULL(ld.ItemType,'-') AS ItemType
				,ISNULL(ld.PeriodName,'-') AS PeriodName
				,ISNULL(ld.[Name],'-') AS [Name]
				,ISNULL(ld.Amount,0) AS Amount
			FROM @LedgerMainRollup AS lmr
			LEFT OUTER JOIN @LedgerDetail ld	
			ON lmr.RollupKey = ld.FkQuarter		-- For Quarterly two keys are needed, Quarter and Year
				AND lmr.[Year]	= ld.FkYear			
			ORDER BY lmr.WDate,ld.OccurrenceDate; 
						
		END;	/* End of Quarterly */

		ELSE IF @TFRange > @QuarterlyCutoff BEGIN
			/*-------------------------------------------------------------
			--	Yearly Rollup
			-------------------------------------------------------------*/
			INSERT INTO @LedgerMainRollup	(
					RollupKey,
					[Year],
					WDate,
					CreditSummary,
					DebitSummary,
					Net,
					RunningTotal
			)
			SELECT 
				lm.[Year] AS RollupKey
				,lm.[Year] AS [Year]
				,MAX(lm.WDate) AS WDate
				,SUM(lm.CreditSummary) AS CreditSummary
				,SUM(lm.DebitSummary) AS DebitSummary
				,SUM(lm.CreditSummary) + SUM(lm.DebitSummary) AS Net
				,(	
						SELECT lm2.RunningTotal	
						FROM @LedgerMain lm2
						WHERE MAX(lm.WDate)	= lm2.WDate
				) AS RunningTotal
			FROM @LedgerMain AS lm
			GROUP BY lm.[Year];

			/* Diagnostic */
			--SELECT * FROM @LedgerMainRollup ORDER BY WDate;

			SELECT 
				lmr.RollupKey
				,lmr.[Year] AS [Year]
				,lmr.WDate
				,lmr.CreditSummary
				,lmr.DebitSummary
				,lmr.Net
				,lmr.RunningTotal
				,ld.OccurrenceDate
				,ISNULL(ld.FkItemType,0) AS FkItemType
				,ISNULL(ld.ItemType,'-') AS ItemType
				,ISNULL(ld.PeriodName,'-') AS PeriodName
				,ISNULL(ld.[Name],'-') AS [Name]
				,ISNULL(ld.Amount,0) AS Amount
			FROM @LedgerMainRollup AS lmr
			LEFT OUTER JOIN @LedgerDetail ld	
			ON lmr.[Year]	= ld.FkYear					-- For Yearly only the Year key is needed	
			ORDER BY lmr.WDate,ld.OccurrenceDate; 
						
		END;	/* End of Yearly */
	END; /* End of @GroupingTranform = 1 (True) */

	/*-------------------------------------------------------------------------
	-- If '@GroupingTranform' is 0 (False) then calculate the Daily rollup
	-- irregardless of the time frame. 
	-- This is primarily for the Ledger Display and its Excel Export.
	-- Here you want all the Daily detail for user review and audit.
	--------------------------------------------------------------------------*/
	ELSE IF @GroupingTranform = 0 BEGIN
		/*-------------------------------------------------------------
		--	Daily Rollup
		-------------------------------------------------------------*/
		SELECT 
			lm.PkLMain AS RollupKey
			,lm.[Year] AS [Year]
			,lm.WDate
			,lm.CreditSummary
			,lm.DebitSummary
			,lm.Net
			,lm.RunningTotal
			,ld.OccurrenceDate
			,ISNULL(ld.FkItemType,0) AS FkItemType
			,ISNULL(ld.ItemType,'-') AS ItemType
			,ISNULL(ld.PeriodName,'-') AS PeriodName
			,ISNULL(ld.[Name],'-') AS [Name]
			,ISNULL(ld.Amount,0) AS Amount
		FROM @LedgerMain AS lm
		LEFT OUTER JOIN @LedgerDetail AS ld
		ON lm.PkLMain = ld.FkLMain			-- The base detail is the same as daily only and @LedgerMain Primary Key is needed
		ORDER BY lm.WDate, ld.OccurrenceDate; 

	END;	/* End of @GroupingTranform = 0 (False) */

END; /* End of Procedure */ 
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "c"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 308
               Right = 246
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "it"
            Begin Extent = 
               Top = 14
               Left = 327
               Bottom = 110
               Right = 497
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "p"
            Begin Extent = 
               Top = 142
               Left = 322
               Bottom = 238
               Right = 492
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 3330
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'ItemDetail', @level1type=N'VIEW',@level1name=N'vwItems'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'ItemDetail', @level1type=N'VIEW',@level1name=N'vwItems'
GO
USE [master]
GO
ALTER DATABASE [FPFL] SET  READ_WRITE 
GO
