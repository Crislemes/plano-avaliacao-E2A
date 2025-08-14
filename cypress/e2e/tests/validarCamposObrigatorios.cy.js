/// <reference types="cypress" />

import validaCamposObrigatorios from '../pages/validaCamposObrigatoriosPage';

describe('Testes Independentes - Planejamento Acadêmico', () => {

    it('Deve validar acesso inicial ao Planejamento Acadêmico', () => {
        cy.loginAzureAd();
        validaCamposObrigatorios.acessoInicial();
    });

    it('Deve acessar a tela do Plano de Avaliação', () => {
        cy.loginAzureAd();
        validaCamposObrigatorios.acessarPlanoAvaliacao();
    });

    it('Deve preencher configurações gerais do plano', () => {
        cy.loginAzureAd();
        validaCamposObrigatorios.configuracoesGerais();
    });
 
   it('Deve preencher a seleção de avaliações', () => {
        cy.loginAzureAd();
        validaCamposObrigatorios.selecaoAvaliacao();
    });

    it('Deve preencher a seção de assossições', () => {
        cy.loginAzureAd();
        validaCamposObrigatorios.associarDisciplinaOuTipoDeDisciplina();
    });
     it.only('Deve preencher a seção de assossições', () => {
        cy.loginAzureAd();
        validaCamposObrigatorios.validarMensagensCamposObrigatorios();
    });
});

