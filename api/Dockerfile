# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
# Installer TOUTES les deps pour compiler
RUN npm ci

COPY . .
RUN npm run build
RUN npx prisma generate

# ---- Prod stage ----
FROM node:22-alpine AS prod
WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "dist/index.js"]
