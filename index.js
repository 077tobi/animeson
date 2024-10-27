// Exemplo usando Express.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Permitir solicitações de outros domínios

const episodes = [
    {
        title: "Episódio 1",
        name: "Título do Episódio 1",
        img: "https://image.tmdb.org/t/p/w300/yBYDzzmNoT5uXkXo3NGatLIANYK.jpg",
        link: "https://player-link.com/episodio1"
    },
    {
        title: "Episódio 2",
        name: "Título do Episódio 2",
        img: "https://image.tmdb.org/t/p/w300/another-image.jpg",
        link: "https://player-link.com/episodio2"
    },
    // Adicione mais episódios conforme necessário
];

app.get('/api/episodes', (req, res) => {
    res.json(episodes);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
