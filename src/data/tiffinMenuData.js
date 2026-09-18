/**
 * EL Tacos and Burritos — Mexican Breakfast Menu Data
 * Distinct menu for Mexican-style morning & evening breakfast specialties.
 * Operating Windows: 7:00 AM - 11:00 AM & 7:00 PM - 11:00 PM
 * Completely separate from the main lunch/dinner Mexican menu.
 */

// Dedicated authentic Mexican breakfast food image assets
import breakfastTacosImg from '../assets/images/food/mex_breakfast_tacos.jpg';
import breakfastBurritoImg from '../assets/images/food/mex_breakfast_burrito.jpg';
import breakfastBowlImg from '../assets/images/food/mex_breakfast_bowl.jpg';
import huevosRancherosImg from '../assets/images/food/huevos_rancheros.jpg';
import chilaquilesImg from '../assets/images/food/chilaquiles_verdes.jpg';
import breakfastQuesadillaImg from '../assets/images/food/breakfast_quesadilla.jpg';

export const TIFFIN_CATEGORIES = [
  { id: "all", label: "All Breakfast" },
  { id: "breakfast-tacos", label: "Breakfast Tacos" },
  { id: "breakfast-burritos", label: "Breakfast Burritos" },
  { id: "breakfast-bowls", label: "Breakfast Bowls" },
  { id: "huevos", label: "Huevos & Eggs" },
  { id: "chilaquiles", label: "Chilaquiles" },
  { id: "quesadillas", label: "Breakfast Quesadillas" },
  { id: "combos", label: "Breakfast Combos" }
];

export const TIFFIN_ITEMS = [
  // Breakfast Tacos
  {
    id: "bfast-chorizo-egg-tacos",
    name: "Chorizo & Egg Breakfast Tacos (2 pcs)",
    menuType: "tiffins",
    category: "breakfast-tacos",
    price: 180,
    image: breakfastTacosImg,
    description: "Two warm soft tortillas stuffed with fluffy scrambled eggs, spiced Mexican chorizo, crispy hash potatoes, cotija cheese, and fresh salsa verde.",
    popular: true
  },
  {
    id: "bfast-bacon-guac-tacos",
    name: "Bacon & Guacamole Breakfast Tacos (2 pcs)",
    menuType: "tiffins",
    category: "breakfast-tacos",
    price: 195,
    image: breakfastTacosImg,
    description: "Crispy applewood smoked bacon, scrambled eggs, fresh Haas guacamole, diced red onions, and cilantro on warm tortillas.",
    popular: true
  },
  {
    id: "bfast-avocado-blackbean-tacos",
    name: "Avocado & Black Bean Tacos (Veg)",
    menuType: "tiffins",
    category: "breakfast-tacos",
    price: 160,
    veg: true,
    image: breakfastTacosImg,
    description: "Seasoned black beans, scrambled farm eggs, fresh avocado slices, sweet roasted corn, and fire-roasted salsa."
  },

  // Breakfast Burritos
  {
    id: "bfast-el-grande-burrito",
    name: "El Grande Breakfast Burrito",
    menuType: "tiffins",
    category: "breakfast-burritos",
    price: 240,
    image: breakfastBurritoImg,
    description: "A hearty grilled flour tortilla loaded with scrambled eggs, golden tater tots, melted cheddar jack, refried beans, and chipotle crema.",
    popular: true,
    signature: true
  },
  {
    id: "bfast-chorizo-potato-burrito",
    name: "Chorizo & Crispy Potato Burrito",
    menuType: "tiffins",
    category: "breakfast-burritos",
    price: 230,
    image: breakfastBurritoImg,
    description: "Spiced artisan chorizo, skillet roasted potatoes, melted cheese, fluffy eggs, and house pico de gallo rolled in a toasted tortilla.",
    popular: true
  },
  {
    id: "bfast-veggie-sunrise-burrito",
    name: "Veggie Sunrise Burrito (Veg)",
    menuType: "tiffins",
    category: "breakfast-burritos",
    price: 210,
    veg: true,
    image: breakfastBurritoImg,
    description: "Scrambled eggs, sautéed peppers and onions, black beans, Monterey Jack cheese, and creamy avocado salsa verde."
  },

  // Breakfast Bowls
  {
    id: "bfast-sunrise-hash-bowl",
    name: "Sunrise Mexican Breakfast Bowl",
    menuType: "tiffins",
    category: "breakfast-bowls",
    price: 260,
    image: breakfastBowlImg,
    description: "Golden roasted breakfast potatoes topped with two sunny-side eggs, black beans, charred corn, avocado slices, and cotija cheese.",
    popular: true,
    signature: true
  },
  {
    id: "bfast-carnitas-egg-bowl",
    name: "Carnitas & Potato Skillet Bowl",
    menuType: "tiffins",
    category: "breakfast-bowls",
    price: 280,
    image: breakfastBowlImg,
    description: "Slow-simmered crispy carnitas, breakfast potatoes, fried eggs, pickled jalapeños, and smoky salsa roja drizzle."
  },

  // Huevos & Eggs
  {
    id: "bfast-huevos-rancheros",
    name: "Authentic Huevos Rancheros",
    menuType: "tiffins",
    category: "huevos",
    price: 220,
    image: huevosRancherosImg,
    description: "Two sunny-side fried eggs over lightly crisped corn tortillas, smothered in fire-roasted ranchero salsa, queso fresco, and refried beans.",
    popular: true,
    signature: true
  },
  {
    id: "bfast-huevos-mexicana",
    name: "Huevos a la Mexicana",
    menuType: "tiffins",
    category: "huevos",
    price: 190,
    image: huevosRancherosImg,
    description: "Fluffy scrambled eggs sautéed with diced roma tomatoes, serrano peppers, and fresh cilantro, served with refried beans and warm tortillas."
  },

  // Chilaquiles
  {
    id: "bfast-chilaquiles-verdes",
    name: "Chilaquiles Verdes con Huevo",
    menuType: "tiffins",
    category: "chilaquiles",
    price: 240,
    image: chilaquilesImg,
    description: "Crispy housemade corn tortilla chips simmered in tangy tomatillo salsa verde, topped with two fried eggs, Mexican crema, and crumbled cotija.",
    popular: true,
    signature: true
  },
  {
    id: "bfast-chilaquiles-rojos",
    name: "Chilaquiles Rojos con Pollo",
    menuType: "tiffins",
    category: "chilaquiles",
    price: 260,
    image: chilaquilesImg,
    description: "Tortilla chips tossed in smoky red guajillo chile salsa, layered with tender shredded chicken, fried egg, cotija cheese, and crema."
  },

  // Breakfast Quesadillas
  {
    id: "bfast-bacon-egg-quesadilla",
    name: "Toasted Breakfast Quesadilla",
    menuType: "tiffins",
    category: "quesadillas",
    price: 230,
    image: breakfastQuesadillaImg,
    description: "Golden grilled flour tortilla folded with molten Oaxaca and Monterey Jack cheeses, scrambled eggs, crispy bacon, and fresh scallions.",
    popular: true
  },

  // Breakfast Combos
  {
    id: "bfast-el-patron-combo",
    name: "El Patrón Breakfast Platter",
    menuType: "tiffins",
    category: "combos",
    price: 320,
    image: huevosRancherosImg,
    description: "The complete Mexican morning feast: 2 sunny eggs, spiced chorizo hash, refried beans, tortilla chips with salsa verde, avocado, and warm tortillas.",
    signature: true,
    popular: true
  }
];

export default {
  categories: TIFFIN_CATEGORIES,
  items: TIFFIN_ITEMS
};
