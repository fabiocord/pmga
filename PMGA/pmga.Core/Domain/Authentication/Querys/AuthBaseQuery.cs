using System;
using pmga.Core.Extensions;

namespace pmga.Core.Domain.Authentication.Querys
{
    public class AuthBaseQuery : IQueryObject
    {
        public string SortBy {get;set;}
        public bool IsSortAscending {get;set; }
        public int Page { get;set; }
        public byte PageSize {get;set; }
    }
}