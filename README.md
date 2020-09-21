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
  - run in cmd  ". start.sh"
  - browse to http://localhost:15672
    - add virtual host name: {images},
  ### run without docker-comp
Installation and Running semi-manual
1. run in cmd ". manual-start-up.sh"
2. run in cmd ". start-up.sh" (script to add queue)
3. browse to http://localhost:15672 and log in to rubbitmq admin:    - password: guest    - username: guest
4. Add a virtual host       (see https://medium.com/swlh/guide-to-nest-js-rabbitmq-microservices-e1e8655d283  )
5. navigate to microservice-client and microservices-app and run "npm run init"6. use rest API See postman file to import API endpoints

## TODOs

- Edit view image response
- fix bug of crushing when running docker compose
- Add to rabitmq dockerfile/configuration queue and virtual host
- add comments



