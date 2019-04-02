'use strict'

const apiBaseUrl = 'https://virtserver.swaggerhub.com/Viable-Data/Reference-Data-Service-API/0.0.1/v1/';

const config = {
  logLevel: process.env.LOG_LEVEL || 'info',
  name: process.env.NAME || 'reference-data-governance-tool',
  clientPort: process.env.CLIENT_PORT || 8080,
  serverPort: process.env.SERVER_PORT || 5000,
  sessionSecret: process.env.SESSION_SECRET || 'anotverysecretsecretthing',
  title: process.env.TITLE || 'Reference Data Governance Tool',
  keycloakAuthUrl: process.env.KEYCLOAK_AUTH_URL,
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  realm: process.env.KEYCLOAK_REALM,
  apiDataEntitiesUrl: apiBaseUrl + 'entities',
  apiEntitiesUrl: apiBaseUrl + 'entities/%s',
  apiEntitiesSchemaUrl: apiBaseUrl + 'entities/%s%s',
  apiEntityDetailUrl: apiBaseUrl + 'entities/%s/items/%s',
}

export default config
