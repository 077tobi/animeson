const express = require('express');
const app = express();
const port = 3000;

const animes = [
  {
    "nome": "Failure Frame: I Became the Strongest and Annihilated Everything With Low-Level Spells",
    "capa": "https://image.tmdb.org/t/p/w500/jjpkWZ9LUXoUnh4F65qp7FuFawO.jpg",
    "dl": "Legendado",
    "modo": "populares",
    "sobre": "Touka nunca chamou atenção na escola. Quando ele é convocado para outro mundo com seus colegas, sua habilidade não muda. Eles adquirem novas habilidades de alto nível, exceto Touka, que é tido como um fracasso e mandando para as ruínas antigas pela deusa Vicius. Acontece que suas habilidades de baixo nível talvez não sejam tão inúteis, afinal. Agora ele busca vingança contra a deusa e sua verdadeira natureza é revelada.",
    "ID": 245285,
    "classificaca": 16,
    "categoria": "Ação ,Fantasia,Super herói",
    "ano": "2024-07-05",
    "banner": "https://image.tmdb.org/t/p/w500/wnOyzCLRiTAdmoY8V1Dmk3AWyHg.jpg",
    "title": "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=600/cr/logo/b32ea814-3231-4f39-a353-caf2f663b8d7.png"
  },
  {
    "nome": "That Time I Got Reincarnated as a Slime",
    "capa": "https://image.tmdb.org/t/p/w500/jQb1ztdko9qc4aCdnMXShcIHXRG.jpg",
    "dl": "Dub | Leg",
    "modo": "gratis",
    "sobre": "Isekai Recomendado \"Mikami Satoru, funcionário de uma megacorporação, é apunhalado por um assassino nas ruas e renasce num mundo paralelo... Mas ele renasce como um slime!\n\nJogado neste novo mundo com o nome Rimuru, ele assume a missão de criar um mundo que seja acolhedor para todas as raças.",
    "ID": 82684,
    "classificaca": 14,
    "categoria": "Ação ,Aventura,Comédia,Fantasia",
    "ano": "2018-10-02",
    "banner": "https://image.tmdb.org/t/p/w500/xzjZDyqUobuJtkBljhgLH4Fdnye.jpg",
    "title": "https://static.wikia.nocookie.net/vsbattles/images/4/46/TSSDK_Logo_%28Render%29.png/revision/latest/scale-to-width-down/600?cb=20181010214854"
  },
  {
    "nome": "One-Punch Man",
    "capa": "https://image.tmdb.org/t/p/w500/jbYJuxfZMpYDalkiOnBcCv9TaL.jpg",
    "dl": "Dub | Leg",
    "modo": "populares",
    "sobre": "Tudo sobre um jovem chamado Saitama parece mediano, sua expressão sem vida, sua cabeça calva e físico inexpressivo. No entanto, este homem de aparência comum não tem um problema comum... Ele é um super-herói que está à procura de adversários difíceis! O problema é que toda vez que ele encontra um candidato promissor ele o derrota com um soco. Saitama encontrará um vilão forte o suficiente para desafiá-lo? Siga Saitama através de suas aventuras hilariantes enquanto ele procura por novos bandidos para desafiar!",
    "ID": 63926,
    "classificaca": 14,
    "categoria": "Ação ,Ficção científica,Aventura",
    "ano": "2015-10-05",
    "banner": "https://image.tmdb.org/t/p/w500/s0w8JbuNNxL1YgaHeDWih12C3jG.jpg",
    "title": ""
  },
  {
    "nome": "The Elusive Samurai",
    "capa": "https://image.tmdb.org/t/p/w500/wVJjyUbns2USXo1bolF2vGanvf6.jpg",
    "dl": "Dub | Leg",
    "modo": "populares",
    "sobre": "No ano 1333, o governo do xogunato Kamakura desmorona. Um vassalo de confiança, Ashikaga Takauji, trai o xogunato e organiza uma rebelião. Hojo Tokiyuki, o herdeiro legítimo, escapa do massagre com um sacerdote xintoísta chamado Suwa Yorisige para Kamakura. Em fuga e lutando para se manter vivo, Tokiyuki coloca em ação seu plano de recuperar seus direitos hereditários.",
    "ID": 222623,
    "classificaca": 16,
    "categoria": "Aventura,Comédia,Ação",
    "ano": "2024-07-06",
    "banner": "https://image.tmdb.org/t/p/w500/cN8u7s6vaQezheTy2mGOzEmF7Hg.jpg",
    "title": ""
  },
  {
    "nome": "Sakuna: Of Rice and Ruin",
    "capa": "https://image.tmdb.org/t/p/w500/itQWwfZ8uhyROt7Vfuyk2jsGWV4.jpg",
    "dl": "Legendado",
    "modo": "gratis",
    "sobre": "Na antiga terra de Yanato existem dois reinos: o Reino Superior, onde residem os deuses, e o Reino Inferior, onde residem os humanos. A princesa Sakuna era filha do deus da guerra e da deusa da colheita, mas levava uma vida preguiçosa. Um dia, ela é banida para a Ilha Hinoe, a Ilha dos Demônios. Presa em uma terra árida, Sakuna sai para matar demônios e cultivar arroz. Sua nova aventura começa!",
    "ID": 255492,
    "classificaca": 14,
    "categoria": "Aventura,Ação",
    "ano": "2024-07-06",
    "banner": "https://image.tmdb.org/t/p/w500/xu2nKEcu3NpvLAvhoBbxQDv3icG.jpg",
    "title": ""
  },
  {
    "nome": "Dungeon People",
    "capa": "https://image.tmdb.org/t/p/w500/kskqKldSfWhV80wBb9iJqCAlk87.jpg",
    "dl": "Legendado",
    "modo": "gratis",
    "sobre": "Uma dungeon inexplorada, cheia de monstros e armadilhas. Uma ladra experiente, à procura de seu pai desaparecido.",
    "ID": 0,
    "classificaca": 0,
    "categoria": "",
    "ano": "",
    "banner": "",
    "title": ""
  }
];

app.get('/animes', (req, res) => {
  res.json(animes);
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
