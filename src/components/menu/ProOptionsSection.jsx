import React from 'react';
import { HiOutlineFire, HiOutlineSparkles } from 'react-icons/hi';
import { MENU_DATA } from '../../data/menuData';

// Existing local assets
import birriaTacosImg from '../../assets/images/food/etb_birria_tacos.jpg';
import quesadillaImg from '../../assets/images/food/etb_quesadilla_close.jpg';
import guacImg from '../../assets/images/food/guacamole.jpg';

export default function ProOptionsSection() {
  const { birriaRamen, birriaTacos, quesadilla, sides } = MENU_DATA.proOptions;

  return (
    <section id="section-pro" className="menu-section pro-options-section">
      <div className="section-header">
        <div className="pro-badge-headline">
          <HiOutlineFire className="pro-fire-icon" />
          <span>CHEF'S SPECIALTIES</span>
        </div>
        <h2 className="section-title pro-title">OUR PRO OPTIONS</h2>
        <p className="section-subtitle">
          The pinnacle of modern Mexican comfort food. Slow-simmered birria broths, grilled-to-crisp tacos, molten quesadillas, and housemade chips.
        </p>
      </div>

      <div className="pro-subsections-container">
        {/* SUBSECTION 1: BIRRIA RAMEN */}
        <div className="pro-feature-block ramen-feature card">
          <div className="pro-text-side">
            <div className="pro-sub-tag">
              <span className="diet-indicator non-veg-small">
                <span className="diet-symbol">▲</span>
              </span>
              <span>SPECIALTY BROTH</span>
            </div>
            <h3 className="pro-sub-title">Birria Ramen</h3>
            <p className="pro-sub-desc">{birriaRamen.description}</p>

            <div className="pro-items-list">
              {birriaRamen.items.map((item) => (
                <div key={item.id} className="pro-price-row">
                  <div className="pro-item-left">
                    <span className="diet-indicator non-veg-micro">
                      <span className="diet-symbol">▲</span>
                    </span>
                    <span className="pro-item-name">{item.name}</span>
                    {item.signature && <span className="item-tag-pill signature-pill">Signature</span>}
                  </div>
                  <span className="pro-item-price">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pro-visual-badge-side">
            <div className="ramen-art-card">
              <span className="ramen-art-icon">🍜</span>
              <span className="ramen-art-title">Slow-Simmered Broth</span>
              <span className="ramen-art-subtitle">With halved boiled egg &amp; scallions</span>
            </div>
          </div>
        </div>

        {/* SUBSECTION 2: BIRRIA TACOS */}
        <div className="pro-feature-block tacos-feature card">
          <div className="pro-image-side">
            <img
              src={birriaTacosImg}
              alt="Crispy Birria Tacos with dipping consommé"
              className="pro-showcase-img"
            />
            <span className="pro-image-pill">Most Popular</span>
          </div>

          <div className="pro-text-side">
            <div className="pro-sub-tag">
              <span className="diet-indicator non-veg-small">
                <span className="diet-symbol">▲</span>
              </span>
              <span>SIGNATURE CRISP</span>
            </div>
            <h3 className="pro-sub-title">Birria Tacos</h3>
            <p className="pro-sub-desc">{birriaTacos.description}</p>

            <div className="pro-items-list">
              {birriaTacos.items.map((item) => (
                <div key={item.id} className="pro-price-row">
                  <div className="pro-item-left">
                    <span className="diet-indicator non-veg-micro">
                      <span className="diet-symbol">▲</span>
                    </span>
                    <span className="pro-item-name">{item.name}</span>
                    {item.signature && <span className="item-tag-pill signature-pill">Must Try</span>}
                  </div>
                  <span className="pro-item-price">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SUBSECTION 3: QUESADILLA */}
        <div className="pro-feature-block quesadilla-feature card">
          <div className="pro-text-side">
            <div className="pro-sub-tag">
              <span className="diet-indicator non-veg-small">
                <span className="diet-symbol">▲</span>
              </span>
              <span>FIRE-TOASTED &amp; MELTY</span>
            </div>
            <h3 className="pro-sub-title">Quesadilla</h3>
            <p className="pro-sub-desc">{quesadilla.description}</p>

            <div className="pro-items-list-grid">
              {quesadilla.items.map((item) => (
                <div key={item.id} className="pro-price-row">
                  <div className="pro-item-left">
                    <span className={`diet-indicator ${item.veg ? 'veg-micro' : 'non-veg-micro'}`}>
                      <span className="diet-symbol">{item.veg ? '●' : '▲'}</span>
                    </span>
                    <span className="pro-item-name">{item.name}</span>
                    {item.signature && <span className="item-tag-pill signature-pill">Special</span>}
                  </div>
                  <span className="pro-item-price">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pro-image-side">
            <img
              src={quesadillaImg}
              alt="Artisan golden toasted quesadilla with cheese pull"
              className="pro-showcase-img"
            />
            <span className="pro-image-pill">Cheese Pull</span>
          </div>
        </div>

        {/* SUBSECTION 4: SIDES */}
        <div className="pro-feature-block sides-feature card">
          <div className="pro-image-side">
            <img
              src={guacImg}
              alt="Fresh guacamole with tortilla chips"
              className="pro-showcase-img"
            />
            <span className="pro-image-pill">Fresh Daily</span>
          </div>

          <div className="pro-text-side">
            <div className="pro-sub-tag">
              <span className="diet-indicator veg-small">
                <span className="diet-symbol">●</span>
              </span>
              <span>CRUNCH &amp; DIPS</span>
            </div>
            <h3 className="pro-sub-title">Sides</h3>
            <p className="pro-sub-desc">{sides.description}</p>

            <div className="pro-items-list">
              {sides.items.map((item) => (
                <div key={item.id} className="pro-price-row">
                  <div className="pro-item-left">
                    <span className="diet-indicator veg-micro">
                      <span className="diet-symbol">●</span>
                    </span>
                    <span className="pro-item-name">{item.name}</span>
                    {item.signature && <span className="item-tag-pill signature-pill">House Made</span>}
                  </div>
                  <span className="pro-item-price">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
