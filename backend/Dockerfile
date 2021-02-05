FROM node:14.15-buster-slim

EXPOSE 3000

RUN apt update && apt install -y git

RUN apt install -y nodejs npm

COPY secrets.js /tmp/

RUN git clone --single-branch --branch issue#12 https://github.com/cs130-w21/16.git
RUN cp /tmp/secrets.js 16/backend/
ENTRYPOINT cd 16; npm install; node backend/routes.js


