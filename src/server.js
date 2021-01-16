const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/v1', routes);

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
