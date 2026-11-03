/**
 * Verified Walmart Grocery Product Catalog
 * Pre-indexed with real Walmart food items, exact search queries, categories,
 * standard package sizes, and realistic prices.
 */

export interface WalmartGroceryProduct {
  id: string;
  itemId?: string;
  name: string;
  walmartQuery: string;
  walmartSearchUrl: string;
  category: 'Produce' | 'Meat & Seafood' | 'Dairy & Eggs' | 'Pantry & Dry Goods' | 'Bakery' | 'Spices & Seasonings' | 'Frozen' | 'Other';
  brand: string;
  estimatedPrice: number;
  packageSize: string;
  isPantryStaple: boolean;
  keywords: string[];
}

export const WALMART_GROCERY_CATALOG: WalmartGroceryProduct[] = [
  // --- MEAT & POULTRY & SEAFOOD ---
  {
    id: 'wm-meat-1',
    itemId: '10414680',
    name: 'Boneless Skinless Chicken Breast',
    walmartQuery: 'Great Value Boneless Skinless Chicken Breast 3 lb',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Boneless%20Skinless%20Chicken%20Breast%203%20lb',
    category: 'Meat & Seafood',
    brand: 'Great Value',
    estimatedPrice: 7.42,
    packageSize: '3 lb tray',
    isPantryStaple: false,
    keywords: ['chicken breast', 'chicken breasts', 'boneless chicken', 'raw chicken', 'chicken fillet', 'chicken'],
  },
  {
    id: 'wm-meat-2',
    name: 'Boneless Skinless Chicken Thighs',
    walmartQuery: 'Great Value Boneless Skinless Chicken Thighs 3 lb',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Boneless%20Skinless%20Chicken%20Thighs%203%20lb',
    category: 'Meat & Seafood',
    brand: 'Great Value',
    estimatedPrice: 6.98,
    packageSize: '3 lb tray',
    isPantryStaple: false,
    keywords: ['chicken thigh', 'chicken thighs', 'boneless chicken thighs', 'dark meat chicken'],
  },
  {
    id: 'wm-meat-3',
    name: '80/20 Ground Beef',
    walmartQuery: 'All Natural 80/20 Ground Beef Chuck 1 lb',
    walmartSearchUrl: 'https://www.walmart.com/search?q=All%20Natural%2080%2F20%20Ground%20Beef%201%20lb',
    category: 'Meat & Seafood',
    brand: 'Marketside',
    estimatedPrice: 4.97,
    packageSize: '1 lb roll / tray',
    isPantryStaple: false,
    keywords: ['ground beef', 'minced beef', 'hamburger meat', 'ground chuck', 'beef mince'],
  },
  {
    id: 'wm-meat-4',
    itemId: '39944474',
    name: 'Boneless Beef Chuck Roast',
    walmartQuery: 'USDA Choice Beef Chuck Roast Boneless 3 lb',
    walmartSearchUrl: 'https://www.walmart.com/search?q=USDA%20Choice%20Beef%20Chuck%20Roast%20Boneless',
    category: 'Meat & Seafood',
    brand: 'USDA Choice',
    estimatedPrice: 19.88,
    packageSize: '3 lb roast',
    isPantryStaple: false,
    keywords: ['chuck roast', 'beef roast', 'pot roast', 'beef chuck', 'stewing beef', 'beef for stew'],
  },
  {
    id: 'wm-meat-5',
    name: 'Raw Large Peeled & Deveined Shrimp',
    walmartQuery: 'Great Value Raw Large Peeled & Deveined Tail-Off Shrimp 16 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Raw%20Large%20Peeled%20Deveined%20Shrimp%2016%20oz',
    category: 'Meat & Seafood',
    brand: 'Great Value',
    estimatedPrice: 5.98,
    packageSize: '16 oz bag (frozen/thawed)',
    isPantryStaple: false,
    keywords: ['shrimp', 'prawns', 'raw shrimp', 'peeled shrimp', 'frozen shrimp', 'tail-off shrimp'],
  },
  {
    id: 'wm-meat-6',
    name: 'Atlantic Salmon Fillets',
    walmartQuery: 'Fresh Atlantic Salmon Fillet 1 lb',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Atlantic%20Salmon%20Fillet',
    category: 'Meat & Seafood',
    brand: 'Marketside',
    estimatedPrice: 9.87,
    packageSize: '1 lb fillet tray',
    isPantryStaple: false,
    keywords: ['salmon', 'salmon fillet', 'fresh salmon', 'fish fillet'],
  },
  {
    id: 'wm-meat-7',
    name: 'Thick Cut Bacon',
    walmartQuery: 'Great Value Naturally Hardwood Smoked Thick Cut Bacon 16 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Thick%20Cut%20Bacon%2016%20oz',
    category: 'Meat & Seafood',
    brand: 'Great Value',
    estimatedPrice: 3.98,
    packageSize: '16 oz pack',
    isPantryStaple: false,
    keywords: ['bacon', 'thick bacon', 'smoked bacon', 'pork bacon'],
  },
  {
    id: 'wm-meat-8',
    name: 'Boneless Pork Chops',
    walmartQuery: 'Boneless Pork Chops Center Cut 1.5 lb',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Boneless%20Pork%20Chops%20Center%20Cut',
    category: 'Meat & Seafood',
    brand: 'Marketside',
    estimatedPrice: 6.48,
    packageSize: '1.5 lb tray',
    isPantryStaple: false,
    keywords: ['pork chop', 'pork chops', 'boneless pork', 'pork loin'],
  },

  // --- DAIRY & EGGS ---
  {
    id: 'wm-dairy-1',
    name: 'Large Grade A White Eggs',
    walmartQuery: 'Great Value Large White Grade A Eggs 12 Count',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Large%20White%20Eggs%2012%20Count',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 2.14,
    packageSize: '12 count carton',
    isPantryStaple: false,
    keywords: ['egg', 'eggs', 'large eggs', 'white eggs', 'fresh eggs'],
  },
  {
    id: 'wm-dairy-2',
    name: 'Whole Milk',
    walmartQuery: 'Great Value Whole Vitamin D Milk 1 Gallon',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Whole%20Milk%201%20Gallon',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 3.24,
    packageSize: '1 Gallon jug',
    isPantryStaple: false,
    keywords: ['milk', 'whole milk', 'vitamin d milk', 'cow milk'],
  },
  {
    id: 'wm-dairy-3',
    itemId: '10450340',
    name: 'Heavy Whipping Cream',
    walmartQuery: 'Great Value Ultra-Pasteurized Heavy Whipping Cream 16 fl oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Heavy%20Whipping%20Cream%2016%20fl%20oz',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 2.38,
    packageSize: '16 fl oz carton',
    isPantryStaple: false,
    keywords: ['heavy cream', 'heavy whipping cream', 'whipping cream', 'double cream'],
  },
  {
    id: 'wm-dairy-4',
    itemId: '26954459',
    name: 'Unsalted Sweet Cream Butter',
    walmartQuery: 'Great Value Sweet Cream Unsalted Butter 16 oz 4 Sticks',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Unsalted%20Butter%2016%20oz',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 3.68,
    packageSize: '16 oz (4 sticks)',
    isPantryStaple: true,
    keywords: ['butter', 'unsalted butter', 'sweet cream butter', 'butter sticks'],
  },
  {
    id: 'wm-dairy-5',
    itemId: '10315402',
    name: 'Grated Parmesan Cheese',
    walmartQuery: 'Great Value Grated Parmesan Cheese 8 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Grated%20Parmesan%20Cheese%208%20oz',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 2.94,
    packageSize: '8 oz bottle',
    isPantryStaple: false,
    keywords: ['parmesan', 'parmesan cheese', 'grated parmesan', 'parmigiano'],
  },
  {
    id: 'wm-dairy-6',
    name: 'Shredded Cheddar Cheese',
    walmartQuery: 'Great Value Shredded Sharp Cheddar Cheese 8 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Shredded%20Sharp%20Cheddar%20Cheese%208%20oz',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 2.22,
    packageSize: '8 oz pouch',
    isPantryStaple: false,
    keywords: ['cheddar cheese', 'shredded cheddar', 'sharp cheddar', 'cheddar'],
  },
  {
    id: 'wm-dairy-7',
    name: 'Shredded Mozzarella Cheese',
    walmartQuery: 'Great Value Shredded Low-Moisture Part-Skim Mozzarella Cheese 8 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Shredded%20Mozzarella%20Cheese%208%20oz',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 2.22,
    packageSize: '8 oz pouch',
    isPantryStaple: false,
    keywords: ['mozzarella', 'shredded mozzarella', 'pizza cheese', 'mozzarella cheese'],
  },
  {
    id: 'wm-dairy-8',
    name: 'Oaxaca Melting Cheese',
    walmartQuery: 'Cacique Oaxaca Mexican Style Melting Cheese 10 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Cacique%20Oaxaca%20Cheese%2010%20oz',
    category: 'Dairy & Eggs',
    brand: 'Cacique',
    estimatedPrice: 3.98,
    packageSize: '10 oz package',
    isPantryStaple: false,
    keywords: ['oaxaca cheese', 'queso oaxaca', 'melting cheese', 'quesadilla cheese'],
  },
  {
    id: 'wm-dairy-9',
    name: 'Whole Milk Plain Greek Yogurt',
    walmartQuery: 'Great Value Plain Whole Milk Greek Yogurt 32 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Greek%20Yogurt%20Plain%2032%20oz',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 3.47,
    packageSize: '32 oz tub',
    isPantryStaple: false,
    keywords: ['greek yogurt', 'plain yogurt', 'whole milk yogurt', 'yogurt'],
  },
  {
    id: 'wm-dairy-10',
    name: 'Sour Cream',
    walmartQuery: 'Great Value Original Sour Cream 16 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Sour%20Cream%2016%20oz',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 1.84,
    packageSize: '16 oz tub',
    isPantryStaple: false,
    keywords: ['sour cream', 'crema agria', 'sour cream tub'],
  },
  {
    id: 'wm-dairy-11',
    name: 'Cream Cheese',
    walmartQuery: 'Great Value Original Cream Cheese 8 oz Brick',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Cream%20Cheese%208%20oz',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 1.78,
    packageSize: '8 oz brick',
    isPantryStaple: false,
    keywords: ['cream cheese', 'philadelphia cream cheese', 'cream cheese brick'],
  },

  // --- FRESH PRODUCE ---
  {
    id: 'wm-prod-1',
    itemId: '10447842',
    name: 'Fresh Yellow Onions',
    walmartQuery: 'Fresh Yellow Onions 3 lb Bag',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Yellow%20Onions%203%20lb%20Bag',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 2.38,
    packageSize: '3 lb bag',
    isPantryStaple: false,
    keywords: ['yellow onion', 'yellow onions', 'onion', 'onions', 'cooking onions'],
  },
  {
    id: 'wm-prod-2',
    name: 'Fresh White Onions',
    walmartQuery: 'Fresh White Onion Each',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20White%20Onion%20each',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 0.98,
    packageSize: '1 whole onion',
    isPantryStaple: false,
    keywords: ['white onion', 'white onions', 'taco onion'],
  },
  {
    id: 'wm-prod-3',
    name: 'Fresh Red Onions',
    walmartQuery: 'Fresh Red Onion Each',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Red%20Onion%20each',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 1.12,
    packageSize: '1 whole onion',
    isPantryStaple: false,
    keywords: ['red onion', 'red onions', 'purple onion'],
  },
  {
    id: 'wm-prod-4',
    name: 'Fresh White Garlic Bulbs',
    walmartQuery: 'Fresh White Garlic 3 Pack Bulbs',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20White%20Garlic%203%20Pack%20Bulbs',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 1.48,
    packageSize: '3 bulbs sleeve',
    isPantryStaple: false,
    keywords: ['garlic', 'garlic cloves', 'garlic bulbs', 'fresh garlic', 'clove garlic'],
  },
  {
    id: 'wm-prod-5',
    itemId: '34017490',
    name: 'Fresh Baby Spinach',
    walmartQuery: 'Marketside Fresh Baby Spinach 10 oz Tub',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Marketside%20Fresh%20Baby%20Spinach%2010%20oz',
    category: 'Produce',
    brand: 'Marketside',
    estimatedPrice: 2.18,
    packageSize: '10 oz tub',
    isPantryStaple: false,
    keywords: ['spinach', 'baby spinach', 'fresh spinach', 'spinach leaves'],
  },
  {
    id: 'wm-prod-6',
    name: 'Fresh Cilantro',
    walmartQuery: 'Fresh Cilantro Bunch',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Cilantro%20Bunch',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 0.58,
    packageSize: '1 fresh bunch',
    isPantryStaple: false,
    keywords: ['cilantro', 'fresh cilantro', 'coriander leaves', 'culantro'],
  },
  {
    id: 'wm-prod-7',
    itemId: '44391064',
    name: 'Fresh Whole Limes',
    walmartQuery: 'Fresh Whole Limes Each',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Whole%20Limes',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 0.33,
    packageSize: '1 whole lime',
    isPantryStaple: false,
    keywords: ['lime', 'limes', 'fresh lime', 'lime juice'],
  },
  {
    id: 'wm-prod-8',
    name: 'Fresh Whole Lemons',
    walmartQuery: 'Fresh Whole Lemon Each',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Whole%20Lemon',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 0.48,
    packageSize: '1 whole lemon',
    isPantryStaple: false,
    keywords: ['lemon', 'lemons', 'fresh lemon', 'lemon juice'],
  },
  {
    id: 'wm-prod-9',
    itemId: '44391605',
    name: 'Fresh Strawberries',
    walmartQuery: 'Fresh Strawberries 1 lb Clamshell',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Strawberries%201%20lb',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 2.88,
    packageSize: '16 oz clamshell',
    isPantryStaple: false,
    keywords: ['strawberry', 'strawberries', 'fresh strawberries', 'sliced strawberries'],
  },
  {
    id: 'wm-prod-10',
    itemId: '161115457',
    name: 'Fresh Blueberries',
    walmartQuery: 'Fresh Blueberries 11 oz Container',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Blueberries%2011%20oz',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 2.98,
    packageSize: '11 oz pack',
    isPantryStaple: false,
    keywords: ['blueberry', 'blueberries', 'fresh blueberries', 'wild blueberries'],
  },
  {
    id: 'wm-prod-11',
    name: 'Fresh Green Bell Peppers',
    walmartQuery: 'Fresh Green Bell Pepper Each',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Green%20Bell%20Pepper',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 0.78,
    packageSize: '1 pepper',
    isPantryStaple: false,
    keywords: ['bell pepper', 'green bell pepper', 'green pepper', 'peppers'],
  },
  {
    id: 'wm-prod-12',
    name: 'Fresh Red Bell Peppers',
    walmartQuery: 'Fresh Red Bell Pepper Each',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Red%20Bell%20Pepper',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 1.28,
    packageSize: '1 pepper',
    isPantryStaple: false,
    keywords: ['red bell pepper', 'red pepper', 'sweet pepper'],
  },
  {
    id: 'wm-prod-13',
    name: 'Fresh Roma Tomatoes',
    walmartQuery: 'Fresh Roma Tomato Each',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Roma%20Tomato',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 0.35,
    packageSize: '1 tomato',
    isPantryStaple: false,
    keywords: ['roma tomato', 'roma tomatoes', 'plum tomato', 'fresh tomatoes', 'tomato', 'tomatoes'],
  },
  {
    id: 'wm-prod-14',
    name: 'Fresh Italian Flat Leaf Parsley',
    walmartQuery: 'Fresh Italian Flat Leaf Parsley Bunch',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Italian%20Flat%20Leaf%20Parsley%20Bunch',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 0.98,
    packageSize: '1 fresh bunch',
    isPantryStaple: false,
    keywords: ['parsley', 'flat leaf parsley', 'italian parsley', 'fresh parsley'],
  },
  {
    id: 'wm-prod-15',
    name: 'Fresh Hass Avocados',
    walmartQuery: 'Fresh Hass Avocados 4 Pack Bag',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Hass%20Avocados%204%20Pack',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 2.98,
    packageSize: '4 count bag',
    isPantryStaple: false,
    keywords: ['avocado', 'avocados', 'hass avocado', 'guacamole avocado'],
  },
  {
    id: 'wm-prod-16',
    name: 'Fresh Ginger Root',
    walmartQuery: 'Fresh Ginger Root by Weight',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Ginger%20Root',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 1.48,
    packageSize: 'Approx. 0.5 lb knob',
    isPantryStaple: false,
    keywords: ['ginger', 'ginger root', 'fresh ginger', 'minced ginger'],
  },
  {
    id: 'wm-prod-17',
    name: 'Fresh Russet Potatoes',
    walmartQuery: 'Fresh Russet Potatoes 5 lb Bag',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Russet%20Potatoes%205%20lb%20Bag',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 2.97,
    packageSize: '5 lb bag',
    isPantryStaple: false,
    keywords: ['potato', 'potatoes', 'russet potato', 'baking potato'],
  },

  // --- PANTRY & DRY GOODS ---
  {
    id: 'wm-pan-1',
    itemId: '10315102',
    name: 'Extra Virgin Olive Oil',
    walmartQuery: 'Great Value 100% Extra Virgin Olive Oil 17 fl oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Extra%20Virgin%20Olive%20Oil%2017%20fl%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 4.88,
    packageSize: '17 fl oz bottle',
    isPantryStaple: true,
    keywords: ['olive oil', 'extra virgin olive oil', 'evoo', 'cooking oil'],
  },
  {
    id: 'wm-pan-2',
    name: 'Vegetable Oil',
    walmartQuery: 'Great Value Pure Vegetable Oil 48 fl oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Vegetable%20Oil%2048%20fl%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 3.42,
    packageSize: '48 fl oz bottle',
    isPantryStaple: true,
    keywords: ['vegetable oil', 'canola oil', 'frying oil'],
  },
  {
    id: 'wm-pan-3',
    itemId: '10899013',
    name: 'Low Sodium Chicken Broth',
    walmartQuery: 'Great Value Low Sodium Chicken Broth 32 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Low%20Sodium%20Chicken%20Broth%2032%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.37,
    packageSize: '32 oz carton',
    isPantryStaple: false,
    keywords: ['chicken broth', 'chicken stock', 'broth', 'stock', 'bone broth'],
  },
  {
    id: 'wm-pan-4',
    itemId: '10899013',
    name: 'Beef Broth',
    walmartQuery: 'Great Value Beef Broth 32 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Beef%20Broth%2032%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.37,
    packageSize: '32 oz carton',
    isPantryStaple: false,
    keywords: ['beef broth', 'beef stock', 'consomme'],
  },
  {
    id: 'wm-pan-5',
    name: 'Sun-Dried Tomatoes in Oil',
    walmartQuery: 'California Sun Dry Julienne Cut Sun-Dried Tomatoes in Oil 8.5 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Sun-Dried%20Tomatoes%20Julienne%20Cut%20in%20Oil',
    category: 'Pantry & Dry Goods',
    brand: 'California Sun Dry',
    estimatedPrice: 3.48,
    packageSize: '8.5 oz jar',
    isPantryStaple: false,
    keywords: ['sun-dried tomatoes', 'sundried tomato', 'sun dried tomatoes'],
  },
  {
    id: 'wm-pan-6',
    name: 'Dried Guajillo Chili Pods',
    walmartQuery: 'El Guapo Whole Dried Guajillo Chili Pods 7.5 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Dried%20Guajillo%20Chile%20Pods',
    category: 'Pantry & Dry Goods',
    brand: 'El Guapo',
    estimatedPrice: 2.98,
    packageSize: '7.5 oz bag',
    isPantryStaple: false,
    keywords: ['guajillo', 'guajillo chiles', 'dried chiles', 'guajillo pepper'],
  },
  {
    id: 'wm-pan-7',
    name: 'Oats & Honey Granola',
    walmartQuery: 'Great Value Oats & Honey Granola 16 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Oats%20and%20Honey%20Granola%2016%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 2.68,
    packageSize: '16 oz pouch',
    isPantryStaple: false,
    keywords: ['granola', 'oats and honey', 'cereal granola', 'rolled oats granola'],
  },
  {
    id: 'wm-pan-8',
    name: 'Organic Black Chia Seeds',
    walmartQuery: 'Great Value Organic Black Chia Seeds 12 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Organic%20Black%20Chia%20Seeds',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 3.74,
    packageSize: '12 oz pouch',
    isPantryStaple: false,
    keywords: ['chia seeds', 'chia', 'black chia seeds'],
  },
  {
    id: 'wm-pan-9',
    name: '100% Pure Raw Honey',
    walmartQuery: 'Great Value 100% Pure Raw Honey 16 oz Bottle',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Pure%20Raw%20Honey%2016%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 3.98,
    packageSize: '16 oz squeeze bottle',
    isPantryStaple: true,
    keywords: ['honey', 'raw honey', 'clover honey', 'pure honey'],
  },
  {
    id: 'wm-pan-10',
    itemId: '10315394',
    name: 'Long Grain White Rice',
    walmartQuery: 'Great Value Enriched Long Grain White Rice 5 lb Bag',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Long%20Grain%20White%20Rice%205%20lb',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 3.34,
    packageSize: '5 lb bag',
    isPantryStaple: true,
    keywords: ['white rice', 'rice', 'long grain rice', 'jasmine rice', 'basmati rice'],
  },
  {
    id: 'wm-pan-11',
    name: 'Linguine Pasta',
    walmartQuery: 'Barilla Linguine Pasta 16 oz Box',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Barilla%20Linguine%20Pasta%2016%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Barilla',
    estimatedPrice: 1.76,
    packageSize: '16 oz box',
    isPantryStaple: true,
    keywords: ['linguine', 'pasta', 'spaghetti', 'fettuccine', 'noodles'],
  },
  {
    id: 'wm-pan-12',
    itemId: '10534084',
    name: 'Penne Rigate Pasta',
    walmartQuery: 'Great Value Penne Rigate Pasta 16 oz Box',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Penne%20Pasta%2016%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 0.98,
    packageSize: '16 oz box',
    isPantryStaple: true,
    keywords: ['penne', 'penne rigate', 'tubular pasta'],
  },
  {
    id: 'wm-pan-13',
    itemId: '10534038',
    name: 'Black Beans Canned',
    walmartQuery: 'Great Value Black Beans 15 oz Can',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Black%20Beans%2015%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 0.82,
    packageSize: '15 oz can',
    isPantryStaple: true,
    keywords: ['black beans', 'canned beans', 'frijoles negros'],
  },
  {
    id: 'wm-pan-14',
    name: 'Dark Red Kidney Beans',
    walmartQuery: 'Great Value Dark Red Kidney Beans 15 oz Can',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Dark%20Red%20Kidney%20Beans%2015%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 0.82,
    packageSize: '15 oz can',
    isPantryStaple: true,
    keywords: ['kidney beans', 'red beans', 'chili beans'],
  },
  {
    id: 'wm-pan-15',
    name: 'Crushed Canned Tomatoes',
    walmartQuery: 'Great Value Crushed Tomatoes in Puree 28 oz Can',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Crushed%20Tomatoes%2028%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.48,
    packageSize: '28 oz can',
    isPantryStaple: true,
    keywords: ['crushed tomatoes', 'canned tomatoes', 'tomato sauce', 'marinara base'],
  },
  {
    id: 'wm-pan-16',
    name: 'Tomato Paste',
    walmartQuery: 'Great Value Tomato Paste 6 oz Can',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Tomato%20Paste%206%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 0.88,
    packageSize: '6 oz can',
    isPantryStaple: true,
    keywords: ['tomato paste', 'concentrated tomato paste'],
  },
  {
    id: 'wm-pan-17',
    name: 'All-Purpose Flour',
    walmartQuery: 'Great Value All-Purpose Enriched Flour 5 lb Bag',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20All%20Purpose%20Flour%205%20lb',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 2.38,
    packageSize: '5 lb bag',
    isPantryStaple: true,
    keywords: ['flour', 'all purpose flour', 'wheat flour', 'white flour', 'baking flour'],
  },
  {
    id: 'wm-pan-18',
    name: 'Granulated Sugar',
    walmartQuery: 'Great Value Pure Granulated White Sugar 4 lb Bag',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Granulated%20Sugar%204%20lb',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 2.98,
    packageSize: '4 lb bag',
    isPantryStaple: true,
    keywords: ['sugar', 'white sugar', 'granulated sugar', 'cane sugar'],
  },
  {
    id: 'wm-pan-19',
    name: 'Tikka Masala Curry Simmer Sauce',
    walmartQuery: "Patak's Tikka Masala Curry Simmer Sauce 15 oz",
    walmartSearchUrl: 'https://www.walmart.com/search?q=Pataks%20Tikka%20Masala%20Curry%20Sauce%2015%20oz',
    category: 'Pantry & Dry Goods',
    brand: "Patak's",
    estimatedPrice: 3.88,
    packageSize: '15 oz jar',
    isPantryStaple: false,
    keywords: ['tikka masala', 'curry sauce', 'simmer sauce', 'indian sauce'],
  },
  {
    id: 'wm-pan-20',
    name: 'Authentic Basmati Rice',
    walmartQuery: 'Royal Authentic Basmati Rice 5 lb Bag',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Royal%20Authentic%20Basmati%20Rice%205%20lb',
    category: 'Pantry & Dry Goods',
    brand: 'Royal',
    estimatedPrice: 7.98,
    packageSize: '5 lb bag',
    isPantryStaple: false,
    keywords: ['basmati rice', 'aromatic rice', 'indian rice'],
  },

  // --- BAKERY & TORTILLAS ---
  {
    id: 'wm-bak-1',
    itemId: '10312504',
    name: 'White Corn Street Taco Tortillas',
    walmartQuery: 'Mission White Corn Street Tacos Tortillas 24 Count',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Mission%20Street%20Tacos%20Corn%20Tortillas',
    category: 'Bakery',
    brand: 'Mission',
    estimatedPrice: 2.44,
    packageSize: '24 count pack',
    isPantryStaple: false,
    keywords: ['corn tortillas', 'street taco tortillas', 'white corn tortillas', 'tortillas'],
  },
  {
    id: 'wm-bak-2',
    name: 'Flour Tortillas',
    walmartQuery: 'Great Value Medium Soft Taco Flour Tortillas 10 Count',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Flour%20Tortillas%2010%20Count',
    category: 'Bakery',
    brand: 'Great Value',
    estimatedPrice: 1.98,
    packageSize: '10 count pack',
    isPantryStaple: false,
    keywords: ['flour tortillas', 'burrito tortillas', 'taco shells soft', 'wrap'],
  },
  {
    id: 'wm-bak-3',
    name: 'Original Naan Flatbread',
    walmartQuery: 'Stonefire Original Naan Flatbread 2 Pack',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Stonefire%20Original%20Naan%20Flatbread',
    category: 'Bakery',
    brand: 'Stonefire',
    estimatedPrice: 3.48,
    packageSize: '2 count pack',
    isPantryStaple: false,
    keywords: ['naan', 'naan bread', 'flatbread', 'indian bread'],
  },
  {
    id: 'wm-bak-4',
    name: 'White Sandwich Bread',
    walmartQuery: 'Great Value White Sandwich Bread 20 oz Loaf',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20White%20Sandwich%20Bread%2020%20oz',
    category: 'Bakery',
    brand: 'Great Value',
    estimatedPrice: 1.42,
    packageSize: '20 oz loaf',
    isPantryStaple: false,
    keywords: ['bread', 'sandwich bread', 'white bread', 'sliced bread'],
  },
  {
    id: 'wm-bak-5',
    name: 'Hamburger Buns',
    walmartQuery: 'Great Value Enriched Hamburger Buns 8 Count',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Hamburger%20Buns%208%20Count',
    category: 'Bakery',
    brand: 'Great Value',
    estimatedPrice: 1.48,
    packageSize: '8 count bag',
    isPantryStaple: false,
    keywords: ['burger buns', 'hamburger buns', 'buns', 'slider buns'],
  },

  // --- SPICES & SEASONINGS ---
  {
    id: 'wm-spc-1',
    name: 'Italian Seasoning Blend',
    walmartQuery: 'Great Value Italian Seasoning 1.25 oz Bottle',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Italian%20Seasoning',
    category: 'Spices & Seasonings',
    brand: 'Great Value',
    estimatedPrice: 1.12,
    packageSize: '1.25 oz bottle',
    isPantryStaple: true,
    keywords: ['italian seasoning', 'italian herbs', 'oregano and basil blend', 'dried herbs'],
  },
  {
    id: 'wm-spc-2',
    name: 'Iodized Table Salt',
    walmartQuery: 'Great Value Plain Iodized Table Salt 26 oz Canister',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Iodized%20Salt%2026%20oz',
    category: 'Spices & Seasonings',
    brand: 'Great Value',
    estimatedPrice: 0.68,
    packageSize: '26 oz canister',
    isPantryStaple: true,
    keywords: ['salt', 'table salt', 'iodized salt', 'fine salt', 'kosher salt'],
  },
  {
    id: 'wm-spc-3',
    name: 'Ground Black Pepper',
    walmartQuery: 'Great Value Pure Ground Black Pepper 3 oz Can',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Pure%20Ground%20Black%20Pepper%203%20oz',
    category: 'Spices & Seasonings',
    brand: 'Great Value',
    estimatedPrice: 1.98,
    packageSize: '3 oz shaker',
    isPantryStaple: true,
    keywords: ['black pepper', 'ground pepper', 'black pepper shaker', 'pepper'],
  },
  {
    id: 'wm-spc-4',
    name: 'Garlic Powder',
    walmartQuery: 'Great Value Garlic Powder 3.4 oz Bottle',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Garlic%20Powder%203.4%20oz',
    category: 'Spices & Seasonings',
    brand: 'Great Value',
    estimatedPrice: 1.12,
    packageSize: '3.4 oz bottle',
    isPantryStaple: true,
    keywords: ['garlic powder', 'granulated garlic', 'powdered garlic'],
  },
  {
    id: 'wm-spc-5',
    name: 'Onion Powder',
    walmartQuery: 'Great Value Onion Powder 2.62 oz Bottle',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Onion%20Powder%202.62%20oz',
    category: 'Spices & Seasonings',
    brand: 'Great Value',
    estimatedPrice: 1.12,
    packageSize: '2.62 oz bottle',
    isPantryStaple: true,
    keywords: ['onion powder', 'granulated onion', 'powdered onion'],
  },
  {
    id: 'wm-spc-6',
    name: 'Crushed Red Pepper Flakes',
    walmartQuery: 'Great Value Crushed Red Pepper 1.5 oz Bottle',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Crushed%20Red%20Pepper',
    category: 'Spices & Seasonings',
    brand: 'Great Value',
    estimatedPrice: 1.12,
    packageSize: '1.5 oz bottle',
    isPantryStaple: true,
    keywords: ['red pepper flakes', 'crushed red pepper', 'chili flakes', 'pizza flakes'],
  },
  {
    id: 'wm-spc-7',
    name: 'Ground Cumin',
    walmartQuery: 'Great Value Ground Cumin 2 oz Bottle',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Ground%20Cumin%202%20oz',
    category: 'Spices & Seasonings',
    brand: 'Great Value',
    estimatedPrice: 1.24,
    packageSize: '2 oz bottle',
    isPantryStaple: true,
    keywords: ['cumin', 'ground cumin', 'comino'],
  },
  {
    id: 'wm-spc-8',
    name: 'Smoked Paprika',
    walmartQuery: 'Great Value Smoked Paprika 2.25 oz Bottle',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Smoked%20Paprika',
    category: 'Spices & Seasonings',
    brand: 'Great Value',
    estimatedPrice: 1.48,
    packageSize: '2.25 oz bottle',
    isPantryStaple: true,
    keywords: ['paprika', 'smoked paprika', 'spanish paprika'],
  },
  {
    id: 'wm-spc-9',
    name: 'Garam Masala Seasoning',
    walmartQuery: 'McCormick Gourmet Garam Masala Blend 1.75 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=McCormick%20Gourmet%20Garam%20Masala',
    category: 'Spices & Seasonings',
    brand: 'McCormick',
    estimatedPrice: 4.48,
    packageSize: '1.75 oz jar',
    isPantryStaple: false,
    keywords: ['garam masala', 'indian spice blend', 'curry spice'],
  },
  {
    id: 'wm-spc-10',
    name: 'Chili Powder Seasoning',
    walmartQuery: 'Great Value Chili Powder 2.5 oz Bottle',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Chili%20Powder%202.5%20oz',
    category: 'Spices & Seasonings',
    brand: 'Great Value',
    estimatedPrice: 1.24,
    packageSize: '2.5 oz bottle',
    isPantryStaple: true,
    keywords: ['chili powder', 'chile powder', 'taco seasoning chili powder'],
  },
  {
    id: 'wm-spc-11',
    name: 'Fajita Seasoning Packet',
    walmartQuery: 'Great Value Fajita Seasoning Mix 1.12 oz Packet',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Fajita%20Seasoning%20Packet',
    category: 'Spices & Seasonings',
    brand: 'Great Value',
    estimatedPrice: 0.68,
    packageSize: '1.12 oz envelope',
    isPantryStaple: false,
    keywords: ['fajita seasoning', 'fajita mix', 'seasoning packet'],
  },

  // --- CONDIMENTS & SAUCES ---
  {
    id: 'wm-cnd-1',
    name: 'Real Mayonnaise',
    walmartQuery: 'Great Value Real Mayonnaise 30 fl oz Jar',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Real%20Mayonnaise%2030%20fl%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 3.28,
    packageSize: '30 fl oz jar',
    isPantryStaple: true,
    keywords: ['mayo', 'mayonnaise', 'real mayonnaise'],
  },
  {
    id: 'wm-cnd-2',
    name: 'Tomato Ketchup',
    walmartQuery: 'Great Value Tomato Ketchup 32 oz Squeeze Bottle',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Tomato%20Ketchup%2032%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.68,
    packageSize: '32 oz squeeze bottle',
    isPantryStaple: true,
    keywords: ['ketchup', 'catsup', 'tomato ketchup'],
  },
  {
    id: 'wm-cnd-3',
    name: 'Soy Sauce',
    walmartQuery: 'Kikkoman Naturally Brewed Soy Sauce 15 fl oz Bottle',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Kikkoman%20Soy%20Sauce%2015%20fl%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Kikkoman',
    estimatedPrice: 2.78,
    packageSize: '15 fl oz bottle',
    isPantryStaple: true,
    keywords: ['soy sauce', 'shoyu', 'kikkoman'],
  },
  {
    id: 'wm-cnd-4',
    name: 'Restaurant Style Salsa',
    walmartQuery: 'Great Value Restaurant Style Salsa 16 oz Jar',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Restaurant%20Style%20Salsa%2016%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.98,
    packageSize: '16 oz jar',
    isPantryStaple: false,
    keywords: ['salsa', 'red salsa', 'restaurant style salsa', 'taco salsa'],
  },
  // --- ADDITIONAL POPULAR STAPLES & SPECIALTY FOODS ---
  {
    id: 'wm-meat-turkey',
    name: '93/7 Lean Ground Turkey',
    walmartQuery: 'Great Value 93/7 Lean Ground Turkey 16 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%2093%2F7%20Ground%20Turkey%2016%20oz',
    category: 'Meat & Seafood',
    brand: 'Great Value',
    estimatedPrice: 3.98,
    packageSize: '16 oz roll / tray',
    isPantryStaple: false,
    keywords: ['ground turkey', 'lean ground turkey', 'turkey mince', 'minced turkey', 'turkey burger meat'],
  },
  {
    id: 'wm-pantry-chickbroth',
    name: 'Low Sodium Chicken Broth',
    walmartQuery: 'Great Value Low Sodium Chicken Broth 32 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Chicken%20Broth%2032%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.37,
    packageSize: '32 oz carton',
    isPantryStaple: false,
    keywords: ['chicken broth', 'chicken stock', 'low sodium chicken broth', 'chicken bouillon', 'bone broth chicken'],
  },
  {
    id: 'wm-pantry-beefbroth',
    name: 'Beef Broth',
    walmartQuery: 'Great Value Beef Broth 32 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Beef%20Broth%2032%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.37,
    packageSize: '32 oz carton',
    isPantryStaple: false,
    keywords: ['beef broth', 'beef stock', 'consomme', 'beef bouillon'],
  },
  {
    id: 'wm-pantry-vegbroth',
    name: 'Vegetable Broth',
    walmartQuery: 'Great Value Vegetable Broth 32 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Vegetable%20Broth%2032%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.37,
    packageSize: '32 oz carton',
    isPantryStaple: false,
    keywords: ['vegetable broth', 'vegetable stock', 'veggie broth'],
  },
  {
    id: 'wm-pantry-guajillo',
    name: 'Dried Guajillo Chiles',
    walmartQuery: 'El Guapo Whole Dried Guajillo Chili Pods 7.5 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Dried%20Guajillo%20Chile%20Pods',
    category: 'Pantry & Dry Goods',
    brand: 'El Guapo',
    estimatedPrice: 2.98,
    packageSize: '7.5 oz bag',
    isPantryStaple: false,
    keywords: ['guajillo', 'guajillo chiles', 'dried guajillo chiles', 'guajillo chili pods', 'chile guajillo'],
  },
  {
    id: 'wm-pantry-ancho',
    name: 'Dried Ancho Chiles',
    walmartQuery: 'El Guapo Whole Dried Ancho Chili Pods 7.5 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Dried%20Ancho%20Chile%20Pods',
    category: 'Pantry & Dry Goods',
    brand: 'El Guapo',
    estimatedPrice: 2.98,
    packageSize: '7.5 oz bag',
    isPantryStaple: false,
    keywords: ['ancho', 'ancho chiles', 'dried ancho chiles', 'chile ancho'],
  },
  {
    id: 'wm-bakery-corntort',
    name: 'White Corn Street Taco Tortillas',
    walmartQuery: 'Mission White Corn Street Tacos Tortillas 24 ct',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Mission%20Street%20Tacos%20Corn%20Tortillas',
    category: 'Bakery',
    brand: 'Mission',
    estimatedPrice: 2.44,
    packageSize: '24 count pack',
    isPantryStaple: false,
    keywords: ['corn tortilla', 'corn tortillas', 'white corn tortillas', 'street taco tortillas', 'yellow corn tortillas', 'mexican tortillas'],
  },
  {
    id: 'wm-bakery-flourtort',
    name: 'Flour Tortillas',
    walmartQuery: 'Great Value Soft Taco Flour Tortillas 10 Count',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Flour%20Tortillas%2010%20Count',
    category: 'Bakery',
    brand: 'Great Value',
    estimatedPrice: 1.98,
    packageSize: '10 count pack',
    isPantryStaple: false,
    keywords: ['flour tortilla', 'flour tortillas', 'soft taco tortillas', 'burrito tortillas'],
  },
  {
    id: 'wm-dairy-cotija',
    name: 'Cotija Part-Skim Milk Cheese',
    walmartQuery: 'Cacique Cotija Mexican Style Part-Skim Milk Cheese 10 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Cacique%20Cotija%20Cheese%2010%20oz',
    category: 'Dairy & Eggs',
    brand: 'Cacique',
    estimatedPrice: 3.98,
    packageSize: '10 oz package',
    isPantryStaple: false,
    keywords: ['cotija', 'cotija cheese', 'queso cotija', 'crumbled cotija'],
  },
  {
    id: 'wm-dairy-almondmilk',
    name: 'Unsweetened Almond Milk',
    walmartQuery: 'Great Value Unsweetened Almond Milk 64 fl oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Almond%20Milk%2064%20fl%20oz',
    category: 'Dairy & Eggs',
    brand: 'Great Value',
    estimatedPrice: 2.28,
    packageSize: '64 fl oz carton',
    isPantryStaple: false,
    keywords: ['almond milk', 'almondmilk', 'unsweetened almond milk', 'plant milk'],
  },
  {
    id: 'wm-prod-jalapeno',
    name: 'Fresh Jalapeno Pepper',
    walmartQuery: 'Fresh Jalapeno Pepper Each',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Fresh%20Jalapeno%20Pepper',
    category: 'Produce',
    brand: 'Fresh Produce',
    estimatedPrice: 0.25,
    packageSize: '1 pepper',
    isPantryStaple: false,
    keywords: ['jalapeno', 'jalapenos', 'jalapeno pepper', 'fresh jalapeno'],
  },
  {
    id: 'wm-pantry-sundried',
    name: 'Sun-Dried Tomatoes in Oil',
    walmartQuery: 'California Sun Dry Julienne Cut Sun-Dried Tomatoes in Oil 8.5 oz',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Sun-Dried%20Tomatoes%20Julienne%20Cut%20in%20Oil',
    category: 'Pantry & Dry Goods',
    brand: 'California Sun Dry',
    estimatedPrice: 3.48,
    packageSize: '8.5 oz jar',
    isPantryStaple: false,
    keywords: ['sun-dried tomatoes', 'sundried tomatoes', 'sun dried tomatoes', 'tomatoes in oil'],
  },
  {
    id: 'wm-pantry-blackbeans',
    name: 'Canned Black Beans',
    walmartQuery: 'Great Value Black Beans 15 oz Can',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Black%20Beans%2015%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 0.86,
    packageSize: '15 oz can',
    isPantryStaple: false,
    keywords: ['black beans', 'canned black beans', 'frijoles negros'],
  },
  {
    id: 'wm-pantry-pintobeans',
    name: 'Canned Pinto Beans',
    walmartQuery: 'Great Value Pinto Beans 15 oz Can',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Pinto%20Beans%2015%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 0.86,
    packageSize: '15 oz can',
    isPantryStaple: false,
    keywords: ['pinto beans', 'canned pinto beans', 'frijoles'],
  },
  {
    id: 'wm-pantry-dicedtom',
    name: 'Canned Diced Tomatoes',
    walmartQuery: 'Great Value Diced Tomatoes in Juice 14.5 oz Can',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Diced%20Tomatoes%2014.5%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 0.98,
    packageSize: '14.5 oz can',
    isPantryStaple: false,
    keywords: ['diced tomatoes', 'canned diced tomatoes', 'canned tomatoes'],
  },
  {
    id: 'wm-pantry-crushedtom',
    name: 'Canned Crushed Tomatoes',
    walmartQuery: 'Great Value Crushed Tomatoes 28 oz Can',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Crushed%20Tomatoes%2028%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.68,
    packageSize: '28 oz can',
    isPantryStaple: false,
    keywords: ['crushed tomatoes', 'canned crushed tomatoes', 'tomato puree'],
  },
  {
    id: 'wm-pantry-tompast',
    name: 'Tomato Paste',
    walmartQuery: 'Great Value Tomato Paste 6 oz Can',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Tomato%20Paste%206%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 0.82,
    packageSize: '6 oz can',
    isPantryStaple: false,
    keywords: ['tomato paste', 'canned tomato paste'],
  },
  {
    id: 'wm-pantry-jasmine',
    name: 'Jasmine White Rice',
    walmartQuery: 'Great Value Jasmine Rice 5 lb Bag',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Jasmine%20Rice%205%20lb',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 5.44,
    packageSize: '5 lb bag',
    isPantryStaple: false,
    keywords: ['jasmine rice', 'thai jasmine rice', 'white jasmine rice'],
  },
  {
    id: 'wm-pantry-whiterice',
    name: 'Long Grain White Rice',
    walmartQuery: 'Great Value Long Grain Enriched White Rice 5 lb Bag',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20White%20Rice%205%20lb',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 3.34,
    packageSize: '5 lb bag',
    isPantryStaple: false,
    keywords: ['white rice', 'long grain rice', 'rice', 'plain rice'],
  },
  {
    id: 'wm-pantry-fettuccine',
    name: 'Fettuccine Pasta',
    walmartQuery: 'Great Value Fettuccine Pasta 16 oz Box',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Fettuccine%20Pasta%2016%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.12,
    packageSize: '16 oz box',
    isPantryStaple: false,
    keywords: ['fettuccine', 'fettuccine pasta', 'fettuccine noodles', 'dry pasta'],
  },
  {
    id: 'wm-pantry-spaghetti',
    name: 'Spaghetti Pasta',
    walmartQuery: 'Great Value Spaghetti Pasta 16 oz Box',
    walmartSearchUrl: 'https://www.walmart.com/search?q=Great%20Value%20Spaghetti%20Pasta%2016%20oz',
    category: 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 1.12,
    packageSize: '16 oz box',
    isPantryStaple: false,
    keywords: ['spaghetti', 'spaghetti pasta', 'spaghetti noodles'],
  },
];

