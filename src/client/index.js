import Keycloak from "keycloak-js";
import React from 'react';
import ReactDOM from 'react-dom';

// local imports
import Main from 'Main';
import config from '../config/core';

const kc = Keycloak({
  "realm": config.realm,
  "url": config.keycloakAuthUrl,
  "clientId": config.clientId
});

kc.init({onLoad: 'login-required', checkLoginIframe: false}).success(authenticated => {
  if (authenticated) {
    store.getState().keycloak = kc;
    ReactDOM.render(
      <Main/>,
      document.getElementById('main')
    );
  }
}).error(function () {
  kc.logout();
});
