const API_URL = "http://localhost:5000/api";


// General API Request Function
async function apiRequest(endpoint, method = "GET", data = null) {

    const token = localStorage.getItem("token");


    const options = {

        method: method,

        headers: {

            "Content-Type": "application/json"

        }

    };


    // Add JWT token if user logged in
    if (token) {

        options.headers.Authorization = `Bearer ${token}`;

    }


    // Add body for POST/PUT
    if (data) {

        options.body = JSON.stringify(data);

    }


    try {

        const response = await fetch(
            `${API_URL}${endpoint}`,
            options
        );


        const result = await response.json();


        return result;


    } catch (error) {

        console.error(
            "API Error:",
            error
        );


        return {

            message: "Server connection failed"

        };

    }

}



// Authentication APIs

async function loginUser(email, password) {

    return await apiRequest(
        "/auth/login",
        "POST",
        {
            email,
            password
        }
    );

}



async function registerUser(name, email, password) {

    return await apiRequest(
        "/auth/register",
        "POST",
        {
            name,
            email,
            password
        }
    );

}



// Product APIs

async function getProducts() {

    return await apiRequest(
        "/products",
        "GET"
    );

}



async function createProduct(product) {

    return await apiRequest(
        "/products",
        "POST",
        product
    );

}



async function updateProduct(id, product) {

    return await apiRequest(
        `/products/${id}`,
        "PUT",
        product
    );

}



async function deleteProduct(id) {

    return await apiRequest(
        `/products/${id}`,
        "DELETE"
    );

}