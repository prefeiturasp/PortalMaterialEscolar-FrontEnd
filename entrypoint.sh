#!/bin/sh
set -xe
: "${API_URL?Precisa de uma variavel de ambiente API_URL}"
: "${REACT_APP_ATUALIZACAO_CADASTRAL_URL?Precisa de uma variavel de ambiente REACT_APP_ATUALIZACAO_CADASTRAL_URL}"
: "${REACT_APP_CONSULTA_CADASTRO_URL?Precisa de uma variavel de ambiente REACT_APP_CONSULTA_CADASTRO_URL}"
: "${CODE_GA?Precisa de uma variavel de ambiente CODE_GA}"

sed -i "s,API_URL_REPLACE_ME,$API_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,ATUALIZACAO_CADASTRAL_URL_REPLACE_ME,$REACT_APP_ATUALIZACAO_CADASTRAL_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,CONSULTA_CADASTRO_URL_REPLACE_ME,$REACT_APP_CONSULTA_CADASTRO_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,CODE_GA_REPLACE_ME,$CODE_GA,g" /usr/share/nginx/html/static/js/main*.js

exec "$@"
