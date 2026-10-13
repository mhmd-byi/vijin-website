import vijinProducts from "./vijin-products.json";

export type Brand = "Vijin" | "Viva" | "Enox";

export type Product = {
  slug: string;
  name: string;
  brand: Brand;
  group: string;
  image?: string;
  alt?: string;
  tagline?: string | null;
  intro?: string;
  features?: { t: string; d: string }[];
  applications?: string[];
  specs?: { k: string; v: string }[];
  closing?: string | null;
};

const vijinMeta: Record<string, { brand: Brand; group: string; image: string; alt: string }> = {
  "aluminium-windows": { brand: "Vijin", group: "Facade & Openings", image: "/images/products/aluminium-windows.jpg", alt: "Corner of a building clad in golden panels with a rooftop chimney, under a blue sky" },
  "copper-sheets": { brand: "Vijin", group: "Facade & Openings", image: "/images/products/copper-sheets.jpg", alt: "Stacked copper sheets with a brushed finish" },
  "gi-louvers": { brand: "Vijin", group: "Louvers", image: "/images/products/gi-louvers.jpg", alt: "White galvanised iron louvers set into a brick wall" },
  "vijin-door-skins": { brand: "Vijin", group: "Doors & Interiors", image: "/images/products/door-skins.jpg", alt: "Dark walnut-finish door opening into a room with a red bench" },
  "vijin-partition-panel-sheets": { brand: "Vijin", group: "Doors & Interiors", image: "/images/products/partition-panel-sheets.jpg", alt: "Living room with vertical wood-finish wall panels and a grey armchair" },
  "vijin-wpc-doors-frames": { brand: "Vijin", group: "Doors & Interiors", image: "/images/products/wpc-doors-frames.webp", alt: "Cream flush door with grooved lines beside a yellow chair" },
  "vijin-wpc-pvc-sheets": { brand: "Vijin", group: "Sheets", image: "/images/products/wpc-sheets.jpg", alt: "White decorative cut-out screen used as a room divider" },
  "viva-acp-sheets": { brand: "Viva", group: "Sheets", image: "/images/products/acp-sheets.jpg", alt: "Fanned samples of aluminium composite panels in red, silver, beige and charcoal" },
  "viva-zcp-sheets-zinc-composite-sheets": { brand: "Viva", group: "Sheets", image: "/images/products/zcp-facade.jpg", alt: "Modern building facade with dark vertical panels and glass" },
  "wpc-louvers": { brand: "Vijin", group: "Louvers", image: "/images/projects/1000055521.jpg", alt: "Wood-finish slatted soffit seen from below against a blue sky" },
};

