FROM node:14.15-buster-slim
ARG branch
EXPOSE 3000

RUN apt update && apt install -y git

RUN apt install -y nodejs npm

COPY secrets.js /tmp/

RUN git clone --single-branch --branch $branch https://github.com/cs130-w21/16.git
RUN cp /tmp/secrets.js 16/backend/
WORKDIR /16
RUN npm install
ENTRYPOINT git pull origin $branch; node backend/routes.js


