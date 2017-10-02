using pmga.Core.Domain.Authentication;
using Microsoft.EntityFrameworkCore;


namespace pmga.Data.Infrastructure.Data
{
    public class PmgaDbContext : DbContext
    {        
        public DbSet<User> Users {get; set;}
        public DbSet<Role> Roles {get; set;}
        public DbSet<Permission> Permissions { get; set; }        
        
        public PmgaDbContext(DbContextOptions<PmgaDbContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=FABIONTB\SQLEXPRESS;database=spmga;Integrated security=SSPI");            
            //optionsBuilder.UseSqlServer( Configuration.GetConnectionString("Default"));            
           
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<UserPermission>().HasKey(up =>
              new { up.UserId, up.PermissionId });  

            modelBuilder.Entity<UserRole>().HasKey(ur =>
              new { ur.UserId, ur.RoleId });    

            modelBuilder.Entity<RolePermission>().HasKey(rp =>
              new { rp.RoleId, rp.PermissionId});      
        }

    }
}