// [slug, name, group, image?, alt?]. Products without an image have no photo on the original site.
const enox: [string, string, string, string?, string?][] = [
  ["enox-door-closer", "Door Closer", "Door Hardware", "door-closer.jpg", "Overhead door closer arm fitted to a blue-grey door frame"],
  ["enox-floor-spring", "Floor Spring", "Door Hardware", "floor-spring.jpg", "Black floor-spring patch plate at the base of a glass door"],
  ["automatic-sensor-door", "Automatic Sensor Door", "Door Hardware", "automatic-sensor-door.jpg", "Automatic sliding glass doors in a bright lobby"],
  ["door-hardware", "Door Hardware", "Door Hardware", "door-hardware.jpg", "Stainless steel ball-bearing hinge on a dark wood door"],
  ["ball-bearing-hinges", "Ball Bearing Hinges", "Door Hardware", "door-hardware.jpg", "Stainless steel ball-bearing hinge on a dark wood door"],
  ["knob-set", "Knob Set", "Door Hardware", "knob-set.jpg", "Stainless steel ball-knob lockset"],
  ["lever-lock-set", "Lever Lock Set", "Door Hardware", "lever-lock-set.jpg", "Lever handle and mortise lock on a wooden door"],
  ["mortise-handle", "Mortise Handle", "Door Hardware", "mortise-handle.jpg", "Dark lever handle and keyed lock on a pale wood door"],
  ["patch-fittings", "Patch Fittings", "Glass Fittings", "patch-fittings.jpg", "Black aluminium glass channel set into timber decking"],
  ["spider-fittings", "Spider Fittings", "Glass Fittings", "spider-fittings.jpg", "Stainless steel four-arm spider fitting"],
  ["glass-locks", "Glass Locks", "Glass Fittings"],
  ["glass-sliding-locks", "Glass Sliding Locks", "Glass Fittings"],
  ["glass-sliding-handle", "Glass Sliding Handle", "Glass Fittings", "glass-sliding-handle.jpg", "Hand turning a round flush lock on a glass door"],
  ["swift-glass-door-handle", "Swift Glass Door Handle", "Glass Fittings", "swift-glass-door-handle.jpg", "Black pull handles on a frameless glass double door"],
  ["glass-sliding-fittings", "Glass Sliding Fittings", "Glass Fittings", "glass-sliding-fittings.jpg", "Frosted sliding glass door beside a wardrobe of hanging clothes"],
  ["glazing-profile", "Glazing Profile", "Glass Fittings"],
  ["glass-sealing-profile", "Glass Sealing Profile", "Glass Fittings"],
  ["glass-wooden-partition", "Glass & Wooden Partition", "Glass Fittings"],
  ["shower-fittings", "Shower Fittings", "Shower", "shower-fittings.jpg", "Stainless steel grab rail inside a glass shower enclosure"],
  ["shower-special-finish", "Shower Special Finish", "Shower"],
  ["shower-sliding-solutions", "Shower Sliding Solutions", "Shower", "shower-sliding-solutions.jpg", "Frameless sliding shower door in a stone-look bathroom"],
  ["soft-close-sliding-solution", "Soft Close Sliding Solution", "Sliding Systems"],
  ["swift-wooden-sliding-fitting", "Swift Wooden Sliding Fitting", "Sliding Systems", "swift-wooden-sliding-fitting.jpg", "Open wardrobe with sliding accessory trays"],
  ["wardrobe-sliding-solution", "Wardrobe Sliding Solution", "Sliding Systems", "wardrobe-sliding-solution.jpg", "Top track of a sliding wardrobe door in wood and frosted glass"],
  ["wooden-sliding-solution", "Wooden Sliding Solution", "Sliding Systems"],
  ["wooden-glass-telescopic", "Wooden & Glass Telescopic", "Sliding Systems"],
  ["cabinet-fitting", "Cabinet Fitting", "Furniture Fittings", "cabinet-fitting.jpg", "Wooden cabinet with sliding glass panels"],
  ["furniture-fitting", "Furniture Fitting", "Furniture Fittings"],
  ["kitchen-drawer", "Kitchen Drawer", "Furniture Fittings", "kitchen-drawer.jpg", "Hand placing a utensil in a grey kitchen drawer organiser"],
  ["telescopic-channels", "Telescopic Channels", "Furniture Fittings", "telescopic-channels.jpg", "Open kitchen drawer holding plates in a divider"],
  ["aluminium-profiles", "Aluminium Profiles", "Profiles", "aluminium-profiles.jpg", "Tall wooden cabinet with glass doors in aluminium frames"],
];

export const products: Product[] = [
  ...vijinProducts.map((p) => {
    const m = vijinMeta[p.slug];
    return { ...p, brand: m.brand, group: m.group, image: m.image, alt: m.alt } as Product;
  }),
  ...enox.map(
    ([slug, name, group, image, alt]): Product => ({
      slug,
      name,
      brand: "Enox",
      group,
      image: image ? `/images/products/${image}` : undefined,
      alt,
    }),
  ),
];

export const enoxProducts = products.filter((p) => p.brand === "Enox");
export const vijinCatalogProducts = products.filter((p) => p.brand !== "Enox");
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const enoxGroups = ["Door Hardware", "Glass Fittings", "Shower", "Sliding Systems", "Furniture Fittings", "Profiles"];

export const homeRail = [
  { title: "ACP Sheets", text: "Light weight sheets which are weather resistant, sleek and perfect for modern finishes.", image: "/images/products/acp-sheets-home.jpg", alt: "Green aluminium composite panels clad on a modern building", href: "/product/viva-acp-sheets" },
  { title: "HPL Sheets", text: "Upgrade your interiors and exteriors with our premium High-Pressure Laminate (HPL) Sheets.", image: "/images/products/hpl-sheets.jpg", alt: "Wood-finish panelled cube building with a slim window", href: "/catalogues" },
  { title: "WPC Sheets", text: "Experience the perfect combination of strength and style with Vijin WPC (Wood-Plastic Composite) and PVC Foam Sheets.", image: "/images/products/wpc-sheets.jpg", alt: "White decorative cut-out screen used as a room divider", href: "/product/vijin-wpc-pvc-sheets" },
  { title: "Door Skins", text: "Upgrade your doors with Vijin 1.5mm sheets, designed specifically for use as door skins.", image: "/images/products/door-skins.jpg", alt: "Dark walnut-finish door opening into a room with a red bench", href: "/product/vijin-door-skins" },
];

