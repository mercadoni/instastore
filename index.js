const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
 res.json({"store":"first"});
});

app.listen(process.env.PORT, function(){ console.log('Node server listening on port ' + process.env.PORT);});