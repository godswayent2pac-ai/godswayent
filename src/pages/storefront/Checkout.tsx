import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  
  const shipping = 50;
  const total = cartTotal + shipping;

  useEffect(() => {
    if (cart.length === 0) {
      toast.error('The checkout terminal is empty. Returning to catalog.');
      navigate('/products');
    }
  }, [cart, navigate]);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Transaction successful! Transmitting order protocol.");
    clearCart();
    setTimeout(() => {
        navigate('/');
    }, 2000);
  };

  return (
    <div className="bg-background text-foreground transition-colors duration-500 min-h-screen pb-24">
      {/* Top Bar / Header */}
      <div className="border-b border-border bg-card/30 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/cart" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-all text-xs uppercase font-bold tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Return to Cart
          </Link>
          <div className="font-serif italic font-bold text-xl tracking-tighter">God's Way Ent.</div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 lg:mt-24">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Main Checkout Flow */}
          <div className="flex-grow space-y-16">
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">1</div>
                <h2 className="text-3xl font-bold tracking-tighter uppercase whitespace-nowrap">Shipping Protocol.</h2>
                <Separator className="bg-border flex-grow" />
              </div>

              <form onSubmit={handleCompleteOrder} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Contact Receiver</label>
                    <Input required placeholder="Full Name" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Electronic ID</label>
                    <Input required type="email" placeholder="Email Address" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent transition-all" />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Physical Destination</label>
                    <Input required placeholder="Address Line 1" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent transition-all" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input placeholder="City / Area" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent transition-all" />
                    <Input placeholder="Region" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent transition-all" />
                    <Input placeholder="Postal Code" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent transition-all" />
                  </div>
                </div>

                <div className="space-y-10 pt-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">2</div>
                    <h2 className="text-3xl font-bold tracking-tighter uppercase whitespace-nowrap">Payment Settlement.</h2>
                    <Separator className="bg-border flex-grow" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border-2 border-accent bg-accent/5 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 group cursor-pointer transition-all">
                      <CreditCard className="w-8 h-8 text-accent" />
                      <div className="font-bold text-xs uppercase tracking-widest">Card / Mobile Money</div>
                    </div>
                    <div className="p-6 border border-border hover:border-accent/40 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 opacity-50 cursor-not-allowed group transition-all">
                      <Truck className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors" />
                      <div className="font-bold text-xs uppercase tracking-widest">Cash on Collection</div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-4">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Card Credentials</label>
                      <Input placeholder="Card Number" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent transition-all font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <Input placeholder="MM/YY" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent transition-all font-mono" />
                      <Input placeholder="CVC" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent transition-all font-mono" />
                    </div>
                  </div>
                </div>

                <div className="pt-12">
                   <Button type="submit" className="w-full h-20 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-[0.3em] text-xs rounded-2xl shadow-2xl transition-all active:scale-95">
                     Initiate Transaction — GHS {total.toLocaleString()}
                   </Button>
                   <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
                     <ShieldCheck className="w-4 h-4 text-green-500" />
                     <span className="text-[10px] uppercase font-bold tracking-widest">Secured by 256-bit Terminal Encryption</span>
                   </div>
                </div>
              </form>
            </section>
          </div>

          {/* Sidebar / Summary */}
          <aside className="w-full lg:w-[450px]">
            <div className="bg-card border border-border p-8 rounded-[2.5rem] sticky top-32 shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-8">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-bold uppercase tracking-tighter">Review Nodes.</h3>
              </div>

              <div className="space-y-6 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 rounded-2xl bg-muted overflow-hidden border border-border group-hover:border-accent transition-all shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="font-bold text-sm tracking-tight text-foreground line-clamp-1">{item.name}</h4>
                      <div className="text-[11px] text-muted-foreground font-bold tracking-widest mt-1">QTY: {item.cartQuantity}</div>
                    </div>
                    <div className="flex flex-col justify-center text-right">
                      <div className="text-sm font-bold text-foreground">GHS {(item.price * item.cartQuantity).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-border mb-8" />

              <div className="space-y-4 text-sm font-bold uppercase tracking-widest">
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>Subtotal</span>
                  <span className="text-foreground">GHS {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>Logistics Protocol</span>
                  <span className="text-foreground">GHS {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg pt-6 border-t border-border tracking-tighter">
                  <span>Total Amount</span>
                  <span className="text-accent">GHS {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-12 p-6 bg-muted rounded-3xl border border-border text-center space-y-2 group transition-all">
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] group-hover:text-accent transition-colors">Dispatching To</div>
                <div className="text-xs font-bold text-foreground">Awaiting Protocol Initialization</div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
