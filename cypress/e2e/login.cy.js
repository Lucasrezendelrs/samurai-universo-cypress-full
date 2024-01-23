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
      cy.postUser(user)
    })
    it('Deve logar com sucesso', function () {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      dashPage.header.userLoggedIn(user.name)
    })
  })
  context('Quando o usuário é bom, mas a senha está incorreta', function () {
    let user = {
      name: 'Celso kamura',
      email: 'kamura@samuraibs.com',
      password: 'pwd123',
      is_provider: true,
    }
    before(function () {
      //Função(then) de callback para inserir a outra senha de forme procedural
      cy.postUser(user).then(function () {
        user.password = 'abc123'
      })
    })
    it('Deve notificar erro de credenciais', function () {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      const message =
        'Ocorreu um erro ao fazer login, verifique suas credenciais.'
      loginPage.toast.shouldHaveText(message)
    })
  })
})
