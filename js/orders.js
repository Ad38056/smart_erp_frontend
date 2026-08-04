const orders=[

{
id:1,
customer:"Aderajew",
amount:500
},

{
id:2,
customer:"Abebe",
amount:900
}

];


const ordersBox =
document.getElementById("orders");


orders.forEach(order=>{


ordersBox.innerHTML +=`

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