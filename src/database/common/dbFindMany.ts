import { DbCollection } from 'database/database-types';
import { FilterQuery } from 'mongodb';
import dbConn from './dbConn';
import dbParseID from './dbParseID';

type FindArrayOptions<T> = {
  collection: DbCollection;
  where: FilterQuery<T>;
};

export default async function dbFindArray<T>(req: FindArrayOptions<T>) {
  const db = await dbConn();
  return (await db.collection<T>(req.collection).find(req.where).toArray())
    .map(dbParseID);
}
