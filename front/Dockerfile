FROM node:24-slim AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=80
COPY --from=build /app/.output ./.output
USER node
EXPOSE 80
CMD ["node", ".output/server/index.mjs"]
