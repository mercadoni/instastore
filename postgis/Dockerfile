FROM postgis/postgis:13-3.1
#USER postgres
ENV POSTGRES_USER instastore
ENV POSTGRES_PASSWORD mysecretpassword
ENV POSTGRES_DB docker
COPY dump.sql /docker-entrypoint-initdb.d/dump.sql
#RUN    /etc/init.d/postgresql start
#ENTRYPOINT ["tail", "-f", "/dev/null"]