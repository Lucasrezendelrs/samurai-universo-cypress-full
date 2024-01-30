import { el } from './elements'
class Toast {
  shouldHaveText(expectText) {
    // validação do resultado esperado
    cy.get(el.toast, { timeout: 10000 })
      .should('be.visible')
      .should('have.css', 'opacity', '1', { timeout: 2000 })
      .find('p')
      .should('have.text', expectText)
  }
}
export default new Toast()
