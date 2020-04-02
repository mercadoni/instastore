const stores = [
  {
    name: 'Recoger en Tienda Cumbres',
    code: 'HEBPC2978',
    latitude: 25.8322,
    longitude: -100.2978,
    address: 'Ave. Paseo de los Leones No. 3399, Col. Cumbres',
    country: 'Mexico',
    city: 'Monterrey',
    state: 'Nuevo Leon',
  },
  {
    name: 'Recoger en tienda Chipinque',
    code: 'HEBPC2980',
    latitude: 25.749346,
    longitude: -100.259866,
    address: 'Ave. Gomez Morin #300, Col. del Valle',
    country: 'Mexico',
    city: 'Monterrey',
    state: 'Nuevo Leon',
  },
  {
    name: 'Recoger en tienda Sendero',
    code: 'HEBPC2979',
    latitude: 25.871035,
    longitude: -100.17329,
    address: 'Ave. Sendero Nte, Col #1001, Privadas de Anáhuac',
    country: 'Mexico',
    city: 'Monterrey',
    state: 'Nuevo Leon',
  },
  {
    name: 'Recoger en tienda Contry',
    code: 'HEBPC2951',
    latitude: 25.7261055,
    longitude: -100.1750157,
    address: 'Av. Eugenio Garza Sada 4321',
    country: 'Mexico',
    city: 'Monterrey',
    state: 'Nuevo Leon',
  },
  {
    name: 'Domicilios desde Cumbres',
    code: 'HEB2978',
    latitude: 25.7322,
    longitude: -100.3978,
    address: 'Ave. Paseo de los Leones No. 3399, Col. Cumbres',
    country: 'Mexico',
    city: 'Monterrey',
    state: 'Nuevo Leon',
  },
  {
    name: 'Domicilios desde eFC Zona Valle',
    code: 'HEB2992',
    latitude: 25.6764098,
    longitude: -100.3733956,
    address: 'AARON SAENZ 1717 COLONIA SANTA MARIA C.P.',
    country: 'Mexico',
    city: 'Monterrey',
    state: 'Nuevo Leon',
  },
  {
    name: 'Domicilio desde Sendero',
    code: 'HEB2979',
    latitude: 25.771035,
    longitude: -100.27329,
    address: 'Ave. Sendero Nte, Col #1001, Privadas de Anáhuac',
    country: 'Mexico',
    city: 'Monterrey',
    state: 'Nuevo Leon',
  },
  {
    name: 'Domicilios desde Contry',
    code: 'HEB2951',
    latitude: 25.6261055,
    longitude: -100.2750157,
    address: 'Av. Eugenio Garza Sada 4321',
    country: 'Mexico',
    city: 'Monterrey',
    state: 'Nuevo Leon',
  },
]

const Store = require('./api/model/store')
const dbService = require('./api/service/db')

const seed = async () => {
  try {
    await dbService.connectDB()
    console.log('seeding ...')
    await Store.create(stores).then(
      result => console.log('created ' + result),
    )
    console.log('finish')
  } catch (error) {
    console.log(error)
  } finally {
    await dbService.disconnectDB()
  }
}

module.exports = {
  stores,
  seed,
}
