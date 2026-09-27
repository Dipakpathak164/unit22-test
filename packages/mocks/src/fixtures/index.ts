import { components } from '@monorepo/api';

export type Brand = components['schemas']['Brand'];
export type Product = components['schemas']['Product'];

export interface CategoryConfig {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  matchingSlugs: string[];
}

export const MOCK_BRANDS: Brand[] = [
  { id: 'b-1', name: 'Royal Enfield', slug: 'royal-enfield', logoUrl: '/images/RoyalEnfield.jpg', productCount: 120 },
  { id: 'b-2', name: 'KTM Racing', slug: 'ktm', logoUrl: '/images/ktm.jpg', productCount: 85 },
  { id: 'b-3', name: 'TVS Racing', slug: 'tvs', logoUrl: '/images/tvs.png', productCount: 72 },
  { id: 'b-4', name: 'Yamaha Racing', slug: 'yamaha', logoUrl: '/images/yamaha.png', productCount: 54 },
  { id: 'b-5', name: 'BMW Motorrad', slug: 'bmw', logoUrl: '/images/bmw.png', productCount: 60 },
  { id: 'b-6', name: 'Honda Racing', slug: 'honda', logoUrl: '/images/honda.png', productCount: 68 },
  { id: 'b-7', name: 'Hero MotoCorp', slug: 'hero', logoUrl: '/images/hero.png', productCount: 45 },
  { id: 'b-8', name: 'Husqvarna', slug: 'husqvarna', logoUrl: '/images/husq.png', productCount: 32 },
  { id: 'b-9', name: 'Bajaj Auto', slug: 'bajaj', logoUrl: '/images/bajaj.avif', productCount: 50 },
  { id: 'b-10', name: 'Benelli', slug: 'benelli', logoUrl: '/images/beneli.png', productCount: 28 },
  { id: 'b-11', name: 'Piaggio', slug: 'piaggio', logoUrl: '/images/piagigo.png', productCount: 22 },
  { id: 'b-12', name: 'Brembo Brakes', slug: 'brembo', logoUrl: '/images/product_brake_disc.png', productCount: 45 },
  { id: 'b-13', name: 'Akrapovic Titanium', slug: 'akrapovic', logoUrl: '/images/product_exhaust.png', productCount: 30 },
  { id: 'b-14', name: 'Motul Factory Line', slug: 'motul', logoUrl: '/images/product_engine_oil.png', productCount: 64 },
  { id: 'b-15', name: 'AGV Helmets', slug: 'agv', logoUrl: '/images/hero_banner_touring.png', productCount: 40 },
  { id: 'b-16', name: 'Alpinestars', slug: 'alpinestars', logoUrl: '/images/hero_banner_brakes.png', productCount: 55 },
];

export const MOCK_BIKES: components['schemas']['FitmentBike'][] = [
  { id: 'bike-1', make: 'Royal Enfield', model: 'Interceptor 650', year: 2021 },
  { id: 'bike-2', make: 'KTM', model: 'Duke 390', year: 2022 },
  { id: 'bike-3', make: 'BMW', model: 'G 310 GS', year: 2023 },
];

