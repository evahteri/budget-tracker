FROM node:24

WORKDIR /usr/src/app

COPY --chown=node:node . .

COPY . .


RUN npm ci
CMD node index.js