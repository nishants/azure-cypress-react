describe('Homepage', () => {
  it('Check if page loads', () => {
    cy.visit('http://localhost:3000/');

    cy.url().should('include', '#/portfolio');
  });
});
