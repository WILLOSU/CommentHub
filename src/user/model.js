// utilizando herança para estender a classe model
const db = require ("../configs/sequelize")
const { Model, DataTypes } = db.Sequelize

const sequelize = db.sequelize

class User extends Model {}

// Inicializando a tabela 'users' no banco de dados
User.init(
  {
    firstname: {
      type: DataTypes.STRING, // Tipo de dado STRING
      allowNull: false // (Opcional) Indica que o campo não pode ser nulo
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {sequelize, modelName : "users"})

  module.exports = User
  
   