Cypress.Commands.add("gerarETokenESalvar", () => {
  cy.request({
    method: "POST",
    url: "https://login.microsoftonline.com/80f6a699-b024-4b7b-8cca-5ecfdd2a2fe3/oauth2/v2.0/token",
    form: true,
    body: {
      client_id: Cypress.env("client_id"),
      grant_type: "refresh_token",
      scope: "api://servico_plano_avaliacao_devhml/Api.Read",
      refresh_token: Cypress.env("refresh_token"),
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("access_token");

    const token = response.body.access_token;
    
    // Salvar token no cypress.env.json
    Cypress.env('access_token', token);
  });
});

// Comando para obter token válido
Cypress.Commands.add("getToken", () => {
  const existingToken = Cypress.env('access_token');
  
  if (existingToken) {
    return cy.wrap(existingToken);
  }
  
  return cy.gerarETokenESalvar().then(() => {
    return Cypress.env('access_token');
  });
});

// Comando para fazer requests de API com base URL
Cypress.Commands.add('apiRequest', (options) => {
  const apiUrl = Cypress.env('apiUrl');
  return cy.getToken().then((token) => {
    return cy.request({
      ...options,
      url: `${apiUrl}${options.url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
  });
});

// Comando para obter tipoDisciplinaId aleatório
Cypress.Commands.add('getRandomTipoDisciplinaId', () => {
  return cy.apiRequest({
    method: 'GET',
    url: '/tipos-disciplina'
  }).then((response) => {
    expect(response.status).to.eq(200);
    const tipos = response.body;
    const randomTipo = tipos[Math.floor(Math.random() * tipos.length)];
    return randomTipo.id;
  });
});

// Comando para obter disciplinaId aleatório
Cypress.Commands.add('getRandomDisciplinaId', () => {
  return cy.apiRequest({
    method: 'GET',
    url: '/disciplinas?palavraChave=teste'
  }).then((response) => {
    expect(response.status).to.eq(200);
    const disciplinas = response.body;
    const randomDisciplina = disciplinas[Math.floor(Math.random() * disciplinas.length)];
    return randomDisciplina.id;
  });
});

// Comando que escolhe aleatoriamente entre tipoDisciplinaId OU disciplinaId
Cypress.Commands.add('getRandomAssociacao', () => {
  const usarTipoDisciplina = Math.random() < 0.5; // 50% chance cada
  
  if (usarTipoDisciplina) {
    return cy.getRandomTipoDisciplinaId().then(id => ({ tipoDisciplinaId: id, disciplinaId: null }));
  } else {
    return cy.getRandomDisciplinaId().then(id => ({ tipoDisciplinaId: null, disciplinaId: id }));
  }
});

// Comando para criar plano e obter ID
Cypress.Commands.add('criarEObterIdPlano', (body) => {
  const nomePlano = body.InformacoesPlanoAvaliacao.nomePlanoAvaliacao;
  
  return cy.apiRequest({
    method: 'POST',
    url: '/planos-avaliacao',
    body: body,
    failOnStatusCode: false
  }).then((response) => {
    if (response.status !== 204) {
      throw new Error(`Falha ao criar plano: ${response.status} - ${JSON.stringify(response.body)}`);
    }
    
    // Buscar o plano criado por nome
    return cy.apiRequest({
      method: 'GET',
      url: '/planos-avaliacao'
    }).then((getResponse) => {
      expect(getResponse.status).to.eq(200);
      
      const planos = getResponse.body;
      const planoEncontrado = planos.find(plano => 
        plano.nomePlanoAvaliacao === nomePlano
      );
      
      expect(planoEncontrado, `Plano com nome "${nomePlano}" não encontrado`).to.exist;
      return planoEncontrado.id;
    });
  });
});

// Comando que obtém os IDs e salva no dados.json
Cypress.Commands.add('getRandomDisciplinaETipoIds', () => {
  return cy.apiRequest({
    method: 'GET',
    url: '/disciplinas?palavraChave=Sis'
  }).then((respDisciplina) => {
      expect(respDisciplina.status).to.eq(200);
      const disciplinas = respDisciplina.body;
      const randomDisciplinaId = disciplinas[Math.floor(Math.random() * disciplinas.length)].id;

      return cy.apiRequest({
        method: 'GET',
        url: '/tipos-disciplina'
      }).then((respTipo) => {
        expect(respTipo.status).to.eq(200);
        const tipos = respTipo.body;
        const randomTipoDisciplinaId = tipos[Math.floor(Math.random() * tipos.length)].id;

        // Salva no arquivo
        return cy.writeFile('cypress/fixtures/dados.json', {
          disciplinaId: randomDisciplinaId,
          tipoDisciplinaId: randomTipoDisciplinaId
        }).then(() => {
          // Retorna os dois IDs para uso imediato
          return { disciplinaId: randomDisciplinaId, tipoDisciplinaId: randomTipoDisciplinaId };
        });
      });
    });
  });

// Azure AD UI Authentication
Cypress.Commands.add('loginAzureAd', () => {
  const username = Cypress.env('aad_username') || Cypress.config('aad_username');
  const password = Cypress.env('aad_password') || Cypress.config('aad_password');
  
  // Visit your app's login page
  cy.visit('/');
  
  // Fill Azure AD login form
  cy.origin('https://login.microsoftonline.com', { args: { username, password } }, ({ username, password }) => {
    cy.get('input[name="loginfmt"]').type(username);
    cy.get('input[type="submit"]').click();
    cy.get('input[name="passwd"]').type(password);
    cy.get('input[type="submit"]').click();
    // Handle "Stay signed in?" prompt
    cy.get('input[type="submit"]').click();
  });
  
  // Wait for redirect back to your app
  cy.url().should('contain', 'cloudapp-dev.animaeducacao.com.br');
});