import { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Package, 
  ArrowRight, 
  Plus,
  Settings,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MOCK_WAREHOUSES = [
  { id: '1', name: 'Accra Main Hub', address: 'Plot 4, Industrial Area, Accra', manager: 'John Mensah', capacity: 85, items: 8405 },
  { id: '2', name: 'Kumasi Branch', address: 'Suame Magazine, Kumasi', manager: 'Kofi Larbi', capacity: 42, items: 2100 },
  { id: '3', name: 'Tema Logistics', address: 'Harbour Road, Tema', manager: 'Sarah Osei', capacity: 15, items: 900 },
];

export default function Warehouses() {
  return (
    <div className="space-y-8 pb-12 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase tracking-tighter">Network.</h1>
          <p className="text-muted-foreground text-sm mt-1">Global supply chain nodes and storage facilities.</p>
        </div>
        <Button className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-xl h-12 px-8 font-bold text-xs uppercase tracking-widest shadow-lg transition-all">
          <Plus className="w-4 h-4 mr-2" /> New Warehouse
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_WAREHOUSES.map((wh) => (
          <div key={wh.id} className="bg-card border border-border rounded-[2.5rem] p-8 backdrop-blur-xl group hover:border-accent/30 transition-all overflow-hidden relative shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 p-4">
              <Button variant="ghost" size="icon" className="hover:bg-muted rounded-full h-8 w-8 transition-all">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-muted border border-border flex items-center justify-center text-accent shadow-xl group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground transition-all">{wh.name}</h3>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1 transition-all">
                  <MapPin className="w-3 h-3" /> {wh.address.split(',')[0]}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-muted/30 rounded-2xl border border-border/50 transition-all">
                <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-1 transition-all">Stock Level</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-foreground transition-all">{wh.items.toLocaleString()}</span>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase transition-all">Units</span>
                </div>
              </div>
              <div className="p-4 bg-muted/30 rounded-2xl border border-border/50 transition-all">
                <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-1 transition-all">Manager</div>
                <div className="text-sm font-bold text-foreground/80 truncate transition-all">{wh.manager}</div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest transition-all">
                <span className="text-muted-foreground">Capacity Usage</span>
                <span className={wh.capacity > 80 ? 'text-accent' : 'text-foreground/70'}>{wh.capacity}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden transition-all">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${wh.capacity > 80 ? 'bg-accent' : 'bg-blue-500'}`} 
                  style={{ width: `${wh.capacity}%` }}
                />
              </div>
            </div>

            <Button className="w-full bg-muted hover:bg-muted/80 text-foreground/80 border border-border rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest group transition-all">
              Manage Inventory <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        ))}
        
        {/* Add Warehouse Card */}
        <button className="bg-muted/10 border-2 border-dashed border-border rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground/60 hover:border-accent/40 hover:bg-muted/20 transition-all group">
            <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-bold uppercase tracking-widest text-xs">Establish New Node</span>
        </button>
      </div>
    </div>
  );
}
