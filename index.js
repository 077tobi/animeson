const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use o body-parser para analisar o corpo das requisições
app.use(bodyParser.json());

// Dados dos animes (substitua pelo seu JSON real)
let animes = [
  {
    "nome": "Tsue to Tsurugi no Wistoria - Todos os Episódios",
    "capa": "https://animefire.plus/img/animes/tsue-to-tsurugi-no-wistoria.webp",
    "link": "https://animefire.plus/animes/tsue-to-tsurugi-no-wistoria-todos-os-episodios" 
  },
  // ... (adicione os outros animes aqui)
];

// Rota para obter a lista de animes
app.get('/animes', (req, res) => {
  res.json(animes);
});

// Rota para enviar um novo anime
app.post('/animes', (req, res) => {
  const novoAnime = req.body;
  animes.push(novoAnime);
  res.json({ message: 'Anime adicionado com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
