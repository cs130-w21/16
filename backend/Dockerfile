FROM brendonng/potluck:base
ARG branch

WORKDIR /16
RUN git config --global user.email brendonn8@gmail.com && git config --global user.name brendon-ng
RUN git checkout -b $branch
RUN git pull origin $branch
RUN npm install
RUN echo $branch > /branch
ENTRYPOINT git pull origin `cat /branch`; npm install; cd backend ; node routes.js 8080


