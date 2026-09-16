/**
 * EL Tacos and Burritos — Tiffins / Traditional South Indian Breakfast Menu Data
 * Distinct menu for traditional breakfast & evening tiffins.
 * Operating Windows: 7:00 AM - 11:00 AM & 7:00 PM - 11:00 PM
 * Completely separate from Mexican menu items and images.
 */

// Dedicated authentic Tiffin food image assets
import pooriImage from '../assets/images/food/poori.jpg';
import dosaImage from '../assets/images/food/dosa.jpg';
import idlyImage from '../assets/images/food/idly.jpg';
import vadaImage from '../assets/images/food/vada.jpg';
import pongalImage from '../assets/images/food/pongal.jpg';
import upmaImage from '../assets/images/food/upma.jpg';

export const TIFFIN_CATEGORIES = [
  { id: "all", label: "All Tiffins" },
  { id: "idly", label: "Idly" },
  { id: "dosa", label: "Dosa" },
  { id: "poori", label: "Poori" },
  { id: "vada", label: "Vada" },
  { id: "pongal", label: "Pongal" },
  { id: "upma", label: "Upma" },
  { id: "combos", label: "Combos" }
];

export const TIFFIN_ITEMS = [
  // Idly
  {
    id: "tiffin-plain-idly",
    name: "Plain Idly (2 pcs)",
    menuType: "tiffins",
    category: "idly",
    price: 50,
    veg: true,
    image: idlyImage,
    description: "Steamed fluffy fermented rice & lentil cakes served with coconut chutney, tomato chutney, and piping hot sambar.",
    popular: true
  },
  {
    id: "tiffin-ghee-podi-idly",
    name: "Ghee Podi Idly",
    menuType: "tiffins",
    category: "idly",
    price: 80,
    veg: true,
    image: idlyImage,
    description: "Mini bite-sized idlies tossed generously in aromatic roasted spiced gunpowder (podi) and hot cow ghee.",
    popular: true
  },
  {
    id: "tiffin-sambar-idly",
    name: "Sambar Idly (2 pcs)",
    menuType: "tiffins",
    category: "idly",
    price: 70,
    veg: true,
    image: idlyImage,
    description: "Steamed soft idlies fully submerged in our slow-simmered, aromatic spiced vegetable lentil sambar."
  },

  // Dosa
  {
    id: "tiffin-plain-dosa",
    name: "Plain Dosa",
    menuType: "tiffins",
    category: "dosa",
    price: 70,
    veg: true,
    image: dosaImage,
    description: "Crispy, golden fermented rice and lentil crepe freshly spun on the griddle, served with chutneys & sambar."
  },
  {
    id: "tiffin-masala-dosa",
    name: "Masala Dosa",
    menuType: "tiffins",
    category: "dosa",
    price: 95,
    veg: true,
    image: dosaImage,
    description: "Golden crispy dosa folded over our signature turmeric-infused spiced potato and caramelized onion filling.",
    popular: true
  },
  {
    id: "tiffin-ghee-roast-dosa",
    name: "Ghee Roast Dosa",
    menuType: "tiffins",
    category: "dosa",
    price: 110,
    veg: true,
    image: dosaImage,
    description: "Extra crispy, paper-thin crepe roasted with generous spoonfuls of pure aromatic desi ghee.",
    signature: true
  },
  {
    id: "tiffin-onion-rava-dosa",
    name: "Onion Rava Dosa",
    menuType: "tiffins",
    category: "dosa",
    price: 110,
    veg: true,
    image: dosaImage,
    description: "Lacy, crunchy semolina crepe embedded with finely chopped red onions, fresh green chilies, and cracked peppercorns."
  },
  {
    id: "tiffin-cheese-dosa",
    name: "Cheese Dosa",
    menuType: "tiffins",
    category: "dosa",
    price: 130,
    veg: true,
    image: dosaImage,
    description: "Freshly seared crispy dosa layered with melted creamy cheddar and mozzarella cheese."
  },

  // Poori
  {
    id: "tiffin-poori-masala",
    name: "Poori Masala (2 pcs)",
    menuType: "tiffins",
    category: "poori",
    price: 80,
    veg: true,
    image: pooriImage,
    description: "Puffed, golden-fried whole wheat pooris paired with flavorful spiced potato bhaji and coconut chutney.",
    popular: true
  },

  // Vada
  {
    id: "tiffin-medu-vada",
    name: "Medu Vada (2 pcs)",
    menuType: "tiffins",
    category: "vada",
    price: 60,
    veg: true,
    image: vadaImage,
    description: "Crispy-crusted, fluffy-hearted savory black gram fritters spiced with peppercorns, curry leaves, and ginger.",
    popular: true
  },
  {
    id: "tiffin-sambar-vada",
    name: "Sambar Vada (2 pcs)",
    menuType: "tiffins",
    category: "vada",
    price: 75,
    veg: true,
    image: vadaImage,
    description: "Crisp medu vadas soaked in piping hot spicy sambar, garnished with fresh cilantro and finely chopped onions."
  },

  // Pongal
  {
    id: "tiffin-ven-pongal",
    name: "Ven Pongal",
    menuType: "tiffins",
    category: "pongal",
    price: 80,
    veg: true,
    image: pongalImage,
    description: "Traditional creamy rice and moong dal comfort dish tempered with golden-fried cashews, cumin, ginger, and pure ghee.",
    popular: true
  },

  // Upma
  {
    id: "tiffin-rava-upma",
    name: "Rava Upma / Kichadi",
    menuType: "tiffins",
    category: "upma",
    price: 60,
    veg: true,
    image: upmaImage,
    description: "Savory roasted semolina cooked with seasoned mustard seeds, fresh ginger, green chilies, cashews, and garden vegetables."
  },

  // Combos
  {
    id: "tiffin-mini-combo",
    name: "South Indian Mini Tiffin Combo",
    menuType: "tiffins",
    category: "combos",
    price: 150,
    veg: true,
    image: dosaImage,
    description: "The complete South Indian breakfast feast: 1 Steamed Idly, 1 Crispy Medu Vada, 1 Mini Masala Dosa, and sweet Rava Kesari.",
    signature: true,
    popular: true
  }
];

export default {
  categories: TIFFIN_CATEGORIES,
  items: TIFFIN_ITEMS
};
