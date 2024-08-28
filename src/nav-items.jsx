import { HomeIcon, LayoutDashboard } from "lucide-react";
import Index from "./pages/Index.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Admin Panel",
    to: "/admin",
    icon: <LayoutDashboard className="h-4 w-4" />,
    page: <AdminPanel />,
  },
];
