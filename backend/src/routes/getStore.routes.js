import { Router } from 'express';
import * as getStoreCtrl from '../controllers/getStore.controller';
const router = Router();

router.post('/', getStoreCtrl.closestStore);

export default router;
