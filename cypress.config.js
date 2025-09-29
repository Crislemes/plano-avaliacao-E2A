const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://cloudapp-dev.animaeducacao.com.br/planejamento-academico',
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      apiUrl: 'https://cloudapp-dev.animaeducacao.com.br/api/plano-avaliacao/v1'
    },
    setupNodeEvents(on, config) {
      // Setup node events if needed
    },
  },
});