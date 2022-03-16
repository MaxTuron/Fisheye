function mediaFactory(data) {
    const { title,likes,image,video } = data;

    function getMediaCardDOM() {
        const picture = `assets/images/${image}`;
        const coeur = `assets/icons/coeur.svg`;
        const videos = `assets/video/${video}`;

        const article = document.createElement( 'article' );

        if (image===undefined) {
            article.innerHTML = ` 
             <video controls>
                <source src="${videos}" type="video/mp4">
             </video>
             <h2 class="titre_media">${title}
                <span>${likes}
                    <img src="${coeur}" class="img_coeur">
                </span>
             </h2>
        `;
        }else{
            article.innerHTML = ` 
             <img src="${picture}" class="img-galerie">
             <h2 class="titre_media">${title}
                <span>${likes}
                    <img src="${coeur}" class="img_coeur">
                </span>
             </h2> 
        `;
        }
        return (article);
    }
    return { title,likes,image,video, getMediaCardDOM }
}