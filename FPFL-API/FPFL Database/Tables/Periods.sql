USE [FPFL];
GO

/****** Object:  Table [ItemDetail].[Periods]    Script Date: 9/24/2021 7:37:52 AM ******/

DROP TABLE [ItemDetail].[Periods];
GO

/****** Object:  Table [ItemDetail].[Periods]    Script Date: 9/24/2021 7:37:52 AM ******/

SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [ItemDetail].[Periods] (
	[Id]   INT NOT NULL, 
	[Name] NVARCHAR(75) NOT NULL, 
	CONSTRAINT [PK_Periods] PRIMARY KEY CLUSTERED([Id] ASC)
	WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
)
ON [PRIMARY];
GO