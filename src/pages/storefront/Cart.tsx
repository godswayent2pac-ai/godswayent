import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus, MessageSquare, ArrowRight, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [customerInfo, setCustomerInfo] = useState({ name: '', address: '' });

  const handleWhatsAppCheckout = () => {
    if (!customerInfo.name || !customerInfo.address) {
      toast.error('Please provide your name and delivery address.');
      return;
    }

    const phone = import.meta.env.VITE_WHATSAPP_PHONE || '233241234567';
    const itemList = cart.map(i => `${i.name} (x${i.cartQuantity}) - GHS ${i.price * i.cartQuantity}`).join('%0A');
    const message = `Hello God's Way Ent, I want to order:%0A%0A${itemList}%0A%0A*Total: GHS ${cartTotal.toLocaleString()}*%0A%0AMy name is ${customerInfo.name}%0ADeliver to: ${customerInfo.address}`;
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    toast.success('Opening WhatsApp to complete your order...');
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-background text-foreground transition-colors duration-500 min-h-screen">
      <div className="mb-16">
        <Badge variant="outline" className="mb-4 border-accent/20 text-accent uppercase tracking-[0.3em] font-bold text-[9px] px-3">Review Nodes</Badge>
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase whitespace-nowrap">My Cart.</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-8">
          {cart.length === 0 ? (
            <div className="text-center py-32 bg-card rounded-[3rem] border border-border shadow-sm">
              <ShoppingCart className="w-20 h-20 text-muted-foreground mx-auto mb-8 opacity-20" />
              <h2 className="text-3xl font-bold mb-6 tracking-tight">Your terminal is empty.</h2>
              <Link to="/products">
                <Button className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-full h-14 px-10 font-bold uppercase tracking-widest text-xs">Explore Catalog</Button>
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-card border border-border rounded-[2.5rem] group hover:border-accent/40 transition-all duration-500 shadow-sm"
              >
                <div className="w-32 h-40 rounded-3xl overflow-hidden bg-muted flex-shrink-0 border border-border transition-all group-hover:border-accent/20">
                  <img src={item.images[0]} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                
                <div className="flex-grow space-y-2 text-center sm:text-left">
                   <div className="text-[10px] text-accent font-bold tracking-widest uppercase mb-1">Genuine Hardware</div>
                   <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">{item.name}</h3>
                   <div className="text-muted-foreground text-sm font-medium">GHS {item.price.toLocaleString()} unit value</div>
                </div>

                <div className="flex flex-col items-center sm:items-end gap-6 w-full sm:w-auto">
                  <div className="flex items-center bg-muted border border-border rounded-full h-12 px-2 shadow-inner transition-all group-hover:bg-background">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-accent hover:text-accent-foreground transition-all" onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}>
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-12 text-center text-sm font-mono font-bold">{item.cartQuantity}</span>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-accent hover:text-accent-foreground transition-all" onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="text-2xl font-light tracking-tighter text-foreground group-hover:text-accent transition-colors">GHS {(item.price * item.cartQuantity).toLocaleString()}</div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-3 h-3" /> Remove Node
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="p-10 bg-card border border-border rounded-[3rem] sticky top-32 shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-10 flex items-center justify-between uppercase tracking-tighter">
              Summary <ArrowRight className="w-5 h-5 text-accent" />
            </h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">GHS {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span>Logistics</span>
                <span className="text-accent">Complimentary</span>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between items-baseline pt-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Total Settlement</span>
                <span className="text-3xl font-light tracking-tighter text-accent">GHS {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-8 mb-10">
               <div className="space-y-2">
                 <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Identity Node</label>
                 <Input 
                   placeholder="Your Name..." 
                   value={customerInfo.name}
                   onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                   className="bg-muted border-border h-14 rounded-xl px-6 focus:ring-accent transition-all" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Physical Destination</label>
                 <Input 
                   placeholder="Accra Terminal Address..." 
                   value={customerInfo.address}
                   onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                   className="bg-muted border-border h-14 rounded-xl px-6 focus:ring-accent transition-all" 
                 />
               </div>
            </div>

            <div className="flex flex-col gap-4">
              <Link to="/checkout" className="w-full">
                <Button 
                   disabled={cart.length === 0}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-2xl h-16 text-xs uppercase tracking-[0.2em] font-bold shadow-lg disabled:opacity-50 transition-all"
                >
                  <CreditCard className="mr-2 w-4 h-4" /> Secure Online Checkout
                </Button>
              </Link>
              
              <Button 
                variant="outline"
                onClick={handleWhatsAppCheckout}
                disabled={cart.length === 0}
                className="w-full border-accent/40 text-accent hover:bg-accent/5 rounded-2xl h-16 text-xs uppercase tracking-[0.2em] font-bold transition-all"
              >
                <MessageSquare className="mr-2 w-4 h-4" /> Direct WhatsApp Line
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                Global Fulfillment Operational
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
