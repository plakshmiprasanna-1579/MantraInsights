const API_URL = "http://localhost:5000/api";


// Update cart count

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const count =
        cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent = count;

    }

}


updateCartCount();


// Add to cart

function addToCart(product) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const existing =
        cart.find(item => item.id === product.id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert("Product added to cart 🛒");

}