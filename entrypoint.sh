#!/bin/sh
set -xe
: "${API_URL?Precisa de uma variavel de ambiente API_URL}"
: "${REACT_APP_ATUALIZACAO_CADASTRAL_URL?Precisa de uma variavel de ambiente REACT_APP_ATUALIZACAO_CADASTRAL_URL}"

sed -i "s,API_URL_REPLACE_ME,$API_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,ATUALIZACAO_CADASTRAL_URL_REPLACE_ME,$REACT_APP_ATUALIZACAO_CADASTRAL_URL,g" /usr/share/nginx/html/static/js/main*.js

exec "$@"
