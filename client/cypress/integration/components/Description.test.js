/* eslint-disable no-undef */
describe('Description', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get("[data-test='new-bug']").click();
    })

    it('Should load the text editor', () => {
        cy.url().should('include', '/new');
        cy.get('[data-test="Description-section"]').should('exist');
    })
})