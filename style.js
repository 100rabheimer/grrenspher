 // Navigation logic to show/hide sections
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('main section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-section');
      if (!target) return;

      // Update active link style
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Show target section, hide others
      sections.forEach(section => {
        if (section.id === target) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    });
  });

  // Also enable Start Calculator button from home
  document.querySelectorAll('[data-section="calculator"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('nav a[data-section="calculator"]').click();
    });
  });

  // Calculator logic
  const carbonFactors = {
    car: 0.21,
    motorbike: 0.1,
    bus: 0.09,
    train: 0.04,
    flight: 0.25,
    electricity: 0.7,
    waste: 0.5
  };

  document.getElementById('carbonForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const vehicle = e.target.vehicle.value;
    const distance = parseFloat(e.target.distance.value);
    const electricity = parseFloat(e.target.electricity.value);
    const waste = parseFloat(e.target.waste.value);

    if(!vehicle || distance < 0 || electricity < 0 || waste < 0) {
      alert('Please enter all valid inputs.');
      return;
    }

    const transportCarbon = carbonFactors[vehicle] * distance;
    const electricityCarbon = carbonFactors.electricity * electricity;
    const wasteCarbon = carbonFactors.waste * waste;

    const totalCarbon = (transportCarbon + electricityCarbon + wasteCarbon).toFixed(2);

    document.getElementById('carbonValue').textContent = totalCarbon;

    let advice = '';
    if(totalCarbon > 100) {
      advice = 'Your footprint is quite high. Please consider public transport or green energy. 🌿';
    } else if(totalCarbon > 50) {
      advice = 'Good effort! Some small changes can improve more. 💪';
    } else {
      advice = 'Excellent! You are environmentally responsible. 🌍👍';
    }

    const resultBox = document.getElementById('result');
    resultBox.style.display = 'block';
    document.getElementById('advice').textContent = advice;
  });
