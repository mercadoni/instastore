# InstaStore

## Requirements
InstaStore is a microservice in charge of selecting the closest "convenience" store to deliver a groceries order to our B2B clients.

### Non-functional
- We expect you to deliver idiomatic code in a way that is easy to read and follows the accepted guidelines in your area of expertise.
- You should write it on Node.js with Express.js. Libraries, transpilers , etc are up to you.
- Endpoints are fast (less than 300ms).
- Endpoints respond error codes that makes sense to the case.
- Please provide documentation for the endpoints you create.

### Functional (user stories)
1. Our B2B clients should be able to consume an endpoint that provides them the following information:
  - storeId
  - storeName
  - isOpen
  - coordinates
  - nextDeliveryTime
2. The endpoint returns the closest store available
3. We need to keep track of each call to the endpoint

## Q & A


- What are the expected request parameters? What is the meaning of each parameter?

  You should expect to receive a json object with the following parameters

  ```json
  "destination": {
    "name": "string”, // Name of the address given by user (required)
    "address": "string”, // Address captured (required)
    "address_two": "string”, //Additional details for the address (line apt, house number, etc)
    "description": "string”, //Instructions for the delivery
    "country": "string”, // Country code according to ISO-3166-1 (required)
    "city": "string", // City name
    "state": "string", // State name
    "zip_code": "string",
    "latitude": 0, //number indicating the latitude of the address provided
    "longitude": 0, //number indicating the longitude of the address provided
  }
  ```

- What is nextDeliveryTime?

  In this case, we are going to consider that each store can deliver 3 orders per hour, and according to that, you need to provide the next time (date+hour) in which the store can deliver an order (nextDeliveryTime).

- In the API response we have 'isOpen', What is the role of this field in determining the closest available store?

  Nothing. I was expecting you to catch things unneeded.

- What are the locations/coordinates of the stores?

  I am attaching a CSV with that information, you can discard any column that you think is not needed.

- What should be the criteria for defining the closest store?

  This has to be one of your implementations decisions, choose the best one according to the time given and the data provided for the challenge. Make sure to justify it, according to point 5 in the repo.

##  Design and Implementation choices


1. Convenience stores can deliver 3 orders per hour,  I'm going to assume that each store can process an order every 20 minutes.
2. The convenience stores are open 24 hours/7 days.
3. You have to be authenticated to consume the endpoint.


### Criteria for defining the closest store available

The closest store would be the one from which the delivery will arrive first, to achieve that, we're are going use the estimated time of arrival (ETA)  defined as the sum of the nextDeliveryTime and the duration of the shipping (shippingTime).

ETA = nextDeliveryTime + shippingTime

We'll select the store with the minimal ETA.

### Architecture

![arch](https://github.com/anmrdz/instastore/raw/dev/arch.png)

### Database

![db](https://github.com/anmrdz/instastore/raw/dev/db.png)

### Security

JWT is going to be used to protect the /store/ endpoint from unauthorized use.

The endpoint /user/ will provide a way to login and obtain the token needed to use /store/.

### Tracking

All the calls made to the endpoints would be logged using the library [morgan](https://github.com/expressjs/morgan). In addition to logging, the orders are going to be saved in the database so in further developments we can obtain interesting metrics such as:

- Busiest day periods.
- Zones of most active users.

### Deployment

### Documentation

### Testing

### Estimated Completion Time

Sunday, March 29, at 11:55 pm.

## Improvements and trade offs
1. What would you improve from your code? why?
2. Which trade offs would you make to accomplish this on time? What'd you do next time to deliver more and sacrifice less?
3. Do you think your service is secure? why?
4. What would you do to measure the behaviour of your product on a production environment?
