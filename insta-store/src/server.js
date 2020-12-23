require('dotenv').config({ path: 'ENV_FILENAME' });

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {userNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("connected "));

app.use(express.json());
/*
const storesRouter = require('./routes/stores')
app.use('/stores', storesRouter)
*/
app.listen(3000, () => console.log('Server Started'));
