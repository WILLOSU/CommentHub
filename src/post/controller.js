const db = require("./../configs/sequelize.js");
const Post = require("./model.js");             

const User = require('./../user/model.js') // importar o user pois preciso dele para fazer um relacionamento

const { Op } = db.Sequelize

exports.create = (req, res) => {
   
    Post.create({ // passa um objeto, que corresponde a entidade do banco 
        content: req.body.content, 
        userId : req.body.userId
    },  {
        include: [{
            association: Post.User
        }]
    }).then((post) => {  // positivo retorna o próprio post
        res.send(post);
    }).catch((err) => {
         console.log("Erro: " + err);
    });
}

exports.findAll = (req, res) => {
    Post.findAll({include : User, where : {content : {[Op.iLike] : '%' + req.query.content + '%'}}, order : ['createdAt']}).then(posts =>{
        res.send(posts)
    })
}

exports.update = (req, res) => {
    Post.update(
        {
        content : req.body.content
        }, 
        {
            where : {
                id : req.body.id
            }
        }
    ).then(() => {
        res.send({'message' : 'ok'});
    })
}

exports.remove = (req, res) => {

    Post.destroy({
        where :{
            id : req.body.id
        }
    }).then((affecteRows) =>{
        res.send({'message' : 'ok', 'affecteRows' : affecteRows})
    })
}

//  eager = carrega tudo (posts + os relacionamentos).
//  lazy  = carrega apenas a entidade principal e os demais quando for necessário.