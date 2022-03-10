function mediaFactory(data) {
    const { title,likes,image } = data;

    function getMediaCardDOM() {
        const article = document.createElement( 'article' );

        const picture = `assets/images/${image}`;
        const coeur = `assets/icons/coeur.svg`;

        const titre = document.createElement( 'h2' );
        titre.textContent = title;
        titre.classList.add("titre_media");

        const like = document.createElement( 'span' );
        like.textContent = likes;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const heart = document.createElement( 'img' );
        heart.setAttribute("src", coeur);
        heart.classList.add("img_coeur");

        article.appendChild(img);
        article.appendChild(titre);
        titre.appendChild(like);
        like.appendChild(heart);

        return (article);
    }
    return { title,likes,image, getMediaCardDOM }
}