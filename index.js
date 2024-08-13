const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

// Função para obter fotos de perfil de anime do Pinterest
async function getAnimeProfilePics(searchTerm) {
  try {
    // Faz uma requisição HTTP para a página de pesquisa do Pinterest
    const response = await axios.get(`https://www.pinterest.com/search/pins/?q=${searchTerm}&rs=typed`); // URL dentro de aspas simples

    // Usa o cheerio para analisar o HTML da página
    const $ = cheerio.load(response.data);

    // Seleciona as imagens de perfil de anime (ajuste o seletor conforme necessário)
    const profilePics = $('img.img-responsive.pin-image').map((i, element) => {
      return $(element).attr('src'); // Obtem o atributo "src" da imagem
    }).get();

    return profilePics;

  } catch (error) {
    console.error('Erro ao obter fotos do Pinterest:', error);
    return [];
  }
}

// Rota para obter fotos de perfil de anime do Pinterest
app.get('/anime-profile-pics', async (req, res) => {
  // Define a quantidade de fotos aleatórias a serem retornadas
  const numPics = req.query.num || 3;

  // Busca as fotos de perfil de anime no Pinterest
  const animeProfilePics = await getAnimeProfilePics('anime profile pictures'); // Termo de pesquisa

  // Seleciona um número aleatório de fotos da lista
  const randomPics = [];
  for (let i = 0; i < numPics; i++) {
    const randomIndex = Math.floor(Math.random() * animeProfilePics.length);
    randomPics.push(animeProfilePics[randomIndex]);
  }

  res.json(randomPics); 
});

// Inicie o servidor
app.listen(port, () => {
  console.log('API de fotos de perfil de animes rodando na porta ${port}'); // Corrigindo a string de console.log
});
