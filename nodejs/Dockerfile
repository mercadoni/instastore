FROM node:15.5.0-alpine3.10
WORKDIR /usr/src/app
COPY src ./
RUN [ "npm", "install" ]
ENTRYPOINT [ "node", "./bin/www" ]