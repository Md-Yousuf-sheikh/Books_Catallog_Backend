import express from 'express';
import { CategoryRoutes } from '../modules/Category/category.route';
import { UserRoutes } from '../modules/User/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: UserRoutes?.authRoute,
  },
  {
    path: '/users',
    routes: UserRoutes?.userRoute,
  },
  {
    path: '/profile',
    routes: UserRoutes?.profileRoute,
  },
  {
    path: '/categories',
    routes: CategoryRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
