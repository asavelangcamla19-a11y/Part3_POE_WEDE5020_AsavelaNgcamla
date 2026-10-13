/**
 * validation.js - Form validation for Marine Eco System website (Contact Us & Enquiry pages)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Validate Contact Us Form (ContactUS.html)
    const contactForm = document.querySelector('form.enquiry-form');
    if (contactForm && document.getElementById('interest')) { // Checks if unique contact field '#interest' exists
        contactForm.addEventListener('submit', function (e) {
            const fullname = document.getElementById('fullname');
            const contactnum = document.getElementById('contactnum');
            const email = document.getElementById('email');
            const interest = document.getElementById('interest');
            const location = document.getElementById('location');
            const enquiryType = document.getElementById('enquiry_type');

            let isValid = true;
            let errorMessage = '';

            // Full Name check
            if (fullname && fullname.value.trim() === '') {
                isValid = false;
                errorMessage += '- Please enter your full name.\n';
            }

            // Contact Number check (South African format or general digits)
            if (contactnum) {
                const phoneRegex = /^[\d\s\+\-\(\)]{10,15}$/;
                if (!phoneRegex.test(contactnum.value.trim())) {
                    isValid = false;
                    errorMessage += '- Please enter a valid contact number (10-15 digits).\n';
                }
            }

            // Email check
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value.trim())) {
                    isValid = false;
                    errorMessage += '- Please enter a valid email address.\n';
                }
            }

            // Interest check
            if (interest && interest.value.trim() === '') {
                isValid = false;
                errorMessage += '- Please specify what you are looking to do.\n';
            }

            // Location select check
            if (location && (location.value === '' || location.value === null)) {
                isValid = false;
                errorMessage += '- Please select a location.\n';
            }

            // Enquiry Type select check
            if (enquiryType && (enquiryType.value === '' || enquiryType.value === null)) {
                isValid = false;
                errorMessage += '- Please select a type of enquiry.\n';
            }

            if (!isValid) {
                e.preventDefault(); // Stop submission to show alerts
                alert('Please correct the following errors:\n\n' + errorMessage);
            } else {
                e.preventDefault(); // Prevent reload for UI preview testing
                alert('Thank you! Your message has been successfully sent.');
                contactForm.reset();
            }
        });
    }

    // 2. Validate Enquiry Form (Enquiry.html)
    const enquiryMainForm = document.querySelector('main.form-container form');
    if (enquiryMainForm && document.getElementById('category')) { // Checks if unique enquiry field '#category' exists
        enquiryMainForm.addEventListener('submit', function (e) {
            const fullname = document.getElementById('fullname');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const category = document.getElementById('category');

            let isValid = true;
            let errorMessage = '';

            if (fullname && fullname.value.trim() === '') {
                isValid = false;
                errorMessage += '- Full name is required.\n';
            }

            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value.trim())) {
                    isValid = false;
                    errorMessage += '- A valid email address is required.\n';
                }
            }

            if (phone && phone.value.trim() === '') {
                isValid = false;
                errorMessage += '- Phone number is required.\n';
            }

            if (category && (category.value === '' || category.value === null)) {
                isValid = false;
                errorMessage += '- Please select an enquiry category.\n';
            }

            if (!isValid) {
                e.preventDefault();
                alert('Please check your input:\n\n' + errorMessage);
            } else {
                e.preventDefault(); // Prevent reload for UI preview testing
                alert('Your enquiry has been submitted successfully!');
                enquiryMainForm.reset();
            }
        });
    }
});