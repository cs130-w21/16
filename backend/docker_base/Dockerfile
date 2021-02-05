FROM node:14.15-buster-slim
EXPOSE 3000

RUN apt update && apt install -y git
RUN apt install -y nodejs npm

COPY secrets.js /tmp/

RUN git clone --single-branch --branch issue#12 https://github.com/cs130-w21/16.git
WORKDIR /16
RUN cp /tmp/secrets.js backend/
RUN npm install
ENTRYPOINT git pull; node backend/routes.js



