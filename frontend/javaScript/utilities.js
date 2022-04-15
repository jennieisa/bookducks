//Funktioner
async function getData(url, jwt) {

    let response = await axios.get(url, {

        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });

    return response.data;

}

async function getPublicData(url) {

    let response = await axios.get(url);

    return response.data;

}

function checkUserStatus() {

    if(sessionStorage.getItem("token")) {

        document.querySelector(".logInLink").innerText = "min sida";
    
        document.querySelector(".logInLink").href = "my_page.html";

        return true;
    
    } else {

        return false;

    }

}