export const homeStack = [
  { title: "Aluminium Windows", text: "Vijin's aluminum windows combine durability, aesthetic appeal, and functionality to provide top-tier solutions for modern homes and commercial spaces.", image: "/images/products/aluminium-windows.jpg", alt: "Corner of a building clad in golden panels with a rooftop chimney", href: "/product/aluminium-windows" },
  { title: "Copper Sheets", text: "Enhance your architectural projects with our high-quality copper sheets, designed specifically for elevation applications.", image: "/images/products/copper-sheets.jpg", alt: "Stacked copper sheets with a brushed finish", href: "/product/copper-sheets" },
  { title: "Partition Panel Sheets", text: "Redefine your interiors with Vijin Partition Panel Sheets, designed for creating functional and stylish partitions in residential, commercial, and industrial spaces.", image: "/images/products/partition-panel-sheets.jpg", alt: "Living room with vertical wood-finish wall panels", href: "/product/vijin-partition-panel-sheets" },
  { title: "GI & WPC Louvers", text: "Louvers that provide practical solutions for ventilation, privacy, and shade while enhancing the overall look of any structure.", image: "/images/products/gi-louvers.jpg", alt: "White louvers set into a brick wall", href: "/product/gi-louvers" },
];

export const whyChoose = [
  { title: "High-Quality Standards", text: "Our products are crafted with top-notch materials and superior workmanship to ensure durability and performance." },
  { title: "Innovative Design", text: "We focus on functionality and aesthetics, offering products that are both practical and visually appealing." },
  { title: "Competitive Pricing", text: "Get the best value for your money with affordable prices without compromising quality." },
  { title: "Eco-Friendly Solutions", text: "We are committed to sustainability, offering products that are environmentally friendly and responsibly sourced." },
  { title: "Proven Reliability", text: "Trusted by countless satisfied customers for consistent and reliable performance." },
  { title: "Customizable Offerings", text: "Tailor our products to your specific requirements for a truly personalized experience." },
];

export const pillars = [
  { title: "Built to last", points: ["High-Quality Standards", "Proven Reliability"], text: "Top-notch materials and superior workmanship, trusted by countless satisfied customers for consistent performance." },
  { title: "Made to look right", points: ["Innovative Design", "Customizable Offerings"], text: "Products that are practical and visually appealing, tailored to your specific requirements." },
  { title: "Good for the project", points: ["Competitive Pricing", "Eco-Friendly Solutions"], text: "Best value without compromising quality, with sustainability and responsible sourcing in mind." },
];

export const testimonials = [
  { name: "Ritesh Badlani", text: "Thank you Vijin Company, you have transformed our factory into a palace. Your company designed the elevation of our factory which was very super." },
  { name: "Rakesh Luhar", text: "They give a satisfactory service before and after purchase. Thank you Mustafa bhai (Vijin Global)." },
  { name: "Aayush Choudhary", text: "Best rate and very cooperative thanks." },
  { name: "Rajesh Mehta", text: "Vijin has been our go-to supplier for high-quality partition panel sheets and ACP sheets. The durability and finish of their products are outstanding, making our projects stand out with a sleek and professional look. Their customer service is exceptional, ensuring timely delivery and expert guidance. Highly recommended!" },
  { name: "Sandeep Verma", text: "We recently used Vijin’s GI Louvers and WPC Louvers for a commercial project, and the results were fantastic! The materials were easy to install, weather-resistant, and gave a premium aesthetic to the building’s façade. We appreciate their commitment to quality and innovation." },
  { name: "Priya Shah", text: "Vijin’s WPC doors and aluminum windows have transformed our residential projects. The products are not only stylish but also durable and eco-friendly. Their team provided excellent support in choosing the right materials for our needs. We look forward to working with them again!" },
  { name: "Arun Chawla", text: "We sourced copper sheets and ZCP sheets from Vijin for a high-end retail project, and the quality exceeded our expectations. The materials offered a sophisticated touch while maintaining high durability. Vijin is truly a trusted name in the industry!" },
];

export const process = [
  { title: "Enquire", text: "Call us quickly or visit our catalogues section to choose your desired product and then enquire with us." },
  { title: "Product selection", text: "Select from our wide range of products from our catalogues." },
  { title: "Celebrate", text: "Celebrate our products installed on your destination." },
];

