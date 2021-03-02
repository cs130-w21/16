#!/bin/bash

ls
count=`wget https://raw.githubusercontent.com/cs130-w21/16/dev/backend/routes.js -O - | diff ../backend/routes.js - | wc -l`
echo $count
if [[ $count -gt 0 ]]; then
    ./runTestOnServer.sh $1
fi
