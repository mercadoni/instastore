// Importaciones, instancias y configuracion basica
import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import getStore from './routes/getStore.routes';

const app = express();
const cors = require('cors')

app.use(cors())

app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Peticion para mostrar informacion del autor
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
    repository: app.get('pkg').repository
  });
});

// Declaracion de la ruta de la aplicacion
app.use('/getStore', getStore);

export default app;
