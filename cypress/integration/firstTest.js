describe( 'Testing Simple Statistics Block', function() {
    const baseURL = 'http://wordpress.local/wordpress'
    const value1 = '1234'
    const value2 = 'test label'
    const value3 = 'text in number field'
    const value4 = '123'
    
    beforeEach( 'Logs in to wordpress', function() {
        cy.visit( baseURL + '/wp-login.php' )
        cy.wait( 1000 );
        cy.get( '#user_login' ).type( Cypress.env( "wp_user" ) )
        cy.get( '#user_pass' ).type( Cypress.env( "wp_pass" ) )
        cy.get( '#wp-submit' ).click()
    } )

    it( 'Adds a simple stat block with value', function() {
        cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '#post-title-0' ).type( 'single value stat block' ).blur()
        cy.get( '[aria-label="Add block"]:first' ).click()
        cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()
        cy.get( '.wp-block-cgb-block-gutenberg-simple-statistics .components-button' ).click()
        cy.get( '.statistic textarea.value').type(value1)
        cy.get( '.statistic textarea.label').type(value2).blur()
        cy.wait(1000)
        cy.get( '.editor-post-publish-panel__toggle' ).click()
        cy.wait(1000)
        cy.get( '.editor-post-publish-button' ).click()
    } )

    it ( 'Adds a simple stat block without values', function() {
        cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '#post-title-0' ).type( 'no value stat block' ).blur()
        cy.get( '[aria-label="Add block"]:first' ).click()
        cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()
        cy.get( '.wp-block-cgb-block-gutenberg-simple-statistics .components-button' ).click()
        cy.get( '.editor-post-publish-panel__toggle' ).click()
        cy.wait(1000)
        cy.get( '.editor-post-publish-button' ).click()
    } )

    it ( 'Adds a simple stat block with multiple values', function() {
        cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '#post-title-0' ).type( 'mulit stat block' ).blur()
        cy.get( '[aria-label="Add block"]:first' ).click()
        cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()
        cy.get( '.wp-block-cgb-block-gutenberg-simple-statistics .components-button' ).click()
        cy.get( '.statistic textarea.value').type(value1)
        cy.get( '.statistic textarea.label').type(value2)
        cy.get( '.wp-block-cgb-block-gutenberg-simple-statistics div:nth-child(2) .components-button.components-icon-button' ).click()
        cy.get( '.statistic:nth-of-type(2) textarea.value').type(value3)
        cy.get( '.statistic:nth-of-type(2) textarea.label').type(value4).blur()
        cy.wait(1000)
        cy.get( '.editor-post-publish-panel__toggle' ).click()
        cy.wait(1000)
        cy.get( '.editor-post-publish-button' ).click()
    } )

    // it ( 'Tests that published values match input values', function() {
    //     cy.visit( )
    // } )


    // test that the block appears with values

    // test that you can edit the data in the simple stat block


  } );
