export function gerarNomePlanoAleatorio() {
  return `Teste E2E ${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function gerarBodyPlano(mutator = (body) => body) {
  const nomePlano = `Teste plano avaliação ${Math.floor(Math.random() * 1000)}`;

  const body = {
    InformacoesPlanoAvaliacao: {
      nomePlanoAvaliacao: nomePlano,
      totalPontos: 10,
      percentualFrequenciaAprovacao: 70,
      percentualAvaliacaoAprovacao: 70,
      valorArredondamento: 0,
    },
    DistribuicaoPlanoAvaliacao: [
      {
        tipoAvaliacaoId: 93,
        formaAvaliacaoId: 1,
        valorAvaliacao: 10,
        formulaAvaliacaoSubstitutiva: null,
        maximoEntregas: 1,
      },
    ],
    AssociacaoPlanoAvaliacao: [
      {
        tipoDisciplinaId: null,
        disciplinaId: null,
        tipoPlanoAvaliacaoId: 2,
        regraConceitoId: 2,
        periodoLetivoInicialId: 2,
        periodoLetivoFinalId: null,
        habilitaLancamentoNota: true,
        marcaIesCampus: null,
      },
    ],
  };

  return mutator({ ...body }); // aplica a mutação no body
}

export function gerarBodyPlanoCompleto(tipoDisciplinaId = null, disciplinaId = null) {
  const randomValue = Math.floor(Math.random() * 30) + 70; // 70-99
  return {
    "InformacoesPlanoAvaliacao": {
      "nomePlanoAvaliacao": gerarNomePlanoAleatorio(),
      "totalPontos": 10,
      "percentualFrequenciaAprovacao": 0,
      "percentualAvaliacaoAprovacao": randomValue,
      "valorArredondamento": 0
    },
    "DistribuicaoPlanoAvaliacao": [
      {
        "tipoAvaliacaoId": 111,
        "formaAvaliacaoId": 1,
        "valorAvaliacao": 10,
        "formulaAvaliacaoSubstitutiva": null,
        "maximoEntregas": 1
      },
      {
        "tipoAvaliacaoId": 104,
        "formaAvaliacaoId": 3,
        "valorAvaliacao": null,
        "formulaAvaliacaoSubstitutiva": "AAA1",
        "maximoEntregas": 1
      },
      {
        "tipoAvaliacaoId": 92,
        "formaAvaliacaoId": 2,
        "valorAvaliacao": 10,
        "formulaAvaliacaoSubstitutiva": null,
        "maximoEntregas": 1
      }
    ],
    "AssociacaoPlanoAvaliacao": [
      {
        "tipoDisciplinaId": tipoDisciplinaId,
        "disciplinaId": disciplinaId,
        "tipoPlanoAvaliacaoId": 2,
        "regraConceitoId": 1,
        "periodoLetivoInicialId": 73,
        "periodoLetivoFinalId": null,
        "habilitaLancamentoNota": true,
        "marcaIesCampus": null
      }
    ]
  };
}