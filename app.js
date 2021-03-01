const express = require('express');
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

//config express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
const keyJwt = "keyJwt";
app.set(keyJwt, 'abc123456@');

const port = 3000;

//database
//var url = "mongodb://localhost:27017/";
var url = "mongodb+srv://andreti:uBT8S2RTmFk1sGNL@cluster0.kckxm.mongodb.net/instastore?retryWrites=true&w=majority";
const nameDB = "instastore";
const nameCollectionStores = "stores";
const nameCollectionUsers = "users";
const nameCollectionLogRequest = "log_request";


//middleware
const rutasProtegidas = express.Router();

/**
 * Realiza la validación si el token es valido o invalido
 */
rutasProtegidas.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, app.get(keyJwt), (err, decoded) => {
      if (err) {
        return res.status(401).send({ mensaje: 'Sin autorización' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ mensaje: 'Sin autorización' });
  }
});


/**
 * Escuchar peticiones
 */
app.listen(port, () => {

  MongoClient.connect(url, async function (err, db) {
    if (err) { console.log('------------error', err); return; }
    else{
      console.log('conectado');
    }

    var dbo = db.db(nameDB);
    const listCollections = await dbo.listCollections().toArray();
    const existData = listCollections.filter(x => x.name == nameCollectionStores);
    if (!existData || existData.length == 0) {
      const lstStores = [];
      const dateInit = new Date();
      dateInit.setDate(dateInit.getDate() + 1);
      dateInit.setHours(0);
      dateInit.setMinutes(0);
      dateInit.setSeconds(0);
      const dateEnd = new Date();
      dateEnd.setDate(dateEnd.getDate() + 1);
      dateEnd.setHours(23);
      dateEnd.setMinutes(59);
      dateEnd.setSeconds(59);
      for (let i = 1; i <= 1000; i++) {
        const nextDeliveryTime = getRandomDate(dateInit, dateEnd);
        var obj = {
          "storeId": "HEB" + i,
          "storeName": "Tienda #" + i,
          "isOpen": i % 2 == 0,
          "latitude": getCoordinateRandom(-100, 100),
          "longitude": getCoordinateRandom(-100, 100),
          "nextDeliveryTime": nextDeliveryTime.getHours() + '-' + nextDeliveryTime.getMinutes() + '-' + nextDeliveryTime.getSeconds()
        };
        lstStores.push(obj);
      }

      dbo.collection(nameCollectionStores).insertMany(lstStores, function (err, resp) {
        if (err) {
          console.log(err);
        };
        db.close();
      });
    }
    console.log(`App Instastore Listening at http://localhost:${port}`)

  });


})


//--------------------------------------- FUNCIONES /-----------------------------------

/**
 * Funcion para generar un valor aleatorio
 * @param {*} min
 * @param {*} max
 */
