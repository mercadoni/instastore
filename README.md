# InstaStore
Technical test for back-end by Dorian Abad Tovar Díaz.

## API

This API is developed on a Dockerized environment. It's deployed using two instances, one as a Node project that holds the business logic, the second one has a MySQL environment for data persistence purposes.

To run the project, you need to run this command (remember, you need to have Docker and docker-compose installed in your machine):


    docker-compose up

### Database

The database for this project is composed of three tables as this:

![alt text](./misc/Database.PNG "Database diagram")

### API Description

The API is comprised of an endpoint that looks like this:

* **Title**

    Get Closest Store

* **URL**

    /v1/store/closest/?latitude=X&longitude=X

* **Method:** `GET`

*  **URL Params**

   **Required:**
 
   `latitude=[double]`

   `longitude=[double]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "message":{
        "storeId": 5,
        "storeName": "Instastore Kennedy",
        "isOpen": true,
        "coordinates":{
          "latitude": 4.609393346720635,
          "longitude": -74.15202185751941
          },
        "nextDeliveryTime": null
      }
    }
    ```

    OR

    
  * **Code:** 204 <br />
    **Content:** ```No content```
    
* **Error Response:**
  * **Code:** 500 <br />
    **Content:** 
    ```
    {
      "message": 'Internal error'
    }
    ```

  * **Code:** 404 <br />
    **Content:** 
    ```
    {
      "message": 'URL not found'
    }
    ```

* **Sample Call:**
    * **Success Response with closest store (200):**
        
        http://localhost:3000/v1/store/closest/?latitude=4.616710202626701&longitude=-74.15306627892195
    
    * **Success Response without closest store (204):**
        
        http://localhost:3000/v1/store/closest/?latitude=4.610153044262533&longitude=-74.07053817093107

## Questions

1. About nextDeliveryTime, assuming a functionality from its name, I understand that specifies the time where is going to take place the next delivery of an order, so: 

/A: It's the next delivery schedule, I don't know if you've seen in apps like Rappi that when you order in the supermarket a list of hours comes out, sometimes there is a first schedule that is in the next hour but sometimes he only lets me order until the next day. The nextDeliveryTime refers to the nearest time interval in which I can order/deliver the order

  * Is this functionality periodically?, lets say, Is there an specified hour for each store for each day, weekly, monthly, bi-monthly, semestral?

/A: The stores have established daily schedules, so we add 8 am to 9 pm Monday to Saturday and Sunday from 9 am to 8 pm

  * The operation is specified by capacity?, that is to say, they have it established according to the capacity of each store independently to an established schedule?

/A: Yes, the ideal is to take into account the capacity of the store along with the schedule.

2. About the proximity of the stores, I understand that the endpoint returns the closest available store, then:
    
    * Is there any range of proximity?, that is to say, that it is possible to establish a radius in which the closest available stores can be established?

/A: More than the proximity range you can take into account the following parameters. In the endpoint you would receive latitude and longitude of the address they are asking. The furthest the customer's address can be is 5km from the store.


## Requirements
InstaStore is a microservice in charge of selecting the closest "convenience" store to deliver a groceries order to our B2B clients.

### Non-functional
- We expect you to deliver idiomatic code in a way that is easy to read and follows the accepted guidelines in your area of expertise.
- You should write it on Node.js with Express.js. Libraries, transpilers , etc are up to you.
- If you are applying for a fullstack position, front-end must be build with React.
- Endpoints are fast (less than 300ms).
- Endpoints respond error codes that makes sense to the case.
- Please provide documentation for the endpoints you create.
- If you are applying for a fullstack position, front-end must be easy to use and it should have a nice look & feel.

### Functional
1. Our B2B clients should be able to consume an endpoint that provides them the following information:
  - storeId
  - storeName
  - isOpen
  - coordinates
  - nextDeliveryTime
2. The endpoint returns the closest store available
3. We need to keep track of each call to the endpoint
#### For full-stack developers
1. The UI should capture the address/position from a user
2. After capturing the address it should request the closest store and show the address captured and the closest store in a map, and their details (isOpen, next delivery time, coordinates, storeName, store phone number and email).
3. It should manage errors and unexpected requests. Users should always know what to do.
4. App should include a top bar with a logo (go nuts)
5. The app should be served through a CDN
## Improvements and trade offs
1. What would you improve from your code? why?
2. Which trade offs would you make to accomplish this on time? What'd you do next time to deliver more and sacrifice less?
3. Do you think your service is secure? why?
4. What would you do to measure the behaviour of your product on a production environment?
