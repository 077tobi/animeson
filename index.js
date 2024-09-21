const express = require('express');
const app = express();
const port = 3000;

// Middleware para analisar dados JSON
app.use(express.json());

// Array para armazenar as informações do chat
const chatData = [];

// Rota para adicionar uma nova mensagem ao chat
app.post('/chat', (req, res) => {
  const { nome, verificado, foto, mensagem } = req.body;

  // Validação básica dos campos (adicione mais validações conforme necessário)
  if (!nome || !mensagem) {
    return res.status(400).json({ error: 'Nome e mensagem são obrigatórios' });
  }

  // Cria um novo objeto de mensagem
  const newMessage = {
    nome,
    verificado: verificado || false, // Verificado é opcional, define como false por padrão
    foto,
    mensagem,
    timestamp: new Date().toISOString(), // Adiciona um timestamp à mensagem
  };

  // Adiciona a mensagem ao array de dados do chat
  chatData.push(newMessage);

  // Retorna a resposta
  res.status(201).json({ message: 'Mensagem adicionada com sucesso', newMessage });
});

// Rota para obter as últimas N mensagens do chat
app.get('/chat', (req, res) => {
  const { count = 10 } = req.query; // Define o número de mensagens a serem retornadas, 10 por padrão
  const lastMessages = chatData.slice(-count); // Obtem as últimas N mensagens
  res.json(lastMessages);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
