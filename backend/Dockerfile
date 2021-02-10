FROM brendonng/potluck:base
ARG branch

WORKDIR /16
RUN git checkout -b $branch
RUN git pull origin $branch
RUN npm install
ENTRYPOINT git pull origin $branch; npm install; node backend/routes.js 8080


