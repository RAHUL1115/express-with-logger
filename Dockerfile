FROM node:16
WORKDIR /home/node/express-logger
COPY package*.json ./
COPY .env ./
RUN ["npm", "install"]
COPY server.js ./server.js
CMD ["npm", "start"]