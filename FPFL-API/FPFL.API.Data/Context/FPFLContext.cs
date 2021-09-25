using FPFL.API.Data.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace FPFL.API.Data.Context
{
    public partial class FPFLContext : DbContext
    {
        private readonly string Conn = "";  // When creating structure add a connection string

        public FPFLContext() { }
        public FPFLContext(DbContextOptions<FPFLContext> options) : base(options) { }

        public virtual DbSet<ItemType> ItemTypes { get; set; }
        public virtual DbSet<Period> Periods { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Ledger> Ledgers { get; set; }
        public virtual DbSet<VwItem> VwItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Conn);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ledger>().Metadata.SetIsTableExcludedFromMigrations(true);

            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<ItemType>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("ItemTypes", "ItemDetail");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(25);
            });

            modelBuilder.Entity<Period>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Periods", "ItemDetail");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(75);
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Items", "ItemDetail");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.BeginDate).HasColumnType("date");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(75);

                entity.HasOne(d => d.ItemType)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.FkItemType)
                    .HasConstraintName("FK_Items_ItemType");

                entity.HasOne(d => d.Period)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.FkPeriod)
                    .HasConstraintName("FK_Items_Periods");
            });

            modelBuilder.Entity<Ledger>(entity =>
            {
                entity.HasNoKey();
            });

            modelBuilder.Entity<VwItem>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vwItems", "ItemDetail");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
