import * as Joi from '@hapi/joi';
import H400Exception from '../exception/H400Exception';

export default function ensureDto<T>(dto: Joi.Schema, obj: any) {
  const validated = dto.validate(obj);
  if (validated.error) {
    throw new H400Exception(validated.error.message);
  }
  return validated.value as T;
}
