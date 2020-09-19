#!/bin/bash
docker image rm -f app-image-manager:latest 
docker image rm -f app-image-manager 
docker image rm -f client-image-manager:latest 
docker image rm -f client-image-manager
docker image rm -f 30300101/app-image-manager:latest 
docker image rm -f 30300101/app-image-manager
docker image rm -f 30300101/client-image-manager:latest
docker image rm -f 30300101/client-image-manager
cd ~/playground/image-manager/microservice-client/
docker build -t client-image-manager .
docker tag client-image-manager:latest 30300101/client-image-manager
docker image push 30300101/client-image-manager


cd ~/playground/image-manager/microservices-app/
docker build -t app-image-manager .
docker tag app-image-manager:latest 30300101/app-image-manager
docker image push 30300101/app-image-manager

cd ~/playground/image-manager