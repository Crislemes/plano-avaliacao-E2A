/// <reference types="cypress" />

import cadastroPage from '../cadastroPage';

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
 
   it('Deve preencher a seleção de avaliações', () => {
        cy.loginAzureAd();
        cadastroPage.selecaoAvaliacao();
    });

    it('Deve preencher a seção de assossições', () => {
        cy.loginAzureAd();
        cadastroPage.AssociarDisciplinaOuTipoDeDisciplina();
    });
});

