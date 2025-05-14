const express = require('express')
const {conectar, criarUsuario} = require('/test')

const app = express()
app.use(express.json())

app.post = ('./usuario'(req,res));{
    await criarUsuario('insert into usuario (nome, email, senha) values ($1, $2, $3)', [req.body.nome, req.body.email, req.body.senha]('ok'))
}

conectar().them(()=>{
    app.listen(8000, () => {
        console.log('Servidor rodando na porta 8000')
    })
})