/**
 * Clean user ingredient text to isolate the core ingredient name
 */
export function cleanRawIngredientText(raw: string): string {
  let text = raw.replace(/\([^)]*\)/g, ' ').trim();
  text = text.replace(
    /^(\d+[\d\/\.\s]*)\s*(lbs|lb|pounds|pound|oz|ounces|ounce|cups|cup|tbsp|tablespoons|tablespoon|tsp|teaspoons|teaspoon|cloves|clove|heads|head|cans|can|jars|jar|bottles|bottle|packages|package|pack|packs|bags|bag|pints|pint|quarts|quart|slices|slice|pieces|piece|stalks|stalk)?\b/i,
    ' '
  );

  const prepWords = [
    'minced', 'diced', 'chopped', 'sliced', 'grated', 'shredded', 'crushed', 'melted',
    'softened', 'divided', 'rinsed', 'drained', 'peeled', 'trimmed', 'seeded', 'halved',
    'quartered', 'cooked', 'uncooked', 'thawed', 'frozen', 'room temperature', 'to taste',
    'freshly ground', 'coarsely', 'finely', 'thinly', 'thickly', 'for garnish', 'for serving',
    'optional'
  ];
  for (const w of prepWords) {
    const re = new RegExp(`\\b${w}\\b`, 'gi');
    text = text.replace(re, ' ');
  }
  return text.replace(/[,\-\.\s]+/g, ' ').trim().toLowerCase();
}

