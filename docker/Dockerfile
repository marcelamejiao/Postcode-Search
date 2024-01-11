FROM node:18 as frontend-builder

ARG VITE_API_HOST=/api
ENV VITE_API_HOST=${VITE_API_HOST}

WORKDIR /client

# Add dependency files first to leverage docker caching
ADD ./package.json ./
ADD ./package-lock.json ./

# Install dependencies
RUN npm ci

ADD ./ /client

# Build the frontend static assets /client/dist
RUN npm run build

FROM ubuntu:24.04 as base

# Install dependencies
RUN apt-get update \
        && \
        apt-get install -y \
          supervisor \
          nginx \
        && \
        apt-get clean

WORKDIR /app

FROM base as app

# Add nginx configuration
RUN rm /etc/nginx/sites-enabled/* /etc/nginx/sites-available/*
ADD docker/nginx/sites-enabled /etc/nginx/sites-enabled/
ADD docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Add Supervisor configuration
RUN mkdir -p /etc/supervisor
ADD docker/supervisor/supervisord.conf /etc/supervisor
ADD docker/supervisor/app.ini /etc/supervisor/conf.d

# Add the compiled frontend
COPY --from=frontend-builder /client/dist /app/dist

# Add the entrypoint and set it
ADD docker/entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "/bin/sh", "/entrypoint.sh" ]