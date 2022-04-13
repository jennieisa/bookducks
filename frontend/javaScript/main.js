const logInLink = document.querySelector(".logInLink");

if(sessionStorage.getItem("token")) {

    logInLink.innerText = "min sida";

    logInLink.href = "my_page.html";

} 