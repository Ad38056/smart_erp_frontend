const token = getToken();

let products = [];

function addProduct() {
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value.trim();
    const price = Number(document.getElementById("productPrice").value);
    const stock = Number(document.getElementById("productStock").value);

    if (!name || Number.isNaN(price) || Number.isNaN(stock)) {
        alert("Please enter a valid product name, price, and stock.");
        return;
    }

    products.push({
        name,
        category,
        price,
        stock,
    });

    document.getElementById("productName").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productStock").value = "";

    displayProducts();
}

function displayProducts() {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach((product) => {
        container.innerHTML += `
<div class="product-card">
    <h3>${product.name}</h3>
    <p>Category: ${product.category || ""}</p>
    <p>Price: $${product.price}</p>
    <p>Stock: ${product.stock}</p>
</div>
`;
    });
}

async function loadProducts() {
    try {
        const response = await fetch("http://localhost:5000/api/products", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const apiProducts = await response.json();
        products = Array.isArray(apiProducts) ? apiProducts : [];
        displayProducts();
    } catch (error) {
        console.error("Unable to load products:", error);
        products = [];
        displayProducts();
    }
}

loadProducts();
