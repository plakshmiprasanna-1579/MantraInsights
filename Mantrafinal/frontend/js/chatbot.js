function toggleChat() {

    const chatbot =
        document.getElementById(
            "chatbot"
        );


    if (
        chatbot.style.display ===
        "flex"
    ) {

        chatbot.style.display =
            "none";

    } else {

        chatbot.style.display =
            "flex";

    }

}


async function sendMessage() {

    const input =
        document.getElementById(
            "chat-input"
        );


    const message =
        input.value.trim();


    if (!message) return;


    const messages =
        document.getElementById(
            "chat-messages"
        );


    messages.innerHTML += `

        <div class="user-message">
            ${message}
        </div>

    `;


    input.value = "";


    try {

        /*
         * Replace with your
         * n8n chatbot webhook.
         */

        const response =
            await fetch(
                "YOUR_N8N_CHATBOT_WEBHOOK_URL",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        message: message

                    })

                }
            );


        const data =
            await response.json();


        messages.innerHTML += `

            <div class="bot-message">

                ${
                    data.output ||
                    data.message ||
                    "I'm here to help!"
                }

            </div>

        `;


    } catch (error) {

        messages.innerHTML += `

            <div class="bot-message">

                Sorry, I couldn't connect
                right now.

            </div>

        `;

    }


    messages.scrollTop =
        messages.scrollHeight;

}