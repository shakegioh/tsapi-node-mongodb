FROM node:alpine
COPY *.json /app/
COPY *.config.js /app/
COPY .env /app/.env
WORKDIR /app
RUN npm install
COPY ./src /app/src
CMD [ "npm", "start" ]
