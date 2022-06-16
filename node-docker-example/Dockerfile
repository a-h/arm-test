# See https://docs.docker.com/language/nodejs/run-tests/
FROM node:16-alpine AS base

COPY package.json package.json
COPY package-lock.json package-lock.json

WORKDIR /app
# Used to bring in additional private NPM packages.
# Uncomment if required.
# ARG CI_USER_PERSONAL_ACCESS_TOKEN
# RUN echo @a-h:registry=https://npm.pkg.github.com/ >> .npmrc
# RUN echo //npm.pkg.github.com/:_authToken=$CI_USER_PERSONAL_ACCESS_TOKEN >> .npmrc

FROM base as test
RUN npm ci
COPY . .
RUN npm run test

FROM base as build
RUN npm ci
COPY . .
RUN npm run build

FROM build as prod
RUN npm ci --production
COPY --from=build /app/build ./
ENTRYPOINT [ "node", "app.js" ]
