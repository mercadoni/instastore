FROM node:15.5.0-alpine3.10

COPY      ./src /var/www
COPY      ./conf/docker/init.sh /var/www
WORKDIR   /var/www

RUN apk add --update --no-cache netcat-openbsd
RUN npm install

ENTRYPOINT ["/bin/sh","init.sh"]