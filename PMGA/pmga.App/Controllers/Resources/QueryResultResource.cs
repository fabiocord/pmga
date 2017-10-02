using System.Collections.Generic;

namespace pmga.Controllers.Resources
{
    public class QueryResultResource<T>
    {    
        public int TotalItems { get; set; }
        public IEnumerable<T> Items { get; set; }
    
    }
}