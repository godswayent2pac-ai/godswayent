import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  UserPlus, 
  Printer, 
  RotateCcw,
  Package,
  CheckCircle2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Forged Piston Set', sku: 'GW-PST-001', price: 1200, stock: 12, category: 'Engine' },
  { id: '2', name: 'Coilovers V3', sku: 'GW-SUS-002', price: 3500, stock: 5, category: 'Suspension' },
  { id: '3', name: 'LED Headlight Assembly', sku: 'GW-LGT-003', price: 850, stock: 8, category: 'Lighting' },
  { id: '4', name: 'Ceramic Brake Pads', sku: 'GW-BRK-004', price: 250, stock: 45, category: 'Brakes' },
  { id: '5', name: 'Turbocharger T60', sku: 'GW-ENG-005', price: 4200, stock: 2, category: 'Engine' },
  { id: '6', name: 'Carbon Fiber Mirror Caps', sku: 'GW-BDY-006', price: 180, stock: 15, category: 'Body' },
];

const CartContent = ({ cart, updateQty, removeFromCart }: { cart: any[], updateQty: any, removeFromCart: any }) => {
  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center opacity-40 text-center py-20">
        <Package className="w-12 h-12 mb-4 text-muted-foreground" />
        <div className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Terminal Idle</div>
      </div>
    );
  }

  return (
    <>
      {cart.map((item) => (
        <motion.div 
          key={item.id}
          layout
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-accent group transition-all bg-card"
        >
          <div className="flex-grow">
            <div className="text-xs font-bold text-foreground">{item.name}</div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest whitespace-nowrap">GHS {item.price.toLocaleString()}</div>
          </div>
          
          <div className="flex items-center bg-muted border border-border rounded-lg px-1 transition-all">
            <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground" onClick={() => updateQty(item.id, -1)}>
              <Minus className="w-2.5 h-2.5" />
            </Button>
            <span className="w-6 text-center text-[11px] font-bold text-foreground">{item.qty}</span>
            <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground" onClick={() => updateQty(item.id, 1)}>
              <Plus className="w-2.5 h-2.5" />
            </Button>
          </div>

          <div className="text-right w-20">
            <div className="text-sm font-bold text-foreground">GHS {(item.price * item.qty).toLocaleString()}</div>
          </div>

          <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      ))}
    </>
  );
};

const CartSummary = ({ total }: { total: number }) => (
  <div className="space-y-3 text-[11px] font-bold uppercase tracking-widest border border-border p-4 rounded-xl bg-card transition-all">
    <div className="flex justify-between text-muted-foreground">
      <span>Subtotal</span>
      <span className="text-foreground">GHS {total.toLocaleString()}</span>
    </div>
    <div className="flex justify-between text-accent">
      <span>Tax (0%)</span>
      <span className="">GHS 0.00</span>
    </div>
    <div className="flex justify-between text-base font-bold pt-3 border-t border-border text-foreground transition-all">
      <span className="tracking-tighter">Total</span>
      <span className="text-xl">GHS {total.toLocaleString()}</span>
    </div>
  </div>
);

