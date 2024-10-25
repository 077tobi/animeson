const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 3000;

app.get('/anime-episodios', async (req, res) => {
  try {
    const response = await fetch('https://animefire.plus/');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const itemElements = doc.querySelectorAll('div.col-12.col-sm-6.col-md-4.col-lg-6.col-xl-3.divCardUltimosEpsHome');
    const itemInfoList = [];

    itemElements.forEach(itemElement => {
      const link = itemElement.querySelector('a').href;
      const título = itemElement.querySelector('h3.animeTitle').textContent.trim();
      const episodio = itemElement.querySelector('span.numEp').textContent.trim();

      itemInfoList.push({ título, link, episodio });
    });

    res.json(itemInfoList);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
