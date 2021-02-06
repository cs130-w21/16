#!/bin/bash
cd "$(dirname "$0")"
if [[ $# -eq 0 ]];
then
    docker pull brendonng/potluck:base
    docker stop potluck-dev-server
    docker rm potluck-dev-server
    docker run -it -p 3000:3000 --name potluck-dev-server brendonng/potluck:base
else
    branch=$1
    branchclean=`echo $1 | tr -dc '[:alnum:]\n\r'`
    DOCKER_BUILDKIT=1 docker build --build-arg branch=$branch --ssh default -t brendonng/potluck:$branchclean .
    docker stop potluck-dev-server
    docker rm potluck-dev-server
    docker run -it -p 3000:3000 --name potluck-dev-server brendonng/potluck:$branchclean
fi