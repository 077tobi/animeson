const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const port = 3000;

// Array para armazenar os episódios
let episodes = [];

// Função para atualizar a lista de episódios
async function updateEpisodes() {
  try {
    const response = await axios.get('https://goyabu.to/home-2');
    const $ = cheerio.load(response.data);

    episodes = []; // Limpa a lista atual

    // Seletores precisam ser atualizados de acordo com a estrutura do site
    $('article.boxEP').each((index, element) => {
      const link = $(element).find('a').attr('href');
      const title = $(element).find('h3').text().trim(); // Supondo que o título está em um 'h3'
      const episode = $(element).find('span.titleEP').text().trim(); // Supondo que o episódio está em um 'span.titleEP'
      const image = $(element).find('img').attr('src');
      const dublado = $(element).attr('data-tar');
      const qualidade = $(element).attr('data-qualy');

      episodes.push({
        link,
        title,
        episode,
        image,
        dublado,
        qualidade
      });
    });
  } catch (error) {
    console.error(error);
  }
}

// Atualiza a lista de episódios a cada X segundos (ajuste o valor)
setInterval(updateEpisodes, 10000); // Atualiza a cada 10 segundos

// Rota para obter a lista de episódios
app.get('/episodes', (req, res) => {
  res.json(episodes);
});

app.listen(port, () => {
  console.log(Servidor rodando na porta ${port});
  // Chama a função para atualizar a lista de episódios inicialmente
  updateEpisodes();
});
