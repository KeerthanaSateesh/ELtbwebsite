import React, { useState } from 'react';
import { MENU_DATA } from '../../data/menuData';

const TOPPING_ICONS = {
  'top-cilantro-lime-rice': '🍚',
  'top-mexican-rice': '🍛',
  'top-pinto-beans': '🫘',
  'top-black-beans': '🫘',
  'top-tomato-salsa': '🍅',
  'top-corn-salsa': '🌽',
  'top-sour-cream': '🥛',
  'top-cheese': '🧀',
  'top-lettuce': '🥬',
  'top-jalapenos': '🌶️'
};

export default function ToppingsSection() {
  const [selectedToppings, setSelectedToppings] = useState([
    'top-cilantro-lime-rice',
    'top-black-beans',
    'top-tomato-salsa',
    'top-cheese'
  ]);

  const toggleTopping = (id) => {
    if (selectedToppings.includes(id)) {
      setSelectedToppings(selectedToppings.filter(item => item !== id));
    } else {
      setSelectedToppings([...selectedToppings, id]);
    }
  };

  return (
    <section id="section-toppings" className="menu-section toppings-section">
      <div className="section-header">
        <span className="section-tag">Step 3</span>
        <h2 className="section-title">Choose Your Toppings</h2>
        <p className="section-subtitle">
          Layer your meal with our freshly made salsas, cheeses, beans, and hand-diced greens. Included with your base.
        </p>
      </div>

      <div className="toppings-chips-grid">
        {MENU_DATA.toppings.map((topping) => {
          const isSelected = selectedToppings.includes(topping.id);
          return (
            <button
              key={topping.id}
              type="button"
              className={`topping-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleTopping(topping.id)}
              aria-pressed={isSelected}
            >
              <span className="topping-icon">{TOPPING_ICONS[topping.id] || '✨'}</span>
              <span className="topping-name">{topping.name}</span>
              <span className="topping-check">{isSelected ? '✓' : '+'}</span>
            </button>
          );
        })}
      </div>

      <div className="toppings-note">
        <span>💡 Tap toppings to customize your bowl, taco, or burrito combinations</span>
      </div>
    </section>
  );
}
