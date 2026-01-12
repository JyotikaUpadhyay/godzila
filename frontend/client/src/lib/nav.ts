export type NavItem = {
  label: string;
  href?: string;
  mega?: { title: string; links: { label: string; href: string }[] }[];
};

export const TOP_NAV: NavItem[] = [
  {
    label: "WOMEN",
    href: "/collections/women",
    mega: [
      {
        title: "Shop",
        links: [
          { label: "New Arrivals", href: "/collections/women" },
          { label: "Dresses", href: "/collections/women?q=dress" },
          { label: "Shoes", href: "/collections/women?q=shoes" },
        ],
      },
      {
        title: "Trending",
        links: [
          { label: "Under $50", href: "/collections/under-50" },
          { label: "Clearance", href: "/collections/clearance" },
          { label: "Accessories", href: "/collections/accessories" },
        ],
      },
      {
        title: "Designers",
        links: [
          { label: "Gucci", href: "/collections/women?brand=gucci" },
          { label: "Coach", href: "/collections/women?brand=coach" },
          { label: "Michael Kors", href: "/collections/women?brand=michael" },
        ],
      },
    ],
  },
  {
    label: "MEN",
    href: "/collections/men",
    mega: [
      {
        title: "Shop",
        links: [
          { label: "New Arrivals", href: "/collections/men" },
          { label: "Sneakers", href: "/collections/men?q=sneakers" },
          { label: "Jackets", href: "/collections/men?q=jacket" },
        ],
      },
      {
        title: "Deals",
        links: [
          { label: "Under $50", href: "/collections/under-50" },
          { label: "Clearance", href: "/collections/clearance" },
          { label: "Accessories", href: "/collections/accessories" },
        ],
      },
      {
        title: "Designers",
        links: [
          { label: "Gucci", href: "/collections/men?brand=gucci" },
          { label: "Nike", href: "/collections/men?brand=nike" },
          { label: "Adidas", href: "/collections/men?brand=adidas" },
        ],
      },
    ],
  },
  { label: "DESIGNERS", href: "/collections/designers" },
  { label: "SUNGLASSES", href: "/collections/sunglasses" },
  { label: "JEWELRY & WATCHES", href: "/collections/jewelry" },
  { label: "ACCESSORIES", href: "/collections/accessories" },
  { label: "UNDER $50", href: "/collections/under-50" },
  { label: "CLEARANCE", href: "/collections/clearance" },
];
