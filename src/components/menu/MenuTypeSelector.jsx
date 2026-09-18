import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTiffinAvailabilityStatus } from '../../utils/menuAvailability';

export default function MenuTypeSelector() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get('type') || 'tacos-burritos';
  const tiffinStatus = getTiffinAvailabilityStatus();

  const handleSelectType = (type) => {
    if (type === 'tacos-burritos') {
      // Clean URL when switching to default
      setSearchParams({ type: 'tacos-burritos' });
    } else {
      setSearchParams({ type: 'tiffins' });
    }
  };

  return (
    <div className="menu-type-selector-wrapper">
      <div className="container">
        <div className="menu-type-tabs" role="tablist" aria-label="Select Menu Experience">
          <button
            type="button"
            role="tab"
            aria-selected={currentType === 'tacos-burritos'}
            className={`menu-type-tab ${currentType === 'tacos-burritos' ? 'active' : ''}`}
            onClick={() => handleSelectType('tacos-burritos')}
          >
            <span className="tab-icon">🌮</span>
            <div className="tab-text-wrap">
              <span className="tab-title">Tacos &amp; Burritos</span>
              <span className="tab-subtitle">Available All Day</span>
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={currentType === 'tiffins'}
            className={`menu-type-tab ${currentType === 'tiffins' ? 'active' : ''}`}
            onClick={() => handleSelectType('tiffins')}
          >
            <span className="tab-icon">🍳</span>
            <div className="tab-text-wrap">
              <span className="tab-title">Breakfast / Tiffins</span>
              <span className={`tab-badge ${tiffinStatus.badgeType}`}>
                {tiffinStatus.isAvailable ? '● Available Now' : '7–11 AM • 7–11 PM'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
