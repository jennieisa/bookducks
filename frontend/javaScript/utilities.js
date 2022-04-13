//Funktioner
async function getData(url, jwt) {

    let response = await axios.get(url, {

        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });

    return response.data;

}