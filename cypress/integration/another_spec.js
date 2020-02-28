describe('AnotherTest', () => {
  describe('describe block', () => {
    it('One more test', () => {
      cy.visit('http://localhost:3000/');

      cy.url().should('include', '#/portfolio');
    });
    describe('inner describe', () => {
      it('deeply nested test', () => {
        cy.visit('http://localhost:3000/');

        cy.url().should('include', '#/portfolio');
      });
    });
  });
  describe('describe block 2', () => {
    it('One more test', () => {
      cy.visit('http://localhost:3000/');

      cy.url().should('include', '#/portfolio');
    });
    describe('inner describe 2', () => {
      it('deeply nested test 2', () => {
        cy.visit('http://localhost:3000/');

        cy.url().should('include', '#/portfolio');
      });
    });
  });

  it('Check if page loads', () => {
    cy.visit('http://localhost:3000/');

    cy.url().should('include', '#/portfolio');
  });

  it('Just another test', () => {
    cy.visit('http://localhost:3000/');

    cy.url().should('include', '#/portfolio');
  });
});
