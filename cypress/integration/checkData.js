describe( 'Adds test blocks, inputs data, and verifies that the data match across views', function() {
    const baseURL = 'http://wordpress.local/wordpress'
    const value1 = '1234'
    const value2 = 'test label'
    const value3 = 'text in number field'
    const value4 = '123'
    const title1 = 'single value stat block'
    const title2 = 'no value stat block'
    const title3 = 'mulit stat block'

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

    it( 'Adds a simple stat block with value', function() {
        cy.visit( baseURL + '/wp-admin/post-new.php?post_type=page' )
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '#post-title-0' ).type( title1 ).blur()
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
        cy.get( '#post-title-0' ).type( title2 ).blur()
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
        cy.get( '#post-title-0' ).type( title3 ).blur()
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

    it ( 'Tests that published values match input values - ' + title1, function() {
        cy.visit( baseURL + '/wp-admin/edit.php?post_type=page' )
        cy.get( '[aria-label="View “' + title1 + '”"]' ).click( {force: true} )
        cy.get( '.simple-statistic-countup-counted' ).should( 'have.attr', 'data-value', value1 ).should( 'have.text', value1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") )
        cy.get( '.label' ).should( 'have.text', value2 );
    } )

    it ( 'Tests that published values match input values - ' + title2, function() {
        cy.visit( baseURL + '/wp-admin/edit.php?post_type=page' )
        cy.get( '[aria-label="View “' + title2 + '”"]' ).click( {force: true} )
        cy.get( '.simple-statistic-countup-counted' ).should( 'have.attr', 'data-value', '' ).should( 'have.text', 'NaN' ) 
        cy.get( '.label' ).should( 'have.text', '' );
    } )

    it ( 'Tests that published values match input values - ' + title3, function() {
        cy.visit( baseURL + '/wp-admin/edit.php?post_type=page' )
        cy.get( '[aria-label="View “' + title3 + '”"]' ).click( {force: true} )
        cy.get( '.statistic:nth-of-type(1) .simple-statistic-countup-counted' ).should( 'have.attr', 'data-value', value1 ).should( 'have.text', value1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") )
        cy.get( '.statistic:nth-of-type(1) .label' ).should( 'have.text', value2 );
        cy.get( '.statistic:nth-of-type(2) .simple-statistic-countup-counted' ).should( 'have.attr', 'data-value', value3 ).should( 'have.text', 'NaN' )
        cy.get( '.statistic:nth-of-type(2) .label' ).should( 'have.text', value4 );
    } )

    it ( 'Tests that blocks display correct values in edit view - ' + title1, function() {
        cy.visit( baseURL + '/wp-admin/edit.php?post_type=page' )
        cy.get( '[aria-label="“' + title1 + '” (Edit)"]' ).click()
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '.simple-statistic-countup' ).should( 'have.attr', 'data-value', value1 ).should( 'have.text', value1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") )
        cy.get( '.label' ).should( 'have.text', value2 );
    } )

    it ( 'Tests that blocks display correct values in edit view - ' + title2, function() {
        cy.visit( baseURL + '/wp-admin/edit.php?post_type=page' )
        cy.get( '[aria-label="“' + title2 + '” (Edit)"]' ).click()
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '.simple-statistic-countup' ).should( 'have.attr', 'data-value', '' ).should( 'have.text', '0') 
        cy.get( '.label' ).should( 'have.text', '' );
    } )

    it ( 'Tests that blocks display correct values in edit view - ' + title3, function() {
        cy.visit( baseURL + '/wp-admin/edit.php?post_type=page' )
        cy.get( '[aria-label="“' + title3 + '” (Edit)"]' ).click()
        cy.get( '[aria-label="Disable tips"]' ).click()
        cy.get( '.statistic:nth-of-type(1) .simple-statistic-countup' ).should( 'have.attr', 'data-value', value1 ).should( 'have.text', value1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") )
        cy.get( '.statistic:nth-of-type(1) .label' ).should( 'have.text', value2 );
        cy.get( '.statistic:nth-of-type(2) .simple-statistic-countup' ).should( 'have.attr', 'data-value', value3 ).should( 'have.text', '0' )
        cy.get( '.statistic:nth-of-type(2) .label' ).should( 'have.text', value4 );
    } )

    it ( 'Deletes the pages created by the test', function() {
        deletePage(title1)
        deletePage(title2)
        deletePage(title3)
    } )


  } )
