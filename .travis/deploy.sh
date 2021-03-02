#!/bin/bash
if [[ $# -lt 1 ]]; then
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

else
count=`wget https://raw.githubusercontent.com/cs130-w21/16/dev/backend/routes.js -O - | diff backend/routes.js - | wc -l`
if [[ $count -gt 0 ]]; then
eval "$(ssh-agent -s)"
chmod 600 id_rsa
ssh-add id_rsa

git config --global push.default matching
git remote add deploy ssh://ec2-user@ec2-3-141-20-190.us-east-2.compute.amazonaws.com
git push deploy dev

branch=$1
ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-141-20-190.us-east-2.compute.amazonaws.com <<EOF
    cd ~/16
    cd backend
    ./run_server.sh $branch > ~/logfiles/run_server8080.`date "+%Y.%m.%d-%H.%M.%S"`.logfile &
EOF
fi
fi