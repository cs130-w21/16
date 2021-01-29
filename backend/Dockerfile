FROM junghoo/mysql-apache

EXPOSE 3000

RUN sudo apt update && sudo apt install -y git

RUN sudo apt install -y nodejs npm

RUN npm install express
RUN npm install body-parser
RUN npm install mysql

COPY create_test_db.sql /home/cs143/
#ENTRYPOINT sudo mysql < /home/cs143/create_test_db.sql