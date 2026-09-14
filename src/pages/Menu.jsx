import React from 'react';
import MenuHero from '../components/menu/MenuHero';
import MenuCategoryNav from '../components/menu/MenuCategoryNav';
import BaseSection from '../components/menu/BaseSection';
import MainSection from '../components/menu/MainSection';
import ToppingsSection from '../components/menu/ToppingsSection';
import AddOnsSection from '../components/menu/AddOnsSection';
import ProOptionsSection from '../components/menu/ProOptionsSection';
import './Menu.css';

export default function Menu() {
  return (
    <div className="menu-page">
      {/* Menu Introduction & Visual Hero */}
      <MenuHero />

      {/* Sticky Category Quick Jump Navigation */}
      <MenuCategoryNav />

      {/* Main Menu Body Container */}
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
