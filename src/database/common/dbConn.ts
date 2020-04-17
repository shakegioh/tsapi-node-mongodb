import { MongoClient, Db } from 'mongodb';

const url = process.env.MONGODB_URL;
const dbname = process.env.MONGODB_DBNAME;

let mongoClient: MongoClient;

export default async function dbConn(): Promise<Db> {
  if (mongoClient) return getDatabase();

  try {
    mongoClient = await MongoClient.connect(url);
    console.log('[dbConn] Database ', mongoClient.isConnected ? 'Connected!' : 'NOT CONNECTED!!!');
    return getDatabase();
  } catch (error) {
    // @TODO ~ That's up to you fella
    throw error;
  }
}

function getDatabase(): Db {
  return mongoClient.db(dbname);
}
