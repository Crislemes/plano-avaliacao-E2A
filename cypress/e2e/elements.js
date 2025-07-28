const elements = {
    cadastro: {
        exibicaoText: '.v-toolbar__title',
        menu: '.v-btn__content > .v-icon',
        menuPlanoAvaliacao: '.v-list-item__title:contains("Plano de Avaliação")',
        itensMenu: {
            Matrizes: '.v-list-item__title:contains("Matrizes")',
            Ofertas: '.v-list-item__title:contains("Ofertas")',
            Extensão: '.v-list-item__title:contains("Extensão")',
            Dispensas: '.v-list-item__title:contains("Dispensas")',
            TurmaComposicao: '.v-list-item__title:contains("Turma Composição")',
            Vagas: '.v-list-item__title:contains("Vagas")',
            GestaodeOfertas: ':nth-child(7) > section > .v-list-item > .v-list-item_content > .v-list-item_title',
            GestaodePeriodoLetivo: ':nth-child(8) > section > .v-list-item > .v-list-item_content > .v-list-item_title'
        }
    },
    titulo: '.h1__titulo_plano',
    iframe: 'iframe',
    iframePlanoAvaliacao: '.iframe-plano-avaliacao',
    botoes: {
        criarNovaConfiguracao: 'button:contains("Criar nova configuração")',
        confirmar: 'button:contains("Confirmar")',
        voltar: 'button:contains("voltar")',
        confirmarVolta: 'button:contains("confirmar volta")'
    },
    inputs: {
        nomePlano: 'input[placeholder="Inserir o nome do plano"]',
        totalPontos: 'input[placeholder="Inserir o total de pontos"]',
        frequenciaAprovacao: 'input[placeholder="Inserir a % de frequência para a aprovação"]',
        avaliacaoAprovacao: 'input[placeholder="Inserir a % de avaliação para a aprovação"]',
        selecione: 'input[placeholder="Selecione"]'
    },
    selects: {
        arredondamento: '#arredondamento',
        comboboxOptions: '.combobox_options li',
        comboBoxTextoOptions: '.combo-box-texto-options',
        combopesquisaAvaliacao: '#tipoAvaliacao_0',
        comboboxOptionsAvaliacao: '.combobox_options li.selecao_azul'
    },
    modal: {
        container: '.modal[data-v-9e9315c7]',
        textoDeseja: 'Deseja voltar?'
    }
}

export default elements;