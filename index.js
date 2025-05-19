const express = require('express');
const { conectar, criarUsuario } = require('./teste'); 

const app = express();
app.use(express.json());

app.post('/usuario', async (req, res) => {      
  try {
    const { nome, email, senha } = req.body;
    await criarUsuario(
      'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)', 
      [nome, email, senha]
    );
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    const msg = error.code === 'SQLITE_CONSTRAINT' ? 'Email já cadastrado' : 'Erro interno';
    const status = error.code === 'SQLITE_CONSTRAINT' ? 400 : 500;
    res.status(status).json({ error: msg });
  }
});

app.put('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    await criarUsuario(
      'UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?',
      [nome, email, senha, id]
    );
    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

app.delete('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await criarUsuario('DELETE FROM usuario WHERE id = ?', [id]);
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

app.post('/tarefa', async (req, res) => {
  try {
    const { titulo, descricao, usuarioId } = req.body;
    await criarUsuario(
      'INSERT INTO tarefa (titulo, descricao, usuario_id) VALUES (?, ?, ?)',
      [titulo, descricao, usuarioId]
    );
    res.status(201).json({ message: 'Tarefa criada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

conectar().then(() => {
  app.listen(8000, () => console.log('🚀  Servidor rodando na porta 8000'));
}).catch(err => {
  console.error('Falha ao conectar no banco:', err);
});
