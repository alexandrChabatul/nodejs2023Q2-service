# Home Library Service

## Docker RUN

There is a docker-compose file at the root of the repository. To run the application, you need to have an .env file of the installed sample.
Run command:

```
docker-compose-up
```

Entities in the database should be created automatically. If for some reason this did not happen. Then you can go into the server container and run the migration:
```
docker ps -a (to find container id)
```
```
docker exec -it (container id) sh
```
```
npm run migration:start:dev
```

To check the security of an image, you can use the command:
```
npm run docker-check
```
Image size - 358 MB. Link - https://hub.docker.com/layers/sashkill94/alex-repository/node_server/images/sha256-761f30aec6fc33f7f1a42c5ab16dc7ee99f53d7521cb69b334419d08ecc40855?context=repo

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
npm run start:dev
```

After starting the app on port (3000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
