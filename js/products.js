const token = getToken();


async function loadProducts() {


    const response = await fetch(
        "http://localhost:5000/api/products",
        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });


    const products =
        await response.json();



    const container =
        document.getElementById("products");



    products.forEach(product => {


        container.innerHTML += `

<div class="product-card">

<h3>${product.name}</h3>

<p>
Category: ${product.category || ""}
</p>

<p>
Price: $${product.price}
</p>

<p>
Stock: ${product.stock}
</p>

</div>

`;

    });


}


loadProducts();