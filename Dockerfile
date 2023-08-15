FROM node:16-alpine as development

WORKDIR /app

COPY tsconfig.json ./
COPY package*.json ./

RUN npm install

COPY src/ src/
COPY doc/ doc/
COPY db/ db/

RUN npm run build

FROM node:alpine3.18 as production

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install --omit=dev

COPY --from=development /app/dist/ ./dist/

EXPOSE ${PORT}


CMD [ "node", "dist/src/main.js" ]