import * as Joi from '@hapi/joi';

export interface TodoSchema {
  id?: string;
  description: string;
  done: boolean;
}

export const TodoDto = Joi.object<TodoSchema>({
  id: Joi.string(),
  description: Joi.string().required(),
  done: Joi.boolean().required().default(false),
});

export interface TodoCreateSchema {
  description: string;
  done: boolean;
}

export const TodoCreateDto = Joi.object<TodoCreateSchema>({
  description: Joi.string().required(),
  done: Joi.boolean().default(false),
});
