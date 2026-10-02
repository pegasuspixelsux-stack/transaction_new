export type DashboardIcon =
  | "LayoutDashboard"
  | "Building2"
  | "Users"
  | "ShieldCheck"
  | "ExternalLink"
  | "Settings";

export type DashboardLink = { name: string; href: string; icon: DashboardIcon };

export const dashboardConfig: {
  brand: { name: string; subtitle: string; logoLetter: string };
  navigation: DashboardLink[];
  currentUser: { name: string; role: string; email: string; avatar: string };
  contact: {
    address: string;
    addressShort: string;
    hours: string;
    hoursShort: string;
    phone: string;
    phoneHref: string;
  };
  footerNav: DashboardLink[];
} = {
  brand: {
    name: "Transaction",
    subtitle: "Real Estate Portal",
    logoLetter: "O",
  },
  navigation: [
    { name: "Control Panel", href: "/dashboard", icon: "LayoutDashboard" },
    { name: "Properties", href: "/dashboard/properties", icon: "Building2" },
    { name: "Leads", href: "/dashboard/leads", icon: "Users" },
    { name: "Users", href: "/dashboard/users", icon: "ShieldCheck" },
  ],
  currentUser: {
    name: "Alejandro G.",
    role: "Administrator",
    email: "alejandro@oceanus.uy",
    avatar: "",
  },
  contact: {
    address: "Ruta 10, km 161 · José Ignacio",
    addressShort: "José Ignacio",
    hours: "Lun–Sáb · 9 a 19 h",
    hoursShort: "9–19 h",
    phone: "+598 42 77 1234",
    phoneHref: "tel:+59842771234",
  },
  footerNav: [
    { name: "Volver al sitio", href: "/", icon: "ExternalLink" },
    { name: "Configuración", href: "/dashboard/settings", icon: "Settings" },
  ],
};
