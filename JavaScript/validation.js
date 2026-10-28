document.addEventListener("DOMContentLoaded", function () {
    // Target forms on enquiry.html and contactus.html (excluding newsletter forms)
    const form = document.querySelector(".form-container form, .contact-form-col form");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop standard form submission
        let isValid = true;

        clearErrors();

        // 1. Validate Full Name
        const nameInput = form.querySelector('#fullname, input[name="fullname"]');
        if (nameInput && nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your full name.");
            isValid = false;
        }

        // 2. Validate Phone Number (supports 10-15 digits, spaces, or plus sign)
        const phoneInput = form.querySelector('#phone, #contactnum, input[name="phone"], input[name="contactnum"]');
        if (phoneInput) {
            const phoneVal = phoneInput.value.trim();
            const phoneRegex = /^[\+\d\s\-\(\)]{10,15}$/;
            if (!phoneRegex.test(phoneVal)) {
                showError(phoneInput, "Please enter a valid contact number (10-15 digits).");
                isValid = false;
            }
        }

        // 3. Validate Email Address
        const emailInput = form.querySelector('#email, input[name="email"]');
        if (emailInput) {
            const emailVal = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                showError(emailInput, "Please enter a valid email address.");
                isValid = false;
            }
        }

        // 4. Validate Select Dropdowns (if present)
        const selects = form.querySelectorAll("select[required]");
        selects.forEach(select => {
            if (select.value === "" || select.value.toLowerCase().includes("select")) {
                showError(select, "Please make a valid selection.");
                isValid = false;
            }
        });

        // 5. If validation passes, trigger EmailJS
        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            // Use EmailJS sendForm method
            // NOTE: Replace "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your actual IDs from your EmailJS dashboard
            emailjs.sendForm('service_58jop1p', 'template_ttr9xe8', form)
                .then(function() {
                    alert("Thank you! Your message has been sent successfully.");
                    form.reset();
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, function(error) {
                    alert("Failed to send message. Please try again later. Error: " + JSON.stringify(error));
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        }
    });

    function showError(inputElement, message) {
        let errorSpan = inputElement.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("small");
            errorSpan.className = "error-message";
            errorSpan.style.color = "#d9534f";
            errorSpan.style.display = "block";
            errorSpan.style.marginTop = "4px";
            inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
        }
        errorSpan.textContent = message;
        inputElement.style.borderColor = "#d9534f";
    }

    function clearErrors() {
        const errorSpans = document.querySelectorAll(".error-message");
        errorSpans.forEach(span => span.remove());

        const inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach(input => {
            input.style.borderColor = "";
        });
    }
});