function getCoordinateRandom(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Funcion para generar una fecha aleatoria
 * @param {*} start
 * @param {*} end
 */
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

/**
 * Se encarga de encriptar la contraseña
 * @param {*} password
 */
function getSha256(password) {
  return crypto.createHash('sha256').update(password).digest('base64');
}

/**
 * Funcion que calcula la distancia entre dos puntos
 * @param {*} lat1 
 * @param {*} lon1 
 * @param {*} lat2 
 * @param {*} lon2 
 */
function getDistance(lat1, lon1, lat2, lon2) {
  rad = function (x) { return x * Math.PI / 180; }
  var R = 6378.137;
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

/**
 * Genera el token
 */
function generateToken() {
  const payload = {
    check: true
  };
  const token = jwt.sign(payload, app.get(keyJwt), {
    expiresIn: 1440
  });
  return token;
}

/**
 * Retorna error 500
 * @param {*} res 
 */
function sendError(res) {
  res.status(500).send({ msg: "Ocurrio un error!" });
}

/**
 * Retorna error 400
 * @param {*} res 
 */
function sendBadRequest(res) {
  res.status(400).send("Modelo invalido");
}

/**
 * Funcion que busca la tienda mas cercana
 * @param {*} lst 
 */
function getClosestStore(lst, latitude, longitude) {
  let closestStore = null;
  lst.forEach(x => {
    if (!closestStore) {
      closestStore = x;
      distance = getDistance(latitude, longitude, x.latitude, x.longitude);
    } else {
      const distanceTemp = getDistance(latitude, longitude, x.latitude, x.longitude);
      if (distanceTemp < distance) {
        closestStore = x;
        distance = distanceTemp;
      }
    }
  });

  const nextDeliveryTime = new Date();
  nextDeliveryTime.setDate(nextDeliveryTime.getDate() + 1);
  const splitDate = String(closestStore.nextDeliveryTime).split('-');
  nextDeliveryTime.setHours(splitDate[0]);
  nextDeliveryTime.setMinutes(splitDate[1]);
  nextDeliveryTime.setSeconds(splitDate[2]);
  closestStore.nextDeliveryTime = nextDeliveryTime;

  closestStore._id = undefined;
  return closestStore;
}

//--------------------------------------- ENDPOINTS /-----------------------------------


/**
 * Metodo para realizaro login
 */
app.post('/login', function (req, res) {

  if (!req || !req.body || !req.body.username || !req.body.password) {
    sendBadRequest(res);
  } else {

    var username = req.body.username;
    var password = req.body.password;

    MongoClient.connect(url, async function (err, db) {
      if (err) {
        sendError(res);
      } else {

        var dbo = db.db(nameDB);
        const collection = dbo.collection(nameCollectionUsers);

        if (collection) {

          const query = {
            username: username,
            password: getSha256(password)
          };

          const userFinded = await collection.findOne(query);

          const logRequest = {
            username: username,
            date_request: new Date(),
            path_request: '/login',
            token_generated: '',
            detail: ''
          }


          if (userFinded) {

            const token = generateToken();

            logRequest.token_generated = token;
            logRequest.detail = 'usuario_logueado';

            dbo.collection(nameCollectionLogRequest).insertOne(logRequest, function (errLog, respLog) {
              res.status(200).send({ username: username, token: token, msg: 'Autenticado' });
            });

          } else {
            logRequest.detail = 'Usuario o contraseña invalido';
            dbo.collection(nameCollectionLogRequest).insertOne(logRequest, function (errLog, respLog) {
              res.status(200).send({ msg: 'Usuario o contraseña invalido' });
            });
          }
        }
      }
      db.close();
    });
  }

});

/**
 * Metodo para realizar registro de usuario
 */
app.post('/register', function (req, res) {
  let username, password, repeatPassword = undefined;
  try {
    username = req.body.username;
    password = req.body.password;
    repeatPassword = req.body.repeatPassword;
  } catch (err) {
    sendBadRequest(res);
  }


  if (password && repeatPassword && String(password) !== String(repeatPassword)) {
    res.status(400).send({ msg: "Las contraseñas no coinciden" });
  } else if (!username || username == "" || !password && password == "" || !repeatPassword && repeatPassword == "") {
    sendBadRequest(res);
  } else {

    MongoClient.connect(url, async function (err, db) {
      if (err) {
        sendError(res);
      } else {
        var dbo = db.db(nameDB);
        const collection = dbo.collection(nameCollectionUsers);
        let save = true;

        if (collection) {
          const query = { username: username };
          const userFinded = await collection.findOne(query);
          if (userFinded) {
            save = false;
            res.status(400).send({ msg: "El usuario ya se encuentra registrado" });
          }
        }

        if (save) {
          const newUser = {
            username: username,
            password: getSha256(password),
            register: new Date().toString()
          }
          const resp = await dbo.collection(nameCollectionUsers).insertOne(newUser);
          if (resp && resp.result && resp.result.ok == 1) {

            const logRequest = {
              username: username,
              date_request: new Date(),
              path_request: '/register',
              token_generated: '',
              detail: 'usuario registrado'
            }

            dbo.collection(nameCollectionLogRequest).insertOne(logRequest, function (errLog, respLog) {
              res.status(200).send({ msg: "Usuario registrado con exito!" });
            });

          } else {
            sendError(res);
          }
        }
      }
      db.close();

    });
  }
});

/**
 * Metodo para buscar la tienda disponible mas cercana
 */
app.post('/closest-store', rutasProtegidas, function (req, res) {

  let username, latitude, longitude;
  try {
    username = req.body.username;
    latitude = isNaN(req.body.latitude) ? undefined : Number(req.body.latitude);
    longitude = isNaN(req.body.longitude) ? undefined : Number(req.body.longitude);
  } catch (err) {
    sendBadRequest(res);
    return;
  }

  if (!username || longitude == undefined || latitude == undefined) {
    sendBadRequest(res)
  } else {
    MongoClient.connect(url, async function (err, db) {
      if (err) {
        sendError(res);
      } else {
        var dbo = db.db(nameDB);
        const lst = await dbo.collection(nameCollectionStores).find().toArray();

        const logRequest = {
          username: username,
          date_request: new Date(),
          path_request: '/closest-store',
          token_generated: '',
          detail: 'consulta de tiendas mas cercanas'
        }

        await dbo.collection(nameCollectionLogRequest).insertOne(logRequest);

        if (!lst || lst.length == 0) {
          res.status(200).send({});
        } else {
          const closestStore = getClosestStore(lst, latitude, longitude);
          res.status(200).send(closestStore);
        }
        db.close();
      }

    });
  }
});

