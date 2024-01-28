// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import moment from 'moment'
import loginPage from './pages/login'
import dashPage from './pages/dash'

// App Actions
Cypress.Commands.add('uiLogin', function (user) {
  loginPage.go()
  loginPage.form(user)
  loginPage.submit()
  dashPage.header.userLoggedIn(user.name)
})

Cypress.Commands.add('postUser', function (user) {
  cy.task('removeUser', user.email).then(function (result) {
    console.log(result)
  })
  // Cadastra via API para garantir a massa de teste
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/users',
    body: user,
  }).then(function (response) {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('recoveryPass', function (email) {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/password/forgot',
    body: { email: email },
  }).then(function (response) {
    expect(response.status).to.eq(204)

    cy.task('findToken', email).then(function (result) {
      Cypress.env('recoveryToken', result.token)
    })
  })
})

Cypress.Commands.add('createAppointment', function (hour) {
  let now = new Date()

  // Primeiro, avança sempre para o dia seguinte
  now.setDate(now.getDate() + 1)

  // Em seguida, verifica se o novo dia é sábado (6) ou domingo (0)
  if (now.getDay() === 6) {
    // Se for sábado, avança mais dois dias para chegar à segunda-feira
    now.setDate(now.getDate() + 2)
  } else if (now.getDay() === 0) {
    // Se for domingo, avança mais um dia para chegar à segunda-feira
    now.setDate(now.getDate() + 1)
  }
  Cypress.env('appointmentDay', now.getDate())

  cy.log(now.getDate())

  //const date_old = moment(now).format('YYYY-MM-DD ' + hour + ':00')

  const date = moment(now).format(`YYYY-MM-DD ${hour}:00`)

  const payload = {
    provider_id: Cypress.env('providerId'),
    date: date,
  }
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/appointments',
    body: payload,
    headers: {
      authorization: 'Bearer ' + Cypress.env('apiToken'),
    },
  }).then(function (response) {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('setProviderId', function (providerEmail) {
  cy.request({
    method: 'GET',
    url: 'http://localhost:3333/providers',
    headers: {
      authorization: 'Bearer ' + Cypress.env('apiToken'),
    },
  }).then(function (response) {
    expect(response.status).to.eq(200)
    console.log(response.body)

    const providerList = response.body

    providerList.forEach(function (provider) {
      if (provider.email === providerEmail) {
        Cypress.env('providerId', provider.id)
      }
    })
  })
})

Cypress.Commands.add('apiLogin', function (user) {
  const payload = {
    email: user.email,
    password: user.password,
  }
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/sessions',
    body: payload,
  }).then(function (response) {
    expect(response.status).to.eq(200)
    Cypress.env('apiToken', response.body.token)
  })
})