export const CATEGORY_REGISTRY: CategoryConfig[] = [
  {
    id: 'cat-performance',
    slug: 'performance',
    title: 'Performance Parts & Exhaust Systems',
    subtitle: 'DYNO BENCHMARKED EXHAUSTS, INTAKES & ECU MAPS',
    description: 'Precision-manufactured performance exhaust systems, high-flow air filters, CNC machined velocity stacks, and dyno-proven power upgrades.',
    image: '/images/hero_banner_exhaust.png',
    matchingSlugs: ['performance', 'exhaust', 'engine'],
  },
  {
    id: 'cat-brakes',
    slug: 'brakes',
    title: 'Brake Systems & Rotors',
    subtitle: 'TRACK-SPEC CERAMIC ROTORS & SINTERED METAL PADS',
    description: 'High-friction sintered metal pads, 320mm drilled high-carbon brake discs, radial master cylinders, and braided steel brake lines.',
    image: '/images/product_brake_disc.png',
    matchingSlugs: ['brakes', 'brake'],
  },
  {
    id: 'cat-helmets',
    slug: 'helmets',
    title: 'Helmets & Riding Gear',
    subtitle: 'ECE 22.06 & DOT CERTIFIED FULL FACE TRACK HELMETS',
    description: 'Aerodynamic carbon composite helmets, PINLOCK anti-fog visors, emergency quick-release cheek pads, and high-velocity ventilation systems.',
    image: '/images/hero_banner_touring.png',
    matchingSlugs: ['helmets', 'helmet', 'gear'],
  },
  {
    id: 'cat-luggage',
    slug: 'luggage',
    title: 'Luggage & Touring Expedition Gear',
    subtitle: 'IP67 WATERPROOF ALUMINUM PANNIERS & TANK BAGS',
    description: '37L heavy-duty aircraft grade aluminum panniers, quick-release mounting racks, waterproof tail drypacks, and tank bags.',
    image: '/images/product_panniers.png',
    matchingSlugs: ['luggage', 'touring'],
  },
  {
    id: 'cat-lights',
    slug: 'lights',
    title: 'Lights & Electronics',
    subtitle: 'DUAL POD AUXILIARY LED FOG LIGHTS & HARNESSES',
    description: 'High-intensity dual-tone LED auxiliary lights, plug-and-play wiring harnesses, waterproof switches, and digital instrumentation.',
    image: '/images/product_aux_lights.png',
    matchingSlugs: ['lights', 'lighting', 'electronics'],
  },
  {
    id: 'cat-protection',
    slug: 'protection',
    title: 'Rider Protection & Body Armor',
    subtitle: 'CE LEVEL-2 CERTIFIED PROTECTIVE JACKETS & ARMOR',
    description: 'Abrasion-resistant 600D Cordura jackets, CE Level 2 back and chest armors, reinforced knee guards, and track-ready racing suits.',
    image: '/images/hero_banner_brakes.png',
    matchingSlugs: ['protection', 'gear', 'armor'],
  },
  {
    id: 'cat-garage',
    slug: 'garage',
    title: 'Garage, Oils & Care',
    subtitle: 'FULL SYNTHETIC ENGINE OILS & CHAIN MAINTENANCE KITS',
    description: 'Factory line 100% synthetic 10W40 engine lubricants, high-efficiency magnetic oil filters, chain lube, and workshop care tools.',
    image: '/images/product_engine_oil.png',
    matchingSlugs: ['garage', 'oil'],
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Interceptor 650 Sintered Brake Pads (Front)',
    slug: 'interceptor-650-brake-pads',
    brand: MOCK_BRANDS[11], // Brembo Brakes
    category: { id: 'c-1', name: 'Brake Systems', slug: 'brakes' },
    basePricePaise: 129900,
    images: ['/images/product_brake_pads.png', '/images/hero_banner_brakes.png'],
    variants: [
      {
        id: 'v-1',
        sku: 'RE-INT650-BP-FRONT',
        name: 'Front Set',
        pricePaise: 129900,
        stock: 50,
        attributes: { position: 'Front' },
      },
    ],
    compatibleBikeIds: ['bike-1'],
    specs: { Material: 'Sintered Metal', Position: 'Front' },
    inStock: true,
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: 'p-2',
    name: 'Akrapovic Titanium Slip-On Performance Exhaust',
    slug: 'akrapovic-titanium-exhaust',
    brand: MOCK_BRANDS[12], // Akrapovic Titanium
    category: { id: 'c-2', name: 'Performance', slug: 'performance' },
    basePricePaise: 4899900,
    images: ['/images/product_exhaust.png', '/images/hero_banner_exhaust.png'],
    variants: [
      {
        id: 'v-2',
        sku: 'AK-TIT-EXH-01',
        name: 'Titanium / Carbon Endcap',
        pricePaise: 4899900,
        stock: 12,
        attributes: { finish: 'Titanium' },
      },
    ],
    compatibleBikeIds: ['bike-1', 'bike-2'],
    specs: { Material: 'Titanium & Carbon', PowerGain: '+3.2 HP' },
    inStock: true,
    rating: 4.9,
    reviewCount: 18,
  },
  {
    id: 'p-3',
    name: 'Expedition Aluminum Panniers 37L (Pair)',
    slug: 'expedition-aluminum-panniers',
    brand: MOCK_BRANDS[0], // Royal Enfield
    category: { id: 'c-3', name: 'Luggage & Touring', slug: 'luggage' },
    basePricePaise: 2249900,
    images: ['/images/product_panniers.png', '/images/hero_banner_touring.png'],
    variants: [
      {
        id: 'v-3',
        sku: 'RE-ALU-PANNIER-37L',
        name: 'Brushed Aluminum 37L',
        pricePaise: 2249900,
        stock: 25,
        attributes: { capacity: '37 Litres' },
      },
    ],
    compatibleBikeIds: ['bike-1', 'bike-3'],
    specs: { Capacity: '37 Litres / Pair', Waterproof: 'IP67 Certified' },
    inStock: true,
    rating: 4.7,
    reviewCount: 31,
  },
  {
    id: 'p-4',
    name: 'Duke 390 Ceramic Drilled Brake Disc (Front 320mm)',
    slug: 'duke-390-brake-disc',
    brand: MOCK_BRANDS[1], // KTM Racing
    category: { id: 'c-4', name: 'Brake Systems', slug: 'brakes' },
    basePricePaise: 449900,
    images: ['/images/product_brake_disc.png', '/images/hero_banner_brakes.png'],
    variants: [
      {
        id: 'v-4',
        sku: 'KTM-D390-BD-320',
        name: '320mm Front Rotor',
        pricePaise: 449900,
        stock: 18,
        attributes: { diameter: '320mm' },
      },
    ],
    compatibleBikeIds: ['bike-2'],
    specs: { Diameter: '320mm Drilled', Material: 'High Carbon Steel' },
    inStock: true,
    rating: 4.9,
    reviewCount: 15,
  },
  {
    id: 'p-5',
    name: 'Motul 300V Factory Line 10W40 Synthetic Oil (4L)',
    slug: 'motul-300v-10w40-4l',
    brand: MOCK_BRANDS[13], // Motul Factory Line
    category: { id: 'c-5', name: 'Garage & Care', slug: 'garage' },
    basePricePaise: 385000,
    images: ['/images/product_engine_oil.png'],
    variants: [
      {
        id: 'v-5',
        sku: 'MOT-300V-10W40-4L',
        name: '4 Litre Canister',
        pricePaise: 385000,
        stock: 60,
        attributes: { volume: '4 Litres' },
      },
    ],
    compatibleBikeIds: ['bike-1', 'bike-2', 'bike-3'],
    specs: { Viscosity: '10W-40 Synthetic', Core: 'Ester Core Technology' },
    inStock: true,
    rating: 5.0,
    reviewCount: 42,
  },
  {
    id: 'p-6',
    name: 'Denali D4 Dual-Tone LED Auxiliary Lights (Kit)',
    slug: 'denali-d4-aux-lights',
    brand: MOCK_BRANDS[7], // Husqvarna
    category: { id: 'c-6', name: 'Lights & Electronics', slug: 'lights' },
    basePricePaise: 1499900,
    images: ['/images/product_aux_lights.png'],
    variants: [
      {
        id: 'v-6',
        sku: 'DEN-D4-LED-KIT',
        name: 'Dual Pod Light Kit',
        pricePaise: 1499900,
        stock: 14,
        attributes: { output: '8760 Lumens' },
      },
    ],
    compatibleBikeIds: ['bike-1', 'bike-3'],
    specs: { Brightness: '8760 Lumens', Beam: 'Hybrid Spot / Flood' },
    inStock: true,
    rating: 4.8,
    reviewCount: 19,
  },
  {
    id: 'p-7',
    name: 'AGV K6 S Full Face Carbon Composite Helmet',
    slug: 'agv-k6-s-full-face-helmet',
    brand: MOCK_BRANDS[14], // AGV Helmets
    category: { id: 'c-7', name: 'Helmets & Riding Gear', slug: 'helmets' },
    basePricePaise: 3499900,
    images: ['/images/hero_banner_touring.png'],
    variants: [
      {
        id: 'v-7',
        sku: 'AGV-K6S-MATTE-BLACK',
        name: 'Matte Black / Large',
        pricePaise: 3499900,
        stock: 20,
        attributes: { size: 'Large', color: 'Matte Black' },
      },
    ],
    compatibleBikeIds: ['bike-1', 'bike-2', 'bike-3'],
    specs: { SafetyRating: 'ECE 22.06', Weight: '1255 grams' },
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
  },
  {
    id: 'p-8',
    name: 'Arai Tour Cross 4 Adventure Dual-Sport Helmet',
    slug: 'arai-tour-cross-4-helmet',
    brand: MOCK_BRANDS[3], // Yamaha Racing
    category: { id: 'c-8', name: 'Helmets & Riding Gear', slug: 'helmets' },
    basePricePaise: 4299900,
    images: ['/images/hero_banner_touring.png'],
    variants: [
      {
        id: 'v-8',
        sku: 'ARAI-TC4-WHITE-M',
        name: 'Gloss White / Medium',
        pricePaise: 4299900,
        stock: 15,
        attributes: { size: 'Medium' },
      },
    ],
    compatibleBikeIds: ['bike-1', 'bike-3'],
    specs: { SafetyRating: 'SNELL & ECE Certified', Visor: 'Pinlock Ready' },
    inStock: true,
    rating: 5.0,
    reviewCount: 27,
  },
  {
    id: 'p-9',
    name: 'Alpinestars Supertech R Track Vented Boots',
    slug: 'alpinestars-supertech-r-boots',
    brand: MOCK_BRANDS[15], // Alpinestars
    category: { id: 'c-9', name: 'Rider Protection', slug: 'protection' },
    basePricePaise: 2999900,
    images: ['/images/hero_banner_brakes.png'],
    variants: [
      {
        id: 'v-9',
        sku: 'ALP-SUPR-BOOT-42',
        name: 'Black/Red / EU 42',
        pricePaise: 2999900,
        stock: 10,
        attributes: { size: 'EU 42' },
      },
    ],
    compatibleBikeIds: ['bike-1', 'bike-2'],
    specs: { ArmorLevel: 'CE Certified Level 2', Material: 'Microfiber & TPU' },
    inStock: true,
    rating: 4.9,
    reviewCount: 16,
  },
  {
    id: 'p-10',
    name: 'Dainese Super Speed 4 Leather Protection Jacket',
    slug: 'dainese-super-speed-4-jacket',
    brand: MOCK_BRANDS[4], // BMW Motorrad
    category: { id: 'c-10', name: 'Rider Protection', slug: 'protection' },
    basePricePaise: 5499900,
    images: ['/images/hero_banner_brakes.png'],
    variants: [
      {
        id: 'v-10',
        sku: 'DAI-SS4-JAC-50',
        name: 'Perforated Leather / 50',
        pricePaise: 5499900,
        stock: 8,
        attributes: { size: '50 Euro' },
      },
    ],
    compatibleBikeIds: ['bike-2', 'bike-3'],
    specs: { Material: 'D-Skin 2.0 Leather', Protection: 'Aluminum Shoulder Plates' },
    inStock: true,
    rating: 4.8,
    reviewCount: 22,
  },
  {
    id: 'p-11',
    name: 'Stage-1 Dyno Performance CNC Air Filter Kit',
    slug: 'stage-1-cnc-air-filter-kit',
    brand: MOCK_BRANDS[0], // Royal Enfield
    category: { id: 'c-11', name: 'Performance', slug: 'performance' },
    basePricePaise: 899900,
    images: ['/images/product_exhaust.png'],
    variants: [
      {
        id: 'v-11',
        sku: 'RE-STG1-AF-KIT',
        name: 'High-Flow Intake Kit',
        pricePaise: 899900,
        stock: 35,
        attributes: { type: 'Stage-1 Dyno' },
      },
    ],
    compatibleBikeIds: ['bike-1'],
    specs: { AirFlowGain: '+40% CFM', FilterMedia: 'Washable Cotton Mesh' },
    inStock: true,
    rating: 4.9,
    reviewCount: 33,
  },
  {
    id: 'p-12',
    name: 'Baja Designs Squadron Pro LED Fog Light Pods',
    slug: 'baja-designs-squadron-pro-led',
    brand: MOCK_BRANDS[5], // Honda Racing
    category: { id: 'c-12', name: 'Lights & Electronics', slug: 'lights' },
    basePricePaise: 1899900,
    images: ['/images/product_aux_lights.png'],
    variants: [
      {
        id: 'v-12',
        sku: 'BD-SQPRO-AMBER-KIT',
        name: 'Amber Driving Pods',
        pricePaise: 1899900,
        stock: 12,
        attributes: { color: 'Amber' },
      },
    ],
    compatibleBikeIds: ['bike-2', 'bike-3'],
    specs: { Lumens: '4900 Lumens / Pod', Rating: 'IP69K Waterproof' },
    inStock: true,
    rating: 4.9,
    reviewCount: 14,
  },
];

