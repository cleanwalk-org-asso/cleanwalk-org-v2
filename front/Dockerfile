FROM node:20-alpine AS pre-prod

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm ci

COPY --chown=node:node . .


FROM pre-prod AS dev

EXPOSE 5173

CMD [ "npm", "run", "start" ]


FROM pre-prod AS build

RUN npm run build


FROM httpd:alpine AS prod

COPY --from=build /home/node/app/dist /usr/local/apache2/htdocs/

EXPOSE 80

CMD ["httpd-foreground"]