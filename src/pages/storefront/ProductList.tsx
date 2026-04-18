import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, ShoppingBag, X, Eye, Minus, Plus, ShoppingCart, Shield, Truck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Lightbox } from '@/components/ui/lightbox';
import { Maximize2 } from 'lucide-react';
import Fuse from 'fuse.js';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Forged Piston Set', sku: 'GW-PST-001', price: 1200, category: 'Engine', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c3d8?q=80&w=400' },
  { id: '2', name: 'Coilovers V3', sku: 'GW-SUS-002', price: 3500, category: 'Suspension', img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=400' },
  { id: '3', name: 'LED Headlight Assembly', sku: 'GW-LGT-003', price: 850, category: 'Lighting', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400' },
  { id: '4', name: 'Ceramic Brake Pads', sku: 'GW-BRK-004', price: 250, category: 'Brakes', img: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=400' },
  { id: '5', name: 'Turbocharger T60', sku: 'GW-ENG-005', price: 4200, category: 'Engine', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c3d8?q=80&w=400' },
  { id: '6', name: 'Carbon Fiber Mirror Caps', sku: 'GW-BDY-006', price: 180, category: 'Body', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400' },
  { id: '7', name: 'Performance Air Filter', sku: 'GW-INT-007', price: 95, category: 'Intake', img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=400' },
  { id: '8', name: 'Exhaust Manifold', sku: 'GW-EXH-008', price: 600, category: 'Exhaust', img: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=400' },
];

const CATEGORIES = ['All', 'Engine', 'Suspension', 'Lighting', 'Brakes', 'Body', 'Intake', 'Exhaust'];

export default function ProductList() {
  const { addToCart, triggerFlyAnimation } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const fuse = new Fuse(MOCK_PRODUCTS, {
    keys: ['name', 'sku', 'category'],
    threshold: 0.3,
    distance: 100,
  });

  const suggestions = searchTerm.length >= 2 ? fuse.search(searchTerm).slice(0, 5) : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickAdd = (e: React.MouseEvent, p: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Trigger animation
    triggerFlyAnimation(e.clientX, e.clientY, p.img);

    const product: Product = {
      id: p.id,
      name: p.name,
      sku: p.sku,
      price: p.price,
      description: 'Genuine God\'s Way Parts component. High durability and precise fitment guaranteed.',
      images: [p.img],
      category_id: p.category.toLowerCase(),
    };
    addToCart(product, 1);
  };

  const filtered = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    
    if (!searchTerm) return matchesCategory;
    
    // Use fuzzy matching for the list as well if there's a search term
    const fuzzyResults = fuse.search(searchTerm);
    const isMatch = fuzzyResults.some(res => res.item.id === p.id);
    
    return isMatch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-16 bg-background text-foreground transition-colors duration-500 min-h-screen">
      <Lightbox 
        isOpen={isLightboxOpen} 
        onClose={() => setIsLightboxOpen(false)} 
        images={lightboxImages} 
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
        <div className="max-w-xl">
          <Badge variant="outline" className="mb-4 border-accent/30 text-accent uppercase tracking-widest font-bold text-[10px] px-3">
            Premium Inventory
          </Badge>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 uppercase flex flex-col">
            Original. 
            <span className="text-accent italic">Engineered.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            Sourced directly from manufacturers for peak vehicle performance and longevity.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 flex-grow max-w-2xl bg-card border border-border p-6 rounded-[2rem] shadow-sm transition-all">
          <div className="relative flex-grow" ref={searchRef}>
            <Input 
              type="search" 
              placeholder="SKU, Model, Name..." 
              value={searchTerm}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              className="bg-muted border-border rounded-xl pl-10 h-14 focus:ring-accent transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            
            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-[2rem] shadow-2xl overflow-hidden z-50 p-2"
                >
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2 opacity-50">Suggestions</div>
                  <div className="space-y-1">
                    {suggestions.map((result) => (
                      <button
                        key={result.item.id}
                        onClick={() => {
                          setSearchTerm(result.item.name);
                          setShowSuggestions(false);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-muted transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                            <img src={result.item.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <div className="text-xs font-bold font-serif italic text-foreground group-hover:text-accent transition-colors">{result.item.name}</div>
                            <div className="text-[9px] text-muted-foreground font-bold tracking-widest">{result.item.sku}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative group min-w-[150px]">
             <select 
               value={selectedCategory}
               onChange={(e) => setSelectedCategory(e.target.value)}
               className="w-full h-14 bg-muted border border-border rounded-xl px-4 appearance-none text-xs font-bold uppercase tracking-widest cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all"
             >
               {CATEGORIES.map(cat => (
                 <option key={cat} value={cat}>{cat}</option>
               ))}
             </select>
             <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.length > 0 ? (
          filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group"
            >
              <div className="block relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-card border border-border group-hover:border-accent/40 transition-all duration-700">
                <motion.img 
                  src={product.img} 
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 cursor-zoom-in" 
                  referrerPolicy="no-referrer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setLightboxImages([product.img]);
                    setIsLightboxOpen(true);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                
                <div className="absolute top-6 left-6 transition-all duration-500">
                  <span className="bg-background/80 backdrop-blur-md border border-border text-[9px] font-bold tracking-widest text-muted-foreground px-4 py-1.5 rounded-full uppercase transition-all group-hover:border-accent/40 group-hover:text-foreground">
                    {product.category}
                  </span>
                </div>

                <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-2">
                  <Button 
                    size="icon" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuickViewProduct(product);
                      setQuickViewQty(1);
                    }}
                    className="bg-background/80 backdrop-blur-md hover:bg-accent hover:text-accent-foreground text-foreground rounded-full w-14 h-14 shadow-2xl transition-all active:scale-95 group/view"
                  >
                    <Eye className="w-6 h-6 group-hover/view:scale-110 transition-transform" />
                  </Button>
                  <Button 
                    size="icon" 
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-full w-14 h-14 shadow-2xl transition-all active:scale-95 group/btn"
                  >
                    <ShoppingBag className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                  </Button>
                </div>
              </div>
              
              <Link to={`/products/${product.id}`} className="mt-6 block space-y-2 px-2">
                <div className="text-[10px] text-accent font-bold tracking-[0.2em] uppercase">{product.sku}</div>
                <h3 className="text-xl font-bold tracking-tight text-foreground transition-all group-hover:text-accent line-clamp-1">{product.name}</h3>
                <div className="text-2xl font-light text-muted-foreground transition-all group-hover:text-foreground tracking-tighter">GHS {product.price.toLocaleString()}</div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center space-y-6">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <Search className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold uppercase tracking-tight">No match found.</h3>
              <p className="text-muted-foreground text-sm">Refine your search or filter criteria.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="rounded-full border-border hover:bg-muted font-bold text-xs uppercase tracking-widest px-8"
            >
              Reset Terminal
            </Button>
          </div>
        )}
      </div>

      {filtered.length > 0 && (
        <div className="mt-32 flex justify-center pb-12">
          <Button variant="ghost" className="text-muted-foreground hover:text-accent font-bold text-xs uppercase tracking-widest transition-all">
            Load More Product Nodes
          </Button>
        </div>
      )}

      {/* Quick View Modal */}
      <Dialog open={!!quickViewProduct} onOpenChange={(open) => !open && setQuickViewProduct(null)}>
        <DialogContent className="max-w-4xl bg-background border-border text-foreground rounded-[3rem] p-0 overflow-hidden shadow-2xl transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Visual Section */}
            <div className="aspect-square bg-muted relative group">
              <img 
                src={quickViewProduct?.img} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
              <div className="absolute top-8 left-8">
                <Badge variant="outline" className="bg-background/80 backdrop-blur-md border-accent/30 text-accent uppercase tracking-widest font-bold text-[10px] px-3 py-1">
                  {quickViewProduct?.category}
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-10 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <div className="text-[10px] text-accent font-bold tracking-[0.3em] uppercase">{quickViewProduct?.sku}</div>
                <DialogTitle className="text-4xl font-light tracking-tighter uppercase leading-tight">{quickViewProduct?.name}</DialogTitle>
                <div className="text-3xl font-light tracking-tighter text-foreground/90">GHS {quickViewProduct?.price.toLocaleString()}</div>
              </div>

              <Separator className="bg-border/50" />

              <p className="text-muted-foreground text-sm leading-relaxed italic font-serif">
                "Genuine God's Way Parts component. High durability and precise fitment guaranteed for all verified automotive assemblies."
              </p>

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex items-center bg-muted border border-border rounded-full h-14 px-2 shadow-inner">
                    <Button variant="ghost" size="icon" onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))} className="w-10 h-10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all">
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-mono font-bold text-lg">{quickViewQty}</span>
                    <Button variant="ghost" size="icon" onClick={() => setQuickViewQty(quickViewQty + 1)} className="w-10 h-10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button 
                    onClick={(e) => {
                      const product: Product = {
                        id: quickViewProduct.id,
                        name: quickViewProduct.name,
                        sku: quickViewProduct.sku,
                        price: quickViewProduct.price,
                        description: 'Quick view added item.',
                        images: [quickViewProduct.img],
                        category_id: quickViewProduct.category.toLowerCase(),
                      };
                      triggerFlyAnimation(e.clientX, e.clientY, quickViewProduct.img);
                      addToCart(product, quickViewQty);
                      setQuickViewProduct(null);
                    }}
                    className="flex-grow h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95"
                  >
                    <ShoppingCart className="mr-2 w-4 h-4" /> Integrate into Cart
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <Truck className="w-4 h-4 text-accent" /> Express Delivery
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <Shield className="w-4 h-4 text-accent" /> OEM Verified
                  </div>
                </div>
              </div>

              <Link 
                to={`/products/${quickViewProduct?.id}`}
                className="text-[10px] font-bold uppercase tracking-widest text-accent hover:opacity-70 transition-all text-center pt-4"
                onClick={() => setQuickViewProduct(null)}
              >
                View Full Technical Specifications
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
