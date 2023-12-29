using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Todo_App.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Todo_App.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<ToDoItemModel> ToDoItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ToDoItemModel>(entity =>
            {
                entity.Property(e => e.ItemName)
                .IsRequired()
                .HasMaxLength(100);
                entity.Property(e => e.ItemDescription)
                .HasMaxLength(100);
                entity.Property(e => e.ItemStatus)
                .HasMaxLength(1);
            });

            base.OnModelCreating(builder);
        }
    }
}
