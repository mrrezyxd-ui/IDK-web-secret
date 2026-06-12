import { useState, useMemo, useEffect, FormEvent } from "react";
import { 
  Server, 
  Shield, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Zap, 
  Globe, 
  Phone, 
  ArrowRight, 
  ExternalLink, 
  RefreshCw, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  AlertTriangle, 
  Flame, 
  CheckCircle, 
  Clock, 
  Lock, 
  Settings, 
  Trash2, 
  Plus, 
  Edit3, 
  Palette, 
  Users,
  Activity,
  Check,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plan, 
  LocationInfo, 
  CLOUD_VPS_PLANS, 
  STORAGE_VPS_PLANS, 
  MINECRAFT_PLANS, 
  LOCATIONS 
} from "./data";

const THEME_SKINS = {
  sky: {
    fontClass: "font-sans",
    cardClass: "bg-slate-950/45 backdrop-blur-xl border border-white/10 hover:border-[#38bdf8]/50 shadow-2xl transition-all duration-300 rounded-[24px]",
    cardFeatured: "bg-slate-900/60 backdrop-blur-2xl border border-sky-400/60 ring-2 ring-sky-400/20 shadow-2xl shadow-sky-500/10 rounded-[24px]",
    borderRadius: "rounded-[24px]",
    glowColor: "shadow-[#38bdf8]/20 text-glow",
    titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-sky-450 via-cyan-300 to-sky-200",
    accentColor: "text-[#38bdf8]",
    accentBorder: "border-[#38bdf8]/40",
    accentBg: "bg-sky-500/10 border border-sky-500/20 text-[#38bdf8]",
    btnClass: "bg-gradient-to-r from-[#38bdf8] to-cyan-500 text-slate-950 font-extrabold hover:shadow-lg hover:shadow-[#38bdf8]/25 rounded-xl transition duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer",
    btnSecClass: "bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition duration-300 cursor-pointer",
    badgeLabel: "Standard Sky",
    customEmoji: "✨",
    themeGrad: "from-[#38bdf8] to-[#0284c7]",
    glowTextClass: "text-glow"
  },
  minecraft: {
    fontClass: "font-pixel text-xs",
    cardClass: "bg-[#251610] border-4 border-[#3D251A] text-[#f4eedb] shadow-[4px_4px_0px_0px_#140702] hover:border-amber-400 transition-all rounded-none",
    cardFeatured: "bg-[#3c251a] border-4 border-amber-400 text-amber-20px shadow-[6px_6px_0px_0px_#140702] rounded-none",
    borderRadius: "rounded-none",
    glowColor: "shadow-amber-500/20 text-glow-amber",
    titleColor: "text-amber-400 font-pixel text-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]",
    accentColor: "text-amber-400",
    accentBorder: "border-amber-450/40",
    accentBg: "bg-amber-450/15 border-2 border-amber-500 text-amber-300",
    btnClass: "bg-gradient-to-b from-[#8ed22c] to-[#4a8505] text-[#ffffff] font-extrabold shadow-[2px_2px_0px_#1e3b02] border-t-2 border-l-2 border-[#b5f553] border-b-4 border-r-4 border-[#244b01] active:translate-y-1 active:shadow-none hover:brightness-105 rounded-none font-pixel select-none text-[10px] uppercase transition-all duration-100 cursor-pointer",
    btnSecClass: "bg-[#3D251A] hover:bg-[#4d3226] text-amber-200 border-2 border-[#1a0f0a] rounded-none font-bold font-mono duration-100 cursor-pointer",
    badgeLabel: "Minecraft Blocks",
    customEmoji: "⛏️",
    themeGrad: "from-amber-400 to-orange-500",
    glowTextClass: "text-glow-amber"
  },
  cloudos: {
    fontClass: "font-outfit",
    cardClass: "bg-gradient-to-b from-[#0f172a]/20 to-[#1e293b]/10 backdrop-blur-2xl border border-white/15 hover:border-teal-400/40 rounded-[28px] shadow-2xl",
    cardFeatured: "bg-gradient-to-b from-[#134e4a]/15 to-[#0f172a]/25 backdrop-blur-2xl border border-teal-400/60 rounded-[28px] shadow-teal-500/15 shadow-2xl",
    borderRadius: "rounded-[28px]",
    glowColor: "shadow-teal-400/15 text-glow-teal",
    titleColor: "text-[#f8fafc] font-black tracking-normal text-glow-teal",
    accentColor: "text-teal-300",
    accentBorder: "border-teal-450/30",
    accentBg: "bg-teal-400/5 border border-teal-400/25 text-teal-300 backdrop-blur",
    btnClass: "bg-white text-slate-950 font-black hover:bg-slate-50 hover:shadow-xl hover:shadow-white/10 rounded-full transition duration-300 active:scale-95 cursor-pointer",
    btnSecClass: "bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full transition duration-300 cursor-pointer",
    badgeLabel: "Frosted CloudOS",
    customEmoji: "🪐",
    themeGrad: "from-teal-400 to-cyan-400",
    glowTextClass: "text-glow-teal"
  },
  emerald: {
    fontClass: "font-cyber",
    cardClass: "bg-[#021f15]/50 border border-[#047857]/40 hover:border-emerald-400 shadow-lg relative rounded-none border-b-4 border-r-4",
    cardFeatured: "bg-[#042f1a]/80 border-2 border-emerald-400 text-[#34d399] shadow-lg rounded-none border-b-4 border-r-4",
    borderRadius: "rounded-none",
    glowColor: "shadow-emerald-500/20 text-glow-emerald",
    titleColor: "text-emerald-400 uppercase tracking-[0.2em] text-glow-emerald",
    accentColor: "text-[#34d399]",
    accentBorder: "border-emerald-500/40",
    accentBg: "bg-[#064e3b]/40 border border-[#10b981]/50 text-[#34d399] font-mono",
    btnClass: "bg-emerald-500 text-slate-950 font-black tracking-widest hover:bg-emerald-400 border border-emerald-300 rounded hover:shadow-lg hover:shadow-emerald-500/35 transition duration-300 active:scale-95 cursor-pointer",
    btnSecClass: "bg-slate-950 hover:bg-[#022c22] text-[#34d399] border border-emerald-950 rounded transition duration-300 cursor-pointer",
    badgeLabel: "Cyber Sentinel",
    customEmoji: "🟢",
    themeGrad: "from-emerald-500 to-teal-500",
    glowTextClass: "text-glow-emerald"
  }
};

