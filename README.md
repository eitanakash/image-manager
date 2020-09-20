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
  - run bash . start.sh
  - browse to http://localhost:15672
    - add queue name: {image-messages}, 
  ### run without docker-comp
  - $ docker run --name rabbit_mq --rm -it --hostname my-rabbit -p 15672:15672 -p 5672:5672 -d rabbitmq:3-management
  - $ docker run --name mongo_db -d -p 27017:27017 -v ~/data:/data/db mongo
  - browse to http://localhost:15672
    - add queue name: {image-messages}, 
    - add virtual host name: {images},
  - FOR enviroment changes, create/edit the .env file on the the services folder: for sample refer to .env.example
  - $ cd {your location}/image-manager/microservice-client
  - npm init
  - $ cd {your location}/image-manager/microservice-client
  - npm init

- import postman file and Edit the host and port to localhost and port 3000 or edit env file

## TODOs

- Edit view image response
- Add to rabit mq dockerfile queue and virtual host
- add comments



