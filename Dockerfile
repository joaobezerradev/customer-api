FROM node:lts-alpine3.16

USER root

WORKDIR /home/node/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i -g @nestjs/cli

COPY . .

ENTRYPOINT ["tail", "-f", "/dev/null"]