export const dealers = [
  { name: "Shushant Industries", city: "Bhopal", phone: "9713293000", address: "Plot No-Z-21 Basement, Balaji Tower, Zone 2, MP Nagar, Bhopal, M.P." },
  { name: "Hema Aluminium", city: "Chhatarpur", phone: "9425143331", address: "Police Line Road, Behind Saffron Lawn, Chhatarpur" },
  { name: "Babji Glass & Hardware", city: "Khandwa", phone: "8125974749", address: "34, Kapas Mandi Area, Kallan Ganj, Khandwa" },
  { name: "Paras Aluminium", city: "Jabalpur", phone: "9425389569", address: "Shop No 1, Shrinath Ki Talaiya, Jabalpur" },
  { name: "Sonu Aluminium", city: "Ratlam", phone: "9826313313", address: "6, Lohar Road, Near Reva Shankar Pandiya, Ratlam" },
  { name: "Om Laxmi Hardware", city: "Rewa", phone: "9425185125", address: "Ward No. 13, Allahabad Road, Barra, Rewa" },
  { name: "Satvik Aluminium", city: "Gwalior", phone: "9691598854", address: "B-1138, Anand Nagar, Sagartal Road, Bodahapur, Gwalior" },
  { name: "Glass House", city: "Guna", phone: "9893238385", address: "01, 00, 00, Mathur Colony, Guna" },
  { name: "Bharmal Doors", city: "Ujjain", phone: "9575912304", address: "89, Gandhi Bhavan, Lal Masjid Chauraha ke Pass, Rani Laxmibai Marg, Ujjain" },
  { name: "Anand Marketing", city: "Mandla", phone: "9575912304", address: "Ram Mandir Padav, Mandla" },
  { name: "Shree Radhe Enterprises", city: "Katni", phone: "9425161134", address: "Opposite ICICI Bank, Gattani Building, M.M. Choubey Ward, Katni" },
  { name: "M/S Aurum Glass Solutions", city: "Shahdol", phone: "8657740437", address: "Purani Basti, Pachgaon, Shahdol, Ward No. 29" },
  { name: "Ashrafi Krishi Yantra", city: "Badwani", phone: "8657740437", address: "210/8, Sutar Mohalla, Opp. Mahalaxmi Guest, Badwani" },
  { name: "Shree Dutt Enterprises", city: "Shyamgarh", phone: "09981954965", address: "Near Railway Station Road, Dhabla Gurjar Road, Shamgarh, Madhya Pradesh 458883" },
  { name: "Raj Aluminium & Decore", city: "Mandsaur", phone: "8989702597", address: "21, Kailesh Marg, Mandsaur" },
];

export type WorkCategory = "Exterior" | "Interior" | "Gates & Doors" | "Signage";
export const workCategories: WorkCategory[] = ["Exterior", "Interior", "Gates & Doors", "Signage"];

const w = (file: string, category: WorkCategory, alt: string) => ({ src: `/images/projects/${file}`, category, alt });

export const works = [
  w("1000012776.jpg", "Exterior", "Shopfront facade clad in wood-finish panels"),
  w("652.jpg", "Exterior", "Hospital building with brown panels and blue glass"),
  w("113.jpg", "Gates & Doors", "Sliding gate with terracotta-coloured panels in a black frame"),
  w("444.jpg", "Interior", "Interior feature wall in black and silver 3D panels with a lit mountain motif"),
  w("1000031981.jpg", "Exterior", "Five-storey building with brown panel cladding"),
  w("759.png", "Signage", "Showroom facade with red and white composite cladding"),
  w("585.jpg", "Exterior", "Entrance facade with vertical fins and glass"),
  w("445.jpg", "Gates & Doors", "White cut-out gate with wood-finish insets"),
  w("1000381753.jpg", "Exterior", "Residential facade with lotus-motif panels and brick-look cladding"),
  w("7648.jpg", "Signage", "Glow Home Deco storefront in blue cladding"),
  w("423.jpg", "Exterior", "Grey composite-panel building with a long ribbon window"),
  w("620.jpg", "Gates & Doors", "Double gate with horizontal wood-finish slats"),
  w("1000224246.jpg", "Signage", "GS Sachanand Kala Mandir facade with a large logo panel"),
  w("491.jpg", "Exterior", "Building wrapped in horizontal grey louvers"),
  w("658.jpg", "Interior", "Wavy wood-finish ceiling and wall panel in a lobby"),
  w("810.jpg", "Gates & Doors", "Entrance double doors with CNC cut-out screens"),
  w("520.jpg", "Exterior", "Commercial building with brown panels and blue glass bands"),
  w("1000303392.jpg", "Exterior", "Three-storey house with stone-texture and grey panels"),
  w("790.jpg", "Signage", "Showroom fascia with pink signage over a glass front"),
  w("425.jpg", "Gates & Doors", "Wood-finish sliding gate with a black frame"),
  w("767.png", "Exterior", "Corporate building with black and white composite bands"),
  w("1000236687.jpg", "Signage", "Building with a logo sign on grey brick-look cladding"),
  w("419.jpg", "Exterior", "House with a wood-finish soffit and dark wall panels"),
  w("609.jpg", "Gates & Doors", "Grey wood-grain gate beside a white fence"),
  w("6389.jpg", "Gates & Doors", "Wood-finish gate with a perforated pattern"),
  w("1000362688.jpg", "Exterior", "House facade with dark panels and a wood-finish gate"),
  w("1000031982.jpg", "Exterior", "Hotel-style building with dark brown cladding above a glass podium"),
  w("589.jpg", "Exterior", "Wood-finish canopy and louvers on a corner building"),
  w("804.jpg", "Exterior", "Facade with perforated brown panels and a tan band"),
];

