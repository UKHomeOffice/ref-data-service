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
docker build -t ref-data-service .
```

To run the resulting Docker container:

```bash
docker run -p 8080:8080 \
  --env API_BASE_URL=https://your.api.com \
  --env KEYCLOAK_AUTH_URL=https://your.sso.com/auth \
  --env KEYCLOAK_CLIENT_ID=your-client-id \
  --env KEYCLOAK_REALM=your-realm \
  --env READ_ONLY_MODE=true \
  ref-data-service
```

# Drone secrets

Name|Example value
---|---
dev_api_ref_kube_token|xxx
dev_api_ref_url|api.dev.refdata.homeoffice.gov.uk, api.staging.refdata.homeoffice.gov.uk, api.refdata.homeoffice.gov.uk
dev_drone_aws_access_key_id|https://console.aws.amazon.com/iam/home?region=eu-west-2#/users/bf-it-devtest-drone?section=security_credentials
dev_drone_aws_secret_access_key|https://console.aws.amazon.com/iam/home?region=eu-west-2#/users/bf-it-devtest-drone?section=security_credentials
drone_public_token|Drone token (Global for all github repositories and environments)
env_environment|dev, staging, production
env_keycloak_realm|cop-dev, cop-staging, cop-prod
env_keycloak_url|sso-dev.notprod.homeoffice.gov.uk/auth, sso.digital.homeoffice.gov.uk/auth
env_kube_server|https://kube-api-notprod.notprod.acp.homeoffice.gov.uk, https://kube-api-prod.prod.acp.homeoffice.gov.uk
env_kube_namespace_refdata|refdata-dev, cop-refdata-staging, cop-refdata
env_www_ref_read_only_mode|True
env_www_ref_url|www.dev.refdata.homeoffice.gov.uk, www.staging.refdata.homeoffice.gov.uk, www.refdata.homeoffice.gov.uk
nginx_image|quay.io/ukhomeofficedigital/nginx-proxy
nginx_tag|latest
production_drone_aws_access_key_id|https://console.aws.amazon.com/iam/home?region=eu-west-2#/users/bf-it-prod-drone?section=security_credentials
production_drone_aws_secret_access_key|https://console.aws.amazon.com/iam/home?region=eu-west-2#/users/bf-it-prod-drone?section=security_credentials
protocol_https|https
quay_password|xxx (Global for all repositories and environments)
quay_username|docker (Global for all repositories and environments)
slack_webhook|https://hooks.slack.com/services/xxx/yyy/zzz (Global for all repositories and environments)
staging_drone_aws_access_key_id|https://console.aws.amazon.com/iam/home?region=eu-west-2#/users/bf-it-prod-drone?section=security_credentials
staging_drone_aws_secret_access_key|https://console.aws.amazon.com/iam/home?region=eu-west-2#/users/bf-it-prod-drone?section=security_credentials
www_ref_image|quay.io/ukhomeofficedigital/ref-data-service
www_ref_keycloak_client_id|keycloak client name
www_ref_name|ref-data-service
www_ref_port|8080
