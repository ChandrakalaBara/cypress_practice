describe('Force click demo', function(){
    beforeEach(function() {
        cy.login('Demo', 'demo1')  // custom command (support -> command.js)
    } )

    it('Perform force click on New Category link in reports page', 
        {
            retries: {
                runMode: 2,
                openMode: 1
            }
        },
    function(){
        cy.get('#navbarToggler > .icon > use').click();
        cy.get('.navbar__list > :nth-child(7)').click();
        cy.get('.submenu-is-opened > .listitem__menu > .submenu__list > :nth-child(1) > a').click();
        cy.get(':nth-child(1) > .dropdown-select > .label > span').click();
        cy.get('[style="margin-left: 10px; margin-right: 10px"] > .calendar--button > button > .icon').click({force: true});
        cy.get('.user__name > p').click();
        cy.get('a > span').click();
    })
})