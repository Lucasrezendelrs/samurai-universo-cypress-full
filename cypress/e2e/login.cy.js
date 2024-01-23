import dashPage from '../support/pages/dash'
import loginPage from '../support/pages/login'
describe('Login', function () {
  context('Quando o usuário é muito bom', function () {
    const user = {
      name: 'Robson Jassa',
      email: 'jassa@samuraibs.com',
      password: 'pwd123',
      is_provider: true,
    }
    before(function () {
      cy.task('removeUser', user.email).then(function (result) {
        console.log(result)
      })
      // Cadastra via API para garantir a massa de teste
      cy.request('POST', 'http://localhost:3333/users', user).then(function (
        response
      ) {
        expect(response.status).to.eq(200)
      })
    })
    it('Deve logar com sucesso', function () {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      dashPage.header.userLoggedIn(user.name)
    })
  })
})
