#!/bin/bash

DOCKER_BUILDKIT=1 docker build --ssh default -t potluckbackend:latest .
potluck="$(dirname `pwd`)"
docker run -it -p 3000:3000 --name potluck-backend potluckbackend
#docker run -it -v $potluck:/home/cs143/Potluck -p 3000:3000 --name potluck-backend potluckbackend