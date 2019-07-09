import Keycloak from "keycloak-js";
import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore } from "redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";

// relative imports
import config from '../config/core';
import rootReducer from './reducers';

// component imports
import Healthcheck from './components/Healthcheck';
import Main from './components/Main';

const store = createStore(
  rootReducer
);

const kc = Keycloak({
  "realm": config.realm,
  "url": config.keycloakAuthUrl,
  "clientId": config.clientId
});

kc.onTokenExpired = () => {
  kc.updateToken().success((refreshed) => {
    if (refreshed) {
      store.getState().keycloak = kc;
    }
  }).error(function () {
    kc.logout();
  });
};

if (window.location.pathname !== '/_health') {
  kc.init({onLoad: 'login-required', checkLoginIframe: false}).success(authenticated => {
    if (authenticated) {
      store.getState().keycloak = kc;
      ReactDOM.render(
        <Provider store={store}>
          <Main/>
        </Provider>,
        document.getElementById('main')
      );
    }
  }).error(function () {
    kc.logout();
  });
} else {
  ReactDOM.render(
    <Healthcheck/>,
    document.getElementById('main')
  );
}
