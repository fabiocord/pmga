using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace pmga.Controllers.Resources.Authentication
{
    public class UserResource
    {
        public int Id { get; set; }        
        public string Nome { get; set; }        
        public string Email { get; set; }        
        public DateTime DataNascimento { get; set; }        
        public string Documento { get; set; }        
        public string Telefone1 { get; set; }
        public string Telefone2 { get; set; }        
        public string Cep { get; set; }
        public string Bairro { get; set; }       
        public string Logradouro { get; set; }        
        public string Complemento { get; set; }        
        public string  UF { get; set; }        
        public string Cidade { get; set; }        
        public bool ConfirmEmail { get; set; }
        public bool Active { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastAccess { get; set; }
        public int FacebookId { get; set; }
        public string Password { get; set; }
        public ICollection<PermissionResource> Permissions {get; set;}
        public RoleResource Role {get; set;}

        public UserResource()
        {
            Permissions = new Collection<PermissionResource>();            
        }
    }
}