'use strict'

/* eslint no-process-env: 0 */
/* eslint no-inline-comments: 0 */
/* eslint camelcase: 0 */

const apiBaseUrl = 'https://virtserver.swaggerhub.com/Viable-Data/Reference-Data-Service-API/0.0.1/v1/';

module.exports = {
  logLevel: process.env.LOG_LEVEL || 'info',
  name: process.env.NAME || 'reference-data-governance-tool',
  clientPort: process.env.CLIENT_PORT || 8080,
  serverPort: process.env.SERVER_PORT || 5000,
  sessionSecret: process.env.SESSION_SECRET || 'anotverysecretsecretthing',
  title: process.env.TITLE || 'Reference Data Governance Tool',
  apiDataEntitiesUrl: apiBaseUrl + 'entities',
  apiEntitiesUrl: apiBaseUrl + 'entities/%s',
  apiEntitiesSchemaUrl: apiBaseUrl + 'entities/%s%s',
  apiEntityDetailUrl: apiBaseUrl + 'entities/%s/items/%s',
}
