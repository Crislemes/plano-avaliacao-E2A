/// <reference types="cypress" />

import cadastroPage from './cadastroPage';

describe('Testes Independentes - Planejamento Acadêmico', () => {

    it('Deve validar acesso inicial ao Planejamento Acadêmico', () => {
        cy.loginAzureAd();
        cadastroPage.acessoInicial();
    });

    it('Deve acessar a tela do Plano de Avaliação', () => {
        cy.loginAzureAd();
        cadastroPage.acessarPlanoAvaliacao();
    });

    it('Deve preencher configurações gerais do plano', () => {
        cy.loginAzureAd();
        cadastroPage.configuraçõesGerais();
    });

    it.only('Deve preencher a seleção de avaliações', () => {
        cy.loginAzureAd();
        cadastroPage.selecaoAvaliacao();
    });

});

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

    it('Deve executar o fluxo completo de cadastro', () => {
        cadastroPage.fluxoCompleto();
    });

});

