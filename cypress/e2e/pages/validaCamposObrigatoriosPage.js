/// <reference types="cypress" />

import { select } from 'async';
import elements from '../elements/elements';

export default class ValidaCamposObrigatorios {

    normalizeString(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '')
            .toLowerCase();
    }

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



    validarCampoObrigatorio(campoSelector, mensagemEsperada, tipo = 'input') {
        cy.getIframeBody(elements.iframe).within(() => {
            cy.get(campoSelector).scrollIntoView(); // garante que o campo esteja visível

            if (tipo === 'input') {
                cy.get(campoSelector)
                    .type(' ')
                    .clear();
            } else if (tipo === 'select' || tipo === 'combobox') {
                cy.get(campoSelector)
                    .click()      // abre dropdown se necessário
                    .then($el => {
                        $el[0].blur(); // dispara evento de perda de foco
                    });
            }

            cy.contains(mensagemEsperada)
                .should('be.visible');
        });
    }

    // ✅ Validação completa de todos os campos obrigatórios
    validarTodosCamposObrigatorios() {
        this.acessoInicial();
        this.setupPlanoAvaliacaoPage();

        const mensagem = 'Este campo é obrigatório';

        // Campos de configurações gerais
        const camposConfiguracao = [
            elements.inputs.nomePlano,
            elements.inputs.totalPontos,
            elements.inputs.frequenciaAprovacao,
            elements.inputs.avaliacaoAprovacao
        ];

        camposConfiguracao.forEach(campo => {
            this.validarCampoObrigatorio(campo, mensagem, 'input');
        });

        // Campos de seleção de avaliação
        const camposSelecao = [
            { selector: elements.selects.combopesquisaAvaliacao, tipo: 'combobox' },
            { selector: elements.selects.comboboxFormaAvaliacao, tipo: 'combobox' },
            { selector: elements.inputs.valorAvaliacao, tipo: 'input' }
        ];

        camposSelecao.forEach(campo => {
            this.validarCampoObrigatorio(campo.selector, mensagem, campo.tipo);
        });

        // Campos de associação de disciplina
        const camposAssociacao = [
            { selector: elements.inputs.tipoDisciplina, tipo: 'combobox' },
            { selector: elements.selects.tipoAvaliacao, tipo: 'combobox' },
            { selector: elements.selects.regraConceito, tipo: 'combobox' },
            { selector: elements.selects.periodoLetivoInicial, tipo: 'combobox' }
        ];

        camposAssociacao.forEach(campo => {
            this.validarCampoObrigatorio(campo.selector, mensagem, campo.tipo);
        });

        // Campos de vínculo marca (habilita checkbox primeiro)
        cy.getIframeBody(elements.iframe)
            .find('label[for="habilitaVinculoMarcaIesCampusCheckbox"]')
            .click();

        this.validarCampoObrigatorio(elements.selects.marca, mensagem, 'select');
    }

};