using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Todo_App.Models
{
    public class ToDoItemModel
    {
        [Key]
        public int ItemId { get; set; }

        [Required(ErrorMessage = "ItemName is required")]
        [Column(TypeName = "nvarchar(100)")]
        public string ItemName { get; set; }

        //[Required(ErrorMessage = "ItemDescription is required")]
        [Column(TypeName = "nvarchar(100)")]
        public string ItemDescription { get; set; }

        //[Required(ErrorMessage = "ItemStatus is required")]
        [Column(TypeName = "bit")]
        public bool ItemStatus { get; set; }


        [Required(ErrorMessage = "Progress is required")]
        public int Progress { get; set; }


        [Required(ErrorMessage = "Email is required")]
        [Column(TypeName = "nvarchar(255)")]
        public string Email { get; set; }


        [Required(ErrorMessage = "Date is required")]
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }

    }
}
