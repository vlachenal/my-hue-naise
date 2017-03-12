# my-hue-naise
Philipps HUE control and administration web UI - My HUE network administration interface simple edition

## Development environment initialization

### Requirements
MyHUEnaise project requires Node.js, PHP, PHP FPM and PHP composer.
Any HTTP server (tested on Nginx).

### Initialization
Checkout project.
```
npm install
php /usr/bin/composer install
```

Et voilà !

## "Production" build
Under Linux environment :
```
./make.sh
```
This will provides an tar.xz archive

Other :
```
npm run build
```
Copy server and vendor directories into dist directory

## Installation
Extract or copy files into your web server folder according to its configuration.

### Nginx
This kind of configuration seems to work in your server section:
```
       location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            try_files $uri $uri/ =404;
        }

        location ~ /api/ {
                try_files $uri /server/api.php$is_args$args;
        }

        location ~ \.php$ {
                root /usr/share/nginx/html;
                fastcgi_pass   unix:/run/php-fpm/php-fpm.sock;
                fastcgi_index  server/api.php;
                include        fastcgi.conf;
        }
```

### Apache
For Apache servers this .htaccess file could work (not tested):
```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . server/api.php [L]
```
