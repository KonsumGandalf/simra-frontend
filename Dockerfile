FROM node:23-alpine AS local_builder

WORKDIR /usr/src/app

ARG SIMRA_API_URL
ARG MAPILLARY_URL
ARG MAPILLARY_ACCESS_TOKEN

ENV SIMRA_API_URL=$SIMRA_API_URL
ENV MAPILLARY_URL=$MAPILLARY_URL
ENV MAPILLARY_ACCESS_TOKEN=$MAPILLARY_ACCESS_TOKEN
ENV NX_DAEMON=false

COPY package*.json ./

RUN npm ci --ignore-scripts
RUN npm install -g nx

COPY . .

RUN nx build --skip-nx-cache --prod

FROM node:23-alpine AS github_builder

WORKDIR /usr/src/app

ENV NX_DAEMON=false
ENV MAPILLARY_URL=$MAPILLARY_URL
ARG MAPILLARY_URL

RUN --mount=type=secret,id=simra_api_url \
    --mount=type=secret,id=mapillary_access_token \
    export SIMRA_API_URL=$(cat /run/secrets/simra_api_url) && \
    export MAPILLARY_ACCESS_TOKEN=$(cat /run/secrets/mapillary_access_token) && \
    npm install && npm run build

COPY package*.json ./

RUN npm ci --ignore-scripts
RUN npm install -g nx

COPY . .

RUN nx build --skip-nx-cache --prod

FROM nginx:stable-alpine AS local_production

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=local_builder /usr/src/app/dist/simra/browser /usr/share/nginx/html

EXPOSE 80

FROM nginx:stable-alpine AS github_production

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=github_builder /usr/src/app/dist/simra/browser /usr/share/nginx/html

EXPOSE 80
