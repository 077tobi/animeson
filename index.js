const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/api/avatar/:name', async (req, res) => {
  const name = req.params.name;
  const url = `https://anime.kirwako.com/api/avatar?name=${name}`;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' }); // Obter resposta como buffer

    // Envie a imagem como resposta
    res.setHeader('Content-Type', response.headers['content-type']); // Definir o tipo de conteúdo
    res.send(response.data); 
  } catch (error) {
    console.error('Error fetching avatar:', error);
    res.status(500).json({ error: 'Failed to fetch avatar' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
