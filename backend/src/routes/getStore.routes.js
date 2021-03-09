import { Router } from 'express';
import * as getStoreCtrl from '../controllers/getStore.controller';
const router = Router();

// Declaracion de metodo post y su posterior llamado a la funcion del controller
router.post('/', getStoreCtrl.closestStore);

export default router;
