module.exports = (app) => {
    const controller = require('./controller') // caminho relativo

    // Criar um novo post
    app.post('/post', controller.create)

    // Buscar todos os posts
    app.get('/post', controller.findAll)

    //Atualiza um post por ID
    app.put('/post', controller.update)

    //Remove um post por id
    app.delete('/post', controller.remove)
}

