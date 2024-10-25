const express = require('express');
const app = express();
const port = 3000;

// Dados dos episódios de um anime fictício
const episodes = [
    {
        episode_number: 1,
        title: "Episódio 1: O Começo da Aventura",
        cover: "https://example.com/capa1.jpg",
        overview: "Neste episódio, o protagonista começa sua jornada em busca do tesouro perdido."
    },
    {
        episode_number: 2,
        title: "Episódio 2: Encontro com o Inimigo",
        cover: "https://example.com/capa2.jpg",
        overview: "O protagonista encontra seu primeiro inimigo e precisa lutar para sobreviver."
    },
    {
        episode_number: 3,
        title: "Episódio 3: O Poder da Amizade",
        cover: "https://example.com/capa3.jpg",
        overview: "Neste episódio, ele forma uma amizade inesperada que mudará o curso de sua jornada."
    },
    // Adicione mais episódios conforme necessário
];

// Rota para obter todos os episódios
app.get('/episodios', (req, res) => {
    res.json(episodes);
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
