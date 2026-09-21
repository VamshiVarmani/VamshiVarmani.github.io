// Vamshi Electrical & Tech Services
// Booking form -> opens customer's WhatsApp with a pre-filled message to the service number.

const WHATSAPP_NUMBER = "919652099456";

const menuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});

function getFormValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
}

function handleFormSubmit(event) {
    event.preventDefault();

    const name = getFormValue("customerName");
    const phone = getFormValue("customerPhone");
    const serviceElement = document.getElementById("service");
    const service = serviceElement
        ? serviceElement.options[serviceElement.selectedIndex].text.trim()
        : "";
    const area = getFormValue("area");
    const problem = getFormValue("problem");

    if (!name || !phone || !service || !area) {
        alert("దయచేసి * గుర్తు ఉన్న అన్ని వివరాలు నమోదు చేయండి.");
        return;
    }

    const message =
`🔔 కొత్త సర్వీస్ బుకింగ్

👤 పేరు: ${name}
📞 ఫోన్: ${phone}
🛠️ సర్వీస్: ${service}
📍 ఊరు / ప్రాంతం: ${area}
📝 సమస్య వివరాలు: ${problem || "వివరాలు ఇవ్వలేదు"}

వంశీ ఎలక్ట్రికల్ & టెక్ సర్వీసెస్`;

    const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // WhatsApp opens on the customer's device with the message ready.
    // The customer must press Send; a website cannot silently send a WhatsApp message.
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    const modal = document.getElementById("successModal");
    if (modal) {
        modal.classList.remove("hidden");
    }

    const form = document.getElementById("serviceForm");
    if (form) form.reset();
}

function closeModal() {
    const modal = document.getElementById("successModal");
    if (modal) modal.classList.add("hidden");
}

window.handleFormSubmit = handleFormSubmit;
window.closeModal = closeModal;
