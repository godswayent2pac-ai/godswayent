import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { ThemeToggle } from '../theme-toggle';

export default function StorefrontLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartCount, animations } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-500">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md py-4 shadow-sm border-b border-border' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif italic tracking-tighter text-accent transition-all">
            God's Way Ent.
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === link.path ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative w-64">
              <Input
                type="search"
                placeholder="Search parts..."
                className="bg-muted/50 border-border rounded-full pl-10 focus:ring-accent transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            </div>

            <ThemeToggle />

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-accent transition-all">
                <motion.div
                  key={cartCount}
                  animate={cartCount > 0 ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.div>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Global Fly-to-Cart Animation Layer */}
            <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
              <AnimatePresence>
                {animations.map((anim) => (
                  <motion.div
                    key={anim.id}
                    initial={{ 
                      x: anim.startX - 20, 
                      y: anim.startY - 20, 
                      scale: 1, 
                      opacity: 1 
                    }}
                    animate={{ 
                      x: typeof window !== 'undefined' ? window.innerWidth - 80 : 1000, 
                      y: 30, 
                      scale: 0.2, 
                      opacity: 0,
                      rotate: 360
                    }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    className="fixed w-12 h-12 rounded-full border-2 border-accent bg-background shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] overflow-hidden flex items-center justify-center p-1"
                  >
                    <img src={anim.imageUrl} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Mobile Nav */}
            <Sheet>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
                <Menu className="w-6 h-6 text-muted-foreground" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border text-foreground">
                <div className="flex flex-col space-y-8 mt-12">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-2xl font-semibold hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest font-bold">Switch Mode</span>
                    <ThemeToggle />
                  </div>
                  <div className="relative pt-4 text-foreground/80">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="bg-muted border-border rounded-xl pl-10 h-12"
                    />
                    <Search className="absolute left-3 bottom-4 text-muted-foreground w-5 h-5" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 text-muted-foreground transition-all duration-300">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-serif italic text-accent">God's Way Ent.</h3>
            <p className="text-muted-foreground/80 text-sm leading-relaxed">
              Premium auto parts retailer based in Accra, Ghana. Providing high-quality components for all vehicle models.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-accent uppercase tracking-widest text-xs">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?cat=engine" className="hover:text-foreground transition-colors">Engine Parts</Link></li>
              <li><Link to="/products?cat=body" className="hover:text-foreground transition-colors">Body Parts</Link></li>
              <li><Link to="/products?cat=lights" className="hover:text-foreground transition-colors">Lighting</Link></li>
              <li><Link to="/products?cat=suspension" className="hover:text-foreground transition-colors">Suspension</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-accent uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/dashboard/login" className="hover:text-accent transition-colors font-bold">Staff Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-accent uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Accra, Ghana</li>
              <li>+233 24 123 4567</li>
              <li>info@godswayent.com</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()} God's Way Ent. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
