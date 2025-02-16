const db = require("./../configs/sequelize.js"); // Importa a configuração do Sequelize
const User = require("./model.js");              // Importa o modelo User

// Função para criar um novo usuário (será usada em rotas, por exemplo)
exports.create = (req, res) => {
    // Insere um novo registro na tabela 'users'
    User.create({
        firstname: req.body.firstname, // Obtém o valor de 'firstname' do corpo da requisição
        lastname: req.body.lastname    // Obtém o valor de 'lastname' do corpo da requisição
    })
    .then((user) => {                  // Caso o registro seja criado com sucesso
        res.send(user);                // Retorna o usuário criado como resposta
    })
    .catch((err) => {                  // Caso ocorra um erro durante a criação
        res.status(500).send({
            message: err.message || "Erro ao criar usuário."
        });
    });
};



exports.findAll = (req, res) => {
   
    User.findAll()
        .then(users => { // Se a consulta for bem-sucedida, executa essa função passando os resultados como 'users'
            res.send(users); // Envia os resultados da consulta (uma lista de usuários) como resposta em formato JSON
        })
        .catch(err => { // Caso ocorra algum erro durante a consulta, ele é tratado aqui
            res.status(500).send({ // Retorna o status 500 (Erro Interno do Servidor) e uma mensagem de erro
                message: err.message || "Ocorreu um erro ao buscar os usuários."
            });
        });
};
