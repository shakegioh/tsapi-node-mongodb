import { Router } from 'express';
import core from './module/core/router';
import todo from './module/todo/router';

const routes: Router[] = [
  core,
  todo,
];

export default routes;
