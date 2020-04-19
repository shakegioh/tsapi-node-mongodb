import { MongoClient, Db } from 'mongodb';
import logger from 'util/logger';

const url = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;
const dbname = process.env.MONGODB_DBNAME;

let mongoClient: MongoClient;

export default async function dbConn(): Promise<Db> {
  if (mongoClient) return getDatabase();

  try {
    mongoClient = await MongoClient.connect(url);

    if (mongoClient.isConnected) {
      logger.info('[dbConn] Database Connected!', { url, dbname });
    } else {
      logger.error('[dbConn] Database NOT CONNECTED!', { url, dbname });
    }
    return getDatabase();
  } catch (error) {
    // @TODO ~ That's up to you fella
    throw error;
  }
}

function getDatabase(): Db {
  return mongoClient.db(dbname);
}
