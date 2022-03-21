function mediaFactory(data, numeroPhoto) {
    let {title, id, likes, image, video} = data;

    function getMediaCardDOM() {
        let picture = `assets/images/${image}`;
        let coeur = `assets/icons/coeur.svg`;
        let videos = `assets/video/${video}`;
        let mediaID = data.id;

        let article = document.createElement('article');

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
             <img src="${picture}" alt="" onclick="openModal();currentSlide(${numeroPhoto})">
             <h2 class="titre_media">${title}
                <button class="addLikes" data-id="${id}" onclick="addLike(${mediaID})">${likes}</button>
                 <img src="${coeur}" alt="" class="img_coeur">
             </h2>  
             
             <div id="myModal" class="modal">
                <span class="close cursor" onclick="closeModal()">&times;</span>
                <div class="modal-content">
                    <div class="mySlides">
                        <img src="${picture}" style="width:100%">
                    </div>    
                </div>
             </div>
        `;
        }
        return (article);
    }

    return {title, id, likes, image, video, getMediaCardDOM}
}