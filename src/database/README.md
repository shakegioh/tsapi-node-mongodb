# src/database

Coloque suas queries aqui, de preferência começando com o prefixo db.

## Exemplos:

- dbListTodos();
- dbCreateUser();
- dbFilterTodos();

## Pasta `common`

A pasta common tem funções que podem auxiliar a execução de queries, como por exemplo: É possível inserir um registro no banco baseado no seu schema/dto `dbCreateDto<MySchema>(MyDto, myObject)`.

### Common helpers

- `dbCreateDto<Schema>(Dto, object)`: Cria um objeto baseado em seu schema/dto.
- `dbFindMany<Schema>(options)`: Lista registros de uma collection.
- `dbParseID(object)`: Recebe um objeto do banco e troca _id por id.
