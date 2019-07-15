'use strict'

const apiVersion = 'v1';
const apiBaseUrl = process.env.API_BASE_URL || 'https://virtserver.swaggerhub.com/Viable-Data/Reference-Data-Service-API/0.0.1';
const apiUrl = `${apiBaseUrl}/${apiVersion}/`;
const serviceDeskBaseUrl = 'https://support.cop.homeoffice.gov.uk/servicedesk';

const internalUrls = {
  entities: '/',
  deleteEntity: '/entities/%s/delete',
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

const serviceDeskUrls = {
  addDataSet: `${serviceDeskBaseUrl}/customer/portal/3/create/51`,
  feedback: `${serviceDeskBaseUrl}/customer/portal/3/create/50`,
  help: `${serviceDeskBaseUrl}/customer/portal/3/group/18`,
};

const config = {
    logLevel: process.env.LOG_LEVEL || 'info',
    keycloakAuthUrl: process.env.KEYCLOAK_AUTH_URL || 'https://sso-dev.notprod.homeoffice.gov.uk/auth',
    clientId: process.env.KEYCLOAK_CLIENT_ID || 'refdata-ui',
    realm: process.env.KEYCLOAK_REALM || 'cop-dev',
    readOnly: process.env.READ_ONLY_MODE || false,
    environment: process.env.ENVIRONMENT || 'development',
}

config.appUrls = internalUrls;
config.apiUrls = apiUrls;
config.serviceDesk = serviceDeskUrls;

export default config;
