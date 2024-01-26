import logiPage from '../support/pages/login'
import dashPage from '../support/pages/dash'
describe('dashboard', function () {
  context('Quando o cliente faz um agendamento no app mobile', function () {
    const data = {
      customer: {
        name: 'Cliente Teste',
        email: 'clienteteste@cliente.com',
        password: 'pwd123',
        is_provider: false,
      },
      provider: {
        name: 'Samurai Teste',
        email: 'samuraiteste@profissional.com',
        password: 'pwd456',
        is_provider: true,
      },
      appointmentHour: '14:00',
    }
    before(function () {
      cy.postUser(data.provider)
      cy.postUser(data.customer)

      cy.apiLogin(data.customer)
      //cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'))

      cy.setProviderId(data.provider.email)
      cy.createAppointment(data.appointmentHour)
    })
    it('O mesmo deve ser exibido no dashboard', function () {
      logiPage.go()
      logiPage.form(data.provider)
      logiPage.submit()

      dashPage.calenderShouldBeVisible()

      const day = Cypress.env('appointmentDay')
      dashPage.selectDay(day)

      dashPage.appointmentShouldBe(data.customer, data.appointmentHour)
    })
  })
})
