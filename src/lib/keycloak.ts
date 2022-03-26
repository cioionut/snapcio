import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  url: 'https://keycloak-cio-dev.ionkom.com:3443/',
  realm: 'ionkom',
  clientId: 'myapp',
});

export default keycloak;