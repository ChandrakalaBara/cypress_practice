describe('Create a new ticket', function(){

    beforeEach(function() {
        cy.visit('/admin/')  // Launch the application
        cy.title().should('eq', 'Help Desk Demo - Welcome! Please log in.')
        cy.location('protocol').should('eq', 'https:')
        cy.get('input#regInputUsername').clear().type('Demo')    // chain of commands
        cy.get('input#regInputPassword').clear().type('demo1')
        cy.get('button').contains('Click here to login').should('be.visible').click()
        cy.title('Help Desk Demo')
        cy.get('div.user__name span', {timeout: 8000}).should('have.text', 'Hesk Demo')
        cy.location('pathname').should('eq', '/demo/admin/admin_main.php')
        cy.log(`Successfully logged in to the application`)
    } )

    it('create a new tickect', function(){
        cy.get('a').contains('Create New Ticket').click()
        cy.location('pathname').should('eq', '/demo/admin/new_ticket.php')
        cy.get('div.select_category a').contains('General').click()
        cy.location('pathname').should('eq', '/demo/admin/new_ticket.php')
        cy.get('input#create_name').type('Chandrakala')
        cy.get('input#email').type('kala@example.com')
        cy.get('input#subject').type('subject test')
        cy.get('iframe#message_ifr').then(function($iFrame){
            var ifrele = $iFrame.contents().find('body#tinymce p')
            cy.wrap(ifrele).type('test message')
        })
        cy.get('button').contains('Submit Ticket').click()
        cy.get('div.notification.green').then(($successMsg) =>  {
            expect($successMsg.text().replace('\n', '').trim()).to.eq('Success: New support ticket submitted')
            cy.log('Successfully created a new ticket')
        })
        let trackingId;
        cy.get('section.details div.row:nth-child(1) div.value').then(($elem)=> {
            trackingId = $elem.text()
            cy.log(`Tracking Id: ${trackingId}`)
        })
        let tickectNumber;
        cy.get('section.details div.row:nth-child(2) div.value').then(($elem)=> {
            tickectNumber = $elem.text()
            cy.log(`Ticket number: ${tickectNumber}`)
        })
    })

})