import express from 'express';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
