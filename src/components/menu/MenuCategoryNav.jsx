import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  { id: 'section-base', label: 'BASE' },
  { id: 'section-main', label: 'MAIN' },
  { id: 'section-toppings', label: 'TOPPINGS' },
  { id: 'section-addons', label: 'ADD-ONS' },
  { id: 'section-pro', label: 'PRO OPTIONS' },
];

export default function MenuCategoryNav() {
  const [activeCategory, setActiveCategory] = useState('section-base');

  const scrollToSection = (id) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 130; // Offset for header + sticky nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = CATEGORIES.length - 1; i >= 0; i--) {
        const section = document.getElementById(CATEGORIES[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveCategory(CATEGORIES[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="menu-cat-nav-wrapper" aria-label="Menu category navigation">
      <div className="container menu-cat-nav-container">
        <div className="menu-cat-nav-track">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`menu-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => scrollToSection(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
