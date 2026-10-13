export const site = {
  name: "VIJIN",
  legalName: "VIJIN GLOBAL PRIVATE LIMITED",
  url: "https://vijin.co.in",
  description:
    "VIJIN supplies veneers, panel sheets, ACP sheets, WPC and PVC foam sheets, louvers, copper and zinc composite sheets, aluminium windows and Enox hardware from Indore, Madhya Pradesh.",
  address: "169, Transport Nagar, Indore, (M.P.) 452014",
  phones: [
    { display: "+91 78692 22073", tel: "+917869222073" },
    { display: "+91 78690 30789", tel: "+917869030789" },
  ],
  email: "sales@vijin.co.in",
  whatsapp: "917869222073",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/enox", label: "Enox" },
  { href: "/catalogues", label: "Catalogues" },
  { href: "/our-works", label: "Our Works" },
  { href: "/our-dealers-distributors", label: "Dealers" },
  { href: "/contact-us", label: "Contact" },
] as const;

export const stats = [
  { value: 376, suffix: "", label: "Projects completed" },
  { value: 13, suffix: "", label: "Dealers" },
  { value: 312, suffix: "", label: "Products" },
  { value: 2000, suffix: "+", label: "Satisfied clients" },
] as const;
