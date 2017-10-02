using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace pmga.Core.Domain.Authentication.Querys
{
    public class UserQuery : AuthBaseQuery
    {
        public string Nome { get; set; }        
        public string Email { get; set; }        
        public string Documento { get; set; }        
        public string Telefone1 { get; set; }        
        public string Telefone2 { get; set; }        
        public string  UF { get; set; }        
        public string Cidade { get; set; }        
        public int? ConfirmEmail { get; set; }
        public int? Active { get; set; }        
    }
}