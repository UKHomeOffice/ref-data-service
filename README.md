# ref-data-service
A frontend service for interacting with the Reference Data Service API

## Requirements
* npm 6.9.0
* node v8.10.0

## Development (option 1)
Open your terminal and run the following commands from the project directory.

```bash
# install dependencies
$ npm install

# build js bundle in development mode
$ npm run build-dev

# run the application in development mode
$ npm start
```

## Development with Docker (option 2)

To build the prototype's Docker container:

```bash
docker build -t ref-data-gov-tool .
```

To run the resulting Docker container:

```bash
docker run -p 8080:8080 \
  --env API_BASE_URL=https://your.api.com \
  --env KEYCLOAK_AUTH_URL=https://your.sso.com/auth \
  --env KEYCLOAK_CLIENT_ID=your-client-id \
  --env KEYCLOAK_REALM=your-realm \
  --env READ_ONLY_MODE=true \
  ref-data-gov-tool
```
