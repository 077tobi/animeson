const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

class AnimechanAPI {
  endpoint = "https://animechan.xyz/api";

  async get_random_quote(animeTitle, characterName) {
    try {
      let url = `${this.endpoint}/random`;

      if (characterName) {
        url += `/character?name=${encodeURIComponent(characterName)}`;
      } else if (animeTitle) {
        url += `/anime?title=${encodeURIComponent(animeTitle)}`;
      }

      const response = await axios.get(url, { timeout: 5000 }); 
      this._check_response_code(response.status);
      return response.data;

    } catch (error) {
      console.error('Erro ao obter citação:', error);
      throw error;
    }
  }

  async get_many_random_quotes() {
    try {
      const response = await axios.get(`${this.endpoint}/quotes`, { timeout: 5000 });
      this._check_response_code(response.status);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter várias citações:', error);
      throw error;
    }
  }

  async search_by_anime_title(animeTitle, page = 1) {
    try {
      const response = await axios.get(`${this.endpoint}/quotes/anime`, { 
        params: { title: animeTitle, page }, 
        timeout: 5000
      });
      this._check_response_code(response.status);
      return response.data;
    } catch (error) {
      console.error('Erro ao pesquisar por título de anime:', error);
      throw error;
    }
  }

  async search_by_character_name(characterName, page = 1) {
    try {
      const response = await axios.get(`${this.endpoint}/quotes/character`, { 
        params: { name: characterName, page }, 
        timeout: 5000 
      });
      this._check_response_code(response.status);
      return response.data;
    } catch (error) {
      console.error('Erro ao pesquisar por nome de personagem:', error);
      throw error;
    }
  }

  _check_response_code(statusCode, msg = "") {
    if (statusCode === 404) {
      throw new Error("Não encontrado (404)");
    }
    if (statusCode !== 200) {
      throw new Error(`Erro no servidor (${statusCode})`);
    }
  }
}

// Criando uma instância da API
const animechan = new AnimechanAPI();

// Definindo rotas para a API
app.get('/random_quote', async (req, res) => {
  try {
    const animeTitle = req.query.anime;
    const characterName = req.query.character;
    const quote = await animechan.get_random_quote(animeTitle, characterName);
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/many_random_quotes', async (req, res) => {
  try {
    const quotes = await animechan.get_many_random_quotes();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/search_by_anime_title', async (req, res) => {
  try {
    const animeTitle = req.query.title;
    const page = parseInt(req.query.page) || 1;
    const quotes = await animechan.search_by_anime_title(animeTitle, page);
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/search_by_character_name', async (req, res) => {
  try {
    const characterName = req.query.name;
    const page = parseInt(req.query.page) || 1;
    const quotes = await animechan.search_by_character_name(characterName, page);
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API Animechan rodando na porta ${port}`);
});
