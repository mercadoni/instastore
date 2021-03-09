// Este archivo se utiliza unicamente para setear el puerto

import app from './app';

const port = process.env.PORT || 4000

app.listen(port);

console.log('Server listen on port', port);
