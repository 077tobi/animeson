const express = require('express');
const app = express();
const port = 3000;

const axios = require('axios'); // Use Axios para fazer requisições HTTP

// Array para armazenar os animes (inicialmente vazio)
let animes = []; 

app.post('/animes/update', async (req, res) => {
    try {
        const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // ID da sua planilha
        const sheetName = 'YOUR_SHEET_NAME'; // Nome da planilha

        const response = await axios.get(`https://script.google.com/macros/s/AKfycbzwQHmLiue5DqZvI9xh3-eq_RAm_9lauOf_EsPoWEJddfrTghjoCX-NG0_5eQv3xgxU/exec?spreadsheetId=${spreadsheetId}&sheetName=${sheetName}`);

        // Obter dados da planilha da resposta do script
        animes = response.data; // Atualiza o array `animes`

        res.json(animes); // Retorna os dados para a API
    } catch (error) {
        console.error('Erro ao obter dados da planilha:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota para obter todos os animes
app.get('/animes', (req, res) => {
    res.json(animes); 
});

// ... (outras rotas para adicionar, editar, etc.)

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
