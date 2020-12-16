# Instastore test

Technical test for back-end developers.  
- [Questions and Answers](#questions-and-answers)
- [Generalities about implementation](#generalities-about-the-implementation)
- [Architecture](#architecture)
    - [Architecture explanation](#architecture-explanation)
    - [Services explanation](#services-explanation)
    - [Services explanation](#services-explanation)
    - [Collection structure](#collection-structure)
- [How to run the project](#run-the-project)
- [Blockers and pains](#blockers-and-pains)
- [Improvements and trade offs](#improvements-and-trade-offs)
- [Delivery Time](#delivery-time)

## Questions and answers

1. **An authentication system is required|  also when the endpoint is called must the client that is requesting it be authenticated?**
    - **Answer**: Authentication is not required but is a plus

2. **Which data is required to call the endpoint correctly, is all this data useful for retrieving the info requested or could it work if some of them are missing?**
    - **Answer**: You should expect to receive a json object with the following parameters

            “destination": {
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

3. **How is formatted and in which format has the data returned when the endpoint is called successfully?**
    - **Answer**: You would need to propose the response

4. **How is the closest distance between the stores and clients defined?**
    - **Answer**: This has to be one of your implementation decisions, choose the best one according to the time given and the data provided for the challenge. Make sure to justify it, according to point 5 in the repo.

5. **If there are more than one store that is the "closest" to the client, what is the criteria to untie, or which request fields would work to untie?**
    - **Answer**: [the same as in the numeral 4](#How-is-the-closest-distance-between-the-stores-and-clients-defined)

6. **Which data should be tracked or is important in each call to the endpoint, also it should be stored in local storage or in a DB?**
    - **Answer**: [the same as in the numeral 4](#How-is-the-closest-distance-between-the-stores-and-clients-defined); plus,  Please make a proposal according to the input I sent you in numeral 2

7. **to test the stores' data is created by myself or there is any dataset with the info**
    - **Answer**: I am attaching a csv with the stores [table is here](https://github.com/carlos4rias/instastore/blob/carlos4rias-test/stores.csv)



## Generalities about the implementation

In this section  i'm going to propose and defined which data, models, formats are gonna be implemented based in the answers given

- The authentication is going to be implemented if there is time to implement it, at the end i will implement a very basic auth with JWT and a user for test it
- When the endpoint to get the closest store is called it should receive the data that is required plus the latitude and longitude that are required to calculate the distance to the stores, those info is defined in the [previous point](##questions-and-answers) in the **numeral 2**
- The data that is returned to the client is going to be given in JSON format and will contain the next fields (that are given in the first document) plus another fields:

        response {
            storeId: string
            storeName: string
            distance: number // kilometers
            aproxTimeOfDelivery: time // date of delivery
            coordinates: {
                latitude: number
                longitude: number
            }
            isOpen: boolean
            nextDeliveryTime: number // minutes
        }
    
    **aproxTimeOfDelivery**: *from the store to the customer home, lets suppose that the deliver store has a media velocity of 40Km/hr (it's just a dummy value and in practise for our project lets choose it randomly in the range (30 - 60)) so we can obtain it from the **distance / mediaVelocity***

- With the information presented above, i'm going to define the untie criteria and which info worth to be saved and how while we track every request to the endpoint:  
    - Untie criteria
        1. first we will untie for the **nextDeliveryTime + aproxTimeOfDelivery** given in minutes
        2. if there still a tie we untie by **distance** because the **aproxTimeOfDelivery** could not be very accurate and a shorter distance means a chance to delivery faster
        3. we are not going to bear in mind the isOpen, because may a closed store deliver faster than an open one
    - important information to be tracked (we are going to save it in a NonSQL database in this case MongoDB )
        1. client information [name, address, coordinates] // util if we want to know who is the customer that use the most our application and give her/his benefits like discounts, more priority etc..
        2. store information [id, name, coordinates] // util for know which is the most store requested to delivery groceries, know which area is the most requested (a query by area like a polygon)

- I will clean the stores info given and delete unnecesary data and add fields like openTime, closeTime, nextDeliveryTime(lets supposed that each store has a service to modify it to keep it update)

## Architecture
In this section i will explain the "Architecture" (sorry for the "diagram" :D) that will be implemented to solve the test, services, models, etc

![alt text](https://raw.githubusercontent.com/carlos4rias/instastore/carlos4rias-test/architecture.jpg "Architecture Instastore")

### Architecture explanation

Is a simple architecture that consist of two "services" and one data base conection, the client only will have access to the endpoint for request the store "closest" to him to deliver groceries, maybe if there is time the client will also have access to a auth endpoint in order to support authentication, the other service will be used only internally for track data purpose

### Services explanation

**GetClosestStore**: This service will calculate the shortest distance between two hearth points, at the very begin i though to use the **google API** but seems for use it we need to register a credit card also it could increase the response time and we could get a reponse time higher than the required in the requirements, so i decided to use the [algorithm for calculate the shortest distance between two points in a sphere](https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/) even it is less accurate that the **google API** but works for this purpose and should work faster because dont need request a third API.

**TrackData**: As i said in the previous point, this is for intern use and will be called when a user query the endpoint for get the closest store, it will save in the data base the important data that i have described in previous literals to be tracked

### Collection structure (Data model)

#### Store
        {
            id: string
            storeName: string,
            latitude: number,
            longitude: number,
            address: string,
            country: string,
            city: string,
            state: string,
            zipCode: number,
            openingTime: number,
            closingTime: number,
            nextDeliveryTime: number
        }
openingTime, closingTime and nextDeliveryTime, are going to be saved in minutes it makes easier operate with them.  
_for example: if the opening time is 8:00 it is going to be saved like 480 = 8 hours times 60_

#### TrackedData
        {
            nameAddress: String,
            address: String,
            country: String,
            latitude: Number,
            longitude: Number,
            store: Schema.ObjectId
        }


#### User
        {
            username: String,
            password: String,
        }
## How to run the project
in order to run the project docker-compose is required  
to start the project write 
        
        docker-compose up
bear in mind that the current dir must be the one that contains the file `docker-compose.yml`

then the stores and one user will be created, the user credentials are below:

        username: test
        password uno2345

if you wanna interact with the API you can do it with postman or curl, below are the curl instructions to auth and request the endpoint

auth user:

        curl --location --request POST 'http://localhost:3000/api/user/login' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "username": "test",
            "password": "uno2345"
        }'

query the endpoint (the previous jwt is required here):

        curl --location --request POST 'http://localhost:3000/api/stores/closest-store' \
        --header 'jwt-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ5ZTU2ZjAwYjMwNjAwMTI0OTZkYWMiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2MDgxMTU1Njh9.E2Yk4lucltvQge6rVya2Oq1j5aWfm3B4e9SFdX5XNcU' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "destination": {
                "name": "adios",
                "address": "mz 15 cas",
                "address_two": " string",
                "description": " string",
                "country": "CO",
                "city": " 12",
                "state": " string",
                "zip_code": " string",
                "latitude": 24.2121,
                "longitude": -100.12313
            }
        }'

## Blockers and pains
- Try to use the google API, i found that a credit card is required didnt reasearch more about because of time
- There was an issue that wasted time to solve and it's about connect to the database, as i was working with docker then connection should be done with retry, i found sollution [here](https://github.com/docker/hub-feedback/issues/1255), at the end i tried another thing that worked!
- Run out of time and an strong auth system couldnt be implemente :(

## Improvements and trade offs

1. **What would you improve from your code? why?**  
    i would love to improve the auth, because i run out of time and just implemented the basic one, also do unitary test for the endpoint that get the closest store, for the function that calculate the distance between two points in an sphere (i tested it with know data but would be nicer if there had test implemente); Also a system for document the API endpoints like swagger it does pretty nice, i was about setup TypeScript for the proyect but i was too advance on it could be a nice improvement. 

2. **Which trade offs would you make to accomplish this on time? What'd you do next time to deliver more and sacrifice less?**  
    I would waste less time in the boilerplate and data generators to populate the database and will dedicate more time to setup TypeScript, test the endpoints and integrate swagger.

3. **Do you think your service is secure? why?**  
    The service has a very basic auth for protect it against people that isnt authorized, also it validates the info that the user send to the endpoint for avoid inconsistent data, also a little of sanitation of the data, but there still  a lot things that aren't covered, so i think my service is 2/5 secure

4. **What would you do to measure the behaviour of your product on a production environment?**  
    Would implement a logger when something goes wrong letting identify bugs and solve them, also in the logs keep metrics about how fast is answering our servies to check the performance and would know how many request were succesfull and which were not and get the metrics about how efficient is our service.

    Also to avoid the chaos, i could release the feature progressively for the people(kinda 10%, 20%...) to check out it's going on and when everything is under control realease for the 100% for the people




## Delivery Time
    ----------------------------------------------
