// Mobile nav toggle
const menu = document.querySelector("#menu");
const nav = document.querySelector(".links");
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    nav.classList.toggle('active');
};

// Formspree contact form submission
window.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const data = new FormData(form);
        const action = form.action;

        fetch(action, {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                document.getElementById("contact-form").reset();
                document.getElementById("form-status").innerHTML = "✅ Message sent! Thank you.";
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        document.getElementById("form-status").innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        document.getElementById("form-status").innerHTML = "❌ Submission error. Please try again.";
                    }
                });
            }
        }).catch(error => {
            document.getElementById("form-status").innerHTML = "❌ Network error. Please try again.";
        });
    });
});