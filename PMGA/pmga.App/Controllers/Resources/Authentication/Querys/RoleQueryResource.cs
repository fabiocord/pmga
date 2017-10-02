namespace pmga.Controllers.Resources.Authentication.Querys
{
    public class RoleQueryResource :  BaseQueryResource
    {
        public string Nome { get; set; }         
        public string Description { get; set; }
        public int? Active { get; set; }  
    }
}