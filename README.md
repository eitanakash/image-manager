**Table of Contencts**

- [Description](#description)
- [Endpoints](#endpoints)
- [Setup Requirements](#setup-requirements)
- [Installation](#Installation)
- [TODOs](#todos)

## Description

An REST api microservice implementation using Nest JS and RabbitMQ


## Endpoints

1. See image-manager-docker.postman_collection.json
2. Import to postman

## Setup Requirements
- Docker-compose
- python 3 (for bash script to add queue)


## Installation and Running the app
- fork and/or clone repository from https://github.com/eitanakash/image-manager
  ### using docker-compose 
  - docker-compose up
  -  use api image-manager-docker.postman_collection.json
  ### run nest services locally
    - docker run  -d  --name rabbit-local -p 15672:15672 -p 5672:5672 rabbitmq:3-management
    -  docker run --name mongo-local --restart unless-stopped -d -p 27017:27017 -v ~/data:/data/db mongo
    - Run the two microservices- client and app; $ npm run start:dev
    



## TODOs

- Edit view image response  
- add comments



