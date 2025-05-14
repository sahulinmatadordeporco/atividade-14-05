const express = require('express')
const {conectar, criarUsuario} = require('/test')

const app = express()
app.use(express.json())

app.post = ('./usuario', async (req,res) => {
    try{
        const {nome, email, senha} = req.body
        await criarUsuario(
            'insert into usuario (nome, email) values ($1, $2, $3)', [req.body.nome, req.body.email, req.body.senha]('ok'))
            [nome, email]
    }catch (error){
        msg_erro = "Internal Server Error"
        let cod_erro = 500
        if(error.no == 19){
            msg_erro = "Email já cadastrado"
            cod_erro = 400
        }
        res.status(cod_erro).json({error: msg})
    }
})

conectar().them(()=>{
    app.listen(8000, async () => {
        console.log('Servidor rodando')
    })
})