const express = require('express');
const app = express();
const port = 3000; // Pode mudar para outra porta, se preferir

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

// Dados simulados
let episodes = [
  {
    id: 1,
    temporada: 1,
    episodio: 1,
    link: "https://example.com/temporada1/episodio1"
  },
  {
    id: 2,
    temporada: 1,
    episodio: 2,
    link: "https://example.com/temporada1/episodio2"
  },
  {
    id: 3,
    temporada: 2,
    episodio: 1,
    link: "https://example.com/temporada2/episodio1"
  },
  {
    id: 4,
    temporada: 2,
    episodio: 2,
    link: "https://example.com/temporada2/episodio2"
  }
];

// Rota principal
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Episódios!');
});

// Rota para obter todos os episódios
app.get('/episodes', (req, res) => {
  res.json(episodes);
});

// Rota para obter um episódio específico usando ID, temporada e episódio
app.get('/episodes/:id/:temporada/:episodio', (req, res) => {
  const id = parseInt(req.params.id);
  const temporada = parseInt(req.params.temporada);
  const episodio = parseInt(req.params.episodio);

  // Encontrar o episódio que corresponda a ID, temporada e episódio
  const episode = episodes.find(ep => ep.id === id && ep.temporada === temporada && ep.episodio === episodio);

  if (episode) {
    res.json({ link: episode.link });
  } else {
    res.status(404).json({ error: 'Episódio não encontrado' });
  }
});

// Rota para obter um episódio por ID
app.get('/episodes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const episode = episodes.find(ep => ep.id === id);
  
  if (episode) {
    res.json(episode);
  } else {
    res.status(404).json({ error: 'Episódio não encontrado' });
  }
});

// Rota para adicionar um novo episódio
app.post('/episodes', (req, res) => {
  const { temporada, episodio, link } = req.body;

  if (!temporada || !episodio || !link) {
    return res.status(400).json({ error: 'Todos os campos (temporada, episodio, link) são obrigatórios.' });
  }

  const newEpisode = {
    id: episodes.length + 1,
    temporada,
    episodio,
    link
  };

  episodes.push(newEpisode);
  res.status(201).json(newEpisode);
});

// Rota para atualizar um episódio por ID
app.put('/episodes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { temporada, episodio, link } = req.body;

  const episodeIndex = episodes.findIndex(ep => ep.id === id);

  if (episodeIndex === -1) {
    return res.status(404).json({ error: 'Episódio não encontrado' });
  }

  // Atualiza apenas os campos fornecidos
  episodes[episodeIndex] = {
    ...episodes[episodeIndex],
    temporada: temporada || episodes[episodeIndex].temporada,
    episodio: episodio || episodes[episodeIndex].episodio,
    link: link || episodes[episodeIndex].link
  };

  res.json(episodes[episodeIndex]);
});

// Rota para excluir um episódio por ID
app.delete('/episodes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const episodeIndex = episodes.findIndex(ep => ep.id === id);

  if (episodeIndex === -1) {
    return res.status(404).json({ error: 'Episódio não encontrado' });
  }

  episodes.splice(episodeIndex, 1);
  res.status(204).send(); // Retorna status 204 sem corpo
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
    
