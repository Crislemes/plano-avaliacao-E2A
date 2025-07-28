
/// <reference types="cypress" />

import elements from './elements';
const index = 2;

class cadastroPage {

    normalizeString(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '')
            .toLowerCase();
    }

    // Método auxiliar para setup da página do Plano de Avaliação
    setupPlanoAvaliacaoPage() {
        cy.visit('/planejamento-academico/planoAvaliacao/');
        cy.wait(3000);
        cy.get(elements.iframe, { timeout: 10000 }).should('be.visible');

        cy.getIframeBody(elements.iframe)
            .find(elements.botoes.criarNovaConfiguracao)
            .click();
    }

    acessoInicial() {
        cy.visit('/planejamento-academico/');
        cy.url({ timeout: 20000 }).should('include', '/planejamento-academico');

        cy.get(elements.cadastro.exibicaoText, { timeout: 10000 })
            .should('contain.text', 'Planejamento acadêmico')
            .should('be.visible');
    }

    acessarPlanoAvaliacao() {
        this.setupPlanoAvaliacaoPage();

        cy.getIframeBody(elements.iframe)
            .find(elements.titulo)
            .should('be.visible')
            .and('contain.text', 'Configuração do Plano de Avaliação');
    }

    fluxoCompleto() {
        this.acessoInicial();
        this.acessarPlanoAvaliacao();
        this.configuraçõesGerais();
    }

    configuraçõesGerais() {
        this.setupPlanoAvaliacaoPage();

        cy.getIframeBody(elements.iframe)
            .find(elements.inputs.nomePlano)
            .type('Meu Plano de Avaliação');

        cy.getIframeBody(elements.iframe)
            .find(elements.inputs.totalPontos)
            .type('100');

        cy.getIframeBody(elements.iframe)
            .find(elements.inputs.frequenciaAprovacao)
            .type('70');

        cy.getIframeBody(elements.iframe)
            .find(elements.inputs.avaliacaoAprovacao)
            .type('70');

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.arredondamento)
            .should("be.visible")
            .click();

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.comboboxOptions)
            .eq(index)
            .click();


    }
    selecaoAvaliacao() {
        this.setupPlanoAvaliacaoPage();

        // Primeiro clica no campo para abrir o dropdown
        cy.getIframeBody(elements.iframe)
            .find(elements.selects.combopesquisaAvaliacao)
            .should('be.visible')
            .type('A1')
            .click();

        // Aguarda as opções aparecerem
        cy.wait(2000);

        // Seleciona a opção A1
        cy.getIframeBody(elements.iframe)
            .find('.combobox_options li')
            .contains('A1')
            .trigger('mousedown');
    }
}

export default new cadastroPage();