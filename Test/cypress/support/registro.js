Cypress.Commands.add('registro', (email, password)=>{
    cy.fixture('registro').then((registro)=>{
        cy.get(registro.email).type(email);
        cy.get(registro.password).type(password);
        cy.get(registro.registroButton).click()
        })
    })