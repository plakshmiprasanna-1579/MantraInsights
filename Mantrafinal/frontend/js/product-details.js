const productContainer =
document.getElementById("product-details");

const product =
JSON.parse(
localStorage.getItem("selectedProduct")
);

if(!product){

productContainer.innerHTML = `
<div class="glass" style="
padding:40px;
text-align:center;
">
<h2>Product Not Found</h2>
<a href="products.html">
Back To Products
</a>
</div>
`;

}else{

productContainer.innerHTML = `

<div class="product-details-card">

<div class="product-image-section">

<img
src="${product.image}"
alt="${product.name}"
style="
width:100%;
max-width:400px;
border-radius:20px;
"
>

</div>

<div class="product-info-section">

<span class="product-category">
${product.category}
</span>

<h1>
${product.name}
</h1>

<h2>
$${product.price}
</h2>

<p>
<strong>Product ID:</strong>
${product.id}
</p>

<p>
<strong>Stock:</strong>
${product.stock}
</p>

<div style="
display:flex;
gap:15px;
margin-top:20px;
">

<button
class="primary-btn"
onclick="addToCart()"
>
🛒 Add To Cart
</button>

<button
class="secondary-btn"
onclick="buyNow()"
>
⚡ Buy Now
</button>

</div>

</div>

</div>

`;

}

function addToCart(){

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

cart.push(product);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

alert(
product.name +
" added to cart!"
);

}

function buyNow(){

let cart = [product];

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

window.location.href =
"checkout.html";

}