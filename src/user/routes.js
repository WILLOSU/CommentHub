module.exports = (app) => {
    const controller = require('./controller')

    // Criar um novo usuário
    app.post('/usuarios', controller.create)

    // Buscar todos os usuários
    app.get('/usuarios', controller.findAll)
}

