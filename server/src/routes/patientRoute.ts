import { protect } from '@/middlewares/authMiddleware';
import { Router } from 'express';

import * as PatientController from '../controllers/patients';

const router = Router();

// router.post('/', UserController.create);
router.get('/', protect, PatientController.fetchAll);
router.get('/:id',PatientController.fetchById);
router.post('/create', protect, PatientController.create);
router.put('/:id',protect,  PatientController.update);
router.delete('/:id', PatientController.deleteById);

export default router;
