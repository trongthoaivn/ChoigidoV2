namespace Choigido.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tblPlayerMoves
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long MoveID { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string GameID { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(50)]
        public string PlayerID { get; set; }

        [Key]
        [Column(Order = 3)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int PieceID { get; set; }

        public DateTime? MoveDate { get; set; }

        [StringLength(1)]
        public string PositionLetter { get; set; }

        public short? PositionNumber { get; set; }

        public virtual tblChessGame tblChessGame { get; set; }

        public virtual tblChessPieces tblChessPieces { get; set; }

        public virtual tblPlayer tblPlayer { get; set; }
    }
}
