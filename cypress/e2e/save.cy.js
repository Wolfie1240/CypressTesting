

describe('Verify that a chart can be saved', () => {
    it('passes', () => {
      
      cy.visit("/line.html")
  
      cy.findByLabelText("Chart title").type("Cats vs Dogs")

      cy.findByLabelText("X label").type("Cats")
      cy.findByLabelText("Y label").type("Dogs")

      cy.get('[class="x-value-input"]').eq(0).type('1')
      cy.get('[class="y-value-input"]').eq(0).type('3')
      cy.contains('+').click()
      cy.get('[class="x-value-input"]').eq(1).type('2')
      cy.get('[class="y-value-input"]').eq(1).type('7')
      cy.contains('+').click()
      cy.get('[class="x-value-input"]').eq(2).type('3')
      cy.get('[class="y-value-input"]').eq(2).type('15')
      cy.contains('+').click()
      cy.get('[class="x-value-input"]').eq(3).type('4')
      cy.get('[class="y-value-input"]').eq(3).type('25')
      cy.contains('+').click()
      cy.get('[class="x-value-input"]').eq(4).type('5')
      cy.get('[class="y-value-input"]').eq(4).type('40')

      cy.contains('Generate chart').click()
      cy.contains('Save chart').click()
      cy.contains('Gallery').click()

      cy.get('img').should('have.attr', 'alt', 'Cats vs Dogs');
    })
  })