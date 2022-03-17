function mediaFactory(data) {
    const { title,id,likes,image,video } = data;

    function getMediaCardDOM() {
        const picture = `assets/images/${image}`;
        const coeur = `assets/icons/coeur.svg`;
        const videos = `assets/video/${video}`;
        const mediaID = data.id
        const mediaLikes = data.likes

        const article = document.createElement( 'article' );

        if (image===undefined) {
            article.innerHTML = ` 
             <video controls>
                <source src="${videos}" type="video/mp4">
             </video>
             <h2 class="titre_media">${title}
                <span>${likes}
                    <img src="${coeur}" class="img_coeur LikesMedia">
                </span>
             </h2>
        `;
        }else{
            article.innerHTML = ` 
             <a href="#${mediaID}">
        <img class="thumb" src="${picture}">
</a>

<div class="lightbox" id="${mediaID}">
    <a href="#_" class="btn-close">X</a>
    <img src="${picture}">
</div>
             <h2 class="titre_media">${title}
                <button class="addLikes" onclick="addLike(${mediaID}, ${mediaLikes})">${likes}
                    <img src="${coeur}" class="img_coeur">
                </button>
             </h2>      
        `;
        }
        return (article);
    }
    return { title,id,likes,image,video, getMediaCardDOM }
}