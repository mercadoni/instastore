import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import fakeData from "./controllers/data-store"
import { errorHandler,NotFoundError ,currentUser} from '@instastore/common'
import {storeRouter} from './routes/new'
import {indexStoreRouter} from './routes/index'
import {showStoreRouter} from './routes/show'


const app = express();

app.use(json())
app.set('trust proxy',true);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(storeRouter)
app.use(indexStoreRouter)
app.use(showStoreRouter)


fakeData()
app.all('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler)

export default app