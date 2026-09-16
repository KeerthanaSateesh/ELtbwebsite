import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pooriImage from '../../assets/images/food/poori.jpg';
import './MenuTypeToggle.css';

export default function MenuTypeToggle() {
  const [selectedType, setSelectedType] = useState('tacos-burritos');
  const navigate = useNavigate();

  const handleSelect = (type) => {
    if (type === 'tacos-burritos') {
      setSelectedType('tacos-burritos');
      // Remain on Home page without navigating away
    } else if (type === 'tiffins') {
      setSelectedType('tiffins');
      // Navigate immediately to the Tiffins menu
      navigate('/menu?type=tiffins');
    }
  };

  return (
    <div className="home-menu-toggle-wrapper">
      <div className="container home-menu-toggle-container">
        <span className="home-menu-toggle-label">What would you like?</span>

        <div className="home-segmented-control" role="group" aria-label="Menu experience selection">
          {/* Left: Tacos & Burritos (Default Active) */}
          <button
            type="button"
            className={`segmented-btn ${selectedType === 'tacos-burritos' ? 'active' : ''}`}
            onClick={() => handleSelect('tacos-burritos')}
            aria-pressed={selectedType === 'tacos-burritos'}
          >
            <span className="segmented-emoji">🌮</span>
            <span className="segmented-text">Tacos &amp; Burritos</span>
          </button>

          {/* Right: Tiffins / Breakfast with Poori image */}
          <button
            type="button"
            className={`segmented-btn ${selectedType === 'tiffins' ? 'active' : ''}`}
            onClick={() => handleSelect('tiffins')}
            aria-pressed={selectedType === 'tiffins'}
          >
            <img
              src={pooriImage}
              alt="Crispy golden Poori"
              className="toggle-poori-thumbnail"
            />
            <span className="segmented-text">Tiffins / Breakfast</span>
            <span className="segmented-sub-badge">7–11 AM &bull; 7–11 PM</span>
          </button>
        </div>
      </div>
    </div>
  );
}
