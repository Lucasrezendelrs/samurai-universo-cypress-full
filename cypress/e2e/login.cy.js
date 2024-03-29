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
      cy.uiLogin(user)
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
  context('Quando o formato do email é inválido', function () {
    const emails = [
      'lucas.com.br',
      'yahoo.com',
      '@gmail.com',
      '@',
      'lucas@',
      '111',
      '&*^&&^*',
      'xpto123',
    ]

    emails.forEach(function (email) {
      it('Não deve logar com o email: ' + email, function () {
        const user = {
          email: email,
          password: 'pwd123',
        }
        loginPage.go()
        loginPage.form(user)
        loginPage.submit()
        loginPage.alert.haveText('Informe um email válido')
      })
    })
  })
  context('Quando não preencho nenhum dos campos', function () {
    const alertMessages = ['E-mail é obrigatório', 'Senha é obrigatória']
    beforeEach(function () {
      loginPage.go()
      loginPage.submit()
    })
    alertMessages.forEach(function (alert) {
      it('Deve exibir ' + alert.toLowerCase(), function () {
        loginPage.alert.haveText(alert)
      })
    })
  })
})
