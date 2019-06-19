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

let config;

if (typeof window === 'undefined') {
  config = {
    logLevel: window.env.LOG_LEVEL || 'info',
    keycloakAuthUrl: window.env.KEYCLOAK_AUTH_URL || 'https://sso-dev.notprod.homeoffice.gov.uk/auth',
    clientId: window.env.KEYCLOAK_CLIENT_ID || 'refdata-ui',
    realm: window.env.KEYCLOAK_REALM || 'cop-dev',
  };
} else {
  config = {
    logLevel: process.env.LOG_LEVEL || 'info',
    keycloakAuthUrl: process.env.KEYCLOAK_AUTH_URL || 'https://sso-dev.notprod.homeoffice.gov.uk/auth',
    clientId: process.env.KEYCLOAK_CLIENT_ID || 'refdata-ui',
    realm: process.env.KEYCLOAK_REALM || 'cop-dev'
  };  
}

config.appUrls = internalUrls;
config.apiUrls = apiUrls;

export default config;
