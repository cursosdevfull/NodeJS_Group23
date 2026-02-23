ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

FROM base AS dependencies
ARG DIRECTORY=app-courses
COPY ${DIRECTORY}/package*.json .
RUN npm ci --omit=dev

FROM base AS build
ARG DIRECTORY=app-courses
COPY ${DIRECTORY}/package*.json .
RUN npm ci
COPY ${DIRECTORY}/. .
RUN npm run build:prd && ls -la dist

FROM base AS production
ARG DIRECTORY=app-courses
COPY ${DIRECTORY}/package.json .
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY ${DIRECTORY}/.env .env

USER node

CMD ["npm", "start"]