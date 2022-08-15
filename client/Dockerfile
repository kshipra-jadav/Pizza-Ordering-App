FROM node:alpine

WORKDIR /frontend

COPY package.json package.json

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache


COPY . .

CMD ["npm", "start"]