import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Shield, Truck, Zap, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { Lightbox } from '@/components/ui/lightbox';
import { Maximize2, Star, User, MessageSquare, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PRODUCT = {
  id: '1',
  name: 'Forged Piston Set — Performance Edition',
  sku: 'GW-PST-001X',
  price: 1200,
  oldPrice: 1500,
  category: 'Engine Hardware',
  description: 'High-strength forged pistons designed for extreme boost pressures and high RPM operations. Engineered with precision for superior heat dissipation and reduced friction in professional heavy-duty performance builds.',
  features: [
    'CNC Machined from 4032 T6 Forged Aluminum',
    'Advanced Crown Design for Optimized Combustion',
    'Heavy Duty Wrist Pins & Clips Included',
    'Anti-Friction Molybdenum Skirt Coating',
  ],
  images: [
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c3d8?q=80&w=800',
    'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=800',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800',
    'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800',
  ],
  stock: [
    { warehouse: 'Accra Main Terminal', qty: 5 },
    { warehouse: 'Kumasi Distribution Center', qty: 2 },
  ]
};

const MOCK_REVIEWS = [
  { id: '1', name: 'Kwame Mensah', rating: 5, comment: 'Exceptional build quality. These pistons handled high boost without any issues. Highly recommended for racing builds.', date: 'Oct 12, 2025' },
  { id: '2', name: 'Althea Boateng', rating: 4, comment: 'Perfect fit for my project car. The anti-friction coating is definitely a plus. Shipping to Kumasi was fast.', date: 'Dec 05, 2025' },
  { id: '3', name: 'John Appiah', rating: 5, comment: 'The documentation and technical specs were spot on. Real OEM quality.', date: 'Jan 20, 2026' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, triggerFlyAnimation } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    const reviewToAdd = {
      id: (reviews.length + 1).toString(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    // Mapping local mock object to Product type
    const productForCart: Product = {
      id: PRODUCT.id,
      name: PRODUCT.name,
      sku: PRODUCT.sku,
      price: PRODUCT.price,
      description: PRODUCT.description,
      images: PRODUCT.images,
      category_id: 'engine', // Fallback for mock
    };
    
    // Trigger animation first
    triggerFlyAnimation(e.clientX, e.clientY, PRODUCT.images[activeImg]);
    
    // Then add to cart
    addToCart(productForCart, qty);
  };

  return (
    <div className="bg-background text-foreground transition-colors duration-500 min-h-screen pb-24">
      {/* Lightbox Component */}
      <Lightbox 
        isOpen={isLightboxOpen} 
        onClose={() => setIsLightboxOpen(false)} 
        images={PRODUCT.images} 
        initialIndex={activeImg}
      />
      
      {/* Breadcrumbs Navigation */}
      <div className="border-b border-border mb-12">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <nav className="text-[10px] flex items-center gap-3 font-bold uppercase tracking-widest text-muted-foreground">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="opacity-20">/</span>
            <Link to="/products" className="hover:text-accent transition-colors">Inventory</Link>
            <span className="opacity-20">/</span>
            <span className="text-foreground">{PRODUCT.name}</span>
          </nav>
          <Link to="/products" className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-2 hover:opacity-70 transition-all">
            <ArrowLeft className="w-3 h-3" /> Back to Catalog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Visual Gallery Module */}
          <div className="space-y-6">
            <motion.div 
              layoutId="main-product-img"
              className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-card border border-border shadow-xl relative cursor-zoom-in group/main"
              onClick={() => setIsLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  src={PRODUCT.images[activeImg]}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover/main:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/main:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
                <div className="bg-background/80 backdrop-blur-md rounded-full w-16 h-16 flex items-center justify-center border border-border/50 scale-90 group-hover/main:scale-100 transition-transform duration-500">
                  <Maximize2 className="w-6 h-6 text-accent" />
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {PRODUCT.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-105 active:scale-95 ${
                    activeImg === i ? 'border-accent ring-2 ring-accent/20' : 'border-border grayscale hover:grayscale-0'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Technical Specifications & Order Info */}
          <div className="flex flex-col pt-4">
            <div className="space-y-8 mb-12">
              <div className="space-y-4">
                <Badge variant="outline" className="border-accent/30 text-accent uppercase tracking-widest font-bold text-[10px] px-3">
                  {PRODUCT.category}
                </Badge>
                <h1 className="text-5xl md:text-6xl font-light tracking-tighter leading-tight uppercase font-sans">{PRODUCT.name}</h1>
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-bold tracking-[0.3em] uppercase">
                  <span>REF: {PRODUCT.sku}</span>
                  <Separator orientation="vertical" className="h-3 bg-border" />
                  <span className="text-green-500">In Stock and Verified</span>
                </div>
              </div>
              
              <div className="flex items-baseline gap-6 border-b border-border pb-8">
                <div className="text-5xl font-light tracking-tighter text-accent">GHS {PRODUCT.price.toLocaleString()}</div>
                {PRODUCT.oldPrice && (
                  <div className="text-2xl text-muted-foreground/40 line-through tracking-tighter italic">GHS {PRODUCT.oldPrice.toLocaleString()}</div>
                )}
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl italic font-serif">
                "{PRODUCT.description}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {PRODUCT.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 border-t border-border pt-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Order Quantity</span>
                  <div className="flex items-center bg-muted border border-border rounded-full h-14 px-2 shadow-inner">
                    <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all">
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-16 text-center font-mono font-bold text-lg">{qty}</span>
                    <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleAddToCart}
                  className="flex-grow h-20 bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl text-xs font-bold uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95"
                >
                  <ShoppingCart className="mr-3 w-5 h-5" /> Integrate into Cart
                </Button>
                <Button variant="outline" size="icon" className="w-20 h-20 border-border rounded-2xl hover:bg-muted transition-all">
                  <Heart className="w-6 h-6 text-muted-foreground" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-[2rem] bg-card border border-border group hover:border-accent/30 transition-all shadow-sm">
                  <Truck className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Global Logistics</div>
                  <div className="text-sm font-bold tracking-tight">Same-day Accra Dispatch</div>
                </div>
                <div className="p-6 rounded-[2rem] bg-card border border-border group hover:border-accent/30 transition-all shadow-sm">
                  <Shield className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Authenticity</div>
                  <div className="text-sm font-bold tracking-tight">OEM Verified Quality</div>
                </div>
              </div>
            </div>

            <div className="mt-16 bg-muted/40 border border-border rounded-[3rem] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -rotate-45 translate-x-10 translate-y-[-20px] rounded-bl-3xl" />
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-8 flex items-center gap-3">
                <Zap className="w-4 h-4" /> Fulfillment Nodes
              </h3>
              <div className="space-y-6">
                {PRODUCT.stock.map((s, i) => (
                  <div key={i} className="flex items-center justify-between group/item">
                    <div className="text-sm font-bold tracking-tight text-foreground/80 group-hover/item:text-accent transition-colors">{s.warehouse}</div>
                    <Badge variant={s.qty > 0 ? "outline" : "destructive"} className={`rounded-xl px-4 py-1.5 font-bold uppercase tracking-widest text-[9px] ${s.qty > 0 ? 'border-accent/30 text-accent' : ''}`}>
                      {s.qty > 0 ? `${s.qty} Units Operational` : 'Terminal Exhausted'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-32 space-y-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-accent/30 text-accent uppercase tracking-widest font-bold text-[10px] px-3">
                Customer Intelligence
              </Badge>
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase font-serif italic">The Feedback Loop</h2>
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-accent fill-accent' : 'text-muted-foreground/30 fill-muted-foreground/10'}`} />
                ))}
                <span className="ml-3 text-lg font-bold tracking-tighter">4.8 / 5.0</span>
              </div>
            </div>

            <Separator className="bg-border/50" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Form Side */}
              <div className="lg:col-span-1 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight uppercase">Write a review</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed italic font-serif">Share your technical experience with this component.</p>
                </div>
                
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Name</label>
                    <Input 
                      required
                      value={newReview.name}
                      onChange={e => setNewReview({...newReview, name: e.target.value})}
                      placeholder="e.g. John Doe"
                      className="bg-muted border-border rounded-xl h-12 text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Satisfaction Rating</label>
                    <div className="flex items-center gap-2 bg-muted border border-border rounded-xl h-12 px-4 shadow-inner">
                      {[...Array(5)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: i + 1})}
                          className={`transition-all hover:scale-125 ${i < newReview.rating ? 'text-accent' : 'text-muted-foreground/30'}`}
                        >
                          <Star className={`w-5 h-5 ${i < newReview.rating ? 'fill-accent' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Detailed Technical Feedback</label>
                    <textarea 
                      required
                      value={newReview.comment}
                      onChange={e => setNewReview({...newReview, comment: e.target.value})}
                      placeholder="Discuss fitment, durability, performance..."
                      className="w-full bg-muted border border-border rounded-2xl p-4 text-sm h-32 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full h-14 bg-foreground hover:bg-foreground/80 text-background rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2">
                    <Send className="w-3.5 h-3.5" /> Transmit Review
                  </Button>
                </form>
              </div>

              {/* Display Side */}
              <div className="lg:col-span-2 space-y-10">
                <AnimatePresence initial={false}>
                  {reviews.map((review, i) => (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-4 group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-500">
                            <User className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                          </div>
                          <div>
                            <div className="text-sm font-bold tracking-tight uppercase">{review.name}</div>
                            <div className="text-[10px] text-muted-foreground font-bold tracking-widest">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed pl-16 font-medium">
                        {review.comment}
                      </p>
                      {i < reviews.length - 1 && <Separator className="bg-border/30 mt-8" />}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {reviews.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-muted/20 border border-dashed border-border rounded-[3rem]">
                    <MessageSquare className="w-10 h-10 text-muted-foreground opacity-20" />
                    <div className="text-muted-foreground text-sm uppercase font-bold tracking-widest">No Intelligence Logs Yet</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
