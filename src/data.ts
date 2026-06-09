export interface Plan {
  id: string;
  name: string;
  cores: string;
  ram: string;
  storage: string;
  storageType: "NVMe" | "SSD";
  priceUSD: number;
  priceINR: number;
  featured?: boolean;
}

export interface LocationInfo {
  id: string;
  country: string;
  flag: string;
  flagUrl: string;
  city?: string;
  hardware: string;
  cpuType: "Ryzen9" | "Xeon";
  status: "Online" | "Maintenance" | "Coming Soon";
  pingSimulatedMin: number;
  pingSimulatedMax: number;
  coordinates: { x: number; y: number }; // Relative percentage on custom interactive map
}

export interface SectionContent {
  title: string;
  emoji: string;
  rules: string[];
}

export const CLOUD_VPS_PLANS: Plan[] = [
  { id: "vps-10", name: "Cloud VPS 10", cores: "4 vCPU", ram: "8GB", storage: "75GB", storageType: "NVMe", priceUSD: 4.50, priceINR: 429, featured: false },
  { id: "vps-20", name: "Cloud VPS 20", cores: "6 vCPU", ram: "16GB", storage: "100GB", storageType: "NVMe", priceUSD: 6.99, priceINR: 659, featured: true },
  { id: "vps-30", name: "Cloud VPS 30", cores: "8 vCPU", ram: "24GB", storage: "200GB", storageType: "NVMe", priceUSD: 8.50, priceINR: 809, featured: false },
  { id: "vps-40", name: "Cloud VPS 40", cores: "12 vCPU", ram: "32GB", storage: "250GB", storageType: "NVMe", priceUSD: 16.99, priceINR: 1599, featured: false },
  { id: "vps-50", name: "Cloud VPS 50", cores: "16 vCPU", ram: "48GB", storage: "300GB", storageType: "NVMe", priceUSD: 24.99, priceINR: 2359, featured: false },
  { id: "vps-60", name: "Cloud VPS 60", cores: "18 vCPU", ram: "64GB", storage: "350GB", storageType: "NVMe", priceUSD: 32.99, priceINR: 3099, featured: false },
];

export const STORAGE_VPS_PLANS: Plan[] = [
  { id: "storage-10", name: "Storage VPS 10", cores: "2 vCPU", ram: "4GB", storage: "384GB", storageType: "SSD", priceUSD: 2.99, priceINR: 285, featured: false },
  { id: "storage-20", name: "Storage VPS 20", cores: "3 vCPU", ram: "8GB", storage: "512GB", storageType: "SSD", priceUSD: 5.50, priceINR: 525, featured: true },
  { id: "storage-30", name: "Storage VPS 30", cores: "6 vCPU", ram: "18GB", storage: "1TB", storageType: "SSD", priceUSD: 10.99, priceINR: 1050, featured: false },
  { id: "storage-40", name: "Storage VPS 40", cores: "8 vCPU", ram: "32GB", storage: "1.2TB", storageType: "SSD", priceUSD: 19.99, priceINR: 1899, featured: false },
  { id: "storage-50", name: "Storage VPS 50", cores: "14 vCPU", ram: "56GB", storage: "1.4TB", storageType: "SSD", priceUSD: 29.99, priceINR: 2799, featured: false },
];

export const MINECRAFT_PLANS: Plan[] = [
  { id: "mc-4", name: "MC-4", cores: "2 vCores", ram: "4GB", storage: "50GB", storageType: "NVMe", priceUSD: 1.80, priceINR: 175, featured: false },
  { id: "mc-8", name: "MC-8", cores: "3 vCores", ram: "8GB", storage: "80GB", storageType: "NVMe", priceUSD: 3.20, priceINR: 305, featured: false },
  { id: "mc-16", name: "MC-16", cores: "4 vCores", ram: "16GB", storage: "120GB", storageType: "NVMe", priceUSD: 6.00, priceINR: 575, featured: true },
  { id: "mc-24", name: "MC-24", cores: "6 vCores", ram: "24GB", storage: "150GB", storageType: "NVMe", priceUSD: 8.80, priceINR: 845, featured: false },
  { id: "mc-32", name: "MC-32", cores: "8 vCores", ram: "32GB", storage: "200GB", storageType: "NVMe", priceUSD: 11.60, priceINR: 1110, featured: false },
  { id: "mc-48", name: "MC-48", cores: "12 vCores", ram: "48GB", storage: "300GB", storageType: "NVMe", priceUSD: 17.20, priceINR: 1650, featured: false },
  { id: "mc-64", name: "MC-64", cores: "16 vCores", ram: "64GB", storage: "400GB", storageType: "NVMe", priceUSD: 23.50, priceINR: 2250, featured: false },
];

