'use strict'

const apiVersion = 'v1';
const apiBaseUrl = process.env.API_BASE_URL || 'https://virtserver.swaggerhub.com/Viable-Data/Reference-Data-Service-API/0.0.1';
const apiUrl = `${apiBaseUrl}/${apiVersion}/`;

const internalUrls = {
    entity: '/entities/%s',
    entitySchema: '/entities/%s/schema',
    entityUpdate: '/entities/%s/schema/edit/%s',
    item: '/entities/%s/items/%s',
    itemUpdate: '/entities/%s/items/%s/edit/%s',
    itemDelete: '/entities/%s/items/%s/delete',
    itemNew: '/entities/%s/new',
};

const apiUrls = {
  entities: apiUrl + 'entities',
  entity: apiUrl + 'entities/%s',
  entitySchema: apiUrl + 'entities/%s?schemaOnly=true',
  item: apiUrl + 'entities/%s/items/%s',
};

const config = {
  logLevel: process.env.LOG_LEVEL || 'info',
  name: process.env.NAME || 'reference-data-governance-tool',
  clientPort: process.env.CLIENT_PORT || 8080,
  serverPort: process.env.SERVER_PORT || 5000,
  sessionSecret: process.env.SESSION_SECRET || 'anotverysecretsecretthing',
  title: process.env.TITLE || 'Reference Data Governance Tool',
  keycloakAuthUrl: process.env.KEYCLOAK_AUTH_URL || 'https://sso-dev.notprod.homeoffice.gov.uk/auth',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'refdata-ui',
  realm: process.env.KEYCLOAK_REALM || 'cop-dev',
  appUrls: internalUrls,
  apiUrls: apiUrls
}

export default config;
