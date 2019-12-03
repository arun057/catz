FROM node:alpine as build

RUN apk add --no-cache bash

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY frontend/package.json /usr/app
RUN npm install --quiet
RUN npm install -g --quiet @angular/cli

COPY frontend/ /usr/app

RUN ng build --output-path=dist

# run tests
# RUN ng test --watch=false
# RUN ng e2e --port 4202

# generate build
RUN ng build --output-path=dist


FROM nginx:alpine

RUN rm /etc/nginx/nginx.conf
COPY webserver/nginx.conf /etc/nginx/nginx.conf
COPY webserver/catz.rappel.io /etc/nginx/sites-enabled/catz.rappel.io
COPY webserver/catz-api.rappel.io /etc/nginx/sites-enabled/catz-api.rappel.io


COPY --from=build /usr/app/dist /var/www/frontend

