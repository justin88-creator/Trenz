 // Simple fade animation on scroll

const cards = document.querySelectorAll('.service-card, .step');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

    if(entry.isIntersecting){
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

  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";

  setTimeout(() => {
    card.style.transition = "0.6s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, index * 200);

});



const pcards = document.querySelectorAll(".pcard");

pcards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});


