/**
 * EL Tacos and Burritos — Authoritative Menu Data Structure
 * Formatted directly from the physical restaurant menu card reference.
 * Structured for current 2D presentation and future 3D interactive builder.
 */

import { TIFFIN_CATEGORIES, TIFFIN_ITEMS } from './tiffinMenuData';

export { TIFFIN_CATEGORIES, TIFFIN_ITEMS };

export const MENU_DATA = {
  restaurant: {
    name: "EL Tacos and Burritos",
    tagline: "Bold Mexican Flavors. Made Your Way.",
    description: "Handcrafted gourmet Mexican cuisine featuring authentic slow-cooked proteins, fresh fire-roasted salsas, and housemade tortillas."
  },

  // SECTION 1 — CHOOSE YOUR BASE
  bases: [
    {
      id: "base-taco",
      name: "Taco",
      menuType: "tacos-burritos",
      description: "Warm soft or crispy corn/flour tortillas filled with your choice of protein and toppings.",
      category: "base",
      badge: "Classic"
    },
    {
      id: "base-burrito",
      name: "Burrito",
      menuType: "tacos-burritos",
      description: "Large warm flour tortilla wrapped tight with seasoned beans, rice, meats, and salsa.",
      category: "base",
      badge: "Favorite"
    },
    {
      id: "base-rice-bowl",
      name: "Rice Bowl",
      menuType: "tacos-burritos",
      description: "Seasoned cilantro lime or Mexican rice base packed with proteins, salsas, and toppings.",
      category: "base",
      badge: "Popular"
    },
    {
      id: "base-salad",
      name: "Salad",
      menuType: "tacos-burritos",
      description: "Crisp romaine lettuce base tossed with seasoned proteins, roasted corn, and zesty salsas.",
      category: "base",
      badge: "Fresh"
    }
  ],

  // SECTION 2 — CHOOSE YOUR MAIN (Separated into Non-Veg and Veg)
  mains: {
    nonVeg: [
      {
        id: "main-lemon-pepper-chicken",
        name: "Lemon Pepper Chicken",
        menuType: "tacos-burritos",
        category: "mains",
        type: "non-veg",
        veg: false,
        miniPrice: 249,
        regularPrice: 299,
        popular: true
      },
      {
        id: "main-chipotle-chicken",
        name: "Chipotle Chicken",
        menuType: "tacos-burritos",
        category: "mains",
        type: "non-veg",
        veg: false,
        miniPrice: 249,
        regularPrice: 299,
        popular: true
      },
      {
        id: "main-bbq-chicken",
        name: "BBQ Chicken",
        menuType: "tacos-burritos",
        category: "mains",
        type: "non-veg",
        veg: false,
        miniPrice: 249,
        regularPrice: 299
      },
      {
        id: "main-lamb-shredded",
        name: "Lamb Shredded",
        menuType: "tacos-burritos",
        category: "mains",
        type: "non-veg",
        veg: false,
        miniPrice: 319,
        regularPrice: 379,
        premium: true
      },
      {
        id: "main-shrimp",
        name: "Shrimp",
        menuType: "tacos-burritos",
        category: "mains",
        type: "non-veg",
        veg: false,
        miniPrice: null, // Not available on menu card
        regularPrice: 299,
        note: "Subject to Availability"
      },
      {
        id: "main-fish",
        name: "Fish",
        menuType: "tacos-burritos",
        category: "mains",
        type: "non-veg",
        veg: false,
        miniPrice: null, // Not available on menu card
        regularPrice: 299,
        note: "Subject to Availability"
      }
    ],
    veg: [
      {
        id: "main-lemon-pepper-paneer",
        name: "Lemon Pepper Paneer",
        menuType: "tacos-burritos",
        category: "mains",
        type: "veg",
        veg: true,
        miniPrice: 249,
        regularPrice: 299,
        popular: true
      },
      {
        id: "main-chipotle-paneer",
        name: "Chipotle Paneer",
        menuType: "tacos-burritos",
        category: "mains",
        type: "veg",
        veg: true,
        miniPrice: 249,
        regularPrice: 299
      },
      {
        id: "main-roasted-cauliflower",
        name: "Roasted Cauliflower",
        menuType: "tacos-burritos",
        category: "mains",
        type: "veg",
        veg: true,
        miniPrice: 189,
        regularPrice: 219
      },
      {
        id: "main-potato-tators",
        name: "Potato Tators",
        menuType: "tacos-burritos",
        category: "mains",
        type: "veg",
        veg: true,
        miniPrice: 169,
        regularPrice: 199
      }
    ]
  },

  // SECTION 3 — CHOOSE YOUR TOPPINGS
  toppings: [
    { id: "top-cilantro-lime-rice", name: "Cilantro Lime Rice", menuType: "tacos-burritos", category: "rice" },
    { id: "top-mexican-rice", name: "Mexican Rice", menuType: "tacos-burritos", category: "rice" },
    { id: "top-pinto-beans", name: "Pinto Beans", menuType: "tacos-burritos", category: "beans" },
    { id: "top-black-beans", name: "Black Beans", menuType: "tacos-burritos", category: "beans" },
    { id: "top-tomato-salsa", name: "Tomato Salsa", menuType: "tacos-burritos", category: "salsa" },
    { id: "top-corn-salsa", name: "Corn Salsa", menuType: "tacos-burritos", category: "salsa" },
    { id: "top-sour-cream", name: "Sour Cream", menuType: "tacos-burritos", category: "dairy" },
    { id: "top-cheese", name: "Cheese", menuType: "tacos-burritos", category: "dairy" },
    { id: "top-lettuce", name: "Lettuce", menuType: "tacos-burritos", category: "veggies" },
    { id: "top-jalapenos", name: "Jalapenos", menuType: "tacos-burritos", category: "spicy" }
  ],

  // SECTION 4 — CHOOSE YOUR ADD-ONS
  addons: [
    { id: "addon-chicken", name: "Chicken", menuType: "tacos-burritos", price: 69, veg: false },
    { id: "addon-lamb", name: "Lamb", menuType: "tacos-burritos", price: 89, veg: false },
    { id: "addon-mushroom", name: "Mushroom", menuType: "tacos-burritos", price: 49, veg: true },
    { id: "addon-guacamole", name: "Guacamole", menuType: "tacos-burritos", price: 79, veg: true, signature: true },
    { id: "addon-potato", name: "Potato", menuType: "tacos-burritos", price: 39, veg: true },
    { id: "addon-chipotle", name: "Chipotle", menuType: "tacos-burritos", price: 29, veg: true },
    { id: "addon-1000-island", name: "1000 Island", menuType: "tacos-burritos", price: 39, veg: true },
    { id: "addon-chik-fill-a", name: "Chik-Fill-A", menuType: "tacos-burritos", price: 39, veg: true }
  ],

  // SECTION 5 — OUR PRO OPTIONS
  proOptions: {
    birriaRamen: {
      title: "Birria Ramen",
      description: "Rich Mexican birria chili broth paired with ramen noodles, half-boiled egg, and slow-simmered tender meat.",
      items: [
        { id: "ramen-chicken-shredded", name: "Chicken Shredded", menuType: "tacos-burritos", price: 249, veg: false },
        { id: "ramen-lamb-shredded", name: "Lamb Shredded", menuType: "tacos-burritos", price: 299, veg: false, signature: true }
      ]
    },
    birriaTacos: {
      title: "Birria Tacos",
      description: "Crispy grilled folded corn tortillas filled with melted cheese, cilantro, and onions, served with rich dipping consommé.",
      hasImage: true,
      items: [
        { id: "tacos-chicken-shredded", name: "Chicken Shredded", menuType: "tacos-burritos", price: 349, veg: false },
        { id: "tacos-lamb-shredded", name: "Lamb Shredded", menuType: "tacos-burritos", price: 449, veg: false, signature: true }
      ]
    },
    quesadilla: {
      title: "Quesadilla",
      description: "Toasted golden-brown flour tortilla with melted cheese pull and your choice of delicious filling.",
      hasImage: true,
      items: [
        { id: "ques-birria", name: "Birria Quesadilla", menuType: "tacos-burritos", price: 349, veg: false, signature: true },
        { id: "ques-chicken-shredded", name: "Chicken Shredded", menuType: "tacos-burritos", price: 249, veg: false },
        { id: "ques-lamb-shredded", name: "Lamb Shredded", menuType: "tacos-burritos", price: 299, veg: false },
        { id: "ques-mushroom", name: "Mushroom", menuType: "tacos-burritos", price: 199, veg: true },
        { id: "ques-cauliflower", name: "Cauliflower", menuType: "tacos-burritos", price: 199, veg: true },
        { id: "ques-potato-tators", name: "Potato Tators", menuType: "tacos-burritos", price: 199, veg: true }
      ]
    },
    sides: {
      title: "Sides",
      description: "Crunchy sides and house dips to complete your feast.",
      hasImage: true,
      items: [
        { id: "side-tator-fries", name: "Tator Fries", menuType: "tacos-burritos", price: 99, veg: true },
        { id: "side-nachos", name: "Nachos", menuType: "tacos-burritos", price: 199, veg: true },
        { id: "side-guac-chips", name: "Guacamole & Chips", menuType: "tacos-burritos", price: 199, veg: true, signature: true }
      ]
    }
  }
};

export default MENU_DATA;
