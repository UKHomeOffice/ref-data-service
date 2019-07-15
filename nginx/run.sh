#!/bin/bash -

set -o errexit

mkdir -p /run/nginx

# --- Start Insert ENV to JS bundle ---
echo "== Inserting env variables =="
for file in /usr/share/nginx/html/*.js
do
  echo "== ENV sub for $file =="
  sed -i 's,https://api.fake.build.com,'${API_BASE_URL}',g' $file
  sed -i 's,fake-environment,'${ENVIRONMENT}',g' $file
  sed -i 's,https://sso-fake.build.com/auth,'${KEYCLOAK_AUTH_URL}',g' $file
  sed -i 's,fake-client-id,'${KEYCLOAK_CLIENT_ID}',g' $file
  sed -i 's,fake-realm,'${KEYCLOAK_REALM}',g' $file
  sed -i 's,"fake-read-only-mode",'${READ_ONLY_MODE}',g' $file
done
echo "== Finished ENV sub =="
# --- End Insert ENV to JS bundle ---


# config file takes precedence
if [[ -f ${NGINX_CONFIG_FILE} ]]; then
  echo "== Starting nginx using a config file =="
  nginx -g 'daemon off;' -c ${NGINX_CONFIG_FILE}
elif [[ -n ${NGINX_CONFIG} ]]; then
  echo "== Starting nginx using a config variable =="
  cp -f <(echo "${NGINX_CONFIG}") /etc/nginx/nginx.conf
  nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
else
  echo "== [error] Please set NGINX_CONFIG_FILE or NGINX_CONFIG variable. =="
  exit 1
fi
