/// <reference types="cypress" />
import 'cypress-localstorage-commands';

Cypress.Commands.add('configurarStubFeaturesToggles', () => {
  cy.intercept(
    'GET',
    /https:\/\/cloudapp\.animaeducacao\.com\.br\/planejamento-academico\/toggleservice\/frontend\/api\/Features\/desenvolvimento/,
    {
      statusCode: 200,
      body: 'fx:features-toggles-padrao',
    }).as('obterFeatureToggles');
});

Cypress.Commands.add('login', () => {
  cy.session('sessao-login', () => {
    cy.task('AzureAdSingleSignOn', {
      username: Cypress.env('AAD_USERNAME'),
      password: Cypress.env('AAD_PASSWORD'),
      loginUrl: 'https://cloudapp-dev.animaeducacao.com.br/planejamento-academico/',
      headless: true
    }).then(result => {
      if (!result)
        throw new Error('Não foi possível ler os tokens do localStorage. Verifique as configurações de autenticação e tente novamente.');

      const keys = Object.keys(result);
      keys.forEach((key) => {
        cy.setLocalStorage(key, result[key]);
      });
    });
  });
});

Cypress.Commands.add("generateToken", () => {
  cy.request({
    method: "GET",
    url: "https://login.microsoftonline.com/80f6a699-b024-4b7b-8cca-5ecfdd2a2fe3/oauth2/v2.0/token",
    body: new URLSearchParams({
      grant_type: Cypress.env('grant_type'),
      scope: Cypress.env('scope'),
      client_id: Cypress.env('client_id'),
      client_secret: Cypress.env('client_secret')

    }).toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    const token = response.body.access_token;
    Cypress.env("authToken", token);
  });
});

Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy
    .get(iframeSelector, { timeout: 20000 })
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
});