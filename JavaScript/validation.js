document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        let isValid = true;

        // Clear previous error messages and styles
        clearErrors();

        // 1. Validate Full Name / First Name
        const nameInput = document.querySelector('input[name="fullName"], input[name="First name"], #fullName, #FirstName');
        if (nameInput && nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your full name.");
            isValid = false;
        }

        // 2. Validate Phone Number
        const phoneInput = document.querySelector('input[name="phone"], input[name="Phone"], #phone, #Phone');
        if (phoneInput) {
            const phoneVal = phoneInput.value.trim();
            const phoneRegex = /^\d{10,15}$/;
            if (!phoneRegex.test(phoneVal)) {
                showError(phoneInput, "Please enter a valid contact number (10-15 digits).");
                isValid = false;
            }
        }

        // 3. Validate Email Address
        const emailInput = document.querySelector('input[name="email"], input[name="Email"], #email, #Email');
        if (emailInput) {
            const emailVal = emailInput.value.trim();
            if (emailVal === "" || !emailVal.includes("@")) {
                showError(emailInput, "Please enter a valid email address.");
                isValid = false;
            }
        }

        // 4. Validate Select Dropdowns or Textareas (Location, Enquiry type, etc.)
        const selects = form.querySelectorAll("select");
        selects.forEach(select => {
            if (select.value === "" || select.value.toLowerCase().includes("select")) {
                showError(select, "Please make a valid selection.");
                isValid = false;
            }
        });

        // If validation fails, stop the form from submitting
        if (!isValid) {
            event.preventDefault();
        }
    });

    function showError(inputElement, message) {
        // Check if error span already exists right after the input
        let errorSpan = inputElement.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("small");
            errorSpan.className = "error-message";
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