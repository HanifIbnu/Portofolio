// Add form success messages to dictionaries dynamically
if (typeof translations !== 'undefined') {
  translations.id.form_success = "Pesan Anda telah dikirim! Terima kasih.";
  translations.ja.form_success = "メッセージが送信されました！ありがとうございます。";
  translations.id.form_validation_error = "Harap isi semua kolom formulir.";
  translations.ja.form_validation_error = "すべての項目を入力してください。";
}

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     1. Theme Switching (Light/Dark Mode)
     ========================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      themeIcon.textContent = 'light_mode';
      themeIcon.setAttribute('data-icon', 'light_mode');
    } else {
      themeIcon.textContent = 'dark_mode';
      themeIcon.setAttribute('data-icon', 'dark_mode');
    }
  }

  // Toggle theme click listener
  if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Initialize theme on load
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  setTheme(initialTheme);


  /* ==========================================
     2. Language Switching (ID / JA)
     ========================================== */
  const langBtn = document.getElementById('lang-btn');
  const langBtnText = document.getElementById('lang-btn-text');

  function setLanguagePreference(lang) {
    localStorage.setItem('lang', lang);
    if (langBtnText) {
      langBtnText.textContent = lang.toUpperCase();
    }
    if (typeof updateLanguage === 'function') {
      updateLanguage(lang);
    }
  }

  // Language switcher click listener
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const currentLang = localStorage.getItem('lang') || 'id';
      const newLang = currentLang === 'id' ? 'ja' : 'id';
      setLanguagePreference(newLang);
    });
  }

  // Initialize language on load
  const savedLang = localStorage.getItem('lang') || 'id';
  setLanguagePreference(savedLang);


  /* ==========================================
     3. Active Scroll Navigation Highlight
     ========================================== */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });


  /* ==========================================
     4. Projects Filter Logic
     ========================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ==========================================
     5. Contact Form Submission
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('form-name-input').value.trim();
      const emailVal = document.getElementById('form-email-input').value.trim();
      const messageVal = document.getElementById('form-message-input').value.trim();
      const currentLang = localStorage.getItem('lang') || 'id';

      if (!nameVal || !emailVal || !messageVal) {
        const errorMsg = (typeof translations !== 'undefined' && translations[currentLang]?.form_validation_error) 
          || "Harap isi semua kolom formulir.";
        alert(errorMsg);
        return;
      }

      // Simulate successful API submission
      const successMsg = (typeof translations !== 'undefined' && translations[currentLang]?.form_success)
        || "Pesan Anda telah berhasil dikirim! Terima kasih.";
      
      alert(successMsg);
      contactForm.reset();
    });
  }
});
