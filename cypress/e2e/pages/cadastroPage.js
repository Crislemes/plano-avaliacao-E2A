/// <reference types="cypress" />

import elements from '../elements/elements';
const index = 2;

class cadastroPage {

    normalizeString(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '')
            .toLowerCase();
    }

    getIframeElement(selector) {
        cy.get(elements.iframe, { timeout: 20000 }).should('be.visible');
        return cy.getIframeBody(elements.iframe).find(selector);
    }

    clickComboOption(optionText) {
        this.getIframeElement(elements.selects.comboboxOptions)
            .contains(optionText)
            .should('be.visible')
            .click();
    }

    fluxoCompleto() {
        this.acessoInicial();
        this.acessarPlanoAvaliacao();
        this.configuracoesGerais();
        this.selecaoAvaliacao();
        this.associarDisciplinaOuTipoDeDisciplina();
    }

    acessoInicial() {
        cy.visit('/planejamento-academico/');
        cy.url({ timeout: 20000 }).should('include', '/planejamento-academico');
        cy.get(elements.cadastro.exibicaoText, { timeout: 10000 })
            .should('contain.text', 'Planejamento acadêmico')
            .should('be.visible');
    }

    acessarPlanoAvaliacao() {
        cy.visit('/planejamento-academico/planoAvaliacao/');
        cy.wait(3000);
        cy.get(elements.iframe, { timeout: 10000 }).should('be.visible');
        this.getIframeElement(elements.botoes.criarNovaConfiguracao).click();
        this.getIframeElement(elements.titulo)
            .should('be.visible')
            .and('contain.text', 'Configuração do Plano de Avaliação');
    }

    configuracoesGerais() {

        const nomeDinamico = `Plano ${Math.floor(Math.random() * 10000)}`;

        this.getIframeElement(elements.inputs.nomePlano).type(nomeDinamico);
        // Opcional: salvar o valor em um alias para usar depois no teste
        cy.wrap(nomeDinamico).as('nomePlanoCriado');
        // this.getIframeElement(elements.inputs.nomePlano).type('Cadastro bem sucedido');
        this.getIframeElement(elements.inputs.totalPontos).type('100');
        this.getIframeElement(elements.inputs.frequenciaAprovacao).type('70');
        this.getIframeElement(elements.inputs.avaliacaoAprovacao).type('70');
        this.getIframeElement(elements.selects.arredondamento).should('be.visible').click();
        this.getIframeElement(elements.selects.comboboxOptions).eq(index).click();
    }

    selecaoAvaliacao() {
        this.getIframeElement(elements.selects.combopesquisaAvaliacao)
            .should('be.visible')
            .type('A1')
            .click();

        cy.wait(2000);

        this.getIframeElement(elements.selects.comboboxOptions)
            .contains('A1')
            .should('be.visible')
            .trigger('mousedown');

        this.getIframeElement(elements.selects.comboboxFormaAvaliacao)
            .scrollIntoView()
            .should('be.visible')
            .click();

        this.clickComboOption('Regular');

        this.getIframeElement(elements.inputs.valorAvaliacao)
            .scrollIntoView()
            .type('100');
    }

    associarDisciplinaOuTipoDeDisciplina() {
        this.getIframeElement(elements.selects.radioDisciplina)
            .scrollIntoView()
            .should('be.visible')
            .click();

        cy.wait(1000);

        this.getIframeElement(elements.inputs.disciplina)
            .scrollIntoView()
            .should('be.visible')
            .type('3316-40');

        cy.wait(2000);

        this.getIframeElement(elements.selects.comboboxOptions)
            .contains('3316-40 - Acionamentos Hidráulicos e Pneumáticos')
            .trigger('mousedown');

        cy.wait(1000);

        this.getIframeElement(elements.selects.tipoAvaliacao)
            .scrollIntoView()
            .should('be.visible')
            .click();

        this.clickComboOption('Avaliação');

        cy.wait(1000);

        this.getIframeElement(elements.selects.regraConceito)
            .scrollIntoView()
            .should('be.visible')
            .click();

        this.clickComboOption('Aprovado/Reprovado por Nota');

        cy.wait(1000);

        this.getIframeElement(elements.selects.periodoLetivoInicial)
            .scrollIntoView()
            .should('be.visible')
            .click();

        this.clickComboOption('2026/1');

        this.getIframeElement('button:contains("Associar")')
            .should('be.visible')
            .click();

        this.getIframeElement(elements.validacoes.associacoesInseridas)
            .should('have.length.at.least', 1);

        this.getIframeElement('.v-btn__content:contains("Confirmar")')
            .should('be.visible')
            .click();

        this.getIframeElement(elements.botoes.salvarPlano)
            .contains('Confirmar')
            .should('be.visible')
            .click();

        /*this.getIframeElement(elements.validacoes.planoCadastrado)
            .contains('Cadastro bem sucedido')
            .should('be.visible');*/

        // Valida se o nome do plano aparece visível na tela
        cy.get('@nomePlanoCriado').then(nome => {
            this.getIframeElement(elements.validacoes.planoCadastrado)
                .contains(nome)
                .should('be.visible');
        });

        cy.log('✅ Plano cadastrado com sucesso!');
    }
}

export default new cadastroPage();
