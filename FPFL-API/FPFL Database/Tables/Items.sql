USE [FPFL];
GO
ALTER TABLE [ItemDetail].[Items] DROP CONSTRAINT [FK_Items_Periods];
GO
ALTER TABLE [ItemDetail].[Items] DROP CONSTRAINT [FK_Items_ItemType];
GO
ALTER TABLE [ItemDetail].[Items] DROP CONSTRAINT [DF_Items_DateRangeReq];
GO

/****** Object:  Table [ItemDetail].[Items]    Script Date: 9/24/2021 7:19:30 AM ******/

DROP TABLE [ItemDetail].[Items];
GO

/****** Object:  Table [ItemDetail].[Items]    Script Date: 9/24/2021 7:19:30 AM ******/

SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [ItemDetail].[Items] (
	[Id]               INT IDENTITY(1, 1) NOT NULL, 
	[UserId]           UNIQUEIDENTIFIER NOT NULL, 
	[Name]             NVARCHAR(75) NULL, 
	[Amount]           MONEY NULL, 
	[FkItemType]       INT NULL, 
	[FkPeriod]         INT NULL, 
	[BeginDate]        DATE NULL, 
	[EndDate]          DATE NULL, 
	[WeeklyDow]        INT NULL, 
	[EverOtherWeekDow] INT NULL, 
	[BiMonthlyDay1]    INT NULL, 
	[BiMonthlyDay2]    INT NULL, 
	[MonthlyDom]       INT NULL, 
	[Quarterly1Month]  INT NULL, 
	[Quarterly1Day]    INT NULL, 
	[Quarterly2Month]  INT NULL, 
	[Quarterly2Day]    INT NULL, 
	[Quarterly3Month]  INT NULL, 
	[Quarterly3Day]    INT NULL, 
	[Quarterly4Month]  INT NULL, 
	[Quarterly4Day]    INT NULL, 
	[SemiAnnual1Month] INT NULL, 
	[SemiAnnual1Day]   INT NULL, 
	[SemiAnnual2Month] INT NULL, 
	[SemiAnnual2Day]   INT NULL, 
	[AnnualMoy]        INT NULL, 
	[AnnualDom]        INT NULL, 
	[DateRangeReq]     BIT NOT NULL, 
 CONSTRAINT [PK_Items] PRIMARY KEY CLUSTERED([Id] ASC)
 WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
)
ON [PRIMARY];
GO
ALTER TABLE [ItemDetail].[Items]
ADD CONSTRAINT [DF_Items_DateRangeReq] DEFAULT((0)) FOR [DateRangeReq];
GO
ALTER TABLE [ItemDetail].[Items]
WITH CHECK
ADD CONSTRAINT [FK_Items_ItemType] FOREIGN KEY([FkItemType]) REFERENCES [ItemDetail].[ItemTypes]([Id]) ON UPDATE CASCADE;
GO
ALTER TABLE [ItemDetail].[Items] CHECK CONSTRAINT [FK_Items_ItemType];
GO
ALTER TABLE [ItemDetail].[Items]
WITH CHECK
ADD CONSTRAINT [FK_Items_Periods] FOREIGN KEY([FkPeriod]) REFERENCES [ItemDetail].[Periods]([Id]) ON UPDATE CASCADE;
GO
ALTER TABLE [ItemDetail].[Items] CHECK CONSTRAINT [FK_Items_Periods];
GO