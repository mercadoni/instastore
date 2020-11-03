const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')



const app = express();
app.use(bodyParser.json());
app.use(cors());

const router = require('./src/routes');
router(app);





// Se inicia la aplicación en el puerto 3000. 
app.listen(3000, () => {
 console.log("API de instastore ");
});
