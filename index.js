const express = require('express')
const { conectar, criarUsuario } = require('/test')

const app = express()
app.use(express.json())

app.post('./usuario', async (req, res) => {
    try {
        const { nome, email, senha } = req.body
        await criarUsuario(
            'insert into usuario (nome, email, senha) values ($1, $2, $3)',
            [nome, email, senha]
        )
        res.status(201).json({ message: 'Usuário criado com sucesso' })
    } catch (error) {
        let msg_erro = "Internal Server Error"
        let cod_erro = 500
        if (error.no == 19) {
            msg_erro = "Email já cadastrado"
            cod_erro = 400
        }
        res.status(cod_erro).json({ error: msg_erro })
    }
})

// Rota para atualizar um usuário
app.put('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email, senha } = req.body
        await criarUsuario(
            'update usuario set nome = $1, email = $2, senha = $3 where id = $4',
            [nome, email, senha, id]
        )
        res.status(200).json({ message: 'Usuário atualizado com sucesso' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' })
    }
})

// Rota para deletar um usuário pelo ID
app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        await criarUsuario('delete from usuario where id = $1', [id])
        res.status(200).json({ message: 'Usuário deletado com sucesso' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' })
    }
})

// Rota para criar uma tarefa
app.post('/tarefa', async (req, res) => {
    try {
        const { titulo, descricao, usuarioId } = req.body
        await criarUsuario(
            'insert into tarefa (titulo, descricao, usuario_id) values ($1, $2, $3)',
            [titulo, descricao, usuarioId]
        )
        res.status(201).json({ message: 'Tarefa criada com sucesso' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar tarefa' })
    }
})

conectar().then(() => {
    app.listen(8000, async () => {
        console.log('Servidor rodando')
    })
})