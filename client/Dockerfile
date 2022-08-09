FROM node:alpine

WORKDIR /frontend

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "start"]