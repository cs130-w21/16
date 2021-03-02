#!/bin/bash

eval "$(ssh-agent -s)"
chmod 600 .travis/id_rsa
ssh-add .travis/id_rsa

git config --global push.default matching
git remote add deploy ssh://ec2-user@ec2-3-141-20-190.us-east-2.compute.amazonaws.com
git push deploy dev

echo "running outside"
ssh ec2-user@ec2-3-141-20-190.us-east-2.compute.amazonaws.com <<EOF
    echo "running"
    cd ~/16
    touch success
    git pull origin dev
    cd backend
    node routes.js
EOF