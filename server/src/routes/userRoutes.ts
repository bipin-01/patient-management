import { Router } from 'express';

import * as UserController from '../controllers/user';

const router = Router();

// Register new User
router.post('/', UserController.create);
router.post('/login', UserController.authUser);

export default router;