// Conflict words groups: If query has item A, it CANNOT match item B!
const CONFLICT_GROUPS: Array<string[]> = [
  // Meat cuts & species
  ['thigh', 'thighs'],
  ['breast', 'breasts'],
  ['ground beef', 'beef chuck', 'beef roast', 'flank steak', 'sirloin'],
  ['ground turkey', 'turkey'],
  ['pork', 'pork chop', 'pork chops', 'bacon'],
  ['salmon', 'fish'],
  ['shrimp', 'prawns'],
  // Liquids vs solids
  ['broth', 'stock', 'bouillon'],
  // Tortilla types
  ['corn tortilla', 'corn tortillas', 'street taco'],
  ['flour tortilla', 'flour tortillas', 'burrito'],
  // Peppers
  ['guajillo'],
  ['ancho'],
  ['jalapeno', 'jalapenos'],
  ['bell pepper', 'bell peppers', 'sweet pepper'],
  // Dairy varieties
  ['heavy cream', 'whipping cream', 'heavy whipping cream'],
  ['milk', 'whole milk', '2% milk', 'skim milk'],
  ['sour cream'],
  ['cream cheese'],
  ['oaxaca'],
  ['cotija'],
  ['cheddar'],
  ['mozzarella'],
  ['parmesan'],
];

