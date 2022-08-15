FROM node:alpine

WORKDIR /backend

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "run", "start:dev"]