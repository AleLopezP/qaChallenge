/// <reference types="cypress" />

describe('Login cuenta', function(){
    beforeEach(()=>{
        cy.visit('/login')
    })
    it('El correo ingresado tiene un @ será valido login', function(){
        cy.login('abc@ABC.com.pe','12345')
        cy.fixture('login').then((login)=>{
            cy.get(login.loginResult).should('contain','LOGIN VALID');

        })
    })
    it('El correo ingresado no contiene @ será invalido', function(){
        cy.login('abcABC.com.pe','12345')
        cy.fixture('login').then((login)=>{
            cy.get(login.loginResult).should('contain','LOGIN VALID');

        })
    })
    it('El correo ingresado contiene más de 1 @ será invalido', function(){
        cy.login('abc@@ABC.com.pe','12345')
        cy.fixture('login').then((login)=>{
            cy.get(login.loginResult).should('contain','LOGIN VALID');
        })
    })
    it('La contraseña debe tener como mínimo 5 caracteres, se envia solo 4 caracteres', function(){
        cy.login('abc@ABC.com.pe','1234')
        cy.fixture('login').then((login)=>{
            cy.get(login.loginResult).eq('LOGIN INVALID','Test fallido muestra "LOGIN VALID" no presenta restricción en la cantidad mínima de caracteres');
            
            
        })
    })
    it('La contraseña debe tener como mínimo 5 caracteres, se envia 6 caracteres', function(){
        cy.login('abc@ABC.com.pe','123456')
        cy.fixture('login').then((login)=>{
             cy.get(login.loginResult).should('contain','LOGIN VALID');
        })
    })
    it('La contraseña debe tener como mínimo 5 caracteres, se envía 6 caracteres, alfanumérico', function(){
        cy.login('abc@ABC.com.pe','123ABC')
        cy.fixture('login').then((login)=>{
            cy.get(login.loginResult).should('contain','LOGIN VALID');
        })
    })
    it('El correo y la contraseña son requeridos obligatoriamente, click al botón "Login" sin datos', function(){
        cy.fixture('login').then((login)=>{
            cy.get(login.loginButton).click();
            cy.get(login.loginResult).should('contain','REQUIRED');
        })
    })
    it('El sistema debe mostrar un mensaje de error al ingresar campos no válidos', function(){
        cy.login('????', '????')
        cy.fixture('login').then((login)=>{
            cy.get(login.loginButton).click();
            cy.get(login.loginResult).eq('LOGIN INVALID','Test fallido muestra "LOGIN VALID" no presenta restricción al insertar campos no válidos');
        })
    })
})