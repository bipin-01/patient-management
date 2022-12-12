import { Router } from 'express';

import config from 'config';

import authMiddleware from 'middlewares/auth';

import patientRoute from './patientRoute';
import userRoutes from './userRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    app: config.app.name,
    version: config.app.version
  });
});

// Authentication
// router.use(authMiddleware);

router.use('/mypatients', patientRoute);
router.use('/user', userRoutes);

// Authenticated routes

export default router;
