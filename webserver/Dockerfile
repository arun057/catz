FROM nginx:alpine

RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY catz.rappel.io /etc/nginx/sites-enabled/catz.rappel.io
COPY catz-api.rappel.io /etc/nginx/sites-enabled/catz-api.rappel.io
