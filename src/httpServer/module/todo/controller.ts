import * as path from 'path';
import { Request, Response, NextFunction } from 'express';
import ensureDto from 'util/ensureDto';
import { DbCollection } from 'database/common/databaseTypes';
import dbCreateDto from 'database/common/dbCreateDto';
import { TodoSchema, TodoCreateSchema, TodoCreateDto } from 'dto/Todo.dto';
import dbFindMany from 'database/common/dbFindMany';

export async function getTodos(req: Request, res: Response, next: NextFunction) {
  try {
    const todos = await dbFindMany<TodoSchema>({
      collection: DbCollection.todo,
      where: {},
    });
    res.json(todos);
  } catch (error) {
    next(error);
  }
}

export async function getAddTodo(req: Request, res: Response, next: NextFunction) {
  try {
    res.sendFile(path.join(__dirname, 'add-todo.html'));
  } catch (error) {
    next(error);
  }
}

export async function postAddTodo(req: Request, res: Response, next: NextFunction) {
  try {
    // const payload = ensureDto<TodoCreateSchema>(TodoCreateDto, req.body);
    const response = await dbCreateDto(TodoCreateDto, DbCollection.todo, req.body);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}
