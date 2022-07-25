/* eslint-disable no-undef */
describe("App Initialization", () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('renders App withou breaking', () => {
        cy.get('.Header').should('exist');
    })

    it('Allow the button NEW to be clicked and redirects the page', () => {
        cy.get("[data-test='new-bug']").click();
        cy.url().should('include', '/new');
        cy.get('.Header').should('exist');
        cy.get('.Upload').should('exist');
        cy.get('.Description').should('exist');
        cy.get('.Code').should('exist');
        cy.get('.Solution').should('exist');
        cy.get('.ZoomSectionButton').should('exist');
        cy.get('.BugId').should('exist');
        cy.get('.BugTitle').should('exist');
    })
})