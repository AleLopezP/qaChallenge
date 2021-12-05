describe('Componentes screenshot', ()=>{
    it('Capturar screenshot', ()=>{
        cy.visit('http://localhost:4000/login')
        cy.screenshot()
    })
})