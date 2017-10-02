using System.Collections.Generic;

namespace pmga.Core.Domain
{
    public class QueryResult<T>
    {
        public int TotalItems { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}