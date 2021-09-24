USE [FPFL];
GO

/****** Object:  Table [ItemDetail].[ItemTypes]    Script Date: 9/24/2021 7:26:17 AM ******/

DROP TABLE [ItemDetail].[ItemTypes];
GO

/****** Object:  Table [ItemDetail].[ItemTypes]    Script Date: 9/24/2021 7:26:17 AM ******/

SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [ItemDetail].[ItemTypes](
	[Id]   INT NOT NULL, 
	[Name] NVARCHAR(25) NOT NULL, 
 CONSTRAINT [PK_ItemTypes] PRIMARY KEY CLUSTERED([Id] ASC)
 WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
)
ON [PRIMARY];
GO