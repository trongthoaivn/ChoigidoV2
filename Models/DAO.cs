using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Choigido.Models
{
    public partial class DAO : DbContext
    {
        public DAO()
            : base("name=DefaultConnection")
        {
        }

        public virtual DbSet<tblChessGame> tblChessGame { get; set; }
        public virtual DbSet<tblChessPieces> tblChessPieces { get; set; }
        public virtual DbSet<tblPlayer> tblPlayer { get; set; }
        public virtual DbSet<tblPlayerMoves> tblPlayerMoves { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tblChessGame>()
                .Property(e => e.GameID)
                .IsUnicode(false);

            modelBuilder.Entity<tblChessGame>()
                .Property(e => e.PlayerWhiteID)
                .IsUnicode(false);

            modelBuilder.Entity<tblChessGame>()
                .Property(e => e.PlayerBlackID)
                .IsUnicode(false);

            modelBuilder.Entity<tblChessGame>()
                .Property(e => e.PlayerID)
                .IsUnicode(false);

            modelBuilder.Entity<tblChessGame>()
                .HasMany(e => e.tblPlayerMoves)
                .WithRequired(e => e.tblChessGame)
                .HasForeignKey(e => e.PlayerID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<tblChessPieces>()
                .HasMany(e => e.tblPlayerMoves)
                .WithRequired(e => e.tblChessPieces)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<tblPlayer>()
                .Property(e => e.PlayerID)
                .IsUnicode(false);

            modelBuilder.Entity<tblPlayer>()
                .HasMany(e => e.tblPlayerMoves)
                .WithRequired(e => e.tblPlayer)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<tblPlayerMoves>()
                .Property(e => e.GameID)
                .IsUnicode(false);

            modelBuilder.Entity<tblPlayerMoves>()
                .Property(e => e.PlayerID)
                .IsUnicode(false);

            modelBuilder.Entity<tblPlayerMoves>()
                .Property(e => e.PositionLetter)
                .IsFixedLength()
                .IsUnicode(false);
        }
    }
}
