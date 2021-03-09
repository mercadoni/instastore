# InstaStore
Technical test for back-end and full-stack developers.
 
## Starting 🚀

_These instructions will allow you to obtain a working copy of the project on a local machine for development and testing purposes..._

## Q&A 📋

1. ¿Se necesita que la aplicación sea un monolito? ¿o puedo dividir la lógica del front y del back en dos proyectos?
* _Puedes dividirlo como quieras, es parte de las decisiones que queremos ver que tomas_

2. ¿Tienen datos de prueba que yo pueda consumir? ¿Los debo crear para alguna base de datos especifica o creo un JSON con información de prueba? 

* _Si tengo un set de tiendas que te puede servir para alimentar el ejercicio. Queda adjunto al documento_

Si no se debe usar una base de datos: 

2.1 Actualmente tengo data dummy con las coordenadas de las localidades de Bogotá como si fueran las tiendas, inclusive el nombre de estos lugares tienen el nombre de la localidad, por ejemplo: "Suba's Store", ¿está bien dejarlo así?, también logré encontrar una API publica que me retorna las coordenadas de las localidades de Bogotá, llegado el caso se deba hacer de este modo.

* _Sino quieres usar el adjunto puedes usar esos datos que ya tienes , no habria problema_

2.2 Para el atributo "isOpen" estoy manejando la siguiente lógica:
https://co.marca.com/claro/trending/2020/03/23/5e78f4df22601d97588b458f.html este link nos indica la fecha de atención durante la pandemia que se debe cumplir para los establecimientos de venta, en el cual puedo ver que el rango de atención es entre las 6a.m. y las 9p.m., este horario varia dependiendo de la tienda, ¿Para este challenge se debe seguir algún horario o puedo continuar con este ejemplo?

* _Excelente que hayas buscado como funcionan las cosas en estos momentos, para este caso podrias dejarlo como lo tienes, pero en la vida real cada tienda define sus propios horarios, para ponerte un ejemplo un Carulla como el de la 85 , puede tener deliveries hasta las 11, 12 pm , otro Carulla más de barrio como el del cortijo cierran a las 9 . Realmente depende mucho de lo que un negocio quiera manejar._

3. ¿Para el atributo "next delivery time" también deben existir tiempo de entrega predefinido entre las tiendas? Por ejemplo, una tienda hace entregas cada 2 horas desde su apertura, de ser así mi idea es calcular el tiempo de diferencia de la próxima hora frente a la hora actual... Aunque no tengo claro si se debe hacer de este modo. 

* _Excelente pregunta, aca lo ideal seria que consideraras que la "capacidad" de cada tienda es poder entregar 3 ordenes por hora, y de acuerdo a si la tienda tiene capacidad poder decir la fecha y hora siguiente en la que puedes entregar un pedido._

4. Para las peticiones hacia el servidor decidí hacerlas por POST con body en lugar de un GET con los params en la URL por estética, ¿Está bien hacerlo así? ¿o debo hacer la petición con método GET?

* _Documentalo para que las personas que lo revisen puedan saberlo, me parece una buena decisión._

## Architecture design and descriptions 📌

The following diagrams and wireframes describe the project's operation.

### Package or folder diagrams

* Backend

![Screenshot](https://github.com/MonterrosaF/instastore/blob/feature/developFelipe/docs/images/Diagrama%20de%20paquetes%20back.png?raw=true)

* Controller: All js files that receive HTTP requests from the routes (endpoints).
* Routes: All js files that define the endpoints and receive the request information.
* Models: *NO MODELS WILL BE USED FOR THIS CHALLENGE*
* Services: All files containing the business logic for finding the closest store.
* Exceptions: All exceptions for controlled error handling.
* libraries and dependecies: Dependencies and external libraries.

* Frontend

![Screenshot](https://github.com/MonterrosaF/instastore/blob/feature/developFelipe/docs/images/Diagrama%20de%20paquetes%20front.png?raw=true)

* Components: Code fragments that are used in different parts of the project depending on their functionality.
* Pages: Files displaying information and consuming components.
* Services: Files containing requests to APIs
* libraries and dependecies: Dependencies and external libraries.

### Functional diagram

![Screenshot](https://github.com/MonterrosaF/instastore/blob/feature/developFelipe/docs/images/Diagrama%20Funcional.png?raw=true)

The front (client) communicates with the back (server) sending the requests to obtain the information of the closest store, after obtaining this response the google maps API services is consumed to display the map with the required information.

### Wireframes

![Screenshot](https://github.com/MonterrosaF/instastore/blob/feature/developFelipe/docs/images/Wireframe%20Page_1.png?raw=true)

On the home page you will find a navbar with the logo, a button to open the available pages and a button to get the closest store (as long as the user allows geolocation in his/her browser).

If the user denies the geolocation, an input will be shown where the desired address can be typed.

![Screenshot](https://github.com/MonterrosaF/instastore/blob/feature/developFelipe/docs/images/Wireframe%20Page_2.png?raw=true)

When the request finish, a Google map will be shown with the position of the user and the closest store, below this map will be shown the store information.

![Screenshot](https://github.com/MonterrosaF/instastore/blob/feature/developFelipe/docs/images/Wireframe%20Page_3.png?raw=true)

The "Hamburger Menu" allows to visualize the two pages created for the exercise.

### Project Info  📌

You will find two folders (frontend and backend), each of them will have its respective README.md with its detailed information.

## Blockers 📋

1. Where do I get the information about the stores?
2. How to find the delivery time?
3. Which map API must I to use?
4. How should I serve the app through CDN?. 

## Answering Improvements and trade offs

1. What would you improve from your code? why?
_I would study more about implementing maps in react, I feel there are better ways to do it._
2. Which trade offs would you make to accomplish this on time? What'd you do next time to deliver more and sacrifice less?
_To deliver on time I organize my ideas and organize the workflow, with the help of the diagrams I can clarify the way in which I have to do it, for next time I would try to organize my time better, in this way I would deliver my pending tasks on time._
3. Do you think your service is secure? why?
_It is secure since no sensitive user data is being used, in addition to this the SonarQube tool allows me to identify if there are any security loopholes and correct them. Although for a next version I would try to encrypt the data and that this type of operations can only be performed by an authenticated person and that the requests ask for the token._
4. What would you do to measure the behaviour of your product on a production environment?
_I really like the process used with Jest, SonarQube and some DevOps tools like Jenkins, I would try to study more these tools. If it is for backend I would like to know more about Raygun and for frontend performance I usually use Google's PageSpeed tool._

## Autor ✒️

* [Andrés Felipe Monterrosa](https://www.linkedin.com/in/andres-felipe-monterrosa-alarcon)
