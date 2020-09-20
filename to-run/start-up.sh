#!/bin/bash
. rabbitmqadmin.1
rabbitmqadmin -u guest -p guest -V / declare queue name=image-messages
