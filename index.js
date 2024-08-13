   const express = require('express');
   const axios = require('axios');
   const cheerio = require('cheerio'); // Importar o Cheerio

   const app = express();
   const port = 3000;

   app.get('/api/anroll/:animeId', async (req, res) => {
       const animeId = req.params.animeId; // Obter ID do anime da URL
       const url = `https://anroll.net/e/${animeId}`;

       try {
           const response = await axios.get(url); 
           const html = response.data;
           const $ = cheerio.load(html); // Carregar o HTML no Cheerio

           // Extrair os dados desejados:
           const imageUrl = $('img').attr('src'); // URL da imagem
           const animeTitle = $('h1').text().trim(); // Título do anime
           const episodeNumber = $('span.episode-badge b').text(); // Número do episódio

           const data = {
               imageUrl,
               animeTitle,
               episodeNumber,
           };

           res.json(data); // Retornar os dados como JSON
       } catch (error) {
           console.error('Error fetching data:', error);
           res.status(500).json({ error: 'Failed to fetch data' });
       }
   });

   app.listen(port, () => {
       console.log(`Server listening at http://localhost:${port}`);
   });
   
