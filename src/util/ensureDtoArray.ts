import * as Joi from '@hapi/joi';
import H400Exception from '../exception/H400Exception';

export default function ensureDtoArray<T>(dto: Joi.Schema, objArray: any[]) {
  // tslint:disable-next-line:forin
  for (const idx in objArray) {
    const obj = objArray[idx];
    const validated = dto.validate(obj);

    if (validated.error) {
      throw new H400Exception(`${validated.error.message} - index: ${idx}`);
    }
  }
  return objArray as unknown as T[];
}