export const LOCATIONS: LocationInfo[] = [
  { id: "loc-us", country: "USA", flag: "🇺🇸", flagUrl: "https://cdn-icons-png.flaticon.com/512/3909/3909383.png", city: "Virginia / NY", hardware: "AMD Ryzen 9 @ 4.5GHz+", cpuType: "Ryzen9", status: "Online", pingSimulatedMin: 35, pingSimulatedMax: 48, coordinates: { x: 26, y: 41 } },
  { id: "loc-mx", country: "Mexico", flag: "🇲🇽", flagUrl: "https://files.softicons.com/download/internet-icons/glossy-flag-icons-by-nordic-factory/png/256/mx.png", city: "Mexico City", hardware: "Intel Xeon 6353P", cpuType: "Xeon", status: "Online", pingSimulatedMin: 55, pingSimulatedMax: 80, coordinates: { x: 23, y: 55 } },
  { id: "loc-fr", country: "France", flag: "🇫🇷", flagUrl: "https://cdn-icons-png.flaticon.com/512/197/197560.png", city: "Paris", hardware: "AMD Ryzen 9", cpuType: "Ryzen9", status: "Online", pingSimulatedMin: 12, pingSimulatedMax: 20, coordinates: { x: 48, y: 34 } },
  { id: "loc-uk", country: "UK", flag: "🇬🇧", flagUrl: "https://cdn-icons-png.flaticon.com/512/9906/9906532.png", city: "London", hardware: "AMD Ryzen 9", cpuType: "Ryzen9", status: "Online", pingSimulatedMin: 15, pingSimulatedMax: 25, coordinates: { x: 46, y: 31 } },
  { id: "loc-bd", country: "Bangladesh", flag: "🇧🇩", flagUrl: "https://files.softicons.com/download/internet-icons/glossy-flag-icons-by-nordic-factory/png/256/bd.png", city: "Dhaka", hardware: "AMD Ryzen 9 9950X", cpuType: "Ryzen9", status: "Online", pingSimulatedMin: 5, pingSimulatedMax: 12, coordinates: { x: 74, y: 54 } },
  { id: "loc-sg", country: "Singapore", flag: "🇸🇬", flagUrl: "https://cdn-icons-png.flaticon.com/512/11654/11654477.png", city: "Singapore", hardware: "Intel Xeon E5-2620", cpuType: "Xeon", status: "Online", pingSimulatedMin: 18, pingSimulatedMax: 30, coordinates: { x: 72, y: 62 } },
  { id: "loc-de", country: "Germany", flag: "🇩🇪", flagUrl: "https://www.citypng.com/public/uploads/preview/round-german-flag-icon-free-png-735811695835369zc3gi6yabc.png", city: "Frankfurt", hardware: "AMD Ryzen 9", cpuType: "Ryzen9", status: "Online", pingSimulatedMin: 10, pingSimulatedMax: 16, coordinates: { x: 50, y: 33 } },
];

export const RULES: { id: string; category: string; description: string; emoji: string }[] = [
  { id: "r1", category: "Engagement", description: "J4J (Join for Join), J2J (Join to Join), and Alt/Rejoin accounts are allowed and counted.", emoji: "🤝" },
  { id: "r2", category: "Content", description: "Strictly no NSFW, 18+ content, or inappropriate material under any circumstances.", emoji: "🔞" },
  { id: "r3", category: "Promo & Spam", description: "No unauthorized self-promotion, advertising of external servers, or flooding target channels.", emoji: "📢" },
  { id: "r4", category: "Conduct", description: "Be respectful. Harassment, toxic language, slurs, or threats toward staff or other users will not be tolerated.", emoji: "💖" },
  { id: "r5", category: "Staff Pings", description: "Do not mass-ping staff. Only ping the Owners or staff members explicitly authorized to handle mass pings. Disruptive behavior will result in a mute or kick.", emoji: "🚨" },
  { id: "r6", category: "Ticket Conduct", description: "Use English in tickets. Do not use spam bots (such as OwO) inside active tickets. Respect and abide by all staff final decisions.", emoji: "🎫" },
];

export const TOS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: "By using our services, website, applications, or communication channels, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service.",
  },
  {
    title: "2. User Responsibilities",
    content: "Users must provide accurate information when required, use services lawfully and responsibly, respect other users and staff members, and avoid any activities that may disrupt, impair, or damage our services.",
  },
  {
    title: "3. Prohibited Activities",
    content: "The following activities are strictly prohibited: unauthorized access to our systems or data, distribution of malware, spam, or harmful content, harassment or abuse towards others, and any violation of applicable local or international laws and regulations.",
  },
  {
    title: "4. Intellectual Property",
    content: "All codebase, trademarks, custom media assets, logos, and materials owned by Interenl LLC remain the exclusive property of Interenl LLC unless explicitly stated otherwise.",
  },
  {
    title: "5. Service Availability",
    content: "We strive for maximum uptime but may modify, suspend, restrict, or discontinue any or all service endpoints at any time without prior notice or liability.",
  },
  {
    title: "6. Limitation of Liability",
    content: "Interenl LLC shall not be liable for any indirect, incidental, or consequential damages (including data loss, hardware errors, or service delays) arising from the use or inability to use our services.",
  },
  {
    title: "7. Termination",
    content: "We reserve the absolute right to suspend, restrict, or terminate access to any of our services immediately if these terms or our rules are violated, with or without prior warning.",
  },
  {
    title: "8. Changes to Terms",
    content: "These terms may be updated periodically to reflect operational, regulatory, or policy changes. Continued use of our services constitutes full acceptance of any revised terms.",
  },
  {
    title: "9. Contact Information",
    content: "For questions regarding these Terms of Service, billing arrangements, or active queries, please contact:\n\nInterenl LLC\nPhone: +62 851-9806-8374\nWeb Ticket: Create a ticket in the tickets channel.",
  },
];
