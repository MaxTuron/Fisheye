function mediaFactory(data) {
    const { title,likes } = data;


    function getMediaCardDOM() {
        const article = document.createElement( 'article' );


        const titre = document.createElement( 'h2' );
        titre.textContent = title;

        const like = document.createElement( 'p' );
        like.textContent = likes;


        article.appendChild(titre);
        article.appendChild(like);

        return (article);
    }
    return { title,likes, getMediaCardDOM }
}