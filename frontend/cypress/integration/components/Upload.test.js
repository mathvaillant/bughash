/* eslint-disable no-undef */
describe("User uploading images", () => {
    beforeEach(() => {
        cy.visit('/new');
    })

    it('Open file picker and pick file successfuly', () => {
        cy.get("[data-test='new-bug']").click();
        cy.url().should('include', '/new');
        cy.get("[data-test='uploadFile']").should('exist');

        cy.fixture('typescript.png').then(fileContent => {
            cy.get("[data-test='uploadFile']").attachFile({
                fileContent: fileContent.toString(),
                fileName: 'typescript.png',
                mimeType: 'image/png'
            });
        })
    })
})