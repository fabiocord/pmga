using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmga.Data.Migrations
{
    public partial class seedPermission : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var vsql = "INSERT INTO Permissions (Nome,Description,Active,CreationDate,Path,ParentId)  VALUES ";
            string[] valores = {
                "('Raiz','Inicio de Sistema',1,'2017-07-07','./home',NULL)",
                    "('Admin','Painel Administrativo',1,'2017-07-07','./admin',(Select id from permissions where nome = 'Raiz'))",
                        "('Permissions','Permissões',1,'2017-07-07','./admin/permissions',(Select id from permissions where nome = 'Admin'))",
                            "('Inclusão','Insclusão de Permissão',1,'2017-07-07','./admin/permissions/new',(Select id from permissions where nome = 'Permissions'))",
                            "('Edição','Edição de Permissão',1,'2017-07-07','./admin/permissions/:id',(Select id from permissions where nome = 'Permissions'))",
                            "('Exclusão','Exclusão de Permissão',1,'2017-07-07','./admin/permissions/:id',(Select id from permissions where nome = 'Permissions'))",
                        "('Roles','Regras',1,'2017-07-07','./admin/roles',(Select id from permissions where nome = 'Admin'))",
                            "('Inclusão','Inclusão de Regra',1,'2017-07-07','./admin/roles/new',(Select id from permissions where nome = 'Roles'))",
                            "('Edição','Edição de Regra',1,'2017-07-07','./admin/roles/:id',(Select id from permissions where nome = 'Roles'))",
                            "('Exclusão','Exclusão de Regra',1,'2017-07-07','./admin/roles/:id',(Select id from permissions where nome = 'Roles'))",
                        "('Users','Usuários',1,'2017-07-07','./admin/users',(Select id from permissions where nome = 'Admin'))",
                            "('Inclusão','Inclusão de usuário',1,'2017-07-07','./admin/users/new',(Select id from permissions where nome = 'Users'))",
                            "('Edição','Edição de usuário',1,'2017-07-07','./admin/users/:id',(Select id from permissions where nome = 'Users'))",
                            "('Exclusão','Exclusão de usuário',1,'2017-07-07','./admin/users/:id',(Select id from permissions where nome = 'Users'))"
            };

            foreach (string valor in valores)
                migrationBuilder.Sql(String.Concat(vsql, valor));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Permissions");
        }
    }
}
