const trackingForm =
    document.getElementById(
        "tracking-form"
    );


trackingForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const orderId =
            document.getElementById(
                "order-id"
            ).value;


        const result =
            document.getElementById(
                "tracking-result"
            );


        if (!orderId) {

            result.innerHTML =
                "<p>Please enter an Order ID.</p>";

            return;

        }


        /*
         * Later this can connect
         * directly to backend/database.
         */


        result.innerHTML = `

            <div class="glass"
                style="padding:25px">

                <h2>
                    Order Found ✅
                </h2>

                <br>

                <p>
                    Order ID:
                    <strong>${orderId}</strong>
                </p>

                <br>

                <p>
                    Status:
                    <strong>Order Placed</strong>
                </p>

                <br>

                <p>
                    Your order is being processed.
                </p>

            </div>

        `;

    }
);