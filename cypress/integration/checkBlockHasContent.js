describe( 'Adds test blocks, inputs data, and verifies that the data match across views', function() {
    const baseURL = 'http://wordpress.local/wordpress'
    const value1 = '1234'
    const value2 = 'test label'
    const title1 = 'empty stat block'
    const title2 = 'single entry stat block'
    const title3 = 'multi (5+) entry stat block'

    function deletePage(title) {
        cy.visit( baseURL + '/wp-admin/edit.php?post_type=page' )
        cy.get( '[aria-label="Move “' + title + '” to the Trash"]' ).click( {force: true} )
    }
    
    beforeEach( 'Logs in to wordpress', function() {
        cy.visit( baseURL + '/wp-login.php' )
        cy.wait( 1000 );
        cy.get( '#user_login' ).type( Cypress.env( "wp_user" ) )
        cy.get( '#user_pass' ).type( Cypress.env( "wp_pass" ) )
        cy.get( '#wp-submit' ).click()
    } )

    // it( 'Adds a block with no entries', function() {
    //     cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
    //     cy.get( '[aria-label="Disable tips"]' ).click()
    //     cy.get( '#post-title-0' ).type( title1 ).blur()
    //     cy.get( '[aria-label="Add block"]:first' ).click()
    //     cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()

    // } )

    // it( 'Adds a block with a single entry', function() {
    //     cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
    //     cy.get( '[aria-label="Disable tips"]' ).click()
    //     cy.get( '#post-title-0' ).type( title2 ).blur()
    //     cy.get( '[aria-label="Add block"]:first' ).click()
    //     cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()
    //     cy.get( '.wp-block-cgb-block-gutenberg-simple-statistics .components-button' ).click()
    //     cy.get( '.statistic textarea.value').type(value1)
    //     cy.get( '.statistic textarea.label').type(value2).blur()
    // } )

    it( 'Adds a block with many entries', function() {
        cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '#post-title-0' ).type( title3 ).blur()
        cy.get( '[aria-label="Add block"]:first' ).click()
        cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( '.statistic textarea.value').type(value1)
        cy.get( '.statistic textarea.label').type(value2).blur()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( '.statistic:nth-of-type(2) textarea.value').type(value1)
        cy.get( '.statistic:nth-of-type(2) textarea.label').type(value2).blur()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( '.statistic:nth-of-type(3) textarea.value').type(value1)
        cy.get( '.statistic:nth-of-type(3) textarea.label').type(value2).blur()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( '.statistic:nth-of-type(4) textarea.value').type(value1)
        cy.get( '.statistic:nth-of-type(4) textarea.label').type(value2).blur()
        cy.get( 'button' ).contains( 'Add Statistic:' ).click()
        cy.get( '.statistic:nth-of-type(5) textarea.value').type(value1)
        cy.get( '.statistic:nth-of-type(5) textarea.label').type(value2).blur()   
    } )

 } )