export default function App() {
  // Loading screen active status
  const [loading, setLoading] = useState(true);

  // Mobile menu control
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active plans tab: "cloud" | "storage" | "minecraft"
  const [plaTab, setPlanTab] = useState<"cloud" | "storage" | "minecraft">("cloud");

  // Currency selection: "USD" or "INR"
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  // Active states for configurable plans (allow admin edits)
  const [cloudPlans, setCloudPlans] = useState<Plan[]>(CLOUD_VPS_PLANS);
  const [storagePlans, setStoragePlans] = useState<Plan[]>(STORAGE_VPS_PLANS);
  const [minecraftPlans, setMinecraftPlans] = useState<Plan[]>(MINECRAFT_PLANS);
  const [locations, setLocations] = useState<LocationInfo[]>(LOCATIONS);

  // Selected Location for Map and customizer
  const [selectedLocId, setSelectedLocId] = useState<string>("loc-bd");
  
  // Selected CPU for plans catalog
  const [selectedCpu, setSelectedCpu] = useState<"Ryzen9" | "Xeon">("Ryzen9");
  
  // Dynamic price calculation helpers: Ryzen 9 has $0.50 / ₹45 extra premium
  const getPlanPriceUSD = (plan: Plan) => {
    return selectedCpu === "Ryzen9" ? plan.priceUSD + 0.50 : plan.priceUSD;
  };

  const getPlanPriceINR = (plan: Plan) => {
    return selectedCpu === "Ryzen9" ? plan.priceINR + 45 : plan.priceINR;
  };
  
  // Permanent professional theme definition
  const theme = "sky";

  // Admin routing & authentication states
  const [adminMode, setAdminMode] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminError, setAdminError] = useState("");

  // Edit states in Admin
  const [editingPlanType, setEditingPlanType] = useState<"cloud" | "storage" | "minecraft" | null>(null);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [editPlanName, setEditPlanName] = useState("");
  const [editPlanCores, setEditPlanCores] = useState("");
  const [editPlanRam, setEditPlanRam] = useState("");
  const [editPlanStorage, setEditPlanStorage] = useState("");
  const [editPlanPriceUSD, setEditPlanPriceUSD] = useState<number>(0);
  const [editPlanPriceINR, setEditPlanPriceINR] = useState<number>(0);

  // Add plan mode
  const [isAddingPlan, setIsAddingPlan] = useState<"cloud" | "storage" | "minecraft" | null>(null);

  // Simulated orders queue for the Admin Dashboard
  const [adminOrders, setAdminOrders] = useState([
    { id: "ORD-1284", user: "ProGamer_BD", item: "MC-16 (16GB RAM)", location: "Bangladesh (Ryzen 9)", cost: "$6.00/mo", status: "Pending", date: "Just now" },
    { id: "ORD-1283", user: "CloudMatrix_MX", item: "Cloud VPS 40 (32GB RAM)", location: "Mexico (Ryzen 9)", cost: "$16.99/mo", status: "Active", date: "15m ago" },
    { id: "ORD-1282", user: "EU_HyperNode", item: "Custom Configured Node", location: "Germany (Ryzen 9)", cost: "$11.10/mo", status: "Pending", date: "32m ago" },
    { id: "ORD-1281", user: "Zack_US", item: "Storage VPS 20 (512GB SSD)", location: "USA (Ryzen 9)", cost: "$5.50/mo", status: "Active", date: "1h ago" }
  ]);

  // Modal selector for Ordering simulation
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);
  const [checkoutLocation, setCheckoutLocation] = useState<string>("Bangladesh (Ryzen 9)");
  const [billingCycle, setBillingCycle] = useState<number>(1); // months
  const [showOrderDisclaimer, setShowOrderDisclaimer] = useState(false);

  // Logo & Discord URL setup and branding/theming configuration values (Admin customizable)
  const [brandName, setBrandName] = useState<string>("InterEnl");
  const [logoUrl, setLogoUrl] = useState<string>("https://i.imgur.com/VNWmtap.jpeg");
  const [activeFontFamily, setActiveFontFamily] = useState<"Plus Jakarta Sans" | "Space Grotesk" | "JetBrains Mono" | "Press Start 2P" | "Share Tech Mono" | "Outfit">("Plus Jakarta Sans");
  const [bgImageUrl, setBgImageUrl] = useState<string>("https://images.steamusercontent.com/ugc/2310974141604980016/B4EF3A7A2D1772DE26B1A6F51CE33A04FD8BB917/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false");
  const [bgOpacityTop, setBgOpacityTop] = useState<number>(0.55);
  const [bgOpacityBottom, setBgOpacityBottom] = useState<number>(0.88);
  const discordUrl = "https://discord.gg/GBjMnCgs3P";

  // Simulate initial loading timer sequence for professional feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Listen to the client-side Admin routes `/admin` or `#admin`
  useEffect(() => {
    const handleUrlCheck = () => {
      const isPathAdmin = window.location.pathname === "/admin";
      const isHashAdmin = window.location.hash === "#admin" || window.location.hash.startsWith("#/admin");
      if (isPathAdmin || isHashAdmin) {
        setAdminMode(true);
      } else {
        setAdminMode(false);
      }
    };
    handleUrlCheck();
    window.addEventListener("popstate", handleUrlCheck);
    window.addEventListener("hashchange", handleUrlCheck);
    return () => {
      window.removeEventListener("popstate", handleUrlCheck);
      window.removeEventListener("hashchange", handleUrlCheck);
    };
  }, []);

  // Sync state locations with click on map
  const activeLocationObj = useMemo(() => {
    return locations.find(l => l.id === selectedLocId) || locations[0];
  }, [selectedLocId, locations]);

  // Handle plan order triggers
  const handleOrderInitiation = (plan: Plan) => {
    setCheckoutPlan(plan);
    if (plaTab === "minecraft") {
      setCheckoutLocation(`Singapore (${selectedCpu === "Ryzen9" ? "Ryzen 9" : "Xeon"})`);
    } else {
      setCheckoutLocation(`${activeLocationObj.country} (${selectedCpu === "Ryzen9" ? "Ryzen 9" : "Xeon"})`);
    }
    setBillingCycle(1);
    setShowOrderDisclaimer(true);
  };

  const finalizeOrder = () => {
    window.open(discordUrl, "_blank");
    setShowOrderDisclaimer(false);
  };

  // Handle Admin login securely
  const handleAdminAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "admin17523@") {
      setIsAdminLoggedIn(true);
      setAdminError("");
    } else {
      setAdminError("Invalid administrator credentials. Contact network security.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser("");
    setAdminPass("");
    window.location.hash = "#hero";
    setAdminMode(false);
  };

  // Admin functional ops
  const handleDeletePlan = (type: "cloud" | "storage" | "minecraft", pid: string) => {
    if (type === "cloud") {
      setCloudPlans(prev => prev.filter(p => p.id !== pid));
    } else if (type === "storage") {
      setStoragePlans(prev => prev.filter(p => p.id !== pid));
    } else {
      setMinecraftPlans(prev => prev.filter(p => p.id !== pid));
    }
  };

  const toggleLocationStatus = (locId: string) => {
    setLocations(prev => prev.map(loc => {
      if (loc.id === locId) {
        const nextStatus: LocationInfo["status"] = 
          loc.status === "Online" ? "Maintenance" : 
          loc.status === "Maintenance" ? "Coming Soon" : "Online";
        return { ...loc, status: nextStatus };
      }
      return loc;
    }));
  };

  const editLocationHardware = (locId: string, newHardware: string) => {
    setLocations(prev => prev.map(loc => {
      if (loc.id === locId) {
        return { ...loc, hardware: newHardware };
      }
      return loc;
    }));
  };

  // Physical Datacenter State Variables and Handlers
  const [newLocCountry, setNewLocCountry] = useState("");
  const [newLocFlagUrl, setNewLocFlagUrl] = useState("");
  const [newLocCpuType, setNewLocCpuType] = useState<"Ryzen9" | "Xeon">("Ryzen9");
  const [newLocHardware, setNewLocHardware] = useState("");
  const [newLocCity, setNewLocCity] = useState("");
  const [isAddingLoc, setIsAddingLoc] = useState(false);

  const editLocationCountry = (locId: string, val: string) => {
    setLocations(prev => prev.map(loc => loc.id === locId ? { ...loc, country: val } : loc));
  };

  const editLocationFlagUrl = (locId: string, val: string) => {
    setLocations(prev => prev.map(loc => loc.id === locId ? { ...loc, flagUrl: val } : loc));
  };

  const editLocationCpuType = (locId: string, val: "Ryzen9" | "Xeon") => {
    setLocations(prev => prev.map(loc => loc.id === locId ? { ...loc, cpuType: val } : loc));
  };

  const editLocationCity = (locId: string, val: string) => {
    setLocations(prev => prev.map(loc => loc.id === locId ? { ...loc, city: val } : loc));
  };

  const handleAddLocation = (e: FormEvent) => {
    e.preventDefault();
    if (!newLocCountry.trim() || !newLocFlagUrl.trim() || !newLocHardware.trim()) return;

    const newLoc: LocationInfo = {
      id: `loc-${Date.now()}`,
      country: newLocCountry,
      flag: "🌐",
      flagUrl: newLocFlagUrl,
      city: newLocCity ? newLocCity : "Junction Center",
      hardware: newLocHardware,
      cpuType: newLocCpuType,
      status: "Online",
      pingSimulatedMin: Math.floor(Math.random() * 25) + 5,
      pingSimulatedMax: Math.floor(Math.random() * 25) + 30,
      coordinates: {
        x: Math.floor(Math.random() * 60) + 20,
        y: Math.floor(Math.random() * 50) + 20
      }
    };

    setLocations(prev => [...prev, newLoc]);
    
    // Reset form inputs
    setNewLocCountry("");
    setNewLocFlagUrl("");
    setNewLocHardware("");
    setNewLocCity("");
    setNewLocCpuType("Ryzen9");
    setIsAddingLoc(false);
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const startEditPlan = (type: "cloud" | "storage" | "minecraft", plan: Plan) => {
    setEditingPlanType(type);
    setEditingPlanId(plan.id);
    setEditPlanName(plan.name);
    setEditPlanCores(plan.cores);
    setEditPlanRam(plan.ram);
    setEditPlanStorage(plan.storage);
    setEditPlanPriceUSD(plan.priceUSD);
    setEditPlanPriceINR(plan.priceINR);
  };

  const saveEditedPlan = () => {
    if (!editingPlanType || !editingPlanId) return;
    
    const updatedCallback = (prev: Plan[]) => prev.map(p => {
      if (p.id === editingPlanId) {
        return {
          ...p,
          name: editPlanName,
          cores: editPlanCores,
          ram: editPlanRam,
          storage: editPlanStorage,
          priceUSD: Number(editPlanPriceUSD),
          priceINR: Number(editPlanPriceINR),
        };
      }
      return p;
    });

    if (editingPlanType === "cloud") setCloudPlans(updatedCallback);
    else if (editingPlanType === "storage") setStoragePlans(updatedCallback);
    else setMinecraftPlans(updatedCallback);

    setEditingPlanId(null);
    setEditingPlanType(null);
  };

  const saveAddedPlan = (type: "cloud" | "storage" | "minecraft") => {
    const newPlan: Plan = {
      id: `${type}-${Date.now()}`,
      name: editPlanName || `New ${type.toUpperCase()} Node`,
      cores: editPlanCores || "4 vCPU",
      ram: editPlanRam || "8GB DDR4/5",
      storage: editPlanStorage || "80GB",
      storageType: type === "storage" ? "SSD" : "NVMe",
      priceUSD: Number(editPlanPriceUSD) || 5.00,
      priceINR: Number(editPlanPriceINR) || 450,
      featured: false
    };

    if (type === "cloud") setCloudPlans(prev => [...prev, newPlan]);
    else if (type === "storage") setStoragePlans(prev => [...prev, newPlan]);
    else setMinecraftPlans(prev => [...prev, newPlan]);

    setIsAddingPlan(null);
    setEditPlanName("");
    setEditPlanCores("");
    setEditPlanRam("");
    setEditPlanStorage("");
    setEditPlanPriceUSD(0);
    setEditPlanPriceINR(0);
  };

  const approveOrder = (orderId: string) => {
    setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "Active" } : o));
  };

  // Get active plans based on current tabs
  const activePlans = useMemo(() => {
    if (plaTab === "cloud") return cloudPlans;
    if (plaTab === "storage") return storagePlans;
    return minecraftPlans;
  }, [plaTab, cloudPlans, storagePlans, minecraftPlans]);

  // Define full UI/UX Skins for each theme
  const skin = THEME_SKINS[theme];

  // Determine styles for theme selections (Customizable background engine)
  const themePageBgStyle = useMemo(() => {
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, ${bgOpacityTop}), rgba(3, 7, 18, ${bgOpacityBottom})), url('${bgImageUrl}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    };
  }, [bgImageUrl, bgOpacityTop, bgOpacityBottom]);

  const activeAccentColor = skin.accentColor;
  const activeBtnColor = skin.btnClass;
  const activeGlowTheme = skin.glowColor;
  const activeBadgeStyle = skin.accentBg;

  return (
    <div 
      className={`min-h-screen text-[#f8fafc] ${skin.fontClass} antialiased relative overflow-hidden transition-all duration-[5000ms] selection:bg-sky-450 selection:text-slate-900`}
    >
      <style>{`
        body, .font-sans, .font-display, .font-mono, .font-pixel, .font-cyber, .font-outfit, button, span, h1, h2, h3, h4, font, p, input, select, option, textarea, a {
          font-family: ${
            activeFontFamily === "Plus Jakarta Sans" ? "var(--font-sans)" :
            activeFontFamily === "Space Grotesk" ? "var(--font-display)" :
            activeFontFamily === "JetBrains Mono" ? "var(--font-mono)" :
            activeFontFamily === "Press Start 2P" ? "var(--font-pixel)" :
            activeFontFamily === "Share Tech Mono" ? "var(--font-cyber)" : "var(--font-outfit)"
          } !important;
        }
      `}</style>
      
      {/* 5-Second Cinematic Cross-fading Theme Background Engine */}
      <div className="fixed inset-0 -z-30 w-full h-full pointer-events-none overflow-hidden bg-slate-950">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={themePageBgStyle}
          />
        </AnimatePresence>
      </div>
      
      {/* LOADING INTRO SCREEN - USING USER'S CLOUDOS IMAGE BACKGROUND */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center p-4 overflow-hidden"
            style={{
              backgroundImage: "linear-gradient(to bottom, rgba(2, 6, 23, 0.75), rgba(2, 6, 23, 0.95)), url('https://images.steamusercontent.com/ugc/2310974141604980016/B4EF3A7A2D1772DE26B1A6F51CE33A04FD8BB917/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-[#020617]/50 pointer-events-none" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col items-center gap-6 relative z-10"
            >
              <div className="relative">
                <div className="absolute -inset-5 rounded-full bg-gradient-to-r from-sky-400 via-sky-600 to-emerald-500 opacity-40 blur-md animate-pulse" />
                <div className="absolute -inset-2 rounded-full border border-sky-400/20 animate-ping duration-[2s]" />
                <img
                  src={logoUrl}
                  alt={`${brandName} Logomark`}
                  width="100"
                  height="100"
                  className="relative rounded-full border border-white/20 aspect-square object-cover shadow-2xl shadow-sky-400/30"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col items-center text-center">
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-widest text-[#f8fafc] uppercase text-sky-400">
                  {brandName}
                </h1>
                <span className="text-[10px] font-mono tracking-[0.3em] text-sky-400 uppercase mt-2 font-bold select-none">
                  Initializing Cloud Datacenters...
                </span>
              </div>

              <div className="w-56 h-1.5 bg-slate-900/85 rounded-full overflow-hidden mt-4 border border-white/5 relative">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.9, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-emerald-400 rounded-full shadow-lg shadow-sky-400/40"
                />
              </div>

              <div className="text-[9.5px] font-mono text-slate-500 max-w-xs text-center mt-2 flex flex-col gap-1 select-none">
                <span className="text-sky-400 animate-pulse">⚙️ Resolving 1 Gbps unmetered network pipelines...</span>
                <span className="text-emerald-450">🛡️ Loaded 1 Tbps DDoS mitigation layers [SUCCESS]</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic ambient background overlays */}
      <>
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#075985]/20 via-[#0c4a6e]/5 to-transparent pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[200px] pointer-events-none -z-10" />
      </>

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-white/5 px-4 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Branding */}
          <a href="#hero" onClick={() => { setAdminMode(false); }} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 opacity-60 blur-xs group-hover:opacity-100 transition-opacity" />
              <img 
                id="header-logo-img" 
                src={logoUrl} 
                alt={`${brandName} Logo`} 
                width="38" 
                height="38" 
                className="relative rounded-full border border-white/20 aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span 
                className={`font-bold text-lg md:text-xl tracking-wider ${activeGlowTheme}`}
                style={{ color: "#0eb2ff" }}
              >
                {brandName}
              </span>
              <span className={`text-[9px] font-mono tracking-widest uppercase ${activeAccentColor}`}>Simply Powerful</span>
            </div>
          </a>

          {/* Core App Navigation */}
          {!adminMode ? (
            <nav className="hidden lg:flex items-center gap-1 bg-slate-950/40 p-1 rounded-full border border-slate-800/60">
              <button
                onClick={() => { setPlanTab("cloud"); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900/60 transition flex items-center gap-1 cursor-pointer"
              >
                Cloud VPS
              </button>
              <button
                onClick={() => { setPlanTab("storage"); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900/60 transition flex items-center gap-1 cursor-pointer"
              >
                Storage Units
              </button>
              <button
                onClick={() => { setPlanTab("minecraft"); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900/60 transition flex items-center gap-1 cursor-pointer"
              >
                Minecraft Hosting
              </button>
              <button
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900/60 transition flex items-center gap-1 cursor-pointer"
              >
                Node Specs
              </button>
              <button
                onClick={() => document.getElementById("locations")?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900/60 transition flex items-center gap-1.5 cursor-pointer"
              >
                Geography Map
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-3 text-xs bg-slate-900/50 px-4 py-1.5 rounded-full border border-sky-500/20">
              <span className="font-mono text-slate-400 font-bold">🔐 SECURED ADMINISTRATOR SESSION</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </div>
          )}

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            
            {/* Currency Switcher */}
            {!adminMode && (
              <div className="flex items-center bg-slate-950 p-1 rounded-full border border-slate-800 text-xs">
                <button 
                  onClick={() => setCurrency("USD")} 
                  className={`px-3 py-1 rounded-full font-bold transition ${currency === "USD" ? "bg-slate-850 text-[#38bdf8] shadow" : "text-slate-400 hover:text-slate-200"}`}
                >
                  $ USD
                </button>
                <button 
                  onClick={() => setCurrency("INR")} 
                  className={`px-3 py-1 rounded-full font-bold transition ${currency === "INR" ? "bg-slate-850 text-[#38bdf8] shadow" : "text-slate-400 hover:text-slate-200"}`}
                >
                  ₹ INR
                </button>
              </div>
            )}

            {/* Support / Call-safe redirection button */}
            <a 
              href={discordUrl} 
              target="_blank" 
              rel="noreferrer"
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition duration-300 shadow group cursor-pointer ${activeBtnColor}`}
            >
              <span>Discord Guild</span>
              <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white"
            >
              <Activity size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950 border-b border-slate-900 px-4 py-6 flex flex-col gap-4 relative z-30"
          >
            <button
              onClick={() => { setPlanTab("cloud"); setIsMobileMenuOpen(false); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-left py-2 text-sm text-slate-300 font-semibold"
            >
              Cloud VPS Node Catalog
            </button>
            <button
              onClick={() => { setPlanTab("storage"); setIsMobileMenuOpen(false); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-left py-2 text-sm text-slate-300 font-semibold"
            >
              Storage Node Catalog
            </button>
            <button
              onClick={() => { setPlanTab("minecraft"); setIsMobileMenuOpen(false); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-left py-2 text-sm text-slate-300 font-semibold"
            >
              Minecraft Hosting Nodes
            </button>

            <button
              onClick={() => { setIsMobileMenuOpen(false); document.getElementById("features")?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-left py-2 text-sm text-slate-300 font-semibold"
            >
              Hardware Specifications
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); document.getElementById("locations")?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-left py-2 text-sm text-slate-300 font-semibold"
            >
              Global Geography Nodes
            </button>
            
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => { setCurrency("USD"); setIsMobileMenuOpen(false); }}
                className={`flex-1 py-2 text-xs font-bold rounded border ${currency === "USD" ? "bg-slate-900 border-sky-400 text-sky-400" : "bg-transparent border-slate-800 text-slate-400"}`}
              >
                USD ($)
              </button>
              <button 
                onClick={() => { setCurrency("INR"); setIsMobileMenuOpen(false); }}
                className={`flex-1 py-2 text-xs font-bold rounded border ${currency === "INR" ? "bg-slate-900 border-sky-400 text-sky-400" : "bg-transparent border-slate-800 text-slate-400"}`}
              >
                INR (₹)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* RENDER DYNAMIC ADMINISTRATOR CONTROL PANEL */}
      {adminMode ? (
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-900 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl">
                <Lock size={22} />
              </div>
              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 tracking-tight">
                  ADMINISTRATIVE COCKPIT
                </h1>
                <p className="text-xs text-slate-500 font-mono">
                  Modify Node plans list, toggle server geographies state, and process incoming order queues.
                </p>
              </div>
            </div>

            <button
              onClick={handleAdminLogout}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-bold rounded-lg transition"
            >
              Sign out & Quit Terminal
            </button>
          </div>

          {!isAdminLoggedIn ? (
            /* LOCK SCREEN LOGIN FORM - EXTREMELY CLEAN */
            <div className="max-w-md mx-auto py-12">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#030712] border-2 border-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6 relative"
              >
                <div className="absolute top-4 right-4 text-[10px] text-slate-700 font-mono">CODE EX-7362</div>
                
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 border border-rose-500/20">
                    <Lock size={20} />
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-slate-100">Authenticate session</h3>
                  <p className="text-[11px] text-slate-500 max-w-xs">
                    Please provide system administrator credentials to access {brandName} database files and plan models.
                  </p>
                </div>

                {adminError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center text-xs text-rose-400 font-bold leading-normal">
                    ⚠️ {adminError}
                  </div>
                )}

                <form onSubmit={handleAdminAuthSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">User Identity:</label>
                    <input 
                      type="text" 
                      value={adminUser}
                      onChange={(e) => setAdminUser(e.target.value)}
                      placeholder="Username..."
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500/40 font-mono"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">Passphrase key:</label>
                    <input 
                      type="password" 
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="••••••••••••••"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500/40 font-mono"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-extrabold rounded-lg text-xs hover:brightness-115 transition"
                  >
                    Decrypt & Log in
                  </button>
                </form>
              </motion.div>
            </div>
          ) : (
            /* LOGGED IN ACTIVE COCKPIT */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT ADMIN MENU PANELS */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                
                {/* 0. BRAND & AESTHETICS CONFIGURATOR */}
                <div className="bg-[#030712]/90 border border-slate-900 rounded-2xl p-6 flex flex-col gap-5">
                  <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                    <Palette size={16} className="text-pink-500" />
                    <h3 className="font-display font-extrabold text-[#f1f5f9] text-sm uppercase tracking-wider">Brand Name, Logo, Fonts & Wallpaper Configurator</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Brand Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">Brand Name Changer:</label>
                      <input 
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                      />
                    </div>

                    {/* Brand Logo URL */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">Logo URL Changer:</label>
                      <input 
                        type="text"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                      />
                    </div>

                    {/* Font Family Selection */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">Global Font Changer:</label>
                      <select 
                        value={activeFontFamily}
                        onChange={(e) => setActiveFontFamily(e.target.value as any)}
                        className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                      >
                        <option value="Plus Jakarta Sans">Plus Jakarta Sans (Sans-Serif)</option>
                        <option value="Space Grotesk">Space Grotesk (Tech-Display)</option>
                        <option value="JetBrains Mono">JetBrains Mono (Developer Mono)</option>
                        <option value="Press Start 2P">Press Start 2P (Retro Pixel)</option>
                        <option value="Share Tech Mono">Share Tech Mono (Cyberpunk)</option>
                        <option value="Outfit">Outfit (Minimalist Elegant)</option>
                      </select>
                    </div>

                    {/* Background Wallpaper Image URL */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">Visual Background Wallpaper URL Changer:</label>
                      <input 
                        type="text"
                        value={bgImageUrl}
                        onChange={(e) => setBgImageUrl(e.target.value)}
                        className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs text-white focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-900/60 pt-4">
                    {/* Background Top Opacity */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">Background Dim (Top Overlay Opacity):</label>
                        <span className="text-xs text-pink-400 font-mono">{(bgOpacityTop * 100).toFixed(0)}%</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={bgOpacityTop}
                        onChange={(e) => setBgOpacityTop(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-955 rounded-lg cursor-pointer accent-pink-500"
                      />
                    </div>

                    {/* Background Bottom Opacity */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">Background Dim (Bottom Overlay Opacity):</label>
                        <span className="text-xs text-pink-400 font-mono">{(bgOpacityBottom * 100).toFixed(0)}%</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={bgOpacityBottom}
                        onChange={(e) => setBgOpacityBottom(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-955 rounded-lg cursor-pointer accent-pink-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 1. VPS PLANS MANAGER */}
                <div className="bg-[#030712]/90 border border-slate-900 rounded-2xl p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                    <div className="flex items-center gap-2">
                      <Settings size={16} className="text-sky-400" />
                      <h3 className="font-display font-extrabold text-[#f1f5f9] text-sm uppercase tracking-wider">Active VPS & Gaming Nodes catalog</h3>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsAddingPlan("cloud")}
                        className="px-3 py-1.5 bg-sky-950 border border-sky-800 text-[#38bdf8] text-[10px] font-bold rounded-lg hover:bg-sky-900 flex items-center gap-1.5"
                      >
                        <Plus size={11} />
                        <span>+ Cloud VPS</span>
                      </button>
                      <button
                        onClick={() => setIsAddingPlan("storage")}
                        className="px-3 py-1.5 bg-emerald-950 border border-emerald-800 text-[#34d399] text-[10px] font-bold rounded-lg hover:bg-emerald-900 flex items-center gap-1.5"
                      >
                        <Plus size={11} />
                        <span>+ Storage</span>
                      </button>
                      <button
                        onClick={() => setIsAddingPlan("minecraft")}
                        className="px-3 py-1.5 bg-amber-950 border border-amber-850 text-amber-500 text-[10px] font-bold rounded-lg hover:bg-amber-900 flex items-center gap-1.5"
                      >
                        <Plus size={11} />
                        <span>+ MC Host</span>
                      </button>
                    </div>
                  </div>

                  {/* PLAN ADD FORM FIELDS */}
                  {isAddingPlan && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/20 flex flex-col gap-4">
                      <h4 className="text-xs font-bold font-mono text-sky-400 uppercase font-bold">ADD NEW {isAddingPlan.toUpperCase()} INSTANCE</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Plan Name (e.g. Cloud VPS 70)"
                          value={editPlanName}
                          onChange={(e) => setEditPlanName(e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Cores (e.g. 6 vCPU)"
                          value={editPlanCores}
                          onChange={(e) => setEditPlanCores(e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="RAM Allocation (e.g. 16GB)"
                          value={editPlanRam}
                          onChange={(e) => setEditPlanRam(e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Storage Size (e.g. 100GB)"
                          value={editPlanStorage}
                          onChange={(e) => setEditPlanStorage(e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                        <input
                          type="number"
                          placeholder="Price USD ($)"
                          value={editPlanPriceUSD || ""}
                          onChange={(e) => setEditPlanPriceUSD(Number(e.target.value))}
                          className="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                        <input
                          type="number"
                          placeholder="Price INR (₹)"
                          value={editPlanPriceINR || ""}
                          onChange={(e) => setEditPlanPriceINR(Number(e.target.value))}
                          className="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                      </div>
                      <div className="flex gap-2 self-end">
                        <button
                          onClick={() => setIsAddingPlan(null)}
                          className="px-3 py-1 bg-slate-900 text-slate-400 text-xs rounded hover:bg-slate-850"
                        >
                          Discard
                        </button>
                        <button
                          onClick={() => saveAddedPlan(isAddingPlan)}
                          className="px-3 py-1 bg-sky-500 text-slate-950 font-bold text-xs rounded hover:bg-sky-400"
                        >
                          Append to Dataset
                        </button>
                      </div>
                    </div>
                  )}

                  {/* RENDER ACTIVE DATABASE PLANS FOR EDITS */}
                  <div className="flex flex-col gap-6">
                    {/* CLOUD PLANS EDITORS */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold pb-1">CATEGORY: Cloud VPS Servers</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {cloudPlans.map(p => (
                          <div key={p.id} className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex flex-col justify-between">
                            {editingPlanId === p.id ? (
                              <div className="flex flex-col gap-2 p-1">
                                <input type="text" value={editPlanName} onChange={(e) => setEditPlanName(e.target.value)} className="bg-slate-900 border border-slate-800 rounded p-1 text-xs text-white" />
                                <div className="grid grid-cols-2 gap-1.5">
                                  <input type="text" value={editPlanCores} onChange={(e) => setEditPlanCores(e.target.value)} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                  <input type="text" value={editPlanRam} onChange={(e) => setEditPlanRam(e.target.value)} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                </div>
                                <div className="grid grid-cols-2 gap-1.5">
                                  <input type="number" value={editPlanPriceUSD} onChange={(e) => setEditPlanPriceUSD(Number(e.target.value))} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                  <input type="number" value={editPlanPriceINR} onChange={(e) => setEditPlanPriceINR(Number(e.target.value))} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                </div>
                                <div className="flex gap-2 mt-1 self-end">
                                  <button onClick={() => setEditingPlanId(null)} className="text-[10px] text-slate-400">Cancel</button>
                                  <button onClick={saveEditedPlan} className="text-[10px] text-sky-400 font-bold bg-sky-950/40 px-2 py-0.5 rounded border border-sky-850 font-bold">Apply</button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-between items-start gap-4">
                                <div className="flex flex-col">
                                  <span className="font-bold text-xs text-slate-100">{p.name} <span className="text-[10px] text-slate-500 font-mono font-normal">({p.cores} • {p.ram})</span></span>
                                  <span className="text-[10px] text-slate-400 font-mono mt-1">${p.priceUSD.toFixed(2)} USD • ₹{p.priceINR} INR</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button onClick={() => startEditPlan("cloud", p)} className="p-1.5 text-slate-500 hover:text-sky-400 transition">
                                    <Edit3 size={12} />
                                  </button>
                                  <button onClick={() => handleDeletePlan("cloud", p.id)} className="p-1.5 text-slate-500 hover:text-rose-500 transition">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* STORAGE PLANS EDITORS */}
                    <div className="flex flex-col gap-2 mt-4">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold pb-1">CATEGORY: Storage Units</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {storagePlans.map(p => (
                          <div key={p.id} className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex flex-col justify-between">
                            {editingPlanId === p.id ? (
                              <div className="flex flex-col gap-2 p-1">
                                <input type="text" value={editPlanName} onChange={(e) => setEditPlanName(e.target.value)} className="bg-slate-900 border border-slate-800 rounded p-1 text-xs text-white" />
                                <div className="grid grid-cols-2 gap-1.5">
                                  <input type="text" value={editPlanCores} onChange={(e) => setEditPlanCores(e.target.value)} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                  <input type="text" value={editPlanRam} onChange={(e) => setEditPlanRam(e.target.value)} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                </div>
                                <div className="grid grid-cols-2 gap-1.5">
                                  <input type="number" value={editPlanPriceUSD} onChange={(e) => setEditPlanPriceUSD(Number(e.target.value))} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                  <input type="number" value={editPlanPriceINR} onChange={(e) => setEditPlanPriceINR(Number(e.target.value))} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                </div>
                                <div className="flex gap-2 mt-1 self-end">
                                  <button onClick={() => setEditingPlanId(null)} className="text-[10px] text-slate-400">Cancel</button>
                                  <button onClick={saveEditedPlan} className="text-[10px] text-sky-400 font-bold bg-sky-950/40 px-2 py-0.5 rounded border border-sky-850 font-bold">Apply</button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-between items-start gap-4">
                                <div className="flex flex-col">
                                  <span className="font-bold text-xs text-slate-100">{p.name} <span className="text-[10px] text-slate-500 font-mono font-normal">({p.cores} • {p.ram})</span></span>
                                  <span className="text-[10px] text-slate-400 font-mono mt-1">${p.priceUSD.toFixed(2)} USD • ₹{p.priceINR} INR</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button onClick={() => startEditPlan("storage", p)} className="p-1.5 text-slate-500 hover:text-sky-400 transition">
                                    <Edit3 size={12} />
                                  </button>
                                  <button onClick={() => handleDeletePlan("storage", p.id)} className="p-1.5 text-slate-500 hover:text-rose-500 transition">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* MINECRAFT PLANS EDITORS */}
                    <div className="flex flex-col gap-2 mt-4">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold pb-1">CATEGORY: Minecraft Nodes</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {minecraftPlans.map(p => (
                          <div key={p.id} className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex flex-col justify-between">
                            {editingPlanId === p.id ? (
                              <div className="flex flex-col gap-2 p-1">
                                <input type="text" value={editPlanName} onChange={(e) => setEditPlanName(e.target.value)} className="bg-slate-900 border border-slate-800 rounded p-1 text-xs text-white" />
                                <div className="grid grid-cols-2 gap-1.5">
                                  <input type="text" value={editPlanCores} onChange={(e) => setEditPlanCores(e.target.value)} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                  <input type="text" value={editPlanRam} onChange={(e) => setEditPlanRam(e.target.value)} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                </div>
                                <div className="grid grid-cols-2 gap-1.5">
                                  <input type="number" value={editPlanPriceUSD} onChange={(e) => setEditPlanPriceUSD(Number(e.target.value))} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                  <input type="number" value={editPlanPriceINR} onChange={(e) => setEditPlanPriceINR(Number(e.target.value))} className="bg-slate-900 text-xs border border-slate-800 rounded p-1" />
                                </div>
                                <div className="flex gap-2 mt-1 self-end">
                                  <button onClick={() => setEditingPlanId(null)} className="text-[10px] text-slate-400">Cancel</button>
                                  <button onClick={saveEditedPlan} className="text-[10px] text-sky-400 font-bold bg-sky-950/40 px-2 py-0.5 rounded border border-sky-850 font-bold">Apply</button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-between items-start gap-4">
                                <div className="flex flex-col">
                                  <span className="font-bold text-xs text-slate-100">{p.name} <span className="text-[10px] text-slate-500 font-mono font-normal">({p.cores} • {p.ram})</span></span>
                                  <span className="text-[10px] text-slate-400 font-mono mt-1">${p.priceUSD.toFixed(2)} USD • ₹{p.priceINR} INR</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button onClick={() => startEditPlan("minecraft", p)} className="p-1.5 text-slate-500 hover:text-sky-400 transition">
                                    <Edit3 size={12} />
                                  </button>
                                  <button onClick={() => handleDeletePlan("minecraft", p.id)} className="p-1.5 text-slate-500 hover:text-rose-500 transition">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. GEOGRAPHIES NODE MANAGER */}
                <div className="bg-[#030712]/90 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-emerald-400" />
                      <h3 className="font-display font-extrabold text-[#f1f5f9] text-sm uppercase tracking-wider">Physical Datacenters Overwatch</h3>
                    </div>
                  </div>

                  {/* FORM TO ADD DATACENTER */}
                  <div className="bg-slate-950/40 border border-slate-905 p-4 rounded-xl flex flex-col gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsAddingLoc(!isAddingLoc)}
                      className="w-full py-2 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/40 text-emerald-400 font-bold text-xs rounded transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{isAddingLoc ? "▲ Close Hot-Provision Pipeline" : "✚ Hot-Provision New Physical Node Base"}</span>
                    </button>

                    {isAddingLoc && (
                      <form onSubmit={handleAddLocation} className="mt-2 flex flex-col gap-3 border-t border-slate-900 pt-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase font-black">Country Name:</span>
                            <input 
                              type="text" 
                              placeholder="e.g. Bangladesh" 
                              value={newLocCountry}
                              onChange={(e) => setNewLocCountry(e.target.value)}
                              className="bg-slate-950 border border-slate-850 rounded p-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase font-black">Country Logo / Flag Address:</span>
                            <input 
                              type="text" 
                              placeholder="e.g. https://example.com/flag.png (or emoji / vector)" 
                              value={newLocFlagUrl}
                              onChange={(e) => setNewLocFlagUrl(e.target.value)}
                              className="bg-slate-950 border border-slate-850 rounded p-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase font-black">City Area Name:</span>
                            <input 
                              type="text" 
                              placeholder="e.g. Dhaka (or Singapore / Frankfurt)" 
                              value={newLocCity}
                              onChange={(e) => setNewLocCity(e.target.value)}
                              className="bg-slate-950 border border-slate-850 rounded p-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase font-black">Processor Chooser (Ryzen or Intel):</span>
                            <select 
                              value={newLocCpuType}
                              onChange={(e) => setNewLocCpuType(e.target.value as any)}
                              className="bg-slate-950 border border-slate-850 rounded p-2 text-xs text-slate-100 focus:outline-none"
                            >
                              <option value="Ryzen9">AMD RYZEN (Ryzen 9 CPUs)</option>
                              <option value="Xeon">INTEL XEON (Intel Xeon Scalable)</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-mono text-slate-500 uppercase font-black">CPU Model spec (Hardware):</span>
                          <input 
                            type="text" 
                            placeholder="e.g. AMD Ryzen 9 9950X Extreme (16 Cores, 5.7 GHz boost)" 
                            value={newLocHardware}
                            onChange={(e) => setNewLocHardware(e.target.value)}
                            className="bg-slate-950 border border-slate-850 rounded p-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
                            required
                          />
                        </div>

                        <div className="flex gap-2 self-end mt-1">
                          <button 
                            type="button"
                            onClick={() => setIsAddingLoc(false)}
                            className="px-3 py-1.5 bg-slate-900 text-slate-400 text-xs rounded hover:bg-slate-850 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit"
                            className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded hover:bg-emerald-400 cursor-pointer"
                          >
                            Hot-Add Datacenter
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    {locations.map(loc => (
                      <div key={loc.id} className="p-4 bg-slate-950 rounded-xl border border-slate-900 flex flex-col gap-3.5 relative group">
                        
                        {/* Delete country button */}
                        <button 
                          onClick={() => handleDeleteLocation(loc.id)}
                          className="absolute top-4 right-4 p-1.5 text-slate-600 hover:text-rose-500 hover:bg-rose-950/20 rounded transition opacity-50 group-hover:opacity-100 cursor-pointer"
                          title="Delete physical datacenter node"
                        >
                          <Trash2 size={13} />
                        </button>

                        <div className="flex justify-between items-center pr-6">
                          <div className="flex items-center gap-2">
                            <img src={loc.flagUrl} alt="" className="w-5 h-5 rounded-full object-cover border border-slate-800" />
                            <span className="font-bold text-xs text-slate-200">ID: <span className="font-mono text-emerald-400 text-[10px]">{loc.id}</span></span>
                          </div>
                        </div>

                        {/* Editable Form Fields for Instant Tuning */}
                        <div className="grid grid-cols-1 gap-2.5 border-t border-slate-900/65 pt-3.5 text-xs">
                          {/* Country Name */}
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-mono text-slate-600 uppercase font-bold">Country:</span>
                            <input 
                              type="text" 
                              value={loc.country} 
                              onChange={(e) => editLocationCountry(loc.id, e.target.value)}
                              className="bg-slate-900 border border-slate-850 rounded px-2 py-1 text-xs text-slate-300"
                            />
                          </div>

                          {/* Country Logo Flag Address */}
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-mono text-slate-600 uppercase font-bold">Country Logo:</span>
                            <input 
                              type="text" 
                              value={loc.flagUrl} 
                              onChange={(e) => editLocationFlagUrl(loc.id, e.target.value)}
                              className="bg-slate-900 border border-slate-850 rounded px-2 py-1 text-xs text-slate-300 font-mono"
                            />
                          </div>

                          {/* City Name */}
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-mono text-slate-600 uppercase font-bold">City Area:</span>
                            <input 
                              type="text" 
                              value={loc.city || ""} 
                              onChange={(e) => editLocationCity(loc.id, e.target.value)}
                              className="bg-slate-900 border border-slate-850 rounded px-2 py-1 text-xs text-slate-300"
                            />
                          </div>

                          {/* Processor Chooser */}
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-mono text-slate-600 uppercase font-bold">Processor (Intel / Ryzen):</span>
                            <select 
                              value={loc.cpuType} 
                              onChange={(e) => editLocationCpuType(loc.id, e.target.value as any)}
                              className="bg-slate-900 border border-slate-850 rounded px-2 py-1 text-xs text-slate-300"
                            >
                              <option value="Ryzen9">RYZEN (AMD Ryzen 9)</option>
                              <option value="Xeon">INTEL (Intel Xeon)</option>
                            </select>
                          </div>

                          {/* CPU Model Name */}
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-mono text-slate-600 uppercase font-bold">CPU Model spec:</span>
                            <input 
                              type="text" 
                              value={loc.hardware} 
                              onChange={(e) => editLocationHardware(loc.id, e.target.value)}
                              className="bg-slate-900 border border-slate-850 rounded px-2 py-1 text-xs text-slate-300"
                            />
                          </div>
                        </div>

                        {/* Ping / Map Diagnostics */}
                        <div className="flex items-center justify-between border-t border-slate-900 pt-2.5 mt-0.5">
                          <span className="text-[9px] font-mono text-slate-600">Simulated Latency: {loc.pingSimulatedMin}-{loc.pingSimulatedMax}ms</span>
                          
                          <button
                            type="button"
                            onClick={() => toggleLocationStatus(loc.id)}
                            className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold border transition ${loc.status === 'Online' ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/40' : loc.status === 'Maintenance' ? 'bg-amber-950/50 text-amber-500 border-amber-900/40' : 'bg-rose-950/50 text-rose-500 border-rose-900/40'}`}
                          >
                            {loc.status}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* RIGHT ORDER TICKETS SIDEBAR */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* INCOMING TICKET ORDERS */}
                <div className="bg-[#030712]/90 border border-slate-900 rounded-2xl p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                    <Activity size={16} className="text-amber-500" />
                    <h3 className="font-display font-extrabold text-[#f1f5f9] text-xs uppercase tracking-wider">Simulated Tickets queue</h3>
                  </div>

                  <div className="flex flex-col gap-3.5 max-h-[480px] overflow-y-auto">
                    {adminOrders.map(ord => (
                      <div key={ord.id} className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex flex-col gap-2 relative">
                        <span className="text-[8px] font-mono text-slate-600 absolute top-3.5 right-3">{ord.date}</span>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-sky-400 font-extrabold">{ord.id}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-700" />
                          <span className="text-[10px] font-bold text-slate-300">User: {ord.user}</span>
                        </div>

                        <p className="text-[10.5px] font-sans text-slate-400 leading-normal">
                          Configured node <strong>{ord.item}</strong> deployed on geographical area <strong>{ord.location}</strong>.
                        </p>

                        <div className="flex justify-between items-center border-t border-slate-900 pt-2 mt-1">
                          <span className="text-[10px] font-mono text-slate-500 font-bold">{ord.cost}</span>
                          {ord.status === "Pending" ? (
                            <button
                              onClick={() => approveOrder(ord.id)}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[9px] font-bold rounded"
                            >
                              Approve & Provision
                            </button>
                          ) : (
                            <span className="text-[9px] font-bold font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-900/30 rounded">
                              ✓ Provisioned [Active]
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}
        </main>
      ) : (
        /* RENDER STANDARD PUBLIC APP */
        <main>
          {/* HERO SECTION / LANDING INTRO */}
          <section id="hero" className="max-w-7xl mx-auto px-4 pt-10 pb-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left main sales layout */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Tagline Badge */}
              <div className={`inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full text-xs font-bold select-none ${activeBadgeStyle}`}>
                <Flame size={12} className="animate-pulse text-sky-400" />
                <span>EXCEPTIONAL MULTI-GEOGRAPHIC HIGH SPEED HOSTING</span>
              </div>

              {/* Heading */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-slate-100 tracking-tight leading-none">
                Host your own <br />
                <span 
                  className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-cyan-400 to-[#10b981] ${activeGlowTheme}`}
                >
                  VPS & Gaming
                </span> <br />
                Nodes instantly
              </h1>

              <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
                Experience elite network speeds, unbeatable hardware performance, 
                and bulletproof 1 Tbps DDoS defense. All setups instantly deployed 
                with dedicated resource boundaries. Billed on high-value stable pricing models.
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { label: "1 Gbps Unmetered", sub: "Network speed" },
                  { label: "Ryzen 9 Elite", sub: "Enterprise Nodes" },
                  { label: "1 Tbps DDoS Shield", sub: "Stateful protection" }
                ].map((h, i) => (
                  <div key={i} className="bg-slate-950/50 border border-slate-800/50 p-3 rounded-lg flex flex-col">
                    <span className={`text-xs font-bold ${activeAccentColor}`}>{h.label}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{h.sub}</span>
                  </div>
                ))}
              </div>

              {/* CTA & Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 font-sans">
                <button 
                  onClick={() => { setPlanTab("cloud"); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }}
                  className={`w-full sm:w-auto px-6 py-3.5 font-bold rounded-lg transition text-xs flex items-center justify-center gap-2 group cursor-pointer ${activeBtnColor}`}
                >
                  <span>Explore Pricing Plans</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-slate-950" />
                </button>
                <a 
                  href={discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 font-bold rounded-lg text-slate-200 transition text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join our Discord</span>
                  <Users size={14} className="text-slate-400" />
                </a>
              </div>

              {/* Active locations indicator pill */}
              <p className="text-[11px] text-slate-500 font-mono mt-2 flex items-center gap-x-2 gap-y-1.5 flex-wrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                <span>Currently Active Global Nodes:</span>
                {locations.map((loc) => (
                  <span key={loc.id} className="inline-flex items-center gap-1 text-sky-400 font-semibold bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-800 text-[10.5px]">
                    <img
                      src={loc.flagUrl}
                      alt={loc.country}
                      className="w-3.5 h-3.5 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span>{loc.country}</span>
                  </span>
                ))}
              </p>

            </div>

            {/* Right side Featured Card Overlay */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-sky-500/10 to-teal-500/10 blur-xl opacity-80" />

              {/* Main Visual Glass Card */}
              <div className="relative w-full max-w-[420px] glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                
                {/* Display banner landscape */}
                <div className="relative h-44 bg-[#0a192f] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Dynamic decorative server matrix */}
                  <div className="absolute top-4 left-4 flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
                    <span className="text-[9px] text-[#10b981] font-mono tracking-wider font-extrabold ml-1.5">NODE OVERWATCH : 100% HEALTH</span>
                  </div>

                  {/* Graphic Server rack animation */}
                  <div className="flex flex-col gap-1.5 w-3/4 opacity-80 mt-4">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="h-6 rounded bg-slate-900/80 border border-slate-800/80 flex items-center justify-between px-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-sky-400" />
                          <span className="text-[8px] font-mono text-slate-400">rack-0{n}-vps.interenl</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content segment */}
                <div className="p-6 flex flex-col gap-4 font-sans">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#f8fafc]">Starter Minecraft Node</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Singapore • Germany • France • BD</p>
                    </div>
                    <div className="px-2 py-0.5 bg-sky-400/10 rounded border border-sky-400/20 text-[9px] font-bold text-sky-400">
                      Ryzen 9 Host
                    </div>
                  </div>

                  {/* Mini Price Indicator */}
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-bold">Starting Offer</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-2xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#38bdf8]">
                          {currency === "USD" ? "$1.80" : "₹175"}
                        </span>
                        <span className="text-xs text-slate-400">/mo</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setPlanTab("minecraft");
                        document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-4 py-2 text-slate-950 font-bold rounded-lg text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${activeBtnColor}`}
                    >
                      <span>Get Server</span>
                      <ChevronRight size={12} className="text-slate-950" />
                    </button>
                  </div>

                  {/* Bottom Quick specs */}
                  <div className="grid grid-cols-3 gap-2 text-center text-slate-400">
                    <div className="bg-slate-900/40 p-2 rounded border border-slate-800/30">
                      <div className="text-[10px] font-mono font-bold text-sky-400">4GB DDR4</div>
                      <div className="text-[8px] uppercase tracking-wider text-slate-500">RAM Allocation</div>
                    </div>
                    <div className="bg-slate-900/40 p-2 rounded border border-slate-800/30">
                      <div className="text-[10px] font-mono font-bold text-sky-400">2 vCores</div>
                      <div className="text-[8px] uppercase tracking-wider text-slate-500">CPU Thread</div>
                    </div>
                    <div className="bg-slate-900/40 p-2 rounded border border-slate-800/30">
                      <div className="text-[10px] font-mono font-bold text-sky-400">50GB NVMe</div>
                      <div className="text-[8px] uppercase tracking-wider text-slate-500">Fast Solid storage</div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* THREE INTEGRATED STATS FOR TRUST */}
          <section className="bg-slate-950/40 border-y border-white/5 py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 font-sans">
              
              <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-slate-900/20 transition">
                <div className={`p-3 rounded-lg border ${activeBadgeStyle}`}>
                  <Zap size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-100">Instant Setup</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">Our proprietary automated system provisions VPS containers and Minecraft servers in under 60 seconds.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-slate-900/20 transition">
                <div className={`p-3 rounded-lg border ${activeBadgeStyle}`}>
                  <Shield size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-100">1 Tbps DDoS Shield</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">Full spectrum security filters block stateful vector attacks without causing performance drops or packet jitter.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-slate-900/20 transition">
                <div className={`p-3 rounded-lg border ${activeBadgeStyle}`}>
                  <Clock size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-100">99.9% Uptime SLA</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">Premium enterprise grade hosting built over failover redundant architectures so your server is always live.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-slate-900/20 transition">
                <div className={`p-3 rounded-lg border ${activeBadgeStyle}`}>
                  <Phone size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-100">24/7 Support Desk</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">Our dedicated engineers are active round-the-clock inside Discord ticket pipelines to ensure lightning quick resolutions.</p>
                </div>
              </div>

            </div>
          </section>

          {/* MAIN CONFIGURATION AND PLANS SECTION */}
          <section id="plans" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative rounded-3xl overflow-hidden">
            
            {/* Ambient style header */}
            <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold ${activeBadgeStyle}`}>
                Interactive Product Catalog
              </div>
              
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100 mt-1">
                Choose Your High-Performance Plan
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                All plans are powered by top-tier processors, dedicated RAM boundaries, and fully unmetered 1 Gbps uplink pipelines. Select an active geographic target location to optimize your node latency and routing.
              </p>

              {/* Catalog Tabs Header */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 p-1.5 bg-slate-950/50 backdrop-blur-md border border-white/5 rounded-xl max-w-lg w-full">
                <button
                  type="button"
                  onClick={() => setPlanTab("cloud")}
                  className={`flex-1 min-w-[100px] py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${plaTab === "cloud" ? activeBtnColor + " shadow" : "text-slate-400 hover:text-slate-200"}`}
                >
                  <Cpu size={13} />
                  <span>Cloud VPS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPlanTab("storage")}
                  className={`flex-1 min-w-[100px] py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${plaTab === "storage" ? activeBtnColor + " shadow" : "text-[#94a3b8] hover:text-[#f8fafc]"}`}
                >
                  <HardDrive size={13} />
                  <span>Storage Nodes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPlanTab("minecraft")}
                  className={`flex-1 min-w-[100px] py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${plaTab === "minecraft" ? activeBtnColor + " shadow" : "text-[#94a3b8] hover:text-[#f8fafc]"}`}
                >
                  <Flame size={13} />
                  <span>Minecraft Host</span>
                </button>
              </div>

              {/* Processor Architecture Selector Widget */}
              <div className="w-full mt-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <Cpu size={13} className="text-[#38bdf8] animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      Step 1: Choose Processor Architecture
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold text-sky-400">
                    Selected: {selectedCpu === "Ryzen9" ? "AMD Ryzen 9 Elite" : "Intel Xeon Scalable"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/40 backdrop-blur-md p-4 border border-white/5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setSelectedCpu("Ryzen9")}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                      selectedCpu === "Ryzen9"
                        ? "bg-sky-500/10 border-[#38bdf8] ring-1 ring-[#38bdf8]/25 shadow-lg shadow-sky-500/10 text-white"
                        : "bg-slate-950/45 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://assets.caseking.de/1758619172796_Ryzen9_logo.jpg"
                          alt="AMD Ryzen 9"
                          className="w-8 h-8 rounded object-cover border border-white/10 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-extrabold text-sm text-slate-100 block">
                            AMD Ryzen 9 Elite
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            4.5GHz+ Clock speed
                          </span>
                        </div>
                      </div>
                      {selectedCpu === "Ryzen9" && (
                        <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-450/30">
                          <Check size={10} className="stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal font-sans">
                      Supercharged peak single-thread execution for high physical database queries and game server loops.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCpu("Xeon")}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                      selectedCpu === "Xeon"
                        ? "bg-sky-500/10 border-[#38bdf8] ring-1 ring-[#38bdf8]/25 shadow-lg shadow-sky-500/10 text-white"
                        : "bg-slate-950/45 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/8/83/Intel_Xeon_2020_logo.svg"
                          alt="Intel Xeon"
                          className="w-8 h-8 rounded object-contain border border-white/10 shadow-sm bg-slate-900 p-0.5"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-extrabold text-sm text-slate-100 block">
                            Intel Xeon Scalable
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            Enterprise server load
                          </span>
                        </div>
                      </div>
                      {selectedCpu === "Xeon" && (
                        <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-450/30">
                          <Check size={10} className="stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal font-sans">
                      Optimized for heavy enterprise parallel processing, virtual sandboxing environments and virtualization tasks.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Config banner */}
            <div className="max-w-4xl mx-auto mb-8 bg-slate-900/30 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-5 text-xs">
              <div className="flex flex-wrap items-center gap-5 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-slate-300">
                  <Wifi size={14} className="text-sky-45" />
                  <span className="font-mono text-slate-400">Network:</span>
                  <span className="font-bold">1 Gbps Unmetered</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800 hidden md:inline-block" />
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={14} className="text-sky-45" />
                  <span className="font-mono text-slate-400">Bandwidth:</span>
                  <span className="font-bold">Unlimited</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800 hidden md:inline-block" />
                <div className="flex items-center gap-2 text-slate-300">
                  <Shield size={14} className="text-sky-45" />
                  <span className="font-mono text-slate-400">Anti-DDoS Scrubbin:</span>
                  <span className="font-bold">1 Tbps DDoS Shield</span>
                </div>
              </div>
              <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 tracking-wider text-[10px] font-mono rounded select-none font-extrabold uppercase">
                🚀 Multi-CPU Architecture
              </div>
            </div>

            {/* RENDER PRODUCT CATALOG SHOWCASE GRID */}
            {/* DYNAMIC TRANSITION CATALOG SHOWCASE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto font-sans">
              <AnimatePresence mode="popLayout">
                {activePlans.map((plan: Plan) => {
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      transition={{ duration: 0.2 }}
                      key={plan.id}
                      className={`relative p-6 rounded-2xl glass-panel border overflow-hidden flex flex-col justify-between transition-all ${plan.featured ? "border-[#38bdf8]/40 ring-1 ring-[#38bdf8]/20 shadow-xl shadow-[#38bdf8]/5 after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-32 after:bg-gradient-to-r after:from-[#38bdf8] after:to-sky-405" : "border-slate-800/80 hover:border-[#38bdf8]/20"}`}
                    >
                      
                      {plan.featured && (
                        <div className="absolute top-3 right-3 select-none px-2 py-0.5 bg-gradient-to-r from-[#38bdf8] to-sky-600 text-slate-950 font-mono text-[9px] font-black uppercase rounded tracking-wider">
                          ★ Best Value
                        </div>
                      )}

                      <div>
                        <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase font-extrabold pb-0.5">
                          {plaTab.toUpperCase()} NODE INSTANCE
                        </span>
                        <h3 className="font-display font-extrabold text-[#f1f5f9] text-base mt-1">
                          {plan.name}
                        </h3>

                        {/* Multi currency display block */}
                        <div className="py-4 border-b border-slate-900/60 my-4">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                              {currency === "USD" ? `$${getPlanPriceUSD(plan).toFixed(2)}` : `₹${getPlanPriceINR(plan)}`}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">/mo recurring</span>
                          </div>
                          
                          <p className="text-[10px] text-slate-500 mt-1">
                            Alternative rate: <span className="text-slate-400">{currency === "USD" ? `₹${getPlanPriceINR(plan)}` : `$${getPlanPriceUSD(plan).toFixed(2)}`}</span>
                          </p>
                        </div>

                          {/* Resources list items specs */}
                          <div className="flex flex-col gap-3 py-1 text-xs">
                            
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 flex items-center gap-2">
                                <Cpu size={13} className="text-[#38bdf8]" />
                                <span>Processor Allocation</span>
                              </span>
                              <div className="flex items-center gap-1.5 bg-slate-950/50 px-2 py-0.5 rounded border border-white/5">
                                <img
                                  src={selectedCpu === "Ryzen9" ? "https://assets.caseking.de/1758619172796_Ryzen9_logo.jpg" : "https://upload.wikimedia.org/wikipedia/commons/8/83/Intel_Xeon_2020_logo.svg"}
                                  alt="CPU brand"
                                  className="w-3.5 h-3.5 object-contain rounded-xs"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="font-mono text-slate-100 font-bold">
                                  {plan.cores} ({selectedCpu === "Ryzen9" ? "Ryzen 9" : "Xeon"})
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 flex items-center gap-2">
                                <Layers size={13} className="text-[#38bdf8]" />
                                <span>RAM Allocation</span>
                              </span>
                              <span className="font-mono text-slate-100 font-bold">{plan.ram}</span>
                            </div>

                            <div className="flex items-center justify-between font-sans">
                              <span className="text-slate-400 flex items-center gap-2">
                                <HardDrive size={13} className="text-[#38bdf8]" />
                                <span>Drive Solid Storage</span>
                              </span>
                              <span className="font-mono text-slate-100 font-bold">{plan.storage} <span className="text-[10px] text-slate-500 uppercase">{plan.storageType}</span></span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 flex items-center gap-2">
                                <Shield size={13} className="text-[#38bdf8]" />
                                <span>DDoS Scrubbing</span>
                              </span>
                              <span className="font-mono text-emerald-400 font-bold">1 Tbps Shield</span>
                            </div>

                          </div>
                        </div>

                        {/* Primary CTA buy-button */}
                        <div className="mt-8 pt-4 border-t border-slate-900">
                          <button
                            onClick={() => handleOrderInitiation(plan)}
                            className={`w-full py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${plan.featured ? activeBtnColor : "bg-slate-900 border border-slate-800 text-slate-200 hover:text-white"}`}
                          >
                            <span>Configure / Rent Server Instantly</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

          </section>

          {/* ADVANCED FEATURES SECTION */}
          <section id="features" className="bg-[#030712] py-20 border-t border-slate-900 relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#38bdf8]/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4">
              
              <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold ${activeBadgeStyle}`}>
                  Unmatched Quality
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100">
                  Advanced Node Architecture
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
                  Engineered from the ground up for low-latency responsiveness, durable computing, and total user sovereignty.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    title: "High Performance",
                    description: "Powered by top-tier modern AMD Ryzen 9 9950X processors, ensuring maximum single-thread responsiveness and clock speeds exceeding 4.5+ GHz.",
                    icon: <Cpu className="text-[#38bdf8]" size={20} />
                  },
                  {
                    title: "Low Latency",
                    description: "Optimized route configurations and stateful BGP pairings mean minimized lag, steady frame processing, and extremely clean latency matrices.",
                    icon: <Zap className="text-[#38bdf8]" size={20} />
                  },
                  {
                    title: "Advanced Security & Protection",
                    description: "Our localized perimeter monitors detect, scrub, and neutralize layer 3, 4, and 7 DDoS threats in real-time, preserving continuous application health.",
                    icon: <Shield className="text-[#38bdf8]" size={20} />
                  },
                  {
                    title: "Sovereignty & Management Control",
                    description: "Complete administration capabilities, including dedicated ports, custom virtualization modules, full console diagnostics, and customizable operating system templates.",
                    icon: <Layers className="text-[#38bdf8]" size={20} />
                  },
                  {
                    title: "Dedicated Hardware resource",
                    description: "Rigid non-oversubscribed kernels guarantee that your assigned vCPU threads, DDR4/DDR5 memory limits, and NVMe sector space remain fully yours.",
                    icon: <HardDrive className="text-[#38bdf8]" size={20} />
                  },
                  {
                    title: "Global Server Nodes Geography",
                    description: "Deploy from your choice of optimal global regions: USA, Singapore, France, Germany, Mexico, the United Kingdom, and Bangladesh.",
                    icon: <Globe className="text-[#38bdf8]" size={20} />
                  }
                ].map((feat, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 rounded-2xl glass-panel glass-panel-hover transition border border-slate-900 group flex flex-col gap-4 font-sans"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${activeBadgeStyle}`}>
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-slate-100 group-hover:text-amber-400 transition-colors text-sm font-bold">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* GEOGRAPHICAL LOCATIONS TARGET SELECTION AND ACTIVE PLAN SYNC & MAP MAP DISPLAY */}
          <section id="locations" className="max-w-7xl mx-auto px-4 py-20 relative">
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-sky-950/20 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left panel specs */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest self-start font-bold uppercase ${activeBadgeStyle}`}>
                  Global Datacenters geography
                </span>
                
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100">
                  Select Geographical Target Node Area
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mt-1">
                  InterEnl nodes span multiple key geographical junctions worldwide. 
                  Highlighting nodes on the map physically updates targets on your configurator, 
                  ensuring low-latency setups close to your client base.
                </p>

                 {/* Quick Location Cards */}
                <div className="flex flex-col gap-2 mt-2 font-sans">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setSelectedLocId(loc.id);
                      }}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${selectedLocId === loc.id ? "bg-sky-500/10 border-[#38bdf8] text-white" : "bg-slate-950/40 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"}`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={loc.flagUrl} 
                          alt={loc.country} 
                          className="w-7 h-7 rounded-full object-cover border border-white/10 shrink-0 select-none shadow-sm" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-slate-100">{loc.country}</h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <img 
                              src={loc.cpuType === "Ryzen9" ? "https://assets.caseking.de/1758619172796_Ryzen9_logo.jpg" : "https://upload.wikimedia.org/wikipedia/commons/8/83/Intel_Xeon_2020_logo.svg"} 
                              alt={loc.cpuType === "Ryzen9" ? "Ryzen 9" : "Xeon"} 
                              className="w-3.5 h-3.5 object-contain rounded-xs" 
                              referrerPolicy="no-referrer"
                            />
                            <p className="text-[10px] text-slate-500 font-mono leading-none">{loc.hardware}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-mono bg-slate-950/70 px-2 py-0.5 rounded text-slate-400 border border-white/5">
                          {loc.city}
                        </span>
                        
                        {loc.status === "Online" ? (
                          <span className="flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 border border-emerald-900/30 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9.5px] text-emerald-400 font-bold uppercase tracking-wider font-mono">Live</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 border border-amber-900/30 rounded">
                            <span className="text-[9.5px] text-amber-500 font-bold uppercase tracking-wider font-mono">Maint</span>
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

              </div>

              {/* Right panel: Live map representation */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="relative h-64 sm:h-96 bg-slate-950/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                  
                  {/* Glowing central matrix layout */}
                  <div className="absolute w-64 h-64 rounded-full border-2 border-slate-900 flex items-center justify-center opacity-70">
                    <div className="w-48 h-48 rounded-full border border-slate-800/80 flex items-center justify-center animate-pulse">
                      <div className="w-36 h-36 rounded-full border border-sky-950/85" />
                    </div>
                  </div>

                  {/* Render node buttons coordinates dynamically over customizable map */}
                  {locations.map((loc) => {
                    const isActive = selectedLocId === loc.id;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocId(loc.id);
                        }}
                        style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 cursor-pointer animate-none"
                      >
                        <div className="relative">
                          {isActive && (
                            <>
                              <div className="absolute -inset-2 rounded-full bg-sky-400 opacity-30 animate-ping" />
                              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 opacity-60 animate-pulse" />
                            </>
                          )}
                          <div className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border shadow-lg transition-all bg-slate-950 ${isActive ? "border-sky-400 ring-2 ring-sky-400/30 scale-125 bg-slate-950" : "border-slate-800 hover:border-slate-600 hover:scale-110"}`}>
                            <img 
                              src={loc.flagUrl} 
                              alt={loc.country} 
                              className="w-full h-full object-cover rounded-full" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          
                          {/* Floating interactive tooltip anchor */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-9 hidden group-hover:flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-slate-200 px-2.5 py-1 rounded text-[9.5px] font-mono whitespace-nowrap z-20 shadow-xl">
                            <img 
                              src={loc.flagUrl} 
                              alt="" 
                              className="w-3 h-3 rounded-full object-cover animate-spin duration-300" 
                              referrerPolicy="no-referrer"
                            />
                            <span>{loc.country} ({loc.city})</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {/* Legend guide layout */}
                  <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-800/80 p-3 rounded-lg text-[9px] font-mono text-slate-400 flex flex-col gap-1 select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                      <span>Active Location Chosen</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-850 border border-slate-800" />
                      <span>Available Server Junction</span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 text-[9px] text-slate-600 font-mono select-none">
                    INTERENL PHYSICAL MAP v2.60
                  </div>
                </div>
              </div>

            </div>
          </section>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900/80 py-12 px-4 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start font-sans">
          
          {/* Logo & description column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img 
                id="footer-logo-img"
                src={logoUrl} 
                alt={`${brandName} Corp Logo`} 
                className="w-10 h-10 rounded-full border border-slate-800 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-base text-slate-200 tracking-wider">{brandName} LLC</span>
                <span className="text-[8px] font-mono text-sky-400">Simply Powerful Gaming</span>
              </div>
            </div>
            <p className="text-slate-500 leading-normal max-w-sm text-[11px]">
              Top-tier web systems hosting. Deploy secure, unmetered, stateful VPS servers and latency stabilized Minecraft nodes instantly on our enterprise network nodes.
            </p>
          </div>

          {/* Links columns */}
          <div className="md:col-span-4 font-sans">
            <h5 className="font-bold text-slate-200 text-xs mb-3 font-display">Products Offering</h5>
            <ul className="flex flex-col gap-2 text-slate-500">
              <li>
                <button 
                  onClick={() => { setAdminMode(false); setPlanTab("cloud"); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }} 
                  className="hover:text-[#38bdf8] transition-colors text-left cursor-pointer text-[11px]"
                >
                  Cloud VPS Servers (AMD Ryzen 9)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setAdminMode(false); setPlanTab("storage"); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }} 
                  className="hover:text-[#38bdf8] transition-colors text-left cursor-pointer text-[11px]"
                >
                  Storage Host Units (BGP routed)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setAdminMode(false); setPlanTab("minecraft"); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }} 
                  className="hover:text-[#38bdf8] transition-colors text-left cursor-pointer text-[11px]"
                >
                  Minecraft Gaming Nodes (Ryzen 9)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setAdminMode(false); setPlanTab("customizer"); document.getElementById("plans")?.scrollIntoView({ behavior: 'smooth' }); }} 
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer text-[11px] font-bold"
                >
                  ⚡ Dynamic Customized Build Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hidden Secure access link */}
          <div className="md:col-span-3 flex flex-col gap-3 text-slate-500 text-[11px] font-sans">
            <h5 className="font-bold text-slate-200 text-xs mb-1 font-display">Communication Gate</h5>
            <p className="text-slate-500">Available via phone & support tickets channel:</p>
            
            <a href="tel:+6285198068374" className="text-slate-300 hover:text-sky-400 font-mono font-bold flex items-center gap-1.5 animate-none">
              <Phone size={11} className="text-sky-400" />
              <span>+62 851-9806-8374</span>
            </a>

            {/* SECURED ADMIN LINK REDIRECTION */}
            <div className="pt-2 border-t border-slate-900 mt-2">
              <button
                onClick={() => {
                  window.location.hash = "#admin";
                  setAdminMode(true);
                }}
                className="text-slate-600 hover:text-rose-500 font-mono tracking-widest text-[9.5px] text-left uppercase flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Lock size={10} />
                <span>🔐 Administrator access</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-[10px] uppercase font-mono select-none">
          <div>
            © 2026 {brandName} LLC. All software rights reserved.
          </div>
          <div className="flex gap-4 font-mono text-[10px]">
            <span>Powered by AMD Ryzen 9 CPUs Only</span>
          </div>
        </div>
      </footer>

      {/* CHANNELS ORDER CONFIRMATION MODAL */}
      <AnimatePresence>
        {showOrderDisclaimer && checkoutPlan && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-[#030712] border-2 border-slate-900 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              
              {/* Modal Head */}
              <div className="p-5 border-b border-slate-900 bg-slate-900/40 flex items-center justify-between font-sans">
                <div className="flex items-center gap-2.5">
                  <Flame size={16} className={activeAccentColor} />
                  <span className="font-display font-black text-xs uppercase tracking-wider text-slate-100">Configure Instance Selection</span>
                </div>
                <button
                  onClick={() => setShowOrderDisclaimer(false)}
                  className="text-slate-500 hover:text-slate-300 transition text-sm cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content / Configuration forms */}
              <div className="p-6 flex flex-col gap-5 max-h-[420px] overflow-y-auto font-sans">
                
                {/* Summary of what they selected */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex flex-col gap-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold">Base Plan Selection</span>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-display font-extrabold text-sm text-slate-105">{checkoutPlan.name}</h4>
                    <span className="text-sm font-black font-display text-sky-400">
                      {currency === "USD" ? `$${getPlanPriceUSD(checkoutPlan).toFixed(2)}` : `₹${getPlanPriceINR(checkoutPlan)}`} /mo
                    </span>
                  </div>
                  
                  {/* Resource pills */}
                  <div className="flex gap-2.5 mt-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold">
                    <span>{checkoutPlan.cores} ({selectedCpu === "Ryzen9" ? "Ryzen 9" : "Xeon"})</span>
                    <span>•</span>
                    <span>{checkoutPlan.ram} RAM</span>
                    <span>•</span>
                    <span>{checkoutPlan.storage} {checkoutPlan.storageType}</span>
                  </div>
                </div>

                {/* Step 1: Select location */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-extrabold font-bold">Active Node Land Location Area:</label>
                  <select
                    value={checkoutLocation}
                    onChange={(e) => setCheckoutLocation(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-sky-505"
                  >
                    {locations.map(loc => {
                      const cpuLabel = selectedCpu === "Ryzen9" ? "Ryzen 9" : "Xeon";
                      return (
                        <option key={loc.id} value={`${loc.country} (${cpuLabel})`}>
                          {loc.country} - {loc.city} ({cpuLabel}) [{loc.status}]
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Step 2: Billing Cycle Slider */}
                <div className="flex flex-col gap-2 font-sans">
                  <div className="flex justify-between text-[10px] font-mono font-bold uppercase text-slate-550 tracking-wider">
                    <span>Billing cycle term</span>
                    <span className="text-sky-400">{billingCycle === 1 ? "1 Month (Standard)" : `${billingCycle} Months (5% Discount!)`}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {[1, 3, 6, 12].map((m) => (
                      <button
                        key={m}
                        onClick={() => setBillingCycle(m)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${billingCycle === m ? "bg-slate-900 border-sky-450 text-sky-400" : "bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200"}`}
                      >
                        {m === 1 ? "1 Mo" : `${m} Mo`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Billing Summary calculation */}
                <div className="border-t border-slate-900 pt-4 flex flex-col gap-2 font-sans">
                  
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Term Subtotal:</span>
                    <span>
                      {currency === "USD" 
                        ? `$${(getPlanPriceUSD(checkoutPlan) * billingCycle).toFixed(2)}` 
                        : `₹${(getPlanPriceINR(checkoutPlan) * billingCycle)}`}
                    </span>
                  </div>

                  {billingCycle > 1 && (
                    <div className="flex justify-between text-xs text-emerald-400 font-bold font-sans">
                      <span>Term Discount (5% Off):</span>
                      <span>
                        {currency === "USD"
                          ? `-$${((getPlanPriceUSD(checkoutPlan) * billingCycle) * 0.05).toFixed(2)}`
                          : `-₹${Math.round((getPlanPriceINR(checkoutPlan) * billingCycle) * 0.05)}`}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-950 mt-1">
                    <span className="text-xs font-bold text-slate-200 font-bold">Estimated Total:</span>
                    <div className="flex flex-col items-end">
                      <span className="text-xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                        {currency === "USD"
                          ? `$${((getPlanPriceUSD(checkoutPlan) * billingCycle) * (billingCycle > 1 ? 0.95 : 1)).toFixed(2)}`
                          : `₹${Math.round((getPlanPriceINR(checkoutPlan) * billingCycle) * (billingCycle > 1 ? 0.95 : 1))}`}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">Recurring USD/INR via UPI/Credit</span>
                    </div>
                  </div>

                </div>

                {/* Alert Disclaimer info */}
                <div className="p-3 bg-amber-500/10 border border-amber-500/15 rounded-xl flex gap-2 w-full text-[10.5px] text-amber-250 leading-normal">
                  <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    <strong>Policy Confirmation:</strong> By ordering, you acknowledge that all sales are final and mining is strictly prohibited on {brandName} servers. To complete the setup, a support ticket will open instantly on Discord.
                  </p>
                </div>

              </div>

              {/* Modal Actions */}
              <div className="p-5 border-t border-slate-900 bg-slate-950/40 flex gap-3.5">
                <button
                  onClick={() => setShowOrderDisclaimer(false)}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={finalizeOrder}
                  className={`flex-1 py-3 text-slate-950 text-xs font-extrabold rounded-lg shadow transition flex items-center justify-center gap-1.5 cursor-pointer ${activeBtnColor}`}
                >
                  <span>Build server via Discord Ticket</span>
                  <ExternalLink size={12} />
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
