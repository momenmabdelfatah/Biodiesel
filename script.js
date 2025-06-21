document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  const duration = 6000; // Total duration in ms (15 seconds)

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const frameRate = 30; // update every 30ms (~33fps)
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

  // Trigger when card scrolls into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.counter');
        if (counter) animateCounter(counter);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });
});
