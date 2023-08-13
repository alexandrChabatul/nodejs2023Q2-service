FROM node:16-alpine as development

# Optional NPM automation (auth) token build argument
# ARG NPM_TOKEN

# Optionally authenticate NPM registry
# RUN npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

WORKDIR /app

# Copy configuration files
COPY tsconfig.json ./
COPY package*.json ./

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN yarn install

# Copy application sources (.ts, .tsx, js)
COPY src/ src/
COPY doc/ doc/
COPY db/ db/

# Build application (produces dist/ folder)
RUN npm run build

# # Runtime (production) layer
FROM node:alpine3.18 as production

# Optional NPM automation (auth) token build argument
# ARG NPM_TOKEN

# Optionally authenticate NPM registry
# RUN npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

WORKDIR /app

# Copy dependencies files
COPY package*.json ./
COPY tsconfig.json ./

# Install runtime dependecies (without dev/test dependecies)
RUN yarn install --omit=dev

# Copy production build
COPY --from=development /app/dist/ ./dist/

# Expose application port
EXPOSE 4000

# Start application
CMD [ "node", "dist/src/main.js" ]