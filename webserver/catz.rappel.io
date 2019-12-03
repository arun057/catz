server {
    listen 80;
    server_name catz.rappel.io;
    index index.html;
    root   /var/www/frontend;

    location / {
        try_files $uri$args $uri$args/ /index.html;
    }
}
