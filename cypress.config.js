const { defineConfig } = require("cypress");

module.exports = defineConfig({
  azuread: true,
  reporter: 'junit',
  video: true,
  screenshotOnRunFailure: true,
  watchForFileChanges: false,

  e2e: {
    baseUrl: 'https://cloudapp-dev.animaeducacao.com.br/',
    experimentalModifyObstructiveThirdPartyCode: true,
    trashAssetsBeforeRuns: true,
    specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', 'cypress/api/**/*.cy.{js,jsx,ts,tsx}'],
    supportFile: 'cypress/support/e2e.js',
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 60000,
    viewportWidth: 1280,
    viewportHeight: 720,

    setupNodeEvents(on, config) {
      // Adicionando variáveis diretamente no config
      config.urlFrontend = 'https://cloudapp-dev.animaeducacao.com.br/planejamento-academico';
      config.pularConfiguracaoMfaAAD = true;
      config.aad_username = 'qa.siafcore@homolog.animaeducacao.com.br';
      config.aad_password = 'senha';

      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        AzureAdSingleSignOn({ username, password, loginUrl, headless }) {
          console.log("Executando AzureAdSingleSignOn com:", { username, loginUrl });
          return {
            accessToken: "fake-access-token-123",
            refreshToken: "fake-refresh-token-456"
          };
        }
      });

      return config;
    }
  }
});






