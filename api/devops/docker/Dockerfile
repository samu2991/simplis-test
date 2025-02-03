ARG TARGET_ENV="prod"

FROM alpine:3.18 AS builder

# arguments
ARG COMPOSER_NO_DEV=1
ARG CORS_ALLOW_ORIGIN
ARG MYSQL_DATABASE
ARG MYSQL_HOST
ARG MYSQL_PASSWORD
ARG MYSQL_PORT
ARG MYSQL_USERNAME
ARG SALT_ANONYMOUS_ID
ARG TARGET_ENV
ARG XDEBUG_ENABLED

# env vars
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_BIN_PATH=/usr/bin/composer
ENV CORS_ALLOW_ORIGIN ${CORS_ALLOW_ORIGIN}
ENV MYSQL_DATABASE=${MYSQL_DATABASE}
ENV MYSQL_HOST=${MYSQL_HOST}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ENV MYSQL_PORT=${MYSQL_PORT}
ENV MYSQL_USERNAME=${MYSQL_USERNAME}
ENV PHP_INI_DIR=/etc/php82
ENV SALT_ANONYMOUS_ID=${SALT_ANONYMOUS_ID}
ENV SOURCE_DIR=/var/www/html
ENV TARGET_ENV=${TARGET_ENV}
ENV XDEBUG_ENABLED=${XDEBUG_ENABLED}

# Install APT packages
RUN apk --no-cache add \
   bash \
   vim \
   g++ \
   make \
   php82 \
   php82-dev \
   php82-pear \
   php82-bcmath \
   php82-fpm \
   php82-mysqli \
   php82-pdo \
   php82-pdo_mysql \
   php82-json \
   php82-mbstring \
   php82-openssl \
   php82-curl \
   php82-opcache \
   php82-pecl-apcu \
   php82-zlib \
   php82-zip \
   php82-xml \
   php82-simplexml \
   php82-phar \
   php82-intl \
   php82-dom \
   php82-xmlreader \
   php82-xmlwriter \
   php82-ctype \
   php82-session \
   php82-sockets \
   php82-sodium \
   php82-mbstring \
   php82-gd \
   php82-iconv \
   php82-tokenizer \
   php82-fileinfo \
   php82-posix \
   nginx \
   curl \
   libstdc++ \
   libx11 \
   libxrender \
   libxext \
   libssl1.1 \
   ca-certificates \
   fontconfig \
   freetype \
   git \
   openssh

# Configure Nginx
COPY devops/nginx/nginx.conf /etc/nginx/nginx.conf

# Configure PHP-FPM
COPY devops/nginx/fpm-pool.conf ${PHP_INI_DIR}/php-fpm.d/www.conf
COPY devops/php/php.ini ${PHP_INI_DIR}/conf.d/zzz_custom.ini
RUN ln -s /usr/bin/php82 /usr/bin/php

# Make sure files/folders needed by the processes are accessable when they run under the nobody user
RUN chown -R nobody:nobody \
    /run \
    /var/lib/nginx \
    /var/log/nginx

# Install Composer v2.x
COPY --from=composer:2 /usr/bin/composer ${COMPOSER_BIN_PATH}

EXPOSE 8080

# Copy start script
COPY --chown=root --chmod=755 devops/nginx/start.sh /start.sh

RUN mkdir -p ${SOURCE_DIR}

# Let's start nginx & php-fpm
CMD ["sh", "-c", "/start.sh"]

WORKDIR ${SOURCE_DIR}


# ------------
# BUILDER PROD
# ------------
FROM builder AS builder_prod

ENV COMPOSER_NO_DEV=${COMPOSER_NO_DEV}

# Create Composer folder to store config
RUN mkdir /.composer && \
    chown -R nobody:nobody /.composer

# Copy source code
USER nobody
COPY .. ${SOURCE_DIR}
USER root
RUN mkdir -p \
      ${SOURCE_DIR}/temp \
      ${SOURCE_DIR}/var/cache \
      ${SOURCE_DIR}/var/log && \
    chown -R nobody:nobody ${SOURCE_DIR} && \
    chmod -R 777 ${SOURCE_DIR}/var/log

USER nobody

# Necessary to create file even if not used
RUN touch .env

# Install vendors
RUN ${COMPOSER_BIN_PATH} config --global process-timeout 2000 && \
    php -d memory_limit=-1 ${COMPOSER_BIN_PATH} install \
      --no-interaction \
      --no-progress \
      --optimize-autoloader \
      --prefer-dist

# ---------------
# BUILDER PREPROD
# ---------------
FROM builder_prod AS builder_preprod

# ---------------
# BUILDER SANDBOX
# ---------------
FROM builder_prod AS builder_sandbox

# ---------------
# BUILDER TEST
# ---------------
FROM builder_prod AS builder_test

USER root

COPY devops/php/conf.d/zzz_xdebug.ini ${PHP_INI_DIR}/conf.d/zzz_xdebug.ini

RUN \
    # Prepare .test-reports folder \
    mkdir -p ${SOURCE_DIR}/.test-reports/phpunit ${SOURCE_DIR}/.test-reports/phpstan && \
    chown -R nobody:nobody ${SOURCE_DIR}/.test-reports && \
    chmod -R 777 ${SOURCE_DIR}/.test-reports && \
    # Install Xdebug
    apk --no-cache add php82-xdebug

USER nobody

# -----------
# BUILDER DEV
# -----------
FROM builder AS builder_dev

USER root

ARG SIMPLIS_USERID=1000
ARG SIMPLIS_GROUPID=1000
ARG SIMPLIS_USERNAME=simplis
ARG SIMPLIS_GROUPNAME=simplis

COPY devops/php/conf.d/zzz_xdebug.ini ${PHP_INI_DIR}/conf.d/zzz_xdebug.ini

RUN \
    git config --global --add safe.directory ${SOURCE_DIR} && \
    # Install Xdebug
    apk --no-cache add php82-xdebug && \
    # Create docker user in order to map host user permissions
    mkdir -p /home/${SIMPLIS_USERNAME} && \
    adduser \
      --disabled-password \
      --gecos "" \
      --home "/home/${SIMPLIS_USERNAME}" \
      --no-create-home \
      --uid "${SIMPLIS_USERID}" \
      "${SIMPLIS_USERNAME}" && \
    addgroup ${SIMPLIS_USERNAME} nobody && \
    chown -R ${SIMPLIS_USERNAME}:${SIMPLIS_GROUPNAME} /home/${SIMPLIS_USERNAME} && \
    # redirect nginx logs to stdout
    ln -sf /dev/stdout /var/log/nginx/nginx_access.log && \
    ln -sf /dev/stderr /var/log/nginx/nginx_error.log

USER nobody

VOLUME ${SOURCE_DIR}

# -------
# DEFAULT
# -------
FROM builder_${TARGET_ENV} AS app
