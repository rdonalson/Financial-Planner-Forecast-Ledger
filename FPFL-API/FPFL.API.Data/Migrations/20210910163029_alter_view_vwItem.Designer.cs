﻿// <auto-generated />
using System;
using FPFL.API.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FPFL.API.Data.Migrations
{
    [DbContext(typeof(FPFLContext))]
    [Migration("20210910163029_alter_view_vwItem")]
    partial class alter_view_vwItem
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FPFL.API.Data.Domain.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal?>("Amount")
                        .HasColumnType("money");

                    b.Property<int?>("AnnualDom")
                        .HasColumnType("int");

                    b.Property<int?>("AnnualMoy")
                        .HasColumnType("int");

                    b.Property<DateTime?>("BeginDate")
                        .HasColumnType("date");

                    b.Property<int?>("BiMonthlyDay1")
                        .HasColumnType("int");

                    b.Property<int?>("BiMonthlyDay2")
                        .HasColumnType("int");

                    b.Property<bool>("DateRangeReq")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("date");

                    b.Property<int?>("EverOtherWeekDow")
                        .HasColumnType("int");

                    b.Property<int?>("FkItemType")
                        .HasColumnType("int");

                    b.Property<int?>("FkPeriod")
                        .HasColumnType("int");

                    b.Property<int?>("MonthlyDom")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<int?>("Quarterly1Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly1Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly2Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly2Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly3Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly3Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly4Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly4Month")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual1Day")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual1Month")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual2Day")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual2Month")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("WeeklyDow")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FkItemType");

                    b.HasIndex("FkPeriod");

                    b.ToTable("Items", "ItemDetail");
                });

            modelBuilder.Entity("FPFL.API.Data.Domain.ItemType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.HasKey("Id");

                    b.ToTable("ItemTypes", "ItemDetail");
                });

            modelBuilder.Entity("FPFL.API.Data.Domain.Ledger", b =>
                {
                    b.Property<double?>("Amount")
                        .HasColumnType("float");

                    b.Property<double>("CreditSummary")
                        .HasColumnType("float");

                    b.Property<double>("DebitSummary")
                        .HasColumnType("float");

                    b.Property<int?>("ItemType")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Net")
                        .HasColumnType("float");

                    b.Property<DateTime?>("OccurrenceDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("PeriodName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RollupKey")
                        .HasColumnType("int");

                    b.Property<double>("RunningTotal")
                        .HasColumnType("float");

                    b.Property<DateTime>("WDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.ToTable("Ledgers", t => t.ExcludeFromMigrations());
                });

            modelBuilder.Entity("FPFL.API.Data.Domain.Period", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.HasKey("Id");

                    b.ToTable("Periods", "ItemDetail");
                });

            modelBuilder.Entity("FPFL.API.Data.Domain.VwItem", b =>
                {
                    b.Property<decimal?>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("AnnualDom")
                        .HasColumnType("int");

                    b.Property<int?>("AnnualMoy")
                        .HasColumnType("int");

                    b.Property<DateTime?>("BeginDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("BiMonthlyDay1")
                        .HasColumnType("int");

                    b.Property<int?>("BiMonthlyDay2")
                        .HasColumnType("int");

                    b.Property<bool>("DateRangeReq")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("EverOtherWeekDow")
                        .HasColumnType("int");

                    b.Property<int?>("FkItemType")
                        .HasColumnType("int");

                    b.Property<int?>("FkPeriod")
                        .HasColumnType("int");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("ItemType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("MonthlyDom")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Period")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Quarterly1Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly1Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly2Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly2Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly3Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly3Month")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly4Day")
                        .HasColumnType("int");

                    b.Property<int?>("Quarterly4Month")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual1Day")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual1Month")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual2Day")
                        .HasColumnType("int");

                    b.Property<int?>("SemiAnnual2Month")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("WeeklyDow")
                        .HasColumnType("int");

                    b.ToView("vwItems", "ItemDetail");
                });

            modelBuilder.Entity("FPFL.API.Data.Domain.Item", b =>
                {
                    b.HasOne("FPFL.API.Data.Domain.ItemType", "ItemType")
                        .WithMany("Items")
                        .HasForeignKey("FkItemType")
                        .HasConstraintName("FK_Items_ItemType");

                    b.HasOne("FPFL.API.Data.Domain.Period", "Period")
                        .WithMany("Items")
                        .HasForeignKey("FkPeriod")
                        .HasConstraintName("FK_Items_Periods");

                    b.Navigation("ItemType");

                    b.Navigation("Period");
                });

            modelBuilder.Entity("FPFL.API.Data.Domain.ItemType", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("FPFL.API.Data.Domain.Period", b =>
                {
                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}
