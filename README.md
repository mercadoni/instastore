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
