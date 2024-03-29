USE [master]
GO

/****** Object:  Database [FPFL]    Script Date: 9/24/2021 7:21:52 AM ******/
DROP DATABASE [FPFL]
GO

/****** Object:  Database [FPFL]    Script Date: 9/24/2021 7:21:52 AM ******/
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

ALTER DATABASE [FPFL] SET  READ_WRITE 
GO


