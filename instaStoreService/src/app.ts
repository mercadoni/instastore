import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler,NotFoundError ,currentUser} from '@instastore/common'
import {storeRouter} from './routes/new'
import {indexStoreRouter} from './routes/index'

const app = express();

app.use(json())
app.set('trust proxy',true);


app.use(storeRouter)
app.use(indexStoreRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler)

export default app