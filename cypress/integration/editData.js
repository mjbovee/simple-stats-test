describe( 'Adds test blocks, inputs data, and verifies that the data match across views', function() {
    const baseURL = 'http://wordpress.local/wordpress'
    const value1 = 333
    const value2 = 'edit me'
    const value3 = 444
    const title1 = 'edit data block'
    
    beforeEach( 'Logs in to wordpress', function() {
        cy.visit( baseURL + '/wp-login.php' )
        cy.wait( 1000 );
        cy.get( '#user_login' ).type( Cypress.env( "wp_user" ) )
        cy.get( '#user_pass' ).type( Cypress.env( "wp_pass" ) )
        cy.get( '#wp-submit' ).click()
    } )

    it( 'Adds a block, adds content, edits the content, and publishes the page', function() {
        cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '#post-title-0' ).type( title1 ).blur()
        cy.get( '[aria-label="Add block"]:first' ).click()
        cy.get( '.editor-block-list-item-cgb-block-gutenberg-simple-statistics' ).click()
        cy.get( '.wp-block-cgb-block-gutenberg-simple-statistics .components-button' ).click()
        cy.get( '.statistic textarea.value').type(value1)
        cy.get( '.statistic textarea.label').type(value2).blur()
        cy.get( '.editor-styles-wrapper' ).focus()
        cy.get( '.editor-block-list__block' )
            .trigger( 'mouseover' )
            .should( 'have.class', 'is-hovered' )
            .click()
        cy.get( '.statistic textarea.value').clear().type(value3).blur()
        cy.wait(1000)
        cy.get( '.editor-post-publish-panel__toggle' ).click()
        cy.wait(1000)
        cy.get( '.editor-post-publish-button' ).click()
    } )

    it ( 'Checks ability to edit the block after it\'s been published', function() {
        cy.visit( baseURL + '/wp-admin/edit.php?post_type=page' )
        cy.get( '[aria-label="“' + title1 + '” (Edit)"]' ).click()
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '.editor-block-list__block' )
            .trigger( 'mouseover' )
            .should( 'have.class', 'is-hovered' )
            .click()
        cy.get( '.statistic textarea.value').clear().type(value1).blur()
        cy.wait(1000)
        cy.get( '.editor-post-publish-panel__toggle' ).click()
        cy.wait(1000)
        cy.get( '.editor-post-publish-button' ).click()
    } )

    it ( 'Attempts to resolve the block issues and then edit the block using block text fields', function() {
        cy.visit( baseURL + '/wp-admin/edit.php?post_type=page' )
        cy.get( '[aria-label="“' + title1 + '” (Edit)"]' ).click()
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( 'button' ).contains( 'Resolve' ).click()
        cy.get( 'button' ).contains( 'Convert to Blocks' ).click()
        cy.get( '.statistic textarea.value').clear().type(value1).blur()
        cy.wait(1000)
        cy.get( '.editor-post-publish-panel__toggle' ).click()
        cy.wait(1000)
        cy.get( '.editor-post-publish-button' ).click()
    } )

    it ( 'Attempts to edit the "resolved" block using HTML', function() {
        cy.visit( baseURL + '/wp-admin/edit.php?post_type=page' )
        cy.get( '[aria-label="“' + title1 + '” (Edit)"]' ).click()
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( 'button' ).contains( 'Resolve' ).click()
        cy.get( 'button' ).contains( 'Convert to Blocks' ).click()
        cy.get( '.wp-block-html textarea' ).clear().type( '<div class="wp-block-cgb-block-gutenberg-simple-statistics"><div class="container"><div class="statistic"><div><div class="simple-statistic-countup" data-value="' + value1 + '" id="countup-27450">0</div></div><div class="label">' + value2 +'</div></div></div></div>' ).blur()
        cy.wait(1000)
        cy.get( '.editor-post-preview' ).click()
        cy.get( '.simple-statistic-countup-counted' ).should( 'have.attr', 'data-value', value1)
    } )

} )