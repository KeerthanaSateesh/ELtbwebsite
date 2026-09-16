import React from 'react';
import MenuHero from './MenuHero';
import MenuCategoryNav from './MenuCategoryNav';
import BaseSection from './BaseSection';
import MainSection from './MainSection';
import ToppingsSection from './ToppingsSection';
import AddOnsSection from './AddOnsSection';
import ProOptionsSection from './ProOptionsSection';

/**
 * TacosBurritosMenu Component
 * 
 * Completely isolates the Mexican food menu experience.
 * Preserves 100% of the existing Mexican menu components, images, sections, and styling.
 */
export default function TacosBurritosMenu() {
  return (
    <div className="tacos-experience-wrapper">
      {/* Mexican Menu Hero Section with Mexican commercial hero image */}
      <MenuHero />

      {/* Sticky Category Quick Jump Navigation for Mexican Menu */}
      <MenuCategoryNav />

      {/* Mexican Menu Body Sections */}
      <div className="container">
        {/* Step 1: Choose Your Base */}
        <BaseSection />

        {/* Step 2: Choose Your Main (Non-Veg & Veg) */}
        <MainSection />

        {/* Step 3: Choose Your Toppings */}
        <ToppingsSection />

        {/* Step 4: Choose Your Add-Ons */}
        <AddOnsSection />

        {/* Highlight Section: Our Pro Options */}
        <ProOptionsSection />
      </div>
    </div>
  );
}
