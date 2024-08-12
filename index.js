const express = require('express');
const admin = require('firebase-admin');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

app.use(express.json());

const serviceAccount = require('./revonchat.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://revon-chat-default-rtdb.firebaseio.com/'
});
const db = admin.database();

app.get('/animes', async (req, res) => {
  try {
    const animesRef = db.ref('animes');
    const animesSnapshot = await animesRef.once('value');
    const animes = animesSnapshot.val();
    res.json(animes);
  } catch (error) {
    console.error("Erro ao obter animes:", error);
    res.status(500).json({ error: "Erro ao obter animes", details: error.message });
  }
});

app.post('/animes', async (req, res) => {
  const novoAnime = req.body;
  try {
    if (!novoAnime.titulo || !novoAnime.link) {
      return res.status(400).json({ error: "Dados inválidos" });
    }
    const animesRef = db.ref('animes');
    await animesRef.push(novoAnime);
    res.json({ message: 'Anime adicionado com sucesso!' });
  } catch (error) {
    console.error("Erro ao adicionar anime:", error);
    res.status(500).json({ error: "Erro ao adicionar anime", details: error.message });
  }
});

app.get('/episodios/:animeLink', async (req, res) => {
  const animeLink = req.params.animeLink;

  try {
    const response = await axios.get(animeLink);
    const html = response.data;

    const $ = cheerio.load(html);
    const itemElements = $('div.div_video_list a.lEp');

    const itemInfoList = [];
    itemElements.each((index, element) => {
      const link = $(element).attr('href');
      const titulo = $(element).text();

      itemInfoList.push({
        "link": link,
        "titulo": titulo
      });
    });

    res.json(itemInfoList);
  } catch (error) {
    console.error("Erro ao obter episódios:", error);
    res.status(500).json({ error: "Erro ao obter episódios", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