export default function POS() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: any) => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.qty + delta);
        return { ...i, qty: newQty };
      }
      return i;
    }));
  };

  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      items: cart,
      total,
      date: new Date().toLocaleString(),
      employee: user?.name || 'Authorized Staff',
    };
    setActiveOrder(newOrder);
    setShowReceipt(true);
    setCart([]);
    toast.success('Order completed successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 lg:gap-8 overflow-hidden bg-background p-4 md:p-8 -m-4 md:-m-8 transition-colors duration-300">
      {/* Catalog Side */}
      <div className="flex-grow flex flex-col gap-6 overflow-hidden min-h-0">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative flex-grow text-foreground">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card border-border rounded-xl pl-10 h-12 md:h-14 text-sm focus:ring-accent shadow-sm transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          </div>
          <Button variant="outline" className="h-12 w-12 md:h-14 md:w-14 border-border bg-card rounded-xl flex items-center justify-center shadow-sm transition-all">
            <UserPlus className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pb-20 lg:pb-8 scrollbar-hide">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => addToCart(product)}
              className="bg-card p-4 md:p-5 rounded-[24px] border border-border hover:border-accent transition-all cursor-pointer group shadow-sm active:scale-95"
            >
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-md border border-border transition-all">
                  {product.category}
                </span>
                <div className="text-[9px] text-muted-foreground/50 font-mono tracking-widest lowercase">{product.sku}</div>
              </div>
              <h3 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-1 text-sm md:text-base">{product.name}</h3>
              <div className="flex justify-between items-end">
                <div className="text-lg md:text-xl font-bold text-foreground">GHS {product.price.toLocaleString()}</div>
                <div className={`text-[9px] font-bold uppercase tracking-widest ${product.stock < 10 ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {product.stock} items
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-40">
        <Sheet>
          <SheetTrigger render={<Button className="w-full h-14 bg-foreground text-background rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl flex items-center justify-between px-6" />}>
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({cart.length})</span>
            </div>
            <span className="text-accent font-black">GHS {total.toLocaleString()}</span>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-[2.5rem] p-0 bg-card border-t border-border">
            <SheetHeader className="p-8 border-b border-border text-left">
              <SheetTitle className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-accent" />
                Review Transaction
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-[calc(80vh-80px)]">
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                <CartContent cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} />
              </div>
              <div className="p-8 bg-muted/30 border-t border-border space-y-6">
                <CartSummary total={total} />
                <Button 
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  className="w-full h-16 bg-foreground text-background hover:bg-foreground/90 rounded-2xl text-xs uppercase tracking-[0.2em] font-bold shadow-lg transition-all"
                >
                  Complete Checkout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Cart Side Panel (Desktop Only) */}
      <div className="hidden lg:flex w-[400px] xl:w-[450px] bg-card border border-border shadow-sm rounded-[24px] flex-col overflow-hidden transition-all">
        <div className="p-8 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-accent" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Checkout Terminal</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setCart([])} className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          <CartContent cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} />
        </div>

        <div className="p-8 bg-muted/50 border-t border-border space-y-6 transition-all">
          <CartSummary total={total} />
          <Button 
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className="w-full h-16 bg-foreground text-background hover:bg-foreground/90 rounded-xl text-xs uppercase tracking-[0.2em] font-bold shadow-lg disabled:opacity-50 disabled:shadow-none transition-all"
          >
            Complete Transaction
          </Button>
        </div>
      </div>

      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-md bg-white text-black p-0 border-none overflow-hidden rounded-none">
          <div ref={printRef} className="p-8 space-y-6 font-mono text-[11px] print:p-0">
            <div className="text-center space-y-1">
              <div className="text-xl font-bold tracking-tighter uppercase mb-4">God's Way Ent</div>
              <div>Auto Parts & Accessories</div>
              <div>Accra, Ghana</div>
              <div>Tel: +233 24 123 4567</div>
            </div>

            <div className="border-t border-b border-dashed border-black py-4 space-y-1">
              <div className="flex justify-between">
                <span>Receipt: {activeOrder?.id}</span>
                <span>{activeOrder?.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Employee: {activeOrder?.employee}</span>
                <span>Type: POS</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-4 font-bold border-b border-black pb-1">
                <span className="col-span-2">Product</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Price</span>
              </div>
              {activeOrder?.items.map((item: any) => (
                <div key={item.id} className="grid grid-cols-4">
                  <span className="col-span-2">{item.name}</span>
                  <span className="text-center">x{item.qty}</span>
                  <span className="text-right">{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-black pt-4 space-y-2">
              <div className="flex justify-between text-base font-bold">
                <span>TOTAL AMOUNT</span>
                <span>GHS {activeOrder?.total.toLocaleString()}</span>
              </div>
              <div className="text-center pt-8 space-y-4">
                <div className="flex justify-center">
                  <QRCodeSVG 
                    value={`https://godswayent.com/orders/public?order=${activeOrder?.id}`}
                    size={100}
                  />
                </div>
                <div className="text-[10px] text-gray-500 italic">Scan to verify order authenticity</div>
                <div className="font-bold text-lg border-2 border-black p-2">THANK YOU FOR YOUR BUSINESS!</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-neutral-100 flex gap-4 print:hidden">
            <Button onClick={handlePrint} className="flex-grow bg-black text-white hover:bg-neutral-800 rounded-none h-12">
              <Printer className="mr-2 w-4 h-4" /> Print Receipt
            </Button>
            <Button onClick={() => setShowReceipt(false)} variant="ghost" className="rounded-none h-12">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
