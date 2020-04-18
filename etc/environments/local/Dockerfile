FROM node:alpine
COPY *.json /app/
COPY *.config.js /app/
COPY .env.example /app/.env.example
COPY .env /app/.env
WORKDIR /app
RUN npm install
COPY ./src /app/src
CMD [ "npx", "nodemon", "--exec", "ts-node", "-r", "tsconfig-paths/register", "-r", "dotenv-safe/config", "src/server.ts" ]
