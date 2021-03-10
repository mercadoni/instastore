# InstaStore
Technical test for back-end and full-stack developers.

## Arquitecture
InstaStore is a microservice in charge of selecting the closest. In this microservice  I'am using docker as a Container, Typescript as main language, and mongoDB, also I created a common library in order to re-use common code. Finally I'm using React for the client app


## Technologies

- Typescript
- Mongodb
- Docker
- React
- node js

## Due date

- Wenesday
- days (4)

## Api docs

There are two three endpoints in the microservice, addStore, getAllStores, getNearStore

- Add Store (/api/stores)
  Type: POST
  Payload:
 {
     storeId: string,
    storeName: string,
    isOpen: boolean,
    lat: number,
    lng: number,
    nextDeliveryTime:string

 }
 - Get All Store (/api/stores)
   Type: GET

 - Get Near Store (/api/stores/:lat/:lng)
   Type: GET
  params: (lat,lng)

## Wireframe

- Url:
  https://drive.google.com/file/d/1kJw8Uzn-I_U-kYEKxU5CeB5IJgXGGjpU/view?usp=sharing 

## Improvements and trade offs

What would you improve from your code? why?

Anwser: I would like to add Unit test, and implemented a  microservice for authentication 

Which trade offs would you make to accomplish this on time? What'd you do next time to deliver more and sacrifice less?

Anwser: I spend a lot time trying to do a scalable project, indeed I made a common library

Do you think your service is secure? why?

Anwser: Well, in this moment that is not secure, because We need to define a protocol for authentication, also we have to do an authentication microservices

Anwser: What would you do to measure the behaviour of your product on a production environment?

We have to do diferent kind of test, like performance test and manual test


