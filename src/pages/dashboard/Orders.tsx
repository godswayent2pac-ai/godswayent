import { useState } from 'react';
import { 
  Truck, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  CheckCircle2, 
  Clock, 
  XCircle,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MOCK_ORDERS = [
  { id: 'ORD-9821', customer_id: 'CUST-321', customer: 'Kofi Mensah', type: 'POS', total: 1200, status: 'ready', date: '2024-03-24 14:24' },
  { id: 'ORD-9820', customer_id: 'CUST-854', customer: 'Abena Osei', type: 'WhatsApp', total: 850, status: 'pending', date: '2024-03-24 13:45' },
  { id: 'ORD-9819', customer_id: 'CUST-109', customer: 'John Doe', type: 'POS', total: 4200, status: 'delivered', date: '2024-03-24 11:20' },
  { id: 'ORD-9818', customer_id: 'CUST-442', customer: 'Sara Connor', type: 'WhatsApp', total: 180, status: 'processing', date: '2024-03-24 09:15' },
  { id: 'ORD-9817', customer_id: 'CUST-218', customer: 'Michael Smith', type: 'POS', total: 250, status: 'cancelled', date: '2024-03-23 16:40' },
];

const statusConfig: any = {
  pending: { label: 'Pending', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  processing: { label: 'Processing', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ready: { label: 'Ready', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  delivered: { label: 'Delivered', icon: CheckCircle2, color: 'text-muted-foreground', bg: 'bg-muted' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_ORDERS.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase">Operation Logs.</h1>
          <p className="text-muted-foreground text-sm mt-1">Monitor and manage every order from all sales channels.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border bg-card rounded-xl h-10 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all">
            <Filter className="w-4 h-4 mr-2" /> Filter By Status
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-card/50 p-6 rounded-3xl border border-border backdrop-blur-xl transition-all">
        <div className="relative flex-grow">
          <Input
            placeholder="Search orders by ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-muted border-border rounded-xl pl-10 h-12 focus:ring-accent transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>
      </div>

      <div className="bg-card/50 rounded-[2.5rem] border border-border backdrop-blur-xl overflow-hidden shadow-xl transition-all">
        <Table>
          <TableHeader className="bg-muted/50 transition-all">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-[120px] text-xs font-bold uppercase tracking-widest font-mono text-muted-foreground">Order ID</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Customer ID</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Customer</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Channel</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-widest text-right text-muted-foreground">Amount</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-widest text-center text-muted-foreground">Status</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Timestamp</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => {
              const status = statusConfig[order.status];
              return (
                <TableRow key={order.id} className="border-border/50 hover:bg-muted/30 transition-colors group">
                  <TableCell className="font-mono text-[10px] text-accent font-bold tracking-wider">{order.id}</TableCell>
                  <TableCell className="font-mono text-[9px] text-muted-foreground/80 font-bold">{order.customer_id}</TableCell>
                  <TableCell>
                    <div className="font-bold text-foreground transition-all">{order.customer}</div>
                  </TableCell>
                  <TableCell>
                    <div className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full w-fit ${order.type === 'POS' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}>
                      {order.type}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground transition-all">GHS {order.total.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${status.bg} ${status.color} text-[10px] font-bold uppercase tracking-widest transition-all`}>
                      <status.icon className="w-3 h-3" />
                      {status.label}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-medium transition-all">{order.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="hover:bg-muted rounded-full h-8 w-8 transition-all" />}>
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border text-foreground transition-all">
                        <DropdownMenuItem className="focus:bg-muted focus:text-foreground font-bold text-xs uppercase tracking-widest">
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-muted focus:text-foreground font-bold text-xs uppercase tracking-widest">
                          <ExternalLink className="w-4 h-4 mr-2" /> Open Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-muted font-bold tracking-widest text-muted-foreground uppercase text-[9px]">
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-muted focus:text-blue-500 font-bold text-xs uppercase tracking-widest">Processing</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-muted focus:text-green-500 font-bold text-xs uppercase tracking-widest">Ready for Pickup</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-muted focus:text-foreground font-bold text-xs uppercase tracking-widest">Delivered</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
