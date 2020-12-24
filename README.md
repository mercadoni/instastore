# How to run

This application run on 2 Docker containers defined in 2 images by Dockerfile. One image defines a PostGis Database and the other the NodeJS application.
This application run the containers by a docker-compose file. To run clone this repository, install docker and docker-compose finally use command in root folder of the repository
`docker-compose build`

# Endpoint use
- URL -> http://localhost:3000/stores/closest
- METHOD -> GET
- PARAMS -> Required: latitude=[float], longitude=[float]
- SUCCESS RESPONSE -> JSON {"storeid": [int], "storename":[String] ,"isopen": [boolean]  , "coordinates": [Geometry point as text], "nextDeliveryTime":[datetime]}
- ERROR RESPONSE -> 204 Error if not content found, 500 if internal error
- SAMPLE CALL -> http://localhost:3000/stores/closest?latitude=4.761759831948724&longitude=-74.04507292768662

# Test
There is a small front-end test, it work using browser location and sending this location to the endpoint and showing the answer in alert message. To run open  http://localhost:3000 and accept to give you location

# Data Model
The database model consist in three tables:
- store
- business_schedule
- delivery_time
1. Table store.
The store table has 3 columns:   storeId (pk), storeName (name of the store), coordinates (location of the store in latitude-Longitude point)
2. Table business_schedule.
The business_schedule table has 5 columns:   businessId (pk), storeId (fk from store), storeName (name of the store), DayOfTheWeek (day values could be [1-7], represents a day that store will be opened), OpenTime (time at store will be opened at the day specified in 'DayOfTheWeek'),  CloseTime (time at store will be closed at the day specified in 'DayOfTheWeek')
3. Table delivery_time.
The delivery_time table has 5 columns:   deliveryId (pk), storeId (fk from store), storeName (name of the store), startsAtDate (date that defines the initial date of delivery time), startsAtTime(Time that defines the initial time of delivery time), recurrence (defines the repeteadly nature of 'starts_at' values could be ['none', 'daily', 'weekly', 'monthly' ])


 ## Improvements and trade offs
1. What would you improve from your code? why?
I would like to improve my abstraction of store delivery times, my model works but I'm knows that it's not the best way to work with it.
2. Which trade offs would you make to accomplish this on time? What'd you do next time to deliver more and sacrifice less?
Sometimes I sacrifice memory so I use more variables, maps, list, etc. Less common I sacrifice simplicity in code and usability because it easy to improve later and maybe the most common it's not cover all possible cases.
3. Do you think your service is secure? why?
No, docker need more work to ensure a better security layer, at code level I use prepared statements equivalent in Node, so this part is secure and finally at Node-Express I didn´t make any security configuration.
4. What would you do to measure the behaviour of your product on a production environment?
 I always try to make lot of test, in cases of production environment I make stress testing trying to do an equivalent production use.
 
