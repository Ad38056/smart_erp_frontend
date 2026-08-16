let orders = [

    {
        id: 1,
        customer: "Aderajew",
        amount: 500
    },

    {
        id: 2,
        customer: "Abebe",
        amount: 900
    }

];

function addOrder() {

    const customer = document.getElementById("orderCustomer").value.trim();
    const amount = Number(document.getElementById("orderAmount").value);

    if (!customer || Number.isNaN(amount)) {
        alert("Please enter a valid customer name and amount.");
        return;
    }

    orders.push({
        id: orders.length + 1,
        customer,
        amount,
    });

    document.getElementById("orderCustomer").value = "";
    document.getElementById("orderAmount").value = "";

    displayOrders();
}

function displayOrders() {

    const ordersBox = document.getElementById("orders");
    ordersBox.innerHTML = "";

    orders.forEach(order => {
        ordersBox.innerHTML += `

<div class="product-card">

<h3>
Order #${order.id}
</h3>

<p>
Customer: ${order.customer}
</p>

<p>
Amount: $${order.amount}
</p>

</div>

`;
    });
}

displayOrders();