describe( 'Testing Simple Statistics Block', function() {
    it( 'Logs in to wordpress', function() {
        cy.visit( 'http://wordpress.local/wordpress/wp-login.php' );
        cy.wait( 1000 );
        cy.get( '#user_login' ).type( Cypress.env( "wp_user" ) );
        cy.get( '#user_pass' ).type( Cypress.env( "wp_pass" ) );
        cy.get( '#wp-submit' ).click();
    } );

    it( 'Redirects to ')
  } );