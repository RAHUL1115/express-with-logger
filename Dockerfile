FROM node:16 as devlopmentNode
WORKDIR /home/node/express-logger
COPY package*.json ./
RUN ["npm", "install"]
COPY .env ./
COPY app/ ./app/
COPY server.js ./server.js
CMD ["npm", "start"]