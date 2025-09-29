import { gerarBodyPlano, gerarBodyPlanoCompleto, gerarNomePlanoAleatorio } from "../../support/utils";

describe("Criando o plano de avaliação via API", () => {
  it("Deve criar plano de avaliação e capturar ID", () => {
    cy.getRandomAssociacao().then(({ tipoDisciplinaId, disciplinaId }) => {
      const requestBody = gerarBodyPlanoCompleto(tipoDisciplinaId, disciplinaId);

      cy.criarEObterIdPlano(requestBody).then((planoId) => {
        expect(planoId).to.be.a('number');
        cy.log(`Plano criado com ID: ${planoId}`);
        
        // Salvar ID, nome E configurações completas para uso em outros testes
        cy.writeFile('cypress/fixtures/plano-criado.json', { 
          id: planoId, 
          nome: requestBody.InformacoesPlanoAvaliacao.nomePlanoAvaliacao,
          configuracoes: requestBody
        });
      });
    });
  });
});

describe("Validações de erro 400 - Plano Avaliação", () => {
  const cenariosValidacao = [
    {
      descricao: "totalPontos igual a 0",
      modificacao: (body) => { body.InformacoesPlanoAvaliacao.totalPontos = 0; },
      mensagemEsperada: "TotalPontos deve estar entre 1 e 100"
    },
    {
      descricao: "totalPontos maior que 100",
      modificacao: (body) => { body.InformacoesPlanoAvaliacao.totalPontos = 101; },
      mensagemEsperada: "TotalPontos deve estar entre 1 e 100"
    },
    {
      descricao: "nomePlanoAvaliacao nulo",
      modificacao: (body) => { body.InformacoesPlanoAvaliacao.nomePlanoAvaliacao = null; },
      mensagemEsperada: "NomePlanoAvaliacao deve ser informado"
    },
    {
      descricao: "percentualFrequenciaAprovacao maior que 100",
      modificacao: (body) => { body.InformacoesPlanoAvaliacao.percentualFrequenciaAprovacao = 101; },
      mensagemEsperada: "PercentualFrequenciaAprovacao deve estar entre 0 e 100"
    },
    {
      descricao: "percentualAvaliacaoAprovacao maior que 100",
      modificacao: (body) => { body.InformacoesPlanoAvaliacao.percentualAvaliacaoAprovacao = 101; },
      mensagemEsperada: "PercentualAvaliacaoAprovacao deve estar entre 0 e 100"
    }
  ];

  cenariosValidacao.forEach(({ descricao, modificacao, mensagemEsperada }) => {
    it(`Deve retornar erro 400 quando ${descricao}`, () => {
      cy.getRandomAssociacao().then(({ tipoDisciplinaId, disciplinaId }) => {
        const body = gerarBodyPlanoCompleto(tipoDisciplinaId, disciplinaId);
        modificacao(body);

        cy.apiRequest({
          method: "POST",
          url: "/planos-avaliacao",
          body: body,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.error.mensagem).to.include("Erro de valida");
          
          const detalheEncontrado = response.body.error.detalhes.find(d => 
            d.mensagem.includes(mensagemEsperada)
          );
          
          expect(
            detalheEncontrado,
            `Mensagem "${mensagemEsperada}" não encontrada. Detalhes retornados:\n${JSON.stringify(response.body.error.detalhes, null, 2)}`
          ).to.exist;
        });
      });
    });
  });
});

describe("Validação de nome duplicado", () => {
  it("Deve retornar erro 400 ao tentar criar plano com nome já existente", () => {
    // Usar o nome do plano criado no primeiro teste
    cy.fixture('plano-criado.json').then((planoData) => {
      cy.getRandomAssociacao().then(({ tipoDisciplinaId, disciplinaId }) => {
        const requestBody = gerarBodyPlanoCompleto(tipoDisciplinaId, disciplinaId);
        requestBody.InformacoesPlanoAvaliacao.nomePlanoAvaliacao = planoData.nome;
        
        cy.apiRequest({
          method: "POST",
          url: "/planos-avaliacao",
          body: requestBody,
          failOnStatusCode: false
        }).then((response) => {
          cy.log('Status:', response.status);
          cy.log('Mensagem completa:', response.body.error.mensagem);
          
          expect(response.status).to.eq(400);
          expect(response.body.error.mensagem).to.include("ERROR_DUPLICIDADE_NOME");
          expect(response.body.error.mensagem).to.include("Já existe um Plano de Avaliação com esse mesmo nome");
        });
      });
    });
  });
});

describe("Validação de configurações duplicadas", () => {
  it("Deve retornar erro 400 ao tentar criar plano com configurações idênticas", () => {
    // Usar exatamente as mesmas configurações do plano já criado, mas com nome diferente
    cy.fixture('plano-criado.json').then((planoData) => {
      const requestBody = { ...planoData.configuracoes };
      // Apenas mudar o nome para evitar erro de nome duplicado
      requestBody.InformacoesPlanoAvaliacao.nomePlanoAvaliacao = gerarNomePlanoAleatorio();
      
      cy.apiRequest({
        method: "POST",
        url: "/planos-avaliacao",
        body: requestBody,
        failOnStatusCode: false
      }).then((response) => {
        cy.log('Status:', response.status);
        cy.log('Mensagem:', response.body.error?.mensagem);
        
        expect(response.status).to.eq(400);
        expect(response.body.error.mensagem).to.include("ERROR_DUPLICIDADE_CONFIGURACOES");
        expect(response.body.error.mensagem).to.include("Já existe um Plano de Avaliação com configurações idênticas");
      });
    });
  });
});