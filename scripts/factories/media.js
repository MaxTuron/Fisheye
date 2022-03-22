function mediaFactory(data, numeroPhoto) {
    let {title, id, likes, image, video} = data;

    function getMediaCardDOM() {
        let picture = `assets/images/${image}`;
        let coeur = `assets/icons/coeur.svg`;
        let videos = `assets/video/${video}`;
        let mediaID = data.id;

        let div = document.createElement('div');

        if (image === undefined) {
            div.innerHTML = ` 
             <video src="${videos}" poster="${videos}">                         
             </video>
             <h2 class="titre_media">${title}
                <button class="addLikes" data-id="${id}" onclick="addLike(${mediaID})">${likes}</button>
                <img src="${coeur}" alt="likes" class="img_coeur LikesMedia">
             </h2>
             
             <div id="myModal" class="modal">
                <span class="close cursor" onclick="closeModalLightbox()">X</span>
                <div class="modal-content">
                    <div class="mySlides">
                       <video controls>
                            <source src="${videos}" type="video/mp4">
                       </video>
                    </div>  
                    <a class="prev" onclick="changeMedia(-1)"><</a>
                    <a class="next" onclick="changeMedia(1)">></a>
                </div>
             </div>
        `;
        } else {
            div.innerHTML = ` 
             <img src="${picture}" alt="image${title}" class="hover-shadow" onclick="openModalLightbox();currentMedia(${numeroPhoto})">
             <h2 class="titre_media">${title}
             <div>
                <button class="addLikes" data-id="${id}" onclick="addLike(${mediaID})">${likes}</button>
                <img src="${coeur}" alt="likes" class="img_coeur">
                </div>
             </h2>  
             
             <div id="myModal" class="modal">
                <span class="close cursor" aria-label="Fermer la fenêtre" onclick="closeModalLightbox()">X</span>
                <div class="modal-content">
                    <div class="mySlides">
                         <img src="${picture}" alt="image${title}">
                    </div>  
                          <a class="prev" onclick="changeMedia(-1)"><</a>
                          <a class="next" onclick="changeMedia(1)">></a>
                </div>
             </div>
        `;
        }
        return (div);
    }

    return {title, id, likes, image, video, getMediaCardDOM}
}