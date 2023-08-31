FROM node:lts-alpine AS development

RUN npm install -g yarn

WORKDIR /app

COPY package*.json ./

RUN yarn install

EXPOSE 3000

RUN nest build

ENV NODE_ENV='development'
CMD [ "node", "dist/main.js"]

FROM node:lts-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]