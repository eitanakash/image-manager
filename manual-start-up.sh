#!/bin/bash

mv docker-compose.yml docker-compose.yml.old
mv docker-manual/docker-compose.yml docker-compose.yml
docker-compose up -d
# . rabbitmqadmin.1
# rabbitmqadmin -u guest -p guest -V / declare queue name=image-messages