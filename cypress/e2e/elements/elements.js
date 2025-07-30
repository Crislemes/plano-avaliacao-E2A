const elements = {
    cadastro: {
        exibicaoText: '.v-toolbar__title'
    },
    titulo: '.h1__titulo_plano',
    iframe: 'iframe',
    botoes: {
        criarNovaConfiguracao: 'button:contains("Criar nova configuração")',
        associar: 'button',
        confirmar: '.v-btn__content',
        salvarPlano: '.botao-confirmar'
    },
    inputs: {
        nomePlano: 'input[placeholder="Inserir o nome do plano"]',
        totalPontos: 'input[placeholder="Inserir o total de pontos"]',
        frequenciaAprovacao: 'input[placeholder="Inserir a % de frequência para a aprovação"]',
        avaliacaoAprovacao: 'input[placeholder="Inserir a % de avaliação para a aprovação"]',
        valorAvaliacao: '#valorAvaliacao_0',
        disciplina: '#disciplina'
    },
    selects: {
        arredondamento: '#arredondamento',
        comboboxOptions: '.combobox_options li',
        combopesquisaAvaliacao: '#tipoAvaliacao_0',
        comboboxFormaAvaliacao: '#FormaAvaliacao_0',
        radioDisciplina: '#disciplinaRadio',
        tipoAvaliacao: '#tipoPlanoAvaliacao',
        regraConceito: '#regraConceito',
        periodoLetivoInicial: '#periodoLetivoInicial'
    },
    validacoes: {
        associacoesInseridas: '.vcard_associacoes_inseridas',
        planoCadastrado: '.lista-planos-avaliacao'
    }
}

export default elements;