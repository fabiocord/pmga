using System.ComponentModel.DataAnnotations.Schema;

namespace pmga.Core.Domain.Authentication
{
    [Table("UserPermissions")]
    public class UserPermission
    {
        public int UserId { get; set; }
        public int PermissionId { get; set; }
        public User User { get; set; }
        public Permission Permission { get; set; }
    }
}