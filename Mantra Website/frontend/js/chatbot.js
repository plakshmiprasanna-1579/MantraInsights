function toggleChat() {

    const chatbot =
        document.getElementById("chatbot");

    if (chatbot.style.display === "flex") {
        chatbot.style.display = "none";
    } else {
        chatbot.style.display = "flex";
    }
}

async function sendMessage() {

    const input =
        document.getElementById("chat-input");

    const message =
        input.value.trim();

    if (!message) return;

    const messages =
        document.getElementById("chat-messages");

    // User message
    messages.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value = "";

    messages.scrollTop =
        messages.scrollHeight;

    try {

        const response = await fetch(
            "https://prassu12345.app.n8n.cloud/webhook/3209341f-93c7-4075-969b-cd6996de1f45/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data = await response.json();

        console.log("N8N Response:", data);

        messages.innerHTML += `
            <div class="bot-message">
                ${
                    data.output ||
                    data.response ||
                    data.message ||
                    JSON.stringify(data)
                }
            </div>
        `;

    } catch (error) {

        console.error(error);

        messages.innerHTML += `
            <div class="bot-message">
                ❌ Unable to connect to AI Assistant.
            </div>
        `;
    }

    messages.scrollTop =
        messages.scrollHeight;
}

// Enter key support
document.addEventListener(
    "DOMContentLoaded",
    () => {

        const input =
            document.getElementById("chat-input");

        if (input) {

            input.addEventListener(
                "keypress",
                function (e) {

                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }
            );
        }
    }
);