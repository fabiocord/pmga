namespace pmga.Controllers.Resources
{
    public class BaseQueryResource
    {
        public string SortBy { get;set;}
        public bool IsSortAscending { get; set; }
        public int Page { get; set; }
        public byte PageSize { get; set; }
    }
}