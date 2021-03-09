import express, {Request,Response} from 'express'
import mongoose from 'mongoose'
import {body} from 'express-validator'
import {requireAuth,validateRequest} from '@instastore/common'
import StoreController from '../controllers/store.controllers';
const router = express.Router();

const storeController  = new StoreController();
router.post('/api/stores',
 [
     body('storeId').not().isEmpty(),   
     body('storeName').not().isEmpty(),
     body('isOpen').not().isEmpty().toBoolean(),
     body('lat').not().isEmpty().toFloat(),
     body('lng').not().isEmpty().toFloat(),
 ],
 validateRequest,
 storeController.new
)

export {router as storeRouter}