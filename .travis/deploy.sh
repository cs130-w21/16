#!/bin/bash

eval "$(ssh-agent -s)"
chmod 600 id_rsa
ssh-add id_rsa

git config --global push.default matching
git remote add deploy ssh://ec2-user@ec2-3-141-20-190.us-east-2.compute.amazonaws.com
git push deploy dev

ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-141-20-190.us-east-2.compute.amazonaws.com <<EOF
    cd ~/16
    git pull origin dev
    cd backend
    ./run_server.sh > ~/logfiles/run_server8888.`date "+%Y.%m.%d-%H.%M.%S"`.logfile &
EOF