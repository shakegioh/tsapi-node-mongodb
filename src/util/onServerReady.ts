import dbConn from 'database/common/dbConn';
import { DbCollection } from 'database/common/databaseTypes';
import dbCreateDto from 'database/common/dbCreateDto';
import { TodoCreateDto, TodoCreateSchema } from 'dto/Todo.dto';

/**
 * Esse arquivo é executado toda vez que o servidor começa a rodar e conectar ao banco.
 * (exemplo: "yarn local" ou "yarn production")
 *
 * É seguro fazer qualquer coisa que envolva o banco de dados.
 */
export default async function onServerReady() {
  // @TODO
  console.info('[onServerReady] Edite-me em: src/util/onServerReady');

  // @START DATABASE_SEED
  // Você pode apagar o bloco de código a seguir com segurança
  // Quando você apagar esse código, por favor remova a variável de ambiente também
  if (process.env.ON_SERVER_READY_SEED_DATABASE === 'yes') {
    // O código a seguir é um exemplo de database seed
    const db = await dbConn();
    const countTodos = await db.collection(DbCollection.todo).countDocuments();

    if (countTodos) {
      console.info('---------------------------');
      console.info('[onServerReady] Já tem "todos" no banco de dados, então não vou criar novas todos');
      console.info('---------------------------');
    } else {
      console.info('---------------------------');
      console.info('[onServerReady] Não há nenhum registro no banco de dados, então vou criar algumas todos');
      console.info('[onServerReady] Para desativar, edite o arquivo .env e src/util/onServerReady');
      console.info('---------------------------');

      await dbCreateDto<TodoCreateSchema>(TodoCreateDto, DbCollection.todo, {
        description: 'Install dependencies',
        done: true,
      });

      await dbCreateDto<TodoCreateSchema>(TodoCreateDto, DbCollection.todo, {
        description: 'Run local server',
        done: true,
      });

      await dbCreateDto<TodoCreateSchema>(TodoCreateDto, DbCollection.todo, {
        description: 'Seed database',
        done: true,
      });

      await dbCreateDto<TodoCreateSchema>(TodoCreateDto, DbCollection.todo, {
        description: 'Remove TODOs and do what you gotta do',
        done: false,
      });
    }
  }
  // @END DATABASE_SEED
}
