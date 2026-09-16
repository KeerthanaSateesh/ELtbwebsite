/**
 * EL Tacos & Burritos — Menu Availability Utility
 * Calculates Tiffin / Breakfast availability based on user's local browser time.
 * 
 * Operating Windows:
 * Morning: 7:00 AM - 11:00 AM (07:00 - 11:00)
 * Evening: 7:00 PM - 11:00 PM (19:00 - 23:00)
 * Tacos & Burritos: Available all day
 */

/**
 * Checks if Tiffins are currently available at the user's current local time.
 * @param {Date} [date=new Date()] Optional date instance for testing
 * @returns {boolean} true if within 07:00-11:00 or 19:00-23:00
 */
export function isTiffinAvailable(date = new Date()) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // Morning: 7:00 AM (420 min) to 11:00 AM (660 min)
  const isMorning = totalMinutes >= 420 && totalMinutes < 660;

  // Evening: 7:00 PM (1140 min) to 11:00 PM (1380 min)
  const isEvening = totalMinutes >= 1140 && totalMinutes < 1380;

  return isMorning || isEvening;
}

/**
 * Returns a comprehensive, user-friendly availability status object.
 * @param {Date} [date=new Date()] Optional date instance
 * @returns {{
 *   isAvailable: boolean,
 *   statusText: string,
 *   windowText: string,
 *   badgeType: 'open' | 'closed',
 *   scheduleNote: string
 * }}
 */
export function getTiffinAvailabilityStatus(date = new Date()) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const isMorning = totalMinutes >= 420 && totalMinutes < 660;
  const isEvening = totalMinutes >= 1140 && totalMinutes < 1380;
  const isAvailable = isMorning || isEvening;

  const scheduleNote = "7:00 AM – 11:00 AM & 7:00 PM – 11:00 PM";

  if (isAvailable) {
    const activeWindow = isMorning ? "Morning Window (7:00 AM – 11:00 AM)" : "Evening Window (7:00 PM – 11:00 PM)";
    return {
      isAvailable: true,
      statusText: "Available Now",
      windowText: activeWindow,
      badgeType: "open",
      scheduleNote
    };
  }

  // Before 7:00 AM
  if (totalMinutes < 420) {
    return {
      isAvailable: false,
      statusText: "Opens Today at 7:00 AM",
      windowText: "Morning: 7:00 AM – 11:00 AM",
      badgeType: "closed",
      scheduleNote
    };
  }

  // Between morning and evening (11:00 AM to 7:00 PM)
  if (totalMinutes >= 660 && totalMinutes < 1140) {
    return {
      isAvailable: false,
      statusText: "Opens Today at 7:00 PM",
      windowText: "Evening: 7:00 PM – 11:00 PM",
      badgeType: "closed",
      scheduleNote
    };
  }

  // After 11:00 PM
  return {
    isAvailable: false,
    statusText: "Closed for Today",
    windowText: "Opens Tomorrow at 7:00 AM",
    badgeType: "closed",
    scheduleNote
  };
}
