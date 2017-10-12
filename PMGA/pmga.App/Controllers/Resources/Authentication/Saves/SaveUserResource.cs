using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace pmga.Controllers.Resources.Authentication.Saves
{
    public class SaveUserResource
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
        public ICollection<int> Permissions {get; set;}
        public int RoleId {get; set;}

        public SaveUserResource()
        {
            Permissions = new Collection<int>();            
        }
    }
}