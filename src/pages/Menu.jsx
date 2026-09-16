import React from 'react';
import { useSearchParams } from 'react-router-dom';
import MenuTypeSelector from '../components/menu/MenuTypeSelector';
import TacosBurritosMenu from '../components/menu/TacosBurritosMenu';
import TiffinHero from '../components/menu/TiffinHero';
import TiffinAvailability from '../components/menu/TiffinAvailability';
import TiffinMenu from '../components/menu/TiffinMenu';
import './Menu.css';

export default function Menu() {
  const [searchParams] = useSearchParams();
  const currentType = searchParams.get('type') || 'tacos-burritos';

  return (
    <div className="menu-page">
      {/* Dual Menu Selector Switcher (Tacos & Burritos vs Tiffins) */}
      <MenuTypeSelector />

      {currentType === 'tiffins' ? (
        /* ===================================================
           TIFFIN / BREAKFAST EXPERIENCE
           Completely isolated South Indian menu & authentic images.
           Zero Mexican content or Mexican images rendered.
           =================================================== */
        <div className="tiffin-experience-wrapper">
          {/* Dedicated South Indian Tiffin Hero Section */}
          <TiffinHero />

          {/* Real-Time Operating Hours & Availability Notice */}
          <TiffinAvailability />

          {/* Tiffin Food Items Grid & Category Filtering */}
          <div className="container">
            <TiffinMenu />
          </div>
        </div>
      ) : (
        /* ===================================================
           TACOS & BURRITOS EXPERIENCE (100% PRESERVED)
           Mexican Hero + Category Nav + Bases + Mains + Pro Options
           =================================================== */
        <TacosBurritosMenu />
      )}
    </div>
  );
}
