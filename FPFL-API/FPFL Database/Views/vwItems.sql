USE [FPFL];
GO
EXEC sys.sp_dropextendedproperty 
     @name = N'MS_DiagramPaneCount', 
     @level0type = N'SCHEMA', 
     @level0name = N'ItemDetail', 
     @level1type = N'VIEW', 
     @level1name = N'vwItems';
GO
EXEC sys.sp_dropextendedproperty 
     @name = N'MS_DiagramPane1', 
     @level0type = N'SCHEMA', 
     @level0name = N'ItemDetail', 
     @level1type = N'VIEW', 
     @level1name = N'vwItems';
GO

/****** Object:  View [ItemDetail].[vwItems]    Script Date: 9/24/2021 7:48:29 AM ******/

DROP VIEW [ItemDetail].[vwItems];
GO

/****** Object:  View [ItemDetail].[vwItems]    Script Date: 9/24/2021 7:48:29 AM ******/

SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
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
          LEFT OUTER JOIN [ItemDetail].[Periods] AS p WITH(NOLOCK) ON c.[FkPeriod] = p.[Id];
GO
EXEC sys.sp_addextendedproperty 
     @name = N'MS_DiagramPane1', 
     @value = N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
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
', 
     @level0type = N'SCHEMA', 
     @level0name = N'ItemDetail', 
     @level1type = N'VIEW', 
     @level1name = N'vwItems';
GO
EXEC sys.sp_addextendedproperty 
     @name = N'MS_DiagramPaneCount', 
     @value = 1, 
     @level0type = N'SCHEMA', 
     @level0name = N'ItemDetail', 
     @level1type = N'VIEW', 
     @level1name = N'vwItems';
GO