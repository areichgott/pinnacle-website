// Pinnacle Process Consulting — site behavior

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form Zoho CRM Web-to-Lead submission handler
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      
      // Basic validation check before replacing UI
      if(!form.checkValidity()) {
        return; // Let the browser show native validation errors (e.g. "Please fill out this field")
      }

      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Append the SMS consent into the Description field so Zoho records it
      const msgField = document.getElementById("message");
      const smsCheckbox = document.getElementById("sms_consent");
      if (msgField && smsCheckbox && smsCheckbox.checked) {
          msgField.value = msgField.value + "\n\n[SMS Consent: YES]";
      }

      // The form naturally submits via POST to the hidden iframe.
      // We use a short timeout to fade the form out and show the success message.
      setTimeout(() => {
        form.classList.add("submitted");
      }, 600);
    });
  }
});