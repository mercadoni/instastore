const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const config = require('./config/config');
const {logger, expressLogger} = require('./util/log');

const PORT = config.port || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(expressLogger);

app.use('/v1', routes);

app.listen(PORT, () => {
    logger.info('Server running on port %d', PORT);
});
