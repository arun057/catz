FROM mysql:latest

ENV MYSQL_DATABASE catz
ENV MYSQL_ROOT_PASSWORD=catzPassword

# create test and production (when deploying) databases
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
