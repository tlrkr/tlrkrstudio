// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('.newsletter-input');
    const email = emailInput.value;
    
    if (email) {
      alert(`Thank you for subscribing! We'll send updates to ${email}`);
      emailInput.value = '';
    }
  });
}

// Search button
const searchBtn = document.querySelector('.search-box');
if (searchBtn) {
  searchBtn.addEventListener('click', function() {
    alert('Search feature coming soon!');
  });
}

// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-in to story items
document.querySelectorAll('.story-item, .story-item-small, .reel-item, .large-story').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeInObserver.observe(item);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});
