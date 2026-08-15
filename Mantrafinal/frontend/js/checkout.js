const form =
    document.getElementById(
        "checkout-form"
    );


function loadCheckout() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const container =
        document.getElementById(
            "checkout-items"
        );


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;


        container.innerHTML += `

            <p>
                ${item.name}
                × ${item.quantity}
                — ₹${item.price * item.quantity}
            </p>

        `;

    });


    document.getElementById(
        "checkout-total"
    ).textContent = total;

}


loadCheckout();


form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        const orderData = {

            customer: {

                name:
                    document.getElementById(
                        "name"
                    ).value,

                email:
                    document.getElementById(
                        "email"
                    ).value,

                phone:
                    document.getElementById(
                        "phone"
                    ).value,

                address:
                    document.getElementById(
                        "address"
                    ).value,

                city:
                    document.getElementById(
                        "city"
                    ).value

            },


            payment:
                document.getElementById(
                    "payment"
                ).value,


            products: cart,


            orderDate:
                new Date().toISOString()

        };


        try {

            /*
             * Replace this URL with
             * your n8n webhook URL.
             */

            const response =
                await fetch(
                    "YOUR_N8N_ORDER_WEBHOOK_URL",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                orderData
                            )

                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Order failed"
                );

            }


            const orderId =
                "SC-" +
                Date.now();


            localStorage.removeItem(
                "cart"
            );


            alert(
                "Order placed successfully! 🎉\n\nOrder ID: "
                + orderId
            );


            window.location.href =
                "track-order.html?order=" +
                orderId;


        } catch (error) {

            console.error(error);

            alert(
                "Unable to place order. Please try again."
            );

        }

    }
);