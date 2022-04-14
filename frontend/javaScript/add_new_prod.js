//DOM:en
const radioBtns = document.querySelectorAll("[name='typeOfProd']");
const addNewProdBtn = document.querySelector(".addNewProdBtn");
const inputTitle = document.querySelector("#inputTitle");
const inputAuthor = document.querySelector("#inputAuthor");
const inputLength = document.querySelector("#inputLength");
const inputGrade = document.querySelector("#inputGrade");
const inputGenre = document.querySelectorAll("[name='genre']");
const inputReleaseDate = document.querySelector("#inputReleaseDate");

//Funktioner
async function addNewBook(genres) {

    //Hämtar ut filen (bilden) och placerar den i FormData
    let img = document.querySelector("#inputFile").files;
    let imgData = new FormData();
    imgData.append("files", img[0]);

    let userData = JSON.parse(sessionStorage.getItem("user"));

    let userId = userData.id;

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
                genres: genres,
                users_permissions_user: userId
            }
        }, 
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
        })

    })

}

async function addNewAudiobook(genres) {

    //Hämtar ut filen (bilden) och placerar den i FormData
    let img = document.querySelector("#inputFile").files;
    let imgData = new FormData();
    imgData.append("files", img[0]);

    let userData = JSON.parse(sessionStorage.getItem("user"));

    let userId = userData.id;

    //Laddar upp bilden i Strapi innan vi gör ett post request för hela boken
    await axios.post("http://localhost:1337/api/upload", imgData, {

        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    .then(async (response) => {

        let coverId = response.data[0].id;

        let res = await axios.post("http://localhost:1337/api/audiobooks", {

            data: {

                title: inputTitle.value,
                length: inputLength.value,
                cover: coverId,
                grade: inputGrade.value,
                releaseDate: inputReleaseDate.value,
                genres: genres,
                users_permissions_user: userId
                       
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

let typeOfProd = "";

//Inte bästa lösningen med radio btn kanske ändra sen
radioBtns[0].addEventListener("click", () => {

    radioBtns.forEach(btn => {

        if (btn.checked) {

            typeOfProd = btn.value;

        }

        if(typeOfProd == "audiobooks") {
        
            inputAuthor.classList.add("hideElem");

            inputAuthor.previousElementSibling.classList.add("hideElem");
        
            inputReleaseDate.classList.remove("hideElem");
        
            inputReleaseDate.previousElementSibling.classList.remove("hideElem");
        
        
        } else {
        
            inputReleaseDate.classList.add("hideElem");
        
            inputReleaseDate.previousElementSibling.classList.add("hideElem");
        
            inputAuthor.classList.remove("hideElem");

            inputAuthor.previousElementSibling.classList.remove("hideElem");
        
        }
    })

    console.log(typeOfProd);

}) 

radioBtns[1].addEventListener("click", () => {

    radioBtns.forEach(btn => {
    
        if (btn.checked) {
    
            typeOfProd = btn.value;
    
        }

        if(typeOfProd == "audiobooks") {
        
            inputAuthor.classList.add("hideElem");

            inputAuthor.previousElementSibling.classList.add("hideElem");
        
            inputReleaseDate.classList.remove("hideElem");
        
            inputReleaseDate.previousElementSibling.classList.remove("hideElem");
        
        } else {
        
            inputReleaseDate.classList.add("hideElem");
        
            inputReleaseDate.previousElementSibling.classList.add("hideElem");
        
            inputAuthor.classList.remove("hideElem");
        
        }
    })    
}) 

addNewProdBtn.addEventListener("click", (e) => {

    e.preventDefault();

    let genreList = [];

    console.log(inputReleaseDate.value)

    inputGenre.forEach(genre => {

        if(genre.checked) {
            
            genreList.push(genre.value);

        }

    })

    if(typeOfProd == "books") {

        addNewBook(genreList);

    } else {

        addNewAudiobook(genreList);

    }
})

console.log(JSON.parse(sessionStorage.getItem("user")))