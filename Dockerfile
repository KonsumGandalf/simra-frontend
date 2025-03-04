FROM node:23-alpine AS builder

WORKDIR /usr/src/app

ARG SIMRA_API_URL

ENV SIMRA_API_URL=$SIMRA_API_URL
ENV NX_DAEMON=false

COPY package*.json ./

RUN npm ci --ignore-scripts
RUN npm install -g nx

COPY . .

RUN nx build --skip-nx-cache --prod

FROM nginx:stable-alpine AS production

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/simra/browser /usr/share/nginx/html

EXPOSE 80

