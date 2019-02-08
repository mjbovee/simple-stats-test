describe( 'Adds test blocks, adds content, verifies blocks retain content', function() {
    const baseURL = 'http://wordpress.local/wordpress'
    const title1 = 'empty stat block'
    const title2 = 'single entry stat block'
    const title3 = 'multi (5+) entry stat block'
    
    beforeEach( 'Logs in to wordpress', function() {
        cy.visit( baseURL + '/wp-login.php' )
        cy.wait( 1000 );
        cy.get( '#user_login' ).type( Cypress.env( "wp_user" ) )
        cy.get( '#user_pass' ).type( Cypress.env( "wp_pass" ) )
        cy.get( '#wp-submit' ).click()
    } )

    it( 'Adds a block with no entries', function() {
        cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '#post-title-0' ).type( title1 ).blur()
        cy.get( '[aria-label="Add block"]:first' ).click()
        cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()
        cy.get( '.wp-block-cgb-block-gutenberg-simple-statistics' ).should(($div) => {
            expect($div).not.to.have.descendants( '.statistic' )
        } )
    } )

    it( 'Adds a block with a single entry', function() {
        cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '#post-title-0' ).type( title2 ).blur()
        cy.get( '[aria-label="Add block"]:first' ).click()
        cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( '.wp-block-cgb-block-gutenberg-simple-statistics' ).should(($div) => {
            expect($div).to.have.descendants( '.statistic' )
        } )
        cy.get( '.statistic' ).should(($div) => {
            expect($div).to.have.length(1)
        } )
    } )

    it( 'Adds a block with five entries', function() {
        cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '#post-title-0' ).type( title3 ).blur()
        cy.get( '[aria-label="Add block"]:first' ).click()
        cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( '.wp-block-cgb-block-gutenberg-simple-statistics' ).should(($div) => {
            expect($div).to.have.descendants( '.statistic' )
        } )
        cy.get( '.statistic' ).should(($div) => {
            expect($div).to.have.length(5)
        } )
    } )

    it( 'Adds a block with six entries', function() {
        cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '#post-title-0' ).type( title3 ).blur()
        cy.get( '[aria-label="Add block"]:first' ).click()
        cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( '.wp-block-cgb-block-gutenberg-simple-statistics' ).should(($div) => {
            expect($div).to.have.descendants( '.statistic' )
        } )
        cy.get( '.statistic' ).should(($div) => {
            expect($div).to.have.length(6)
        } )
    } )

 } )