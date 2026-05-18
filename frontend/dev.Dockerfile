FROM node:24

WORKDIR /usr/src/app

COPY ./budget-tracker .

RUN npm install


CMD ["npm", "run", "dev", "--", "--host"]