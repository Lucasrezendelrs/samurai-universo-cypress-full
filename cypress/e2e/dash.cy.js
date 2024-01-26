import logiPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

import { customer, provider, appointment } from '../support/factories/dash'

describe('dashboard', function () {
  context('Quando o cliente faz um agendamento no app mobile', function () {
    before(function () {
      cy.postUser(provider)
      cy.postUser(customer)

      cy.apiLogin(customer)
      //cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'))

      cy.setProviderId(provider.email)
      cy.createAppointment(appointment.hour)
    })
    it('O mesmo deve ser exibido no dashboard', function () {
      logiPage.go()
      logiPage.form(provider)
      logiPage.submit()

      dashPage.calenderShouldBeVisible()

      const day = Cypress.env('appointmentDay')
      dashPage.selectDay(day)

      dashPage.appointmentShouldBe(customer, appointment.hour)
    })
  })
})
