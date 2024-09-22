const express = require('express');
const axios = require('axios'); // Biblioteca para fazer requisições HTTP
const cheerio = require('cheerio'); // Biblioteca para análise de HTML
const app = express();
const port = 3000;

// Middleware para analisar dados JSON
app.use(express.json());

// URL do site a ser raspado
const url = 'https://animefire.plus/';

// Rota para obter os novos lançamentos de animes
app.get('/animes', async (req, res) => {
  try {
    // Fazer a requisição HTTP para o site
    const response = await axios.get(url);

    // Analisar o HTML da resposta
    const $ = cheerio.load(response.data);

    // Selecionar os elementos com a classe "containerAnimes"
    const animes = $('.containerAnimes');

    // Extrair os dados de cada anime
    const animesData = animes.map((index, element) => {
      const title = $(element).find('.animeTitle').text();
      const link = $(element).find('.item').attr('href');
      const image = $(element).find('.imgAnimes').attr('data-src');
      const lastEpisode = $(element).find('.horaUltimosEps').text();

      return {
        title,
        link,
        image,
        lastEpisode,
      };
    }).get();

    // Retornar os dados dos animes em formato JSON
    res.json(animesData);
  } catch (error) {
    console.error('Erro ao raspar o site:', error);
    res.status(500).json({ error: 'Erro ao obter os dados' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
