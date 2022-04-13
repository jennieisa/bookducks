//DOM:en
const radioBtns = document.querySelectorAll("[name='typeOfProd']");
const addNewProdBtn = document.querySelector(".addNewProdBtn");
const inputTitle = document.querySelector("#inputTitle");
const inputAuthor = document.querySelector("#inputAuthor");
const inputLength = document.querySelector("#inputLength");
const inputGrade = document.querySelector("#inputGrade");
const inputGenre = document.querySelectorAll("[name='genre']");

//Funktioner
async function addNewBook(genres) {

    //Hämtar ut filen (bilden) och placerar den i FormData
    let img = document.querySelector("#inputFile").files;
    let imgData = new FormData();
    imgData.append("files", img[0]);

    //Laddar upp bilden i Strapi innan vi gör ett post request för hela boken
    await axios.post("http://localhost:1337/api/upload", imgData, {

        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    .then((response) => {

        let coverId = response.data[0].id;

        axios.post("http://localhost:1337/api/books", {

            data: {

                title: inputTitle.value,
                author: inputAuthor.value,
                pages: inputLength.value,
                cover: coverId,
                grade: inputGrade.value,
                genres: genres          
            }
        }, 
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
        })

    })

}

async function addNewAudiobook() {

    //Hämtar ut filen (bilden) och placerar den i FormData
    let img = document.querySelector("#inputFile").files;
    let imgData = new FormData();
    imgData.append("files", img[0]);

    //Laddar upp bilden i Strapi innan vi gör ett post request för hela boken
    await axios.post("http://localhost:1337/api/upload", imgData, {

        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    .then((response) => {

        let coverId = response.data[0].id;

        axios.post("http://localhost:1337/api/audiobooks", {

            data: {

                title: inputTitle.value,
                length: inputLength.value,
                cover: coverId,
                grade: inputGrade.value,
                releseDate,
                genres: genres          
            }
        }, 
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
        })

    })

}


//Eventlisterners

addNewProdBtn.addEventListener("click", (e) => {

    e.preventDefault();

    let typeOfProd = "";

    let genreList = [];

    radioBtns.forEach(btn => {

        if(btn.checked) {

            typeOfProd = btn.value;
        } 
    
    })

    inputGenre.forEach(genre => {

        if(genre.checked) {
            
            genreList.push(genre.value);

        }

    })

    console.log(genreList, typeOfProd, inputTitle.value, inputAuthor.value, inputLength.value, inputGrade.value, )

    if(typeOfProd == "books") {

        addNewBook(genreList);

    } else {

        addNewAudiobook();

    }
})