const catalogueRows: [string, string, string][] = [
  ["Vijin Brochure 2025-26", "catalog-bg.jpg", "2025/03/Brochure-2025-26_VIJIN-GLOBAL.pdf"],
  ["The Gold Standard, Vol. 1", "gold-standard-cover.jpg", "2025/05/The-Gold-Standard_Brochure_Vol1_e-brochure.pdf"],
  ["Sign Pro", "sign-pro-cover.jpg", "2025/05/Signpro_e-catalogue.-1.pdf"],
  ["AluZinto Series", "aluzinto.jpg", "2025/01/ALUZINTO.pdf"],
  ["Bus Body", "bus-body.jpg", "2025/01/BUS-BODY.pdf"],
  ["Desert Series", "desert-series.jpg", "2025/01/desert_series.pdf"],
  ["Green HPL", "green-brochure.jpg", "2025/01/green_brochure_ebrochure.pdf"],
  ["Honeycomb Panel", "honeycomb.jpg", "2025/01/honey_comb_catalogue.pdf"],
  ["HPL", "hpl.jpg", "2025/01/hpl.pdf"],
  ["Lustre", "lustre.jpg", "2025/01/lustre_ecatalouge.pdf"],
  ["Metal Abstract", "metal-abstract.jpg", "2025/01/metal_abstract_ecatalouge.pdf"],
  ["Mirage Fluted Series", "mirage.jpg", "2025/01/mirage_fluted_ecatalogue.pdf"],
  ["Natural Stone, Vol. 2", "natural-stone.jpg", "2025/01/natural_stone_vol_2_ecatalouge1.pdf"],
  ["OriginX", "originx.jpg", "2025/01/originx_corporate_catalogue.pdf"],
  ["Tarnish Metallum", "tarnish-metallum.jpg", "2025/01/tarnish_metallum_e_catalouge.pdf"],
  ["Fire Rated A2 ACCP", "fire-rated.jpg", "2025/01/viva_fr_a2_accp.pdf"],
  ["Pinnacle", "pinnacle.jpg", "2025/01/PINNACLE.pdf"],
  ["Phases", "phases.jpg", "2025/01/PHASES.pdf"],
  ["801 Eco", "801E.jpg", "2025/01/801ECO.pdf"],
  ["Fusion", "fusion.jpg", "2025/01/FUSION.pdf"],
  ["3D Odyssey", "3d.jpg", "2025/01/3D.pdf"],
  ["Alkimi & Rainbow (ElZinc)", "rainbow.jpg", "2025/01/ELZINC.pdf"],
  ["Galaxy Series", "galaxy.jpg", "2025/01/GALAXY.pdf"],
  ["Santa Fe", "santa-fe.jpg", "2025/01/SANTAFE.pdf"],
  ["De Madera", "demadera.jpg", "2025/01/DEMADIRA.pdf"],
  ["Petroleum Signage", "petroleum.jpg", "2025/01/PETROLEUM.pdf"],
  ["Pure Aura", "pure-aura.jpg", "2025/01/PURE-AURA.pdf"],
  ["Bricklyn", "bricklyn.jpg", "2025/02/bricklyn.pdf"],
  ["Viva Newsletter 2024-25", "newsletter.jpg", "2025/02/newsletter.pdf"],
  ["Louvers Series", "louvers-cover-1.jpg", "2025/03/Louvers-Brochure_V7_Low.pdf"],
];

export const catalogues = catalogueRows.map(([title, cover, pdf]) => ({
  title,
  cover: `/images/catalogues/${cover}`,
  pdf: `https://vijin.co.in/wp-content/uploads/${pdf}`,
}));
