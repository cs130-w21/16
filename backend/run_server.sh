#!/bin/bash
cd "$(dirname "$0")"
if [[ $# -eq 0 ]];
then
    docker pull brendonng/potluck:master
    docker stop potluck-dev-server
    docker rm potluck-dev-server
    docker run -p 8888:8888 --name potluck-dev-server brendonng/potluck:master > ~/docker8888.logfile
else
    branch=$1
    branchclean=`echo $1 | tr -dc '[:alnum:]\n\r'`
    docker rmi brendonng/potluck:base
    docker pull brendonng/potluck:base
    DOCKER_BUILDKIT=1 docker build --build-arg branch=$branch -t brendonng/potluck:$branchclean .
    docker stop potluck-test-server
    docker rm potluck-test-server
    docker run -p 8080:8080 --name potluck-test-server brendonng/potluck:$branchclean > ~/docker8080.logfile
fi
