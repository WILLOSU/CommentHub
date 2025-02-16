const db = require ("./../configs/sequelize")
const { Model, DataTypes } = db.Sequelize

const User = require ("./../user/model")

const sequelize = db.sequelize

class Post extends Model {}

Post.init(
  {
    content: {
      type: DataTypes.STRING, 
    }
}, {sequelize, modelName: "posts"})

Post.User = Post.belongsTo(User)
User.hasMany(Post)

module.exports = Post