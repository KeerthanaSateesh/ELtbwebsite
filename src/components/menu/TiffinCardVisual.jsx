import React from 'react';

/**
 * TiffinCardVisual Component
 * 
 * Encapsulates the visual presentation layer of a Tiffin menu item.
 * 
 * CURRENT IMPLEMENTATION:
 * Normal realistic 2D food photography.
 * 
 * FUTURE UPGRADE PATH (3D / Interactive):
 * When upgrading to 3D interactive food visualization, replace the <img> rendering 
 * inside this component with a 3D Canvas / WebGL viewer (e.g. Three.js / React Three Fiber).
 * The parent TiffinItemCard and the tiffinMenuData schema remain completely untouched.
 */
export default function TiffinCardVisual({ item }) {
  return (
    <div className="tiffin-card-visual" data-visual-mode="2d-image">
      <img
        src={item.image}
        alt={item.name}
        className="tiffin-card-img"
        loading="lazy"
      />
      
      {/* Badges / Overlays */}
      <div className="tiffin-visual-badges">
        {item.signature && (
          <span className="tiffin-badge badge-signature">Chef Special</span>
        )}
        {item.popular && (
          <span className="tiffin-badge badge-popular">Popular</span>
        )}
      </div>
    </div>
  );
}
