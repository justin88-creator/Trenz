/* ========== SCROLL ANIMATION ========== */
/* Animates cards into view using Intersection Observer API */
/* Cards fade in and slide up when scrolled into viewport */

// Select all service and process step cards for animation
const cards = document.querySelectorAll('.service-card, .step');

// Create intersection observer to detect when elements enter viewport
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // When card enters viewport, set opacity to 1 and reset transform
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

// Initialize each card with hidden state and set up observer
cards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(40px)';
  card.style.transition = '0.6s ease';

  observer.observe(card);
});

/* ========== PRICING CARD ANIMATION (OPTIONAL) ========== */
/* Staggered animation for pricing cards on page load */

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';

  // Stagger animation with delay based on index
  setTimeout(() => {
    card.style.transition = '0.6s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, index * 200);
});

/* ========== PRICING CARD CLICK HANDLER ========== */
/* Toggle active state on pricing cards */

const pcards = document.querySelectorAll('.pcard');

pcards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

/* ========== MOBILE NAVIGATION TOGGLE ========== */
/* Handle hamburger menu open/close on mobile devices */

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  // Toggle menu visibility and hamburger animation
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    navToggle.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      navToggle.classList.remove('open');
    });
  });
}

/* ========== GOOGLE CALENDAR BOOKING POPUP ========== */
/* Opens Google Calendar appointment scheduling in a centered popup window */
/* Window size adapts to available screen space */

(function () {
  // Google Calendar scheduling URL - replace with your calendar link
  const scheduleUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0Fxm0eapXW-3fo-GP2flY31mLX8Tf4bcH0gMX6XCR1qaKrTyUXWaJDHcn1CdYIArsfe4TtRG3Y?gv=true';

  // Function to open popup with responsive sizing
  function openBookingPopup(e) {
    if (e) e.preventDefault();

    // Calculate responsive popup dimensions
    const w = Math.min(1000, Math.round(window.innerWidth * 0.9));
    const h = Math.min(800, Math.round(window.innerHeight * 0.9));
    const left = Math.round((window.screen.width - w) / 2);
    const top = Math.round((window.screen.height - h) / 2);
    const features = `scrollbars=yes,resizable=yes,toolbar=no,menubar=no,status=no,width=${w},height=${h},left=${left},top=${top}`;

    window.open(scheduleUrl, 'calendarBooking', features);
  }

  // Event delegation: listen for clicks on booking button
  document.addEventListener('click', function (e) {
    const btn = e.target.closest && e.target.closest('#bookingBtn');
    if (btn) {
      openBookingPopup(e);
    }
  });
})();

/* ========== PAYMENT PROCESSING ========== */
/* Handles email validation and Paystack payment gateway integration */
/* Email is required before any payment can be initiated */

// Get email input element
const emailInput = document.getElementById('email');

// Get all price button elements (btn1-btn6)
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');

/* Clear email validation error state */
/* Removes invalid class and clears error message from input */
function clearEmailError() {
  if (!emailInput) return;
  emailInput.classList.remove('invalid');
  if (emailInput.value === '⚠ please Enter email') {
    emailInput.value = '';
  }
}

// Event listeners to clear error when user interacts with email field
if (emailInput) {
  emailInput.addEventListener('focus', clearEmailError);
  emailInput.addEventListener('input', () => {
    emailInput.classList.remove('invalid');
  });
}

/* ========== PRICE BUTTON CLICK HANDLERS ========== */
/* Attach payment amount to each price button */
/* Amounts in kobo (100 kobo = 1 NGN) */

if (btn1) btn1.addEventListener('click', () => payNow(5500000));  // 55,000 NGN
if (btn2) btn2.addEventListener('click', () => payNow(7500000));  // 75,000 NGN
if (btn3) btn3.addEventListener('click', () => payNow(30000000)); // 300,000 NGN
if (btn4) btn4.addEventListener('click', () => payNow(30000000)); // 300,000 NGN
if (btn5) btn5.addEventListener('click', () => payNow(5500000));  // 55,000 NGN
if (btn6) btn6.addEventListener('click', () => payNow(65000000)); // 650,000 NGN

/* Payment function - validates email and initiates Paystack payment */
/* - Validates email is not empty
   - Shows error state if email missing
   - Scrolls to email field on validation failure
   - Initializes Paystack payment if validation passes */
function payNow(amount) {
  const email = emailInput ? emailInput.value.trim() : '';

  // Validate email is not empty
  if (!email || email === '⚠ please Enter email') {
    if (emailInput) {
      // Add invalid state styling
      emailInput.classList.add('invalid');
      // Set error message as placeholder
      emailInput.value = '⚠ please Enter email';
      // Scroll to email field smoothly
      emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus on input for better UX
      emailInput.focus();
    }
    return;
  }

  alert('Opening Paystack');

  // Initialize Paystack payment handler
  let handler = PaystackPop.setup({
    key: 'pk_test_d45a93ab08c13a816151fa93b201a8af03294932', // Paystack test public key
    email: email,                                               // Customer email address
    amount: amount,                                             // Amount in kobo
    currency: 'NGN',                                            // Nigerian Naira
    ref: 'REF_' + Date.now(),                                   // Unique reference for transaction
    callback: function (response) {
      // Handle successful payment - verify on backend
      verifyPayment(response.reference);
    },
    onClose: function () {
      // User closed payment modal without completing
      alert('Payment closed');
    }
  });

  // Open Paystack payment modal
  handler.openIframe();
}

/* Verify payment with backend */
/* Calls API endpoint to confirm payment status with Paystack */
/* Redirects to success page if payment verified */
async function verifyPayment(reference) {
  try {
    // Fetch payment verification from backend API
    const res = await fetch(`/api/verify-payment?reference=${reference}`);
    const data = await res.json();

    // Check if payment was successful
    if (data.paymentStatus === 'success') {
      alert('Payment verified!');
      // Redirect to success page
      window.location.href = 'success.html';
    } else {
      alert('Payment verification failed');
    }
  } catch (error) {
    // Handle network or server errors
    console.error(error);
    alert('Something went wrong');
  }
}