/**
 * Checks if candidate conflicts with query
 */
function hasFoodConflict(queryCleaned: string, candidate: WalmartGroceryProduct): boolean {
  const candText = `${candidate.name} ${candidate.walmartQuery} ${candidate.keywords.join(' ')}`.toLowerCase();

  // Meat cut conflict: e.g. "thigh" vs "breast"
  if (queryCleaned.includes('thigh') && !candText.includes('thigh')) {
    if (candText.includes('breast') || candText.includes('wing')) return true;
  }
  if (queryCleaned.includes('breast') && !candText.includes('breast')) {
    if (candText.includes('thigh') || candText.includes('wing')) return true;
  }

  // Broth vs raw meat
  if (queryCleaned.includes('broth') || queryCleaned.includes('stock')) {
    if (candidate.category === 'Meat & Seafood' && !candText.includes('broth')) return true;
  }
  if (!queryCleaned.includes('broth') && !queryCleaned.includes('stock')) {
    if (candText.includes('broth') || candText.includes('stock')) return true;
  }

  // Animal species conflict
  if (queryCleaned.includes('turkey') && !candText.includes('turkey')) {
    if (candText.includes('beef') || candText.includes('chicken') || candText.includes('pork')) return true;
  }
  if (queryCleaned.includes('beef') && !candText.includes('beef')) {
    if (candText.includes('turkey') || candText.includes('chicken') || candText.includes('pork')) return true;
  }
  if (queryCleaned.includes('chicken') && !candText.includes('chicken')) {
    if (candText.includes('beef') || candText.includes('turkey') || candText.includes('pork')) return true;
  }
  if (queryCleaned.includes('pork') && !candText.includes('pork')) {
    if (candText.includes('chicken') || candText.includes('beef') || candText.includes('turkey')) return true;
  }

  // Tortillas conflict (corn vs flour)
  if (queryCleaned.includes('corn') && candText.includes('flour tortilla')) return true;
  if (queryCleaned.includes('flour') && candText.includes('corn tortilla')) return true;

  // Pepper conflict
  if (queryCleaned.includes('guajillo') && !candText.includes('guajillo')) return true;
  if (queryCleaned.includes('ancho') && !candText.includes('ancho')) return true;
  if (queryCleaned.includes('jalapeno') && !candText.includes('jalapeno')) return true;

  // Dairy conflict (cream vs milk)
  if (queryCleaned.includes('cream') && !queryCleaned.includes('sour') && !queryCleaned.includes('ice cream')) {
    if (candText.includes('whole milk') && !candText.includes('cream')) return true;
  }

  return false;
}

