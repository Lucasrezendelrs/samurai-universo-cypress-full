import _ from 'underscore'
exports.customer = {
  name: 'Cliente Teste',
  email: 'clienteteste@cliente.com',
  password: 'pwd123',
  is_provider: false,
}
exports.provider = {
  name: 'Samurai Teste',
  email: 'samuraiteste@profissional.com',
  password: 'pwd456',
  is_provider: true,
}
exports.appointment = {
  //função para sortear um valor dentro do array
  hour: _.sample([
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ]),
}
