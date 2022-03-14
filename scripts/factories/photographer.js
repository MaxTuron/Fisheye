function photographerFactory(data) {
    const { name,id,city,country,tagline,price,portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.innerHTML = `
        <a href="photographer.html?id=${id}">
            <img src="${picture}">
        </a>
        <h2> ${name}</h2>
        <p class="location"> ${city} 
            <span class="location">${country}</span> 
        </p>
        <p>${tagline}</p>
        <p class="prix">${price}/jour </p>
        `;

        return (article);
    }
    return { name,city,country,tagline,price,picture, getUserCardDOM }
}