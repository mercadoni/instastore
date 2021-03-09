import { locations } from "./../utils/locations";
import findNearestLocation from "map-nearest-location";
import moment from "moment";
require("dotenv").config();
const fetch = require("node-fetch");

// Funcion principal que se encarga de realizar la logica de la peticion

export const getStoreProcess = async (request) => {
  // Funcion que verifica que los datos de la peticion sean correctos
  checkCoordinates(request);

  // Mapeo de la data dummy para solo tener las coordenadas
  let coordinates = locations.map((location) => {
    return location.coordinates;
  });

  // Llamado a la funcion que nos retorna la ubicacion mas cercana con respecto a la ubicacion del usuario comparando con la dummy data
  const nearestLocation = findNearestLocation(request, coordinates);

  // Busqueda de los datos de la tienda tomand como referencia la ubicacion mas cercana obtenida en la funcion anterior
  let store = locations.find((location) => {
    return (
      location.coordinates.lat == nearestLocation.location.lat &&
      location.coordinates.lng == nearestLocation.location.lng
    );
  });

  // Distancia a la cual se encuentra la tienda mas cercana
  store["distance"] = nearestLocation.distance;
  // Funcion que nos indica si la tienda esta abierta o cerrada
  store["isOpen"] = checkIsOpen(store);
  // Funcion que nos indica la fecha y hora de la proxima entrega
  store["nextDeliveryTime"] = await getNextDeliveryTime(request, store);

  return store;
};

// Funcion que compara la hora actual frente a la hora de apertura y cierre
let checkIsOpen = (request) => {
  let timeFormat = "hh:mm";
  var actualTime = moment();
  let openingDate = moment(request.openingDate, timeFormat);
  let closingDate = moment(request.closingDate, timeFormat);

  return actualTime.isBetween(openingDate, closingDate);
};

let getNextDeliveryTime = async (userCoords, request) => {
  let timeFormat = "hh:mm"; // Definicion formateo que se utilizara en la funcion momentjs
  let estimatedTime; // Declaracion de la variable de fecha estimada
  let estimatedTimeFormatted; // Declaracion de la variable de la fecha estimada formateada

  if (request.isOpen) { //Solo se ejecutara la logica si la tienda se encuentra abierta
    try {
      await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?=&origins=${request.coordinates.lat},${request.coordinates.lng}&destinations=${userCoords.lat}%2C${userCoords.lng}&key=${process.env.GOOGLE_KEY}`
      ) // Utilizamos la API de google mas para poder obtener el tiempo estimado entre una ubicacion y la otra
        .then((res) => res.json())
        .then((json) => {
          let estimatedBikeTime = json.rows[0].elements[0].duration.value / 60; // Retorna valor en segundos, los cuales los convertimos en minutos para su posterior calculo
          estimatedTime = request.queuedOrders * 20 + estimatedBikeTime; // Se multiplican el numero de ordenes encoladas por 20 minutos pues solo se hacen 3 envios por hora, a este resultado le sumamos el valor que se tarda el recorrido de X a Y
          var mins_num = parseFloat(estimatedTime, 10);
          var hours = Math.floor(mins_num / 60);
          var minutes = Math.floor(mins_num - (hours * 3600) / 60);

          if (hours < 10) {
            hours = "0" + hours;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          estimatedTimeFormatted = hours.toString() + ":" + minutes.toString(); // Obtenemos el valor estimado en formato hh:mm

          if (
            moment()
              .add("60", "minutes")
              .format("LTS")
              .isSameOrAfter(moment(request.closingDate, timeFormat)) // Calculamos que si la hora actual mas 1 hora nos da un tiempo despues de cerrar la tienda, el pedido se realizara al siguiente dia
          ) {
            let tomorrowDate = moment(request.openingDate, "hh:mm:") // Se declara que a partir de la fecha de apertura mas la hora estimada (ya que los pedidos no se haran el mismo dia) se realizaran al siguiente dia
              .add(estimatedTimeFormatted, "minutes")
              .format("hh:mm");
            estimatedTimeFormatted =
              "The order will be delivered tomorrow in approx. " + tomorrowDate;
          }
        });
    } catch (error) {
      console.error(error);
      return "It is not possible to ship at this time, please try again later.";
    }

    return estimatedTimeFormatted;
  } else {
    return "The store is not open, please try again tomorrow";
  }
};

// Funcion que verifica que los datos de las coordenadas sean correctos
let checkCoordinates = (request) => {
  if (
    typeof request.lng !== "number" ||
    typeof request.lat !== "number" ||
    request.lng < -180 ||
    request.lng > 180 ||
    request.lat < -90 ||
    request.lat > 90
  ) {
    let coordinatesException = {
      message:
        "Latitude must be between -90 and 90. Longitude must be between -180 and 180. Both must be numeric",
      status: 400,
    };
    throw coordinatesException;
  }
};
