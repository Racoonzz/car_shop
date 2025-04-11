describe('Products Test', () => {
    it('should log in successfully', () => {
      cy.visit('http://localhost:8000/');  // Az alkalmazásod login oldalát látogatja meg

      cy.contains('#exploreLink', 'Products').click();  // Rákattint a Products menüpontra
      cy.get('h2').should(($h2) => {
      //make sure the first contains some text content
      expect($h2.first()).to.contain('BMW E46 Front Brake Pads');
      }); // Ellenőrzi, hogy a BMW E46 Front Brake Pads szöveg megjelenik
      cy.contains('button', 'Kosárba').click(); // Rákattint a Kosárba gombra

      cy.contains('span', 'Product added to cart!').should('be.visible'); // Ellenőrzi, hogy a popup látható
      cy.get('button').eq(1).click(); // Rákattint a Kosárba gombra (második elemre)
      cy.contains('span', 'Product added to cart!').should('be.visible'); // Ellenőrzi, hogy a popup látható

      cy.contains('#Cart', 'Cart').click();  // Rákattint a Kosár menüpontra
      cy.contains('h3', 'Total: 55000 Ft').should('be.visible'); // Ellenőrzi, hogy a Kosár összesen 55000Ft
    });
  });
  