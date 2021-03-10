import { requireAuth } from '@instastore/common';
import express, { Request, Response } from 'express'
import StoreController from '../controllers/store.controllers';

const router = express.Router();
const storeController = new StoreController();

router.get('/api/stores', storeController.getStores)

export { router as indexStoreRouter }