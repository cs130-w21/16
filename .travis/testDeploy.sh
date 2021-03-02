#!/bin/bash

count=`wget https://raw.githubusercontent.com/cs130-w21/16/dev/backend/routes.js -O - | diff backend/routes.js - | wc -l`
echo $count
if [[ $count -gt 0 ]]; then
    .travis/runTestOnServer.sh $1
fi
