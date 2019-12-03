server {
    listen 80 default_server;
    server_name catz-api.rappel.io;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /elb-status {
        access_log off;
        return 200;
    }
}
