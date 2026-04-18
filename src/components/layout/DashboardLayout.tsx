import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users, 
  Search, 
  LogOut,
  Bell,
  BarChart3,
  Users2,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '../theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navSections = [
    {
      label: 'Core Ops',
      items: [
        { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'POS', path: '/dashboard/pos', icon: ShoppingCart },
        { name: 'Inventory', path: '/dashboard/inventory', icon: Package },
        { name: 'Orders', path: '/dashboard/orders', icon: Truck },
      ]
    },
    {
      label: 'Management',
      items: [
        { name: 'Warehouses', path: '/dashboard/warehouses', icon: Settings },
        { name: 'Employees', path: '/dashboard/employees', icon: Users },
        { name: 'CRM', path: '/dashboard/crm', icon: Users2 },
        { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
      ]
    }
  ];

  const SidebarContent = ({ collapsed = false, isMobile = false }) => (
    <div className="flex flex-col h-full bg-card overflow-hidden">
      <div className={`p-6 mb-2 flex items-center ${!collapsed ? 'justify-between' : 'justify-center'}`}>
        {!collapsed ? (
          <Link to="/dashboard" className="text-xl font-bold tracking-tighter text-foreground flex items-center gap-2 italic font-serif transition-colors whitespace-nowrap">
            God's Way Ent.
          </Link>
        ) : (
          <Link to="/dashboard" className="text-2xl font-black italic font-serif text-accent">G</Link>
        )}
      </div>

      <nav className={`flex-grow px-4 space-y-6 overflow-y-auto scrollbar-hide ${collapsed && 'items-center'}`}>
        {navSections.map((section) => (
          <div key={section.label} className="space-y-2">
            {!collapsed && (
              <h3 className="px-4 text-[10px] font-bold italic font-serif uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
                {section.label}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.name : undefined}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-200 group relative ${
                      isActive 
                        ? 'bg-accent/10 text-foreground border border-accent/30' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                    } ${collapsed && 'justify-center px-0'}`}
                  >
                    <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-accent' : 'group-hover:text-foreground transition-colors'}`} />
                    {!collapsed && (
                      <span className="whitespace-nowrap">{item.name}</span>
                    )}
                    
                    {collapsed && isActive && (
                      <div className="absolute left-0 w-1 h-6 bg-accent rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
            {collapsed && <Separator className="bg-border/50 mx-2" />}
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto space-y-4">
        <Separator className="bg-border" />
        <Button 
          variant="ghost" 
          onClick={logout}
          className={`w-full justify-start text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 gap-3 px-4 font-bold text-xs uppercase tracking-widest transition-colors ${collapsed && 'justify-center px-0'}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden transition-colors duration-300">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        className="hidden lg:flex bg-card border-r border-border flex-col shadow-sm z-20 overflow-hidden relative"
      >
        <SidebarContent collapsed={!isSidebarOpen} />
        
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute right-0 top-20 translate-x-1/2 bg-card border border-border rounded-full p-1 shadow-md hover:bg-muted transition-colors z-30"
        >
          {isSidebarOpen ? <ChevronLeft className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border px-4 md:px-8 flex items-center justify-between bg-card z-10 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-2 md:gap-6 flex-grow max-w-xl">
            {/* Mobile Nav Toggle */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden hover:bg-muted rounded-xl transition-all" />}>
                <Menu className="w-5 h-5 text-muted-foreground" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 border-r border-border bg-card w-72">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <SidebarContent isMobile />
              </SheetContent>
            </Sheet>

            {/* Desktop Nav Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex hover:bg-muted rounded-xl transition-all"
            >
              <Menu className="w-5 h-5 text-muted-foreground" />
            </Button>

            <div className="relative w-full hidden sm:block max-w-xs md:max-w-md">
              <Input
                type="search"
                placeholder="Search..."
                className="bg-muted border-border rounded-xl pl-10 h-10 focus:ring-accent transition-colors text-xs"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-muted transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </Button>
            
            <Separator orientation="vertical" className="h-6 bg-border hidden md:block" />

            <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-muted p-1 rounded-lg transition-colors">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-foreground">{user?.name || 'Staff'}</div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
                  Terminal
                </div>
              </div>
              <Avatar className="w-7 h-7 md:w-8 md:h-8 ring-2 ring-border transition-all">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-[10px]">{user?.name?.substring(0, 2).toUpperCase() || 'ST'}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-grow overflow-y-auto p-4 md:p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
