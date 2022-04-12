//DOM:en
const createUserBtn = document.querySelector(".createUserBtn");


//När man klickar på skapa användar knappen 
createUserBtn.addEventListener("click", (e) => {

    e.preventDefault();

    window.location.href="create_user_page.html";

})
