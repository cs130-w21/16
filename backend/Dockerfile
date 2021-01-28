FROM junghoo/mysql-apache

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19003

RUN apt update && apt install -y git

RUN npm install express
RUN npm install body-parser
RUN npm install mysql

RUN git clone --single-branch --branch issue#12 https://github.com/cs130-w21/16.git
