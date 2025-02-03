#!/bin/bash
nginx -g 'daemon off;' &
php-fpm82 -F
