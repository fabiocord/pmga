using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace pmga.Core.Domain.Authentication
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [StringLength(512)]
        public string Nome { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        public DateTime DataNascimento { get; set; }
        [Required]
        public string Documento { get; set; }
        [Required]
        public string Telefone1 { get; set; }
        public string Telefone2 { get; set; }
        [Required]
        public string Cep { get; set; }
        [Required]
        [StringLength(512)]
        public string Logradouro { get; set; }
        [StringLength(512)]
        public string Bairro { get; set; } 
        [StringLength(512)]
        public string Complemento { get; set; }
        [Required]
         [StringLength(2)]
        public string  UF { get; set; }
        [Required] 
        [StringLength(255)]
        public string Cidade { get; set; }        
        public bool ConfirmEmail { get; set; }
        public bool Active { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastAccess { get; set; }
        public int FacebookId { get; set; }   
        [Required]     
        public string Password { get; set; }
        public ICollection<UserPermission> Permissions {get; set;}
        public ICollection<UserRole> Roles {get; set;}

        public User()
        {
            Permissions = new Collection<UserPermission>();            
            Roles = new Collection<UserRole>();
        }
        
    }
}