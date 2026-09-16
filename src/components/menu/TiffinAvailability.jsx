import React from 'react';
import { HiOutlineClock, HiOutlineInformationCircle, HiCheckCircle } from 'react-icons/hi';
import { getTiffinAvailabilityStatus } from '../../utils/menuAvailability';

export default function TiffinAvailability() {
  const status = getTiffinAvailabilityStatus();

  return (
    <div className={`tiffin-availability-banner ${status.badgeType}`}>
      <div className="container">
        <div className="tiffin-banner-inner">
          <div className="tiffin-banner-icon-wrap">
            {status.isAvailable ? (
              <HiCheckCircle className="banner-icon icon-available" />
            ) : (
              <HiOutlineClock className="banner-icon icon-unavailable" />
            )}
          </div>

          <div className="tiffin-banner-content">
            <div className="tiffin-banner-title-row">
              <span className={`status-indicator-dot ${status.badgeType}`}></span>
              <h3 className="tiffin-banner-title">
                {status.isAvailable ? "Tiffins Available Now" : "Tiffins are currently unavailable"}
              </h3>
            </div>
            <p className="tiffin-banner-sub">
              {status.isAvailable ? (
                <>Operating Windows: <strong>7:00 AM – 11:00 AM</strong> &amp; <strong>7:00 PM – 11:00 PM</strong>. Order your fresh traditional breakfast now.</>
              ) : (
                <>Available Daily: <strong>7:00 AM – 11:00 AM</strong> &amp; <strong>7:00 PM – 11:00 PM</strong>. Browse our full tiffin catalog below.</>
              )}
            </p>
          </div>

          <div className="tiffin-banner-hours-card">
            <div className="hours-row">
              <span className="hours-label">Morning</span>
              <span className="hours-time">7:00 AM – 11:00 AM</span>
            </div>
            <div className="hours-row">
              <span className="hours-label">Evening</span>
              <span className="hours-time">7:00 PM – 11:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
