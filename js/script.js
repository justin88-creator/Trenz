// Simple fade animation on scroll

const cards = document.querySelectorAll('.service-card, .step');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

cards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(40px)';
  card.style.transition = '0.6s ease';

  observer.observe(card);
});

/* OPTIONAL ANIMATION */

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';

  setTimeout(() => {
    card.style.transition = '0.6s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, index * 200);
});

const pcards = document.querySelectorAll('.pcard');

pcards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    navToggle.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      navToggle.classList.remove('open');
    });
  });
}

// Booking popup: open Google scheduling in a centered, size-adaptive window
(function () {
  const scheduleUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0Fxm0eapXW-3fo-GP2flY31mLX8Tf4bcH0gMX6XCR1qaKrTyUXWaJDHcn1CdYIArsfe4TtRG3Y?gv=true';

  function openBookingPopup(e) {
    if (e) e.preventDefault();

    const w = Math.min(1000, Math.round(window.innerWidth * 0.9));
    const h = Math.min(800, Math.round(window.innerHeight * 0.9));
    const left = Math.round((window.screen.width - w) / 2);
    const top = Math.round((window.screen.height - h) / 2);
    const features = `scrollbars=yes,resizable=yes,toolbar=no,menubar=no,status=no,width=${w},height=${h},left=${left},top=${top}`;

    window.open(scheduleUrl, 'calendarBooking', features);
  }

  document.addEventListener('click', function (e) {
    const btn = e.target.closest && e.target.closest('#bookingBtn');
    if (btn) {
      openBookingPopup(e);
    }
  });
})();

// for payment code
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');

if (btn1) btn1.addEventListener('click', () => payNow(5500000));
if (btn2) btn2.addEventListener('click', () => payNow(7500000));
if (btn3) btn3.addEventListener('click', () => payNow(30000000));
if (btn4) btn4.addEventListener('click', () => payNow(30000000));
if (btn5) btn5.addEventListener('click', () => payNow(5500000));
if (btn6) btn6.addEventListener('click', () => payNow(65000000));

function payNow(amount) {

  const email = prompt('Enter email:');

  if (!email) {
    return;
  }

  alert('Opening Paystack');

  let handler = PaystackPop.setup({
    key: 'pk_test_d45a93ab08c13a816151fa93b201a8af03294932',
    email: email,
    amount: amount,
    currency: 'NGN',
    ref: 'REF_' + Date.now(),
    callback: function (response) {
      verifyPayment(response.reference);
    },
    onClose: function () {
      alert('Payment closed');
    }
  });

  handler.openIframe();

}



async function verifyPayment(reference) {
  try {
    const res = await fetch(`/api/verify-payment?reference=${reference}`);
    const data = await res.json();

    if (data.paymentStatus === 'success') {
      alert('Payment verified!');
      window.location.href = 'success.html';
    } else {
      alert('Payment verification failed');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
  }

}
