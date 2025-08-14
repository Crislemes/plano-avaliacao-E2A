
/// <reference types="cypress" />

import elements from '../elements/elements';
const index = 2;

class validaCamposObrigatorios {

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

    configuraçõesGerais() {
        this.setupPlanoAvaliacaoPage();

        cy.getIframeBody(elements.iframe)
            .find(elements.inputs.nomePlano)
            .type('Cadastro bem sucedido');

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
            .find(elements.selects.comboboxOptions)
            .contains('A1')
            .trigger('mousedown');

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.comboboxFormaAvaliacao)
            .scrollIntoView()
            .should('be.visible')
            .click();

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.comboboxOptions)
            .contains('Regular')
            .click();

        cy.getIframeBody(elements.iframe)
            .find(elements.inputs.valorAvaliacao)
            .scrollIntoView()
            .type('100')
    }

    validarMensagensCamposObrigatorios() {
        this.setupPlanoAvaliacaoPage();

        // Tenta salvar sem preencher campos obrigatórios
        cy.getIframeBody(elements.iframe)
            .contains('button', 'Confirmar')
            .click();

        // Valida mensagens de erro
        cy.getIframeBody(elements.iframe)
            .find(elements.validacoes.mensagemErro)
            .should('be.visible')
            .and('contain.text', 'Campo obrigatório');

        // Valida campos com erro
        cy.getIframeBody(elements.iframe)
            .find(elements.validacoes.campoObrigatorio)
            .should('exist');
    }

    AssociarDisciplinaOuTipoDeDisciplina() {
        this.setupPlanoAvaliacaoPage();

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.radioDisciplina)
            .scrollIntoView()
            .should('be.visible')
            .click();

        cy.wait(1000);

        cy.getIframeBody(elements.iframe)
            .find(elements.inputs.disciplina)
            .scrollIntoView()
            .should('be.visible')
            .type('3316-40');

        cy.wait(2000);

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.comboboxOptions)
            .contains('3316-40 - Acionamentos Hidráulicos e Pneumáticos')
            .trigger('mousedown');

        cy.wait(1000);

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.tipoAvaliacao)
            .scrollIntoView()
            .should('be.visible')
            .click();

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.comboboxOptions)
            .contains('Avaliação')
            .click();

        cy.wait(1000);

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.regraConceito)
            .scrollIntoView()
            .should('be.visible')
            .click();

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.comboboxOptions)
            .contains('Aprovado/Reprovado por Nota')
            .click();

        cy.wait(1000);

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.periodoLetivoInicial)
            .scrollIntoView()
            .should('be.visible')
            .click();

        cy.getIframeBody(elements.iframe)
            .find(elements.selects.comboboxOptions)
            .contains('2026/1')
            .click();

        cy.getIframeBody(elements.iframe)
            .contains('button', 'Associar')
            .should('be.visible')
            .click();

        cy.getIframeBody(elements.iframe)
            .find(elements.validacoes.associacoesInseridas)
            .should('have.length.at.least', 1);

        cy.getIframeBody(elements.iframe)
            .contains('.v-btn__content', 'Confirmar')
            .should('be.visible')
            .click();
    }
}

export default new validaCamposObrigatorios();
