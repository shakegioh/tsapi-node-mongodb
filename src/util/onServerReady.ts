import dbConn from 'database/common/dbConn';
import { DbCollection } from 'database/common/databaseTypes';
import dbCreateDto from 'database/common/dbCreateDto';
import { TodoCreateDto, TodoCreateSchema } from 'dto/Todo.dto';
import logger from './logger';

/**
 * Esse arquivo é executado toda vez que o servidor começa a rodar e conectar ao banco.
 * (exemplo: "yarn local" ou "yarn production")
 *
 * É seguro fazer qualquer coisa que envolva o banco de dados.
 */
export default async function onServerReady() {
  // @TODO ~ Essa função pode fazer o que você quiser
  logger.warn('[onServerReady] Edite-me em: src/util/onServerReady');

  // @START DATABASE_SEED
  // Você pode apagar o bloco de código a seguir com segurança
  // O código a seguir é um exemplo de database seed
  const db = await dbConn();
  const countTodos = await db.collection(DbCollection.todo).countDocuments();

  if (countTodos) {
    logger.debug('---------------------------');
    logger.debug('[onServerReady] Já tem "todos" no banco de dados, então não vou criar novas todos');
    logger.debug('---------------------------');
  } else {
    logger.debug('---------------------------');
    logger.debug('[onServerReady] Não há nenhum registro no banco de dados, então vou criar algumas todos');
    logger.debug('[onServerReady] Para desativar, edite o arquivo .env e src/util/onServerReady');
    logger.debug('---------------------------');

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

    logger.debug('[onServerReady] Todos inseridas no banco de dados');
  }
  // @END DATABASE_SEED
}
