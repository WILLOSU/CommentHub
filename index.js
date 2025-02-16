const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./src/configs/sequelize')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
 // usado para jquery

app.use(express.static('public'))

db.sequelize.sync({ alter: true }).then(() => {
    console.log("Deu certo a criação do banco (DROP e CREATE)")
})

require('./src/user/routes')(app)
require('./src/post/routes')(app)

const path = require('path')

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'))
})


//  http://localhost:3333

var server = app.listen(3333, () => {
    console.log("Servidor rodando na porta " + server.address().port + " no host " + server.address().address)
})
