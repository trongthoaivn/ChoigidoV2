namespace Choigido.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("tblChessGame")]
    public partial class tblChessGame
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblChessGame()
        {
            tblPlayerMoves = new HashSet<tblPlayerMoves>();
        }

        [Key]
        [StringLength(50)]
        public string GameID { get; set; }

        public DateTime? GameStartDate { get; set; }

        public DateTime? GameEndDate { get; set; }

        [StringLength(50)]
        public string PlayerWhiteID { get; set; }

        [StringLength(50)]
        public string PlayerBlackID { get; set; }

        [StringLength(50)]
        public string PlayerID { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblPlayerMoves> tblPlayerMoves { get; set; }

        public virtual tblPlayer tblPlayer { get; set; }
    }
}
