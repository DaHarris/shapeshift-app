# Shapeshift Demo Application
This app is a demonstration of my experience with React/Redux paired with Udi Dahan pattern SOA
(Service Oriented Architecture) based "microservices." The application was split into different
services based upon functionality. The first service, [shapeshift-exchange-management-api](https://github.com/DaHarris/shapeshift-exchange-management-api), is  responsible for storing and updated data on the current prices of each of the cryptocurrencies at
each exchange. It does this by publishing a RabbitMQ command message to itself on a delay queue (only one second delay on first startup and then every minute). It publishes a different message for each of the exchanges that it has stored in it's database. This ensures that if one of the external APIs is down it does not affect the others. Once it updates the current prices, it publishes a RabbitMQ exchangeUpdated Event message in a fanout pattern.

One of the services that subscribes to this message is the [shapeshift-exchange-ranking-cqrs](https://github.com/DaHarris/shapeshift-exchange-ranking-cqrs) service. This service acts as a CQRS datastore that massages the exchangeUpdated event messages to store the exchange with the best rate for each cryptocurrency.

`Disclaimer #1: This is a somewhat contrived example of SOA requirements, such a small app would never need a CQRS store or distinct service boundaries of any kind. That being said, it is a read-only store that separates the need for server based calculations in the [shapeshift-exchange-management-api](https://github.com/DaHarris/shapeshift-exchange-management-api) when requesting lowest rates. This could lead to easy extensibility in the form of say, emails when a price reaches a low point at any of the exchanges.`

The other service that subscribes to the exchangeUpdated message is the [shapeshift-historical-pricing-api](https://github.com/DaHarris/shapeshift-historical-pricing-api) service. This service acts as a datastore for all historical data separate from storing current exchange pricing.

`Disclaimer #2: This is another contrived example of SOA requirements, such a small app would never need this kind of data distinction unless you let it update continually for an extended period of time. That being said, it is a read-only store that separates the historical data for the sake of the frontend application. If left to update every minute for an extended period of time, requesting all of this historical data with the current exchange rate data would quickly overload the frontend application. Separating the data out allows easier access to analytics, the ability to perhaps more efficiently store the data, and safer management.`

I used a template to get React/Redux with Webpack running quickly and then simply added the necessary pieces (actions, actionCreators, reducers, components, sagas, api calls) to get each of the three services - Exchanges, Rates, and Historical Pricing - displayed in different components on the home page.

# System Setup

## Dependencies
* MongoDB
* Redis
* RabbitMQ with Policy: `{name: schedule, Pattern: internal.scheduleQ, ApplyTo: queues, Definition: dead-letter-exchange: all-commands, Priority: 3}`

## Services Setup
1. ```git clone git@github.com:DaHarris/shapeshift-exchange-management-api.git```
2. ```npm install```
3. ```npm run seedDB```
4. ```git clone git@github.com:DaHarris/shapeshift-exchange-ranking-cqrs.git```
5. ```npm install```
6. ```git clone git@github.com:DaHarris/shapeshift-historical-pricing-api.git```
7. ```npm install```
8. ```each service: npm run start```

# !IMPORTANT!
You must start each service with: `npm run start` (they share a common config library linked by NODE_ENV vars accessed in the start script)

## FrontEnd Web App Setup
1. ```git@github.com:DaHarris/shapeshift-app.git```
2. ```npm install```
3. ```npm run start```
4. Visit localhost:9000

# Extra Information
I understand that one-off code challenges will not be completed using components such as RabbitMQ but I wanted to demonstrate my drive for architecting scalable, fault tolerant applications. I am available for setup/demo of the application in person, over phone, or over screenhero if needed. If the setup is too in depth for the test I can also setup the dependencies on AWS or in a Docker compose script if given a days time.

email: dharrisdnv@gmail.com
phone: 9702107931
