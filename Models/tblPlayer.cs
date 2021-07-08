namespace Choigido.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("tblPlayer")]
    public partial class tblPlayer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblPlayer()
        {
            tblChessGame = new HashSet<tblChessGame>();
            tblPlayerMoves = new HashSet<tblPlayerMoves>();
        }

        [Key]
        [StringLength(50)]
        public string PlayerID { get; set; }

        [StringLength(50)]
        public string PlayerName { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblChessGame> tblChessGame { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblPlayerMoves> tblPlayerMoves { get; set; }
    }
}
