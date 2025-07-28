import './commands';

function loginAzureAd() {
    const urlFrontend = Cypress.config('urlFrontend');

    cy.visit(urlFrontend);
    const username = Cypress.config('aad_username');
    const password = Cypress.env('aad_password');
    cy.wait(2000)
    cy.origin('login.microsoftonline.com',
        {
            args: { username, password }
        },
        ({ username, password }) => {
            cy.get('input[type="email"]').type(username, { log: true });
            cy.get('input[type="submit"]').click();
            cy.wait(2000)
            cy.get('input[type="password"]').should('be.visible').click().type(password, { log: false });
            cy.get('input[type="submit"]').click();
            cy.get('input[type="submit"]').click();
        }
    );

   /* const pularConfiguracaoMfaAAD = Boolean(Cypress.config('pularConfiguracaoMfaAAD'));

    if (pularConfiguracaoMfaAAD) {
        cy.origin('mysignins.microsoft.com',
            {
            },
            () => {

                cy.contains('button', 'Pular a configuração').click();
            }
        );
    }

    cy.origin('login.microsoftonline.com',
        {
        },
        () => {
            cy.get('input[type="submit"]').click();
        }
    );*/

}

Cypress.Commands.add('loginAzureAd', () => {
    return loginAzureAd();
});


