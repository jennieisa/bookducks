//DOM:en
const prodList = document.querySelector(".prodList");

//Funktioner
async function drawProducts() {

    let audiobooksData = await getPublicData("http://localhost:1337/api/audiobooks?populate=*");
    let booksData = await getPublicData("http://localhost:1337/api/books?populate=*");

    audiobooksData.data.forEach(audiobook => {

        let { title, length, cover, grade, genres, releaseDate } = audiobook.attributes;

        console.log(title, length, cover.data.attributes.url, grade, genres, releaseDate);

        let audiobookGenres = "";

        genres.data.forEach(elem => {

            audiobookGenres += " " + elem.attributes.name;

        })

        let theProd = `
            <article class="theProdArticle">
                <p>ljudbok</p>
                <h3>titel: ${title}</h3>
                <p>längd: ${length} h</p>
                <p>betyg: ${grade} av 10</p>
                <p>genres: ${audiobookGenres}</p>
                <p>utgiven: ${releaseDate}</p>
                <img src="http://localhost:1337${cover.data.attributes.url}" alt="">
            </article>
        `;

        prodList.innerHTML += theProd;

    });

    booksData.data.forEach(book => {

        let { title, author, cover, grade, genres, pages } = book.attributes;
        
        console.log(title, author, cover.data.attributes.url, grade, genres, pages);

        let bookgenres = "";

        genres.data.forEach(elem => {

            bookgenres += " " + elem.attributes.name;

        })

        let theProd = `
            <article class="theProdArticle">
                <p>bok</p>
                <h3>titel: ${title}</h3>
                <p>författare: ${author}</p>
                <p>antal sidor: ${pages}</p>
                <p>genres: ${bookgenres}</p>
                <p>betyg: ${grade} av 10</p>
                <img src="http://localhost:1337${cover.data.attributes.url}" alt="">
            </article>
        `;

        prodList.innerHTML += theProd;

    })
    
    
}

drawProducts();
