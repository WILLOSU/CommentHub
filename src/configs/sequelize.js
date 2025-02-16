const dbConfig = require('./database.js') // Importa as configurações do banco de dados
const Sequelize = require('sequelize')    // Importa a biblioteca Sequelize

const sequelize = new Sequelize(dbConfig) // Cria uma instância do Sequelize

const db = {} // Cria um objeto vazio chamado 'db'

db.Sequelize = Sequelize   // Adiciona a própria biblioteca Sequelize dentro do objeto 'db'   
db.sequelize = sequelize   // Adiciona a conexão com o banco de dados (a instância do Sequelize) dentro do objeto 'db'

module.exports = db
