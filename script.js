let chatStep = 0;

let bookingData = {
    pickup: "",
    destination: "",
    date: "",
    service: "",
    passengers: "",
    name: "",
    phone: ""
};


/* =========================
   OPEN CHAT
========================= */

function openChat() {

    const chatBox = document.getElementById("chatBox");

    if (!chatBox) return;

    chatBox.style.display = "block";

    const input = document.getElementById("chatInput");

    if (input) {
        setTimeout(() => {
            input.focus();
        }, 200);
    }
}


/* =========================
   CLOSE CHAT
========================= */

function closeChat() {

    const chatBox = document.getElementById("chatBox");

    if (!chatBox) return;

    chatBox.style.display = "none";
}


/* =========================
   ENTER KEY
========================= */

function handleEnter(event) {

    if (event.key === "Enter") {
        sendMessage();
    }
}


/* =========================
   ADD MESSAGE
========================= */

function addMessage(message, type) {

    const messages =
        document.getElementById("chatMessages");

    if (!messages) return;

    const messageElement =
        document.createElement("div");

    if (type === "user") {

        messageElement.className =
            "user-message";

    } else {

        messageElement.className =
            "bot-message";
    }

    messageElement.innerHTML = message;

    messages.appendChild(messageElement);

    messages.scrollTop =
        messages.scrollHeight;
}


/* =========================
   BOT REPLY
========================= */

function botReply(message, delay = 600) {

    setTimeout(() => {

        addMessage(message, "bot");

    }, delay);
}


/* =========================
   SEND MESSAGE
========================= */

function sendMessage() {

    const input =
        document.getElementById("chatInput");

    if (!input) return;

    const message =
        input.value.trim();

    if (message === "") return;

    addMessage(message, "user");

    input.value = "";

    processConversation(message);
}


/* =========================
   PROCESS CONVERSATION
========================= */

function processConversation(message) {

    const cleanMessage =
        message.toLowerCase().trim();


    /* =====================
       STEP 0
       PICKUP
    ===================== */

    if (chatStep === 0) {

        bookingData.pickup = message;

        chatStep = 1;

        botReply(
            "Great! 👍<br><br>" +
            "Where would you like to go? " +
            "Please enter your <strong>destination</strong>."
        );

        return;
    }


    /* =====================
       STEP 1
       DESTINATION
    ===================== */

    if (chatStep === 1) {

        bookingData.destination = message;

        chatStep = 2;

        botReply(
            "Perfect. 📍<br><br>" +
            "What <strong>date</strong> do you need the transportation?"
        );

        return;
    }


    /* =====================
       STEP 2
       DATE
    ===================== */

    if (chatStep === 2) {

        bookingData.date = message;

        chatStep = 3;

        botReply(
            "Thanks! 📅<br><br>" +
            "Which service do you need?<br><br>" +

            "🚐 <strong>Passenger Transport</strong><br>" +
            "📦 <strong>Goods / Delivery</strong><br>" +
            "🚌 <strong>Custom Booking</strong>"
        );

        return;
    }


    /* =====================
       STEP 3
       SERVICE
    ===================== */

    if (chatStep === 3) {

        if (
            cleanMessage.includes("passenger") ||
            cleanMessage.includes("people") ||
            cleanMessage.includes("person") ||
            cleanMessage.includes("transport")
        ) {

            bookingData.service =
                "Passenger Transport";

        } else if (
            cleanMessage.includes("goods") ||
            cleanMessage.includes("delivery") ||
            cleanMessage.includes("cargo")
        ) {

            bookingData.service =
                "Goods / Delivery";

        } else {

            bookingData.service =
                "Custom Booking";
        }


        chatStep = 4;


        if (
            bookingData.service ===
            "Passenger Transport"
        ) {

            botReply(
                "How many <strong>passengers</strong> will be travelling?"
            );

        } else {

            botReply(
                "Please tell me briefly what you need transported or describe your booking requirements."
            );
        }

        return;
    }


    /* =====================
       STEP 4
       PASSENGERS / DETAILS
    ===================== */

    if (chatStep === 4) {

        bookingData.passengers = message;

        chatStep = 5;

        botReply(
            "Thank you! 👌<br><br>" +
            "May I have your <strong>name</strong>, please?"
        );

        return;
    }


    /* =====================
       STEP 5
       NAME
    ===================== */

    if (chatStep === 5) {

        bookingData.name = message;

        chatStep = 6;

        botReply(
            "Nice to meet you, <strong>" +
            escapeHTML(message) +
            "</strong>!<br><br>" +
            "What is the best <strong>phone / WhatsApp number</strong> for our team to contact you?"
        );

        return;
    }


    /* =====================
       STEP 6
       PHONE
    ===================== */

    if (chatStep === 6) {

        bookingData.phone = message;

        chatStep = 7;

        showBookingSummary();

        return;
    }


    /* =====================
       STEP 7
       CONFIRMATION
    ===================== */

    if (chatStep === 7) {

        if (
            cleanMessage.includes("yes") ||
            cleanMessage.includes("confirm") ||
            cleanMessage.includes("correct") ||
            cleanMessage.includes("send")
        ) {

            submitBooking();

        } else {

            botReply(
                "No problem. Please check the details above and type <strong>Confirm</strong> when everything looks correct."
            );
        }

        return;
    }
}


