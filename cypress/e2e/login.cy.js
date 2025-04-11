describe('Login Test', () => {
    it('should log in successfully', () => {
      cy.visit('http://localhost:8000/login');  // Az alkalmazásod login oldalát látogatja meg
      cy.get('input[name=email]').type('admin@example.com');  // Kitölti az email mezőt
      cy.get('input[name=password]').type('password');  // Kitölti a jelszó mezőt
      cy.contains('button', 'Log in').click();  // Rákattint a bejelentkezés gombra
      cy.url().should('include', '/');  // Ellenőrzi, hogy az index.php-ra jutott
      cy.get('.news').should('contain', 'BMW News'); //Ellenőríze, hogy a BMW News szöveg megjelenik
      cy.get('.news').should('contain', 'BMW News'); //Ellenőríze, hogy a BMW News szöveg megjelenik
    });
  });
  