const token = getToken();


if (!token) {

    window.location.href = "login.html";

}




async function loadDashboard() {


    const response = await fetch(
        "http://localhost:5000/api/products",
        {

            headers: {

                "Authorization": `Bearer ${token}`

            }

        });


    const products = await response.json();


    document.getElementById(
        "productCount"
    ).innerHTML = products.length;


}



loadDashboard();