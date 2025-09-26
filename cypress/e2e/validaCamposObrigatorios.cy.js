/// <reference types="cypress" />

import ValidaCamposObrigatorios from './pages/validaCamposObrigatoriosPage';

describe('Validação de Campos Obrigatórios - Plano de Avaliação', () => {

    before(() => {
        cy.loginAzureAd();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });
    
    const validaCampos = new ValidaCamposObrigatorios();

    it('Mensagens de campos obrigatórios', () => {
        validaCampos.validarTodosCamposObrigatorios();
    });
});