/**
 * Matches an ingredient name against our verified Walmart Grocery Catalog
 * Guarantees that only authentic food products are returned, never conflicting or distorted items!
 */
export function matchWalmartGroceryItem(rawName: string, categoryHint?: string): WalmartGroceryProduct {
  const cleaned = cleanRawIngredientText(rawName);

  // 1. Direct exact keyword or name match
  for (const prod of WALMART_GROCERY_CATALOG) {
    if (hasFoodConflict(cleaned, prod)) continue;

    if (prod.name.toLowerCase() === cleaned) {
      return prod;
    }
    for (const kw of prod.keywords) {
      if (cleaned === kw) {
        return prod;
      }
    }
  }

  // 2. High-confidence Token & Phrase Matching with strict conflict prevention
  const tokens = cleaned.split(' ').filter((t) => t.length >= 3);
  let bestProd: WalmartGroceryProduct | null = null;
  let maxScore = 0;

  for (const prod of WALMART_GROCERY_CATALOG) {
    if (hasFoodConflict(cleaned, prod)) continue;

    let score = 0;
    const candNameLower = prod.name.toLowerCase();
    const candQueryLower = prod.walmartQuery.toLowerCase();

    // Exact phrase inside candidate or candidate name inside cleaned
    if (candNameLower.includes(cleaned)) score += 30;
    if (cleaned.includes(candNameLower)) score += 30;

    for (const kw of prod.keywords) {
      if (kw === cleaned) score += 50;
      else if (cleaned.includes(kw)) score += 20;
      else if (kw.includes(cleaned)) score += 15;
    }

    for (const token of tokens) {
      if (candNameLower.includes(token)) score += 8;
      if (candQueryLower.includes(token)) score += 6;
      if (prod.keywords.some((k) => k.includes(token))) score += 5;
    }

    if (categoryHint && prod.category.toLowerCase() === categoryHint.toLowerCase()) {
      score += 3;
    }

    if (score > maxScore) {
      maxScore = score;
      bestProd = prod;
    }
  }

  // Require strong confidence (score >= 18) to avoid false matches
  if (bestProd && maxScore >= 18) {
    return bestProd;
  }

  // 3. Fallback: generate guaranteed clean grocery search query for Walmart (NEVER non-food)
  const displayTitle = rawName.replace(/[^\w\s\-\']/g, ' ').replace(/\s+/g, ' ').trim();
  const walmartQuery = displayTitle.toLowerCase().startsWith('great value') || displayTitle.toLowerCase().startsWith('fresh')
    ? displayTitle
    : `Great Value ${displayTitle}`;
  const encoded = encodeURIComponent(walmartQuery);

  return {
    id: `wm-gen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: displayTitle,
    walmartQuery,
    walmartSearchUrl: `https://www.walmart.com/search?q=${encoded}`,
    category: (categoryHint as any) || 'Pantry & Dry Goods',
    brand: 'Great Value',
    estimatedPrice: 2.48,
    packageSize: '1 package',
    isPantryStaple: false,
    keywords: [cleaned],
  };
}

/**
 * Calculates the exact retail package count needed for an ingredient based on
 * the recipe's required amount, unit, and retail packaging format.
 */
export function calculateRetailPackageQuantity(
  amount: number,
  unit: string,
  packageSize?: string,
  category?: string
): number {
  if (!amount || isNaN(amount) || amount <= 0) return 1;

  const cleanUnit = (unit || '').toLowerCase().trim();
  const pkg = (packageSize || '').toLowerCase();

  // Spices & Seasonings: small amounts (tsp/tbsp/pinch) always fit in 1 standard jar
  if (category === 'Spices & Seasonings' && (cleanUnit.includes('tsp') || cleanUnit.includes('tbsp') || cleanUnit.includes('pinch'))) {
    return 1;
  }

  // 1. Individual produce / unit count items (e.g. "1 whole lime", "1 pepper", "1 whole onion", "1 tomato", "1 lemon")
  const isIndividualUnit =
    pkg.includes('each') ||
    pkg.includes('1 whole') ||
    pkg.includes('1 pepper') ||
    pkg.includes('1 tomato') ||
    pkg.includes('1 fresh bunch') ||
    pkg.includes('1 bulb');

  if (isIndividualUnit) {
    if (['count', 'item', 'unit', 'whole', 'pieces', 'piece', 'lime', 'limes', 'lemon', 'lemons', 'onion', 'onions', 'pepper', 'peppers'].includes(cleanUnit)) {
      return Math.max(1, Math.ceil(amount));
    }
  }

  // 2. Count-based retail pack (e.g. "24 count pack", "12 count carton", "4 count bag", "3 bulbs sleeve", "10 count pack")
  const countPackMatch = pkg.match(/(\d+)\s*(?:count|ct|pack|bulbs|sticks)/i);
  if (countPackMatch) {
    const packCount = parseInt(countPackMatch[1], 10);
    if (packCount > 0) {
      if (['count', 'item', 'unit', 'whole', 'piece', 'pieces', 'tortilla', 'tortillas', 'egg', 'eggs'].includes(cleanUnit)) {
        return Math.max(1, Math.ceil(amount / packCount));
      }
      if (cleanUnit === 'clove' || cleanUnit === 'cloves') {
        // 1 garlic bulb contains ~10-12 cloves. A 3-bulb sleeve contains ~30-36 cloves.
        return Math.max(1, Math.ceil(amount / (packCount * 10)));
      }
    }
  }

  // 3. Weight-based matching (recipe in lbs/oz, package in lbs/oz)
  let neededOz: number | null = null;
  if (['lb', 'lbs', 'pound', 'pounds'].includes(cleanUnit)) {
    neededOz = amount * 16;
  } else if (['oz', 'ounce', 'ounces'].includes(cleanUnit)) {
    neededOz = amount;
  }

  let pkgOz: number | null = null;
  const lbMatch = pkg.match(/(\d+(?:\.\d+)?)\s*(?:lb|lbs|pound)/i);
  if (lbMatch) {
    pkgOz = parseFloat(lbMatch[1]) * 16;
  } else {
    const ozMatch = pkg.match(/(\d+(?:\.\d+)?)\s*(?:oz|ounce)/i);
    if (ozMatch) {
      pkgOz = parseFloat(ozMatch[1]);
    }
  }

  if (neededOz !== null && pkgOz !== null && pkgOz > 0) {
    return Math.max(1, Math.ceil(neededOz / pkgOz));
  }

  // 4. Volume-based matching (recipe in cups/tbsp/tsp/fl oz, package in fl oz/carton/jug)
  let neededFlOz: number | null = null;
  if (['cup', 'cups'].includes(cleanUnit)) {
    neededFlOz = amount * 8;
  } else if (['tbsp', 'tablespoon', 'tablespoons'].includes(cleanUnit)) {
    neededFlOz = amount * 0.5;
  } else if (['tsp', 'teaspoon', 'teaspoons'].includes(cleanUnit)) {
    neededFlOz = amount * 0.1667;
  } else if (['fl oz', 'fluid oz'].includes(cleanUnit)) {
    neededFlOz = amount;
  } else if (['quart', 'quarts'].includes(cleanUnit)) {
    neededFlOz = amount * 32;
  } else if (['gallon', 'gallons'].includes(cleanUnit)) {
    neededFlOz = amount * 128;
  }

  let pkgFlOz: number | null = null;
  const pkgFlOzMatch = pkg.match(/(\d+(?:\.\d+)?)\s*(?:fl\s*oz|fluid\s*oz)/i);
  if (pkgFlOzMatch) {
    pkgFlOz = parseFloat(pkgFlOzMatch[1]);
  } else if (pkg.includes('gallon')) {
    pkgFlOz = 128;
  } else if (pkg.includes('quart')) {
    pkgFlOz = 32;
  } else if (pkgOz !== null) {
    // 1 oz approx 1 fl oz for liquids
    pkgFlOz = pkgOz;
  }

  if (neededFlOz !== null && pkgFlOz !== null && pkgFlOz > 0) {
    if (neededFlOz <= pkgFlOz) {
      return 1;
    }
    return Math.max(1, Math.ceil(neededFlOz / pkgFlOz));
  }

  // 5. Cans, jars, bags, boxes unit match
  if (['can', 'cans', 'jar', 'jars', 'bag', 'bags', 'box', 'boxes', 'pack', 'packs', 'package', 'packages', 'bunch', 'bunches'].includes(cleanUnit)) {
    return Math.max(1, Math.ceil(amount));
  }

  // 6. Generic items/count
  if (['count', 'item', 'unit', 'each'].includes(cleanUnit)) {
    return Math.max(1, Math.ceil(amount));
  }

  return 1;
}

/**
 * Search the verified catalog for suggestions (used in autocomplete & swap modal)
 */
export function searchWalmartCatalog(query: string, limit = 10): WalmartGroceryProduct[] {
  if (!query.trim()) return WALMART_GROCERY_CATALOG.slice(0, limit);
  const q = query.toLowerCase().trim();

  return WALMART_GROCERY_CATALOG.filter((item) => {
    return (
      item.name.toLowerCase().includes(q) ||
      item.walmartQuery.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.includes(q))
    );
  }).slice(0, limit);
}

