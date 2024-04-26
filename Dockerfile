FROM node:18
ENV APP_ENV=local
ENV APP_PORT=5500

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
