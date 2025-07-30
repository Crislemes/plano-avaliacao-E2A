/// <reference types="cypress" />

import cadastroPage from '../cadastroPage';

describe('Fluxo Completo - Cadastro de Plano de Avaliação', () => {

    before(() => {
        cy.loginAzureAd();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it.only('Deve executar o fluxo completo de cadastro', () => {
        cadastroPage.fluxoCompleto();
    });

});

