import Joi from '@hapi/joi';
import ensureDto from 'util/ensureDto';
import dbConn from './dbConn';
import { DbCollection } from 'database/common/databaseTypes';

export default async function dbCreateDto<T>(dto: Joi.Schema, collection: DbCollection, object: T) {
  const parsedObject = ensureDto<T>(dto, object);
  const db = await dbConn();
  return await db.collection(collection).insertOne(parsedObject);
}
