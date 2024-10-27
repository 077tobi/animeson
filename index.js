// api/episodes.js
export default function handler(req, res) {
    // Definindo os episódios
    const episodes = [
        {
            title: "Episódio 1",
            name: "Título do Episódio 1",
            img: "https://image.tmdb.org/t/p/w300/yBYDzzmNoT5uXkXo3NGatLIANYK.jpg",
            link: "https://player-link.com/episodio1"
        },
        {
            title: "Episódio 2",
            name: "Título do Episódio 2",
            img: "https://image.tmdb.org/t/p/w300/another-image.jpg",
            link: "https://player-link.com/episodio2"
        },
        {
            title: "Episódio 3",
            name: "Título do Episódio 3",
            img: "https://image.tmdb.org/t/p/w300/another-image-3.jpg",
            link: "https://player-link.com/episodio3"
        }
        // Adicione mais episódios conforme necessário
    ];

    // Retornando a resposta em JSON
    res.status(200).json(episodes);
}
