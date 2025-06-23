document.addEventListener('DOMContentLoaded', () => {
  // Counter animation on scroll
  const counters = document.querySelectorAll('.counter');
  const duration = 6000;
  const frameRate = 30;

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / (duration / frameRate);

    const updateCounter = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.floor(count).toLocaleString();
        setTimeout(updateCounter, frameRate);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    updateCounter();
  };

  // Observe cards to trigger counter animation when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.counter');
        if (counter) animateCounter(counter);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.card').forEach(card => observer.observe(card));

  // Sidebar navigation active state toggle
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
});
