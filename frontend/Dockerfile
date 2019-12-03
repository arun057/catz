FROM node:alpine

RUN apk add --no-cache bash

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app
RUN npm install --quiet
RUN npm install -g --quiet @angular/cli

COPY . /usr/app
