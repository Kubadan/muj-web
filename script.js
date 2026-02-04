// ===== SMOOTH SCROLL NA # ODKAZY =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// ===== ZVÝRAZNĚNÍ AKTIVNÍHO MENU PŘI SCROLLU =====
window.addEventListener('scroll', () => {
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    const section = document.querySelector(href);
    
    if (section) {
      const rect = section.getBoundingClientRect();
      
      // Pokud je sekce viditelná (top < 150px od okna)
      if (rect.top <= 150 && rect.bottom >= 150) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ===== PORTFOLIO FILTER - FILTROVÁNÍ PROJEKTŮ PODLE KATEGORIE =====

function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Odeber .active ze všech tlačítek
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Přidej .active na kliknuté tlačítko
      button.classList.add('active');
      
      // Získej kategorii k filtrování
      const filterValue = button.getAttribute('data-filter');
      
      // Projdi všechny karty a zobraz/skryj podle kategorie
      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          // Zobraz kartu
          card.style.display = 'block';
          
          // Přidej animaci
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
          
        } else {
          // Skryj kartu s animací
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Spusť filtr když je stránka načtena
document.addEventListener('DOMContentLoaded', initPortfolioFilter);
// Modal pro detail projektu
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');

// Kliknutí na kartu otevře modal
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('click', () => {
    // Získej data z karty
    const img = card.querySelector('img').src;
    const title = card.querySelector('.portfolio-title').textContent;
    const description = card.querySelector('.portfolio-description').textContent;
    
    // Naplň modal
    document.getElementById('modal-image').src = img;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    
    // Zobraz modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Zablokuj scroll
  });
});

// Zavření modalu
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Obnov scroll
}

// Zavři modal při ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});