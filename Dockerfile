FROM node:20-alpine
EXPOSE 3000
RUN npm install && npm run build
RUN node client-server.js