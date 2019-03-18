'use strict'

/* eslint no-process-env: 0 */
/* eslint no-inline-comments: 0 */
/* eslint camelcase: 0 */

module.exports = {
  logLevel: process.env.LOG_LEVEL || 'info',
  name: process.env.NAME || 'reference-data-governance-tool',
  clientPort: process.env.PORT || 8080,
  serverPort: process.env.PORT || 5000,
  sessionSecret: process.env.SESSION_SECRET || 'anotverysecretsecretthing',
  title: process.env.TITLE || 'Reference Data Governance Tool',
}