/* =========================
   BOOKING SUMMARY
========================= */

function showBookingSummary() {

    const summary = `

        <strong>📋 Quote Request Summary</strong>

        <br><br>

        📍 <strong>Pickup:</strong><br>
        ${escapeHTML(bookingData.pickup)}

        <br><br>

        🏁 <strong>Destination:</strong><br>
        ${escapeHTML(bookingData.destination)}

        <br><br>

        📅 <strong>Date:</strong><br>
        ${escapeHTML(bookingData.date)}

        <br><br>

        🚐 <strong>Service:</strong><br>
        ${escapeHTML(bookingData.service)}

        <br><br>

        👥 <strong>Passengers / Details:</strong><br>
        ${escapeHTML(bookingData.passengers)}

        <br><br>

        👤 <strong>Name:</strong><br>
        ${escapeHTML(bookingData.name)}

        <br><br>

        📱 <strong>Phone:</strong><br>
        ${escapeHTML(bookingData.phone)}

    `;


    botReply(
        summary,
        500
    );


    botReply(
        "Please type <strong>Confirm</strong> if all these details are correct.",
        1400
    );
}


/* =========================
   SUBMIT BOOKING
========================= */

function submitBooking() {

    chatStep = 8;


    botReply(
        "✅ <strong>Request prepared successfully!</strong>",
        400
    );


    botReply(
        "Your transportation details are ready to be sent to the Jutt Transports team.",
        1000
    );


    setTimeout(() => {

        createWhatsAppButton();

    }, 1500);
}


/* =========================
   WHATSAPP BUTTON
========================= */

function createWhatsAppButton() {

    const messages =
        document.getElementById("chatMessages");

    if (!messages) return;


    const whatsappText =

        "Hello Jutt Transports Oman,%0A%0A" +

        "I would like to request a transportation quote.%0A%0A" +

        "Pickup: " +
        encodeURIComponent(
            bookingData.pickup
        ) +

        "%0ADestination: " +
        encodeURIComponent(
            bookingData.destination
        ) +

        "%0ADate: " +
        encodeURIComponent(
            bookingData.date
        ) +

        "%0AService: " +
        encodeURIComponent(
            bookingData.service
        ) +

        "%0APassengers / Details: " +
        encodeURIComponent(
            bookingData.passengers
        ) +

        "%0AName: " +
        encodeURIComponent(
            bookingData.name
        ) +

        "%0APhone: " +
        encodeURIComponent(
            bookingData.phone
        );


    const button =
        document.createElement("a");


    button.href =
        "https://wa.me/96896979596?text=" +
        whatsappText;


    button.target = "_blank";

    button.rel = "noopener noreferrer";

    button.className =
        "whatsapp-action";


    button.innerHTML =
        "💬 Continue on WhatsApp";


    messages.appendChild(button);

    messages.scrollTop =
        messages.scrollHeight;


    botReply(
        "The WhatsApp message has been prepared with your booking information.",
        600
    );


    botReply(
        "In a production version, this can be connected to WhatsApp Business API and an automated AI system.",
        1200
    );
}


/* =========================
   QUOTE FORM
========================= */

function submitQuoteForm(event) {

    event.preventDefault();


    const pickup =
        document.getElementById("pickup");

    const destination =
        document.getElementById("destination");

    const date =
        document.getElementById("date");

    const service =
        document.getElementById("service");


    if (
        !pickup.value.trim() ||
        !destination.value.trim() ||
        !date.value.trim() ||
        !service.value.trim()
    ) {

        alert(
            "Please complete all fields."
        );

        return;
    }


    bookingData = {

        pickup: pickup.value.trim(),

        destination:
            destination.value.trim(),

        date:
            date.value.trim(),

        service:
            service.value.trim(),

        passengers: "",

        name: "",

        phone: ""
    };


    chatStep = 4;


    openChat();


    addMessage(
        "Thanks! I received your quote request from the website form. 👍",
        "bot"
    );


    botReply(
        "How many passengers will be travelling, or what items/details should we know about your booking?",
        700
    );
}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================
   INITIAL CHAT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const messages =
            document.getElementById(
                "chatMessages"
            );


        if (
            messages &&
            messages.children.length === 0
        ) {

            addMessage(
                "Hello! 👋 I'm the <strong>Jutt Transports AI Assistant</strong>.",
                "bot"
            );


            botReply(
                "I can help you with transportation services, booking details and quote requests.",
                500
            );


            botReply(
                "To request a quote, tell me your <strong>pickup location</strong>.",
                1000
            );
        }


        /* =====================
           QUOTE FORM
        ===================== */

        const quoteForm =
            document.getElementById(
                "quoteForm"
            );


        if (quoteForm) {

            quoteForm.addEventListener(
                "submit",
                submitQuoteForm
            );
        }

    }
);