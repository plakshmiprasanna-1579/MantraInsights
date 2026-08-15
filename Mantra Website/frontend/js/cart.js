function loadCart() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const container =
        document.getElementById(
            "cart-container"
        );


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="glass"
                style="padding:50px;text-align:center">

                <h2>Your cart is empty 🛒</h2>

                <br>

                <a
                    href="products.html"
                    class="primary-btn">

                    Browse Products

                </a>

            </div>

        `;

        return;

    }


    let total = 0;


    container.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        container.innerHTML += `

        <div class="cart-item glass">

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div style="flex:1">

                <h3>${item.name}</h3>

                <p>
                    ₹${item.price}
                </p>

                <p>
                    Quantity:
                    ${item.quantity}
                </p>

            </div>

            <button
                class="secondary-btn"
                onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });


    container.innerHTML += `

        <div class="cart-total glass">

            <h2>
                Total: ₹${total}
            </h2>

            <br>

            <a
                href="checkout.html"
                class="primary-btn">

                Proceed to Checkout

            </a>

        </div>

    `;

}


function removeItem(index) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

    updateCartCount();

}


loadCart();