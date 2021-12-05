/// <reference types="cypress" />

describe('Registrar nueva cuenta', function(){
    beforeEach(()=>{
        cy.visit('/register')
    })
    it('El correo ingresado debe tener un @ para ser válido', function(){
        cy.registro('abc@ABC.com.pe', '1234567')
        cy.fixture('registro').then((registro)=>{
             cy.get(registro.registroResult).should('contain','SAVED');
        })
    })

    it('El email enviado no contiene @ será invalido', function(){
        cy.registro('abcABC.com.pe', '1234567')
        cy.fixture('registro').then((registro)=>{
            cy.get(registro.registroResult).should('contain','INVALID');
        })
   
    })

    it('La contraseña debe tener como mínimo 5 caracteres, se envía 5 caracteres', function(){
        cy.registro('abc@ABC.com.pe', '12345')
        cy.fixture('registro').then((registro)=>{
            cy.get(registro.registroResult).eq('VALID','Test fallido muestra "LOGIN INVALID" no procesa con la cantidad mínima de caracteres');
        })
    })

    it('La contraseña enviada con 4 caracteres, será invalida.', function(){
        cy.registro('abc@ABC.com.pe', '1234')
        cy.fixture('registro').then((registro)=>{
            cy.get(registro.registroResult).should('contain','INVALID');
        })
    })

    it('La contraseña enviada con 6 caracteres, será valida.', function(){
        cy.registro('abc@ABC.com.pe', '123456')
        cy.fixture('registro').then((registro)=>{
            cy.get(registro.registroResult).should('contain','SAVED');
        })
    })

    it('El correo y la contraseña son requeridos obligatoriamente', function(){
        cy.fixture('registro').then((registro)=>{
            cy.get(registro.registroButton).click()
            cy.get(registro.registroResult).should('contain','REQUIRED');
        })
    })
    it('El sistema debe mostrar un mensaje de error al ingresar campos no válidos', function(){
        cy.registro('???', '???')
        cy.fixture('registro').then((registro)=>{
            cy.get(registro.registroResult).should('contain','INVALID');
        })
    })
})