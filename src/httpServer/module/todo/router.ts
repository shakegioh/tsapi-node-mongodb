import { Router } from 'express';
import * as controller from './controller';

const router = Router();

const path = '/todos';

router.get(
  `${path}`,
  controller.getTodos,
);

router.get(
  `${path}/add`,
  controller.getAddTodo,
);

router.post(
  `${path}/add`,
  controller.postAddTodo,
);

export default router;
