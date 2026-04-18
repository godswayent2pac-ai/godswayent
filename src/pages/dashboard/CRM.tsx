import { useState } from 'react';
import { 
  Users2, 
  Search, 
  History, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  MoreVertical,
  Plus,
  ArrowUpRight,
  Filter,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const MOCK_CUSTOMERS = [
  { id: '1', name: 'Kofi Mensah', phone: '+233 24 112 3344', email: 'kofi@gmail.com', address: 'Spintex, Accra', orders: 12, spent: 15400, lastOrder: '2h ago' },
  { id: '2', name: 'Abena Osei', phone: '+233 50 443 2211', email: 'abena_o@yahoo.com', address: 'Adum, Kumasi', orders: 5, spent: 4200, lastOrder: '1d ago' },
  { id: '3', name: 'John Doe', phone: '+1 555 000 1111', email: 'john.doe@tech.com', address: 'Airport Res, Accra', orders: 1, spent: 120, lastOrder: '3w ago' },
  { id: '4', name: 'Amara Diop', phone: '+233 27 888 9900', email: 'amara@style.com', address: 'East Legon', orders: 24, spent: 45000, lastOrder: '15m ago' },
];

export default function CRM() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState('1');

  const selected = MOCK_CUSTOMERS.find(c => c.id === selectedId) || MOCK_CUSTOMERS[0];

  return (
    <div className="flex h-full gap-8 overflow-hidden transition-colors duration-300">
      {/* Customer List */}
      <div className="w-96 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground">CRM.</h1>
          <Button variant="ghost" size="icon" className="hover:bg-muted rounded-lg transition-all">
            <Plus className="w-5 h-5 text-accent" />
          </Button>
        </div>

        <div className="relative">
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-card border-border rounded-xl pl-10 h-12 focus:ring-accent transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>

        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-3">
            {MOCK_CUSTOMERS.map((cur) => (
              <div 
                key={cur.id}
                onClick={() => setSelectedId(cur.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  selectedId === cur.id 
                    ? 'bg-accent/10 border-accent/30 shadow-sm' 
                    : 'bg-card border-border hover:border-accent/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-border transition-all">
                    <AvatarFallback className="bg-muted text-xs font-bold text-muted-foreground transition-all">
                      {cur.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <div className="text-sm font-bold text-foreground truncate transition-all">{cur.name}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest truncate">{cur.phone}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-accent">GHS {cur.spent / 1000}k</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Profile Detail */}
      <div className="flex-grow flex flex-col bg-card/50 border border-border backdrop-blur-xl rounded-[2.5rem] overflow-hidden transition-all duration-300">
        <div className="p-10 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              <Avatar className="w-24 h-24 border-4 border-background shadow-2xl rounded-3xl transition-all">
                <AvatarFallback className="bg-accent text-3xl font-bold text-accent-foreground uppercase transition-all">
                  {selected.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="pt-2">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-3xl font-bold text-foreground uppercase tracking-tighter transition-all">{selected.name}</h2>
                  <Badge className="bg-accent/10 text-accent border-none uppercase text-[9px] font-bold tracking-widest transition-all">LOYAL CUSTOMER</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {selected.address}</span>
                  <Separator orientation="vertical" className="h-4 bg-border" />
                  <span className="flex items-center gap-1 italic text-accent/80">ID: {selected.id.padStart(6, '0')}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="border-border rounded-xl hover:bg-muted transition-all">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="border-border rounded-xl hover:bg-muted transition-all">
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="border-border rounded-xl h-10 px-4 font-bold text-xs uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all">
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Orders placed', val: selected.orders, icon: ShoppingBag },
              { label: 'Total Value', val: `GHS ${selected.spent.toLocaleString()}`, icon: ArrowUpRight },
              { label: 'Last Purchase', val: selected.lastOrder, icon: History },
              { label: 'Member Since', val: 'Oct 2023', icon: History },
            ].map((st, i) => (
              <div key={i} className="p-4 bg-muted/30 rounded-2xl border border-border/50 transition-all">
                <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2 flex items-center gap-1 transition-all">
                  <st.icon className="w-3 h-3" /> {st.label}
                </div>
                <div className="text-xl font-bold text-foreground transition-all">{st.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-grow grid grid-cols-2 overflow-hidden bg-muted/10">
          <div className="border-r border-border p-8 flex flex-col overflow-hidden">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center justify-between">
              Order History
              <span className="text-[10px] lowercase italic font-normal text-muted-foreground/60">{selected.orders} logs found</span>
            </h3>
            <ScrollArea className="flex-grow">
              <div className="space-y-4 pr-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="p-4 bg-card border border-border rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-muted/50 transition-all">
                    <div>
                      <div className="text-xs font-bold text-foreground uppercase tracking-widest transition-all">#ORD-91{i}2</div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest transition-all">24 MAR 2024</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-foreground transition-all">GHS 1,200</div>
                      <Badge variant="outline" className="text-[8px] font-bold uppercase border-green-500/20 text-green-500 bg-green-500/5 px-2 transition-all">Completed</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          <div className="p-8 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 transition-all">
                Internal CRM Notes
              </h3>
              <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold text-accent h-8 transition-all">
                <Plus className="w-3 h-3 mr-2" /> Add Note
              </Button>
            </div>
            
            <ScrollArea className="flex-grow">
              <div className="space-y-6 pr-4">
                {[
                  { text: 'Customer requested discount on bulk engine parts for next month. Advised to talk to Super Admin.', author: 'John M.', date: 'Mar 15' },
                  { text: 'Shipping address updated to new branch location. Verified via phone.', author: 'Abena O.', date: 'Feb 28' },
                  { text: 'Long-term client. Prefers forged performance parts. Inform when new stock arrives.', author: 'Godsway A.', date: 'Jan 10' },
                ].map((note, i) => (
                  <div key={i} className="relative pl-6 border-l border-border py-1">
                    <div className="absolute top-1.5 -left-1 w-2 h-2 rounded-full bg-accent transition-all" />
                    <p className="text-sm text-foreground/80 italic transition-all">"{note.text}"</p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-all">
                      <span>{note.author}</span>
                      <Separator orientation="vertical" className="h-3 bg-border" />
                      <span>{note.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
