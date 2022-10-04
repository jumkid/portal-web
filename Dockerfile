FROM node:18
ARG env

WORKDIR /opt/integration-hub

COPY src/app.${env}.properties ./app.properties

COPY dist/ /opt/integration-hub/
COPY package.json .

RUN mkdir -p /opt/integration-hub/logs
RUN npm install --production && rm package*.json

CMD ["node", "server.js"]

EXPOSE 80