export const CATEGORY_BASE_PATH = '/collections';

export const getCategoryUrl = (slug: string): string => {
  return `${CATEGORY_BASE_PATH}/${slug}`;
};

export const getCategoryBySlug = (slug: string): CategoryConfig | undefined => {
  const normalized = slug.toLowerCase();
  return CATEGORY_REGISTRY.find(
    (c) => c.slug === normalized || c.matchingSlugs.includes(normalized)
  );
};

export const getProductsByCategorySlug = (slug: string): Product[] => {
  const category = getCategoryBySlug(slug);
  if (!category) return [];

  return MOCK_PRODUCTS.filter((product) =>
    category.matchingSlugs.some(
      (mSlug) =>
        product.category.slug.toLowerCase() === mSlug ||
        product.category.name.toLowerCase().includes(mSlug)
    )
  );
};

export const getBrandsForCategory = (slug: string): Brand[] => {
  const categoryProducts = getProductsByCategorySlug(slug);
  const categoryBrandIds = new Set(categoryProducts.map((p) => p.brand?.id).filter(Boolean));

  // Sort so brands with products in this category appear first, followed by all remaining official brands
  return [...MOCK_BRANDS].sort((a, b) => {
    const aHas = categoryBrandIds.has(a.id);
    const bHas = categoryBrandIds.has(b.id);
    if (aHas && !bHas) return -1;
    if (!aHas && bHas) return 1;
    return a.name.localeCompare(b.name);
  });
};

