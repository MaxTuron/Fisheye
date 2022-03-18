function mediaFactory(data) {
    const {title, id, likes, image, video} = data;

    function getMediaCardDOM() {
        const picture = `assets/images/${image}`;
        const coeur = `assets/icons/coeur.svg`;
        const videos = `assets/video/${video}`;
        const mediaID = data.id
        const mediaLikes = data.likes

        const article = document.createElement('article');

        if (image === undefined) {
            article.innerHTML = ` 
             <video controls>
                <source src="${videos}" type="video/mp4">
             </video>
             <h2 class="titre_media">${title}
                <button class="addLikes" data-id="${id}" onclick="addLike(${mediaID})">${likes}</button>
                <img src="${coeur}" alt="" class="img_coeur LikesMedia">
             </h2>
        `;
        } else {
            article.innerHTML = ` 
             <a href="#${mediaID}">
        <img class="thumb" alt="" src="${picture}">
</a>

<div class="lightbox" id="${mediaID}">
    <a href="#_" class="btn-close">X</a>
    <img src="${picture}" alt="">
</div>
             <h2 class="titre_media">${title}
                <button class="addLikes" data-id="${id}" onclick="addLike(${mediaID})">${likes}</button>
                 <img src="${coeur}" alt="" class="img_coeur">
             </h2>      
        `;
        }
        return (article);
    }

    return {title, id, likes, image, video, getMediaCardDOM}
}