export const MOCK_ADMIN_USER: components['schemas']['AdminUser'] = {
  id: 'user-1',
  email: 'admin@motorcycle-store.in',
  name: 'Super Admin',
  role: 'Super Admin',
  permissions: [
    'product.read',
    'product.write',
    'promotion.read',
    'promotion.write',
    'order.read',
    'order.update_status',
    'user.manage',
  ],
};

export interface ComboIncludedProduct {
  name: string;
  description: string;
  regularPrice: string;
  image: string;
}

export interface ComboPackage {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  badge: string;
  categoryTag: string;
  rating: number;
  reviewsCount: number;
  price: string;
  originalPrice: string;
  image: string;
  link: string;
  specs: string[];
  description: string;
  includedProducts: ComboIncludedProduct[];
}

export const COMBO_PACKAGES: ComboPackage[] = [
  {
    id: 'combo-1',
    slug: 'stage-1-dyno-bundle',
    number: '01',
    title: 'STAGE-1 DYNO PERFORMANCE BUNDLE',
    subtitle: 'TITANIUM SLIP-ON + STAGE-1 HIGH-FLOW FILTER',
    badge: 'SAVE ₹5,000',
    categoryTag: 'PERFORMANCE PACK',
    rating: 4.9,
    reviewsCount: 48,
    price: '₹49,999',
    originalPrice: '₹54,999',
    image: '/images/product_exhaust.png',
    link: '/combos/stage-1-dyno-bundle',
    specs: [
      '+5.8 BHP Peak Horsepower Gain',
      '4.2 kg Total Exhaust Weight Reduction',
      'Plug-and-play fitment, zero ECU wire cuts',
      'Includes removable DB-killer & mounting hardware',
    ],
    description: 'Complete Stage-1 power enhancement package featuring our CNC dyno-tuned titanium slip-on exhaust system matched with a washable high-flow cotton mesh intake filter.',
    includedProducts: [
      {
        name: 'Unit 22 Titanium Slip-On Silencer',
        description: 'Grade-5 titanium sleeve with carbon fiber endcap and laser-etched badge.',
        regularPrice: '₹44,999',
        image: '/images/product_exhaust.png',
      },
      {
        name: 'Stage-1 High-Flow Air Filter Element',
        description: 'Dual-layer oiled cotton mesh filter with CNC billet filter frame.',
        regularPrice: '₹9,999',
        image: '/images/product_exhaust.png',
      },
    ],
  },
  {
    id: 'combo-2',
    slug: 'overland-37l-pannier-kit',
    number: '02',
    title: 'OVERLAND 37L PANNIER EXPEDITION KIT',
    subtitle: 'DUAL ALUMINUM PANNIERS + MOUNTING RACKS',
    badge: 'SAVE ₹3,500',
    categoryTag: 'TOURING PACK',
    rating: 5.0,
    reviewsCount: 34,
    price: '₹24,999',
    originalPrice: '₹28,500',
    image: '/images/product_panniers.png',
    link: '/combos/overland-37l-pannier-kit',
    specs: [
      '37L x 2 IP67 Waterproof Certified Shells',
      '3mm Heavy-Duty Aircraft Grade Aluminum',
      'Lockable stainless quick-release mechanism',
      'Dual tie-down loop & corner protection',
    ],
    description: 'Heavy-duty expedition touring luggage system engineered for extreme cross-country rallies and high-altitude mountain passes.',
    includedProducts: [
      {
        name: 'Dual 37L Aircraft Aluminum Pannier Cases',
        description: 'IP67 rated waterproof seal with dual stainless steel key-locks.',
        regularPrice: '₹22,500',
        image: '/images/product_panniers.png',
      },
      {
        name: 'Heavy-Duty Tubular Stainless Mounting Racks',
        description: '18mm stainless steel tubing rack set with bolt-on fitment hardware.',
        regularPrice: '₹6,000',
        image: '/images/product_panniers.png',
      },
    ],
  },
  {
    id: 'combo-3',
    slug: 'track-spec-brake-system',
    number: '03',
    title: 'TRACK SPEC CERAMIC BRAKING SYSTEM',
    subtitle: '320MM DRILLED ROTOR + SINTERED METAL PADS',
    badge: 'SAVE ₹1,200',
    categoryTag: 'BRAKE PACK',
    rating: 4.8,
    reviewsCount: 52,
    price: '₹5,599',
    originalPrice: '₹6,799',
    image: '/images/product_brake_pads.png',
    link: '/combos/track-spec-brake-system',
    specs: [
      'Zero brake fade at extreme track temperatures',
      'High friction coefficient sintered compound',
      '320mm Drilled high-carbon rotor disc',
      'Includes copper anti-squeal shims',
    ],
    description: 'Uncompromising stopping power upgrade kit combining 320mm high-carbon drilled brake rotor discs with racing sintered metal pads.',
    includedProducts: [
      {
        name: '320mm High-Carbon Drilled Brake Rotor Disc',
        description: 'Laser-cut and heat-treated stainless rotor for rapid thermal dissipation.',
        regularPrice: '₹4,499',
        image: '/images/product_brake_disc.png',
      },
      {
        name: 'HH Sintered Racing Brake Pad Set',
        description: 'High-friction metal matrix compound for zero brake fade under heavy track braking.',
        regularPrice: '₹2,300',
        image: '/images/product_brake_pads.png',
      },
    ],
  },
  {
    id: 'combo-4',
    slug: 'full-synthetic-garage-kit',
    number: '04',
    title: 'FULL SYNTHETIC GARAGE SERVICE KIT',
    subtitle: 'MOTUL 300V 4L + OIL FILTER + CHAIN CARE',
    badge: 'SAVE ₹850',
    categoryTag: 'SERVICE PACK',
    rating: 4.9,
    reviewsCount: 61,
    price: '₹4,299',
    originalPrice: '₹5,149',
    image: '/images/product_engine_oil.png',
    link: '/combos/full-synthetic-garage-kit',
    specs: [
      '100% Synthetic Motul 300V 10W40 Factory Line',
      'High-efficiency magnetic oil filter element',
      'C2 Chain Lube + C1 Chain Clean aerosol cans',
      'Free micro-fiber detailing towel included',
    ],
    description: 'Complete home workshop maintenance bundle for high-performance motorcycle engine protection and drive chain care.',
    includedProducts: [
      {
        name: 'Motul 300V 10W40 Factory Line Synthetic (4L)',
        description: 'Ester Core technology oil for maximum engine torque and clutch protection.',
        regularPrice: '₹3,850',
        image: '/images/product_engine_oil.png',
      },
      {
        name: 'High-Flow Magnetic Oil Filter Element',
        description: 'Traps micro metal particles to safeguard high-RPM engine internals.',
        regularPrice: '₹499',
        image: '/images/product_engine_oil.png',
      },
      {
        name: 'Motul C1 Chain Clean + C2 Road Chain Lube (400ml)',
        description: 'Deep degreasing spray & tacky high-speed O/X-ring chain lubricant.',
        regularPrice: '₹800',
        image: '/images/product_engine_oil.png',
      },
    ],
  },
];

export const getComboBySlug = (slug: string): ComboPackage | undefined => {
  const normalized = slug.toLowerCase();
  return COMBO_PACKAGES.find((c) => c.slug === normalized || c.id === normalized);
};

export const getComboUrl = (slug: string): string => {
  return `/combos/${slug}`;
};

