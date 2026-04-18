import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Image as ImageIcon,
  QrCode,
  ArrowUpDown,
  Download,
  Printer,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

const MOCK_INVENTORY = [
  { id: '1', sku: 'GW-PST-001', name: 'Forged Piston Set', category: 'Engine', price: 1200, stock: 12, warehouse: 'Accra Main', image: '' },
  { id: '2', sku: 'GW-SUS-002', name: 'Coilovers V3', category: 'Suspension', price: 3500, stock: 5, warehouse: 'Kumasi Branch', image: '' },
  { id: '3', sku: 'GW-LGT-003', name: 'LED Headlight assembly', category: 'Lighting', price: 850, stock: 8, warehouse: 'Accra Main', image: '' },
  { id: '4', sku: 'GW-BRK-004', name: 'Ceramic Brake Pads', category: 'Brakes', price: 250, stock: 45, warehouse: 'Accra Main', image: '' },
  { id: '5', sku: 'GW-ENG-005', name: 'Turbocharger T60', category: 'Engine', price: 4200, stock: 2, warehouse: 'Accra Main', image: '' },
];

export default function Inventory() {
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [warehouseFilter, setWarehouseFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({
    key: 'name',
    direction: null,
  });
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showQR, setShowQR] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showIssueDialog, setShowIssueDialog] = useState(false);
  const [issueData, setIssueData] = useState({
    type: 'Damaged' as 'Damaged' | 'Returned',
    quantity: '1',
    reason: '',
  });
  const [qualityIssues, setQualityIssues] = useState<any[]>([]);
  const [lastUpdatedId, setLastUpdatedId] = useState<string | null>(null);
  const [updateDelta, setUpdateDelta] = useState<{ id: string; qty: number; type: 'Damaged' | 'Returned' } | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Engine',
    price: '',
    costPrice: '',
    stock: '',
    minStock: '5',
    warehouse: 'Accra Main',
    shelfLocation: '',
    supplier: '',
    brand: '',
    sku: '',
    description: '',
    image: ''
  });
  const qrRef = useRef<HTMLDivElement>(null);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (inventory.length + 1).toString();
    const sku = newProduct.sku || `GW-NEW-${id.padStart(3, '0')}`;
    
    const productToAdd = {
      id,
      sku,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price) || 0,
      costPrice: Number(newProduct.costPrice) || 0,
      stock: Number(newProduct.stock) || 0,
      minStock: Number(newProduct.minStock) || 5,
      warehouse: newProduct.warehouse,
      shelfLocation: newProduct.shelfLocation,
      supplier: newProduct.supplier,
      brand: newProduct.brand,
      description: newProduct.description,
      image: newProduct.image
    };

    setInventory([productToAdd, ...inventory]);
    setShowAddProduct(false);
    setNewProduct({
      name: '',
      category: 'Engine',
      price: '',
      costPrice: '',
      stock: '',
      minStock: '5',
      warehouse: 'Accra Main',
      shelfLocation: '',
      supplier: '',
      brand: '',
      sku: '',
      description: '',
      image: ''
    });
  };

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const qty = Number(issueData.quantity);
    if (isNaN(qty) || qty <= 0) return;

    // Update inventory stock
    setInventory(prev => prev.map(item => {
      if (item.id === selectedProduct.id) {
        // For damaged goods, we absolute decrease the stock.
        // For returns, we might restock them (increase) or just log them.
        // The prompt says "update stock quantities accordingly".
        // Usually Damaged = stock down. Returned = stock up (if resalable).
        // Let's assume Damaged decreases stock, Returned increases stock.
        const newStock = issueData.type === 'Damaged' 
          ? Math.max(0, item.stock - qty) 
          : item.stock + qty;
        return { ...item, stock: newStock };
      }
      return item;
    }));

    // Log the issue
    const newIssue = {
      id: Date.now().toString(),
      item: selectedProduct.name,
      type: issueData.type,
      reason: issueData.reason,
      quantity: qty,
      value: (selectedProduct.price * qty).toLocaleString(),
      date: 'Just now'
    };
    setQualityIssues([newIssue, ...qualityIssues]);
    
    // Trigger animation
    setLastUpdatedId(selectedProduct.id);
    setUpdateDelta({ id: selectedProduct.id, qty, type: issueData.type });
    setTimeout(() => {
      setLastUpdatedId(null);
      setUpdateDelta(null);
    }, 2000);

    setShowIssueDialog(false);
    setIssueData({ type: 'Damaged', quantity: '1', reason: '' });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    // Find the canvas element inside our ref container
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${selectedProduct?.sku || 'product'}-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const categories = ['All', ...new Set(MOCK_INVENTORY.map(i => i.category))];
  const warehouses = ['All', ...new Set(MOCK_INVENTORY.map(i => i.warehouse))];

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const filtered = inventory
    .filter(i => {
      const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           i.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || i.category === categoryFilter;
      const matchesWarehouse = warehouseFilter === 'All' || i.warehouse === warehouseFilter;
      return matchesSearch && matchesCategory && matchesWarehouse;
    })
    .sort((a, b) => {
      if (!sortConfig.direction) return 0;
      const valA = a[sortConfig.key as keyof typeof a];
      const valB = b[sortConfig.key as keyof typeof b];

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Live Inventory Status</h2>
          <p className="text-muted-foreground text-xs mt-1 uppercase font-bold tracking-widest">Global supply chain nodes</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border bg-card rounded-xl h-10 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
            <DialogTrigger render={<Button className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-widest shadow-sm transition-all" />}>
              <Plus className="w-4 h-4 mr-2" /> New Entry
            </DialogTrigger>
          <DialogContent className="max-w-2xl bg-card border-border text-foreground rounded-[2rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold uppercase tracking-tight">Register New Inventory Asset</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-6 mt-4">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-all overflow-hidden relative group"
                >
                  {newProduct.image ? (
                    <>
                      <img src={newProduct.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon className="w-6 h-6 text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Upload Photo</span>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Product Name</label>
                  <Input 
                    required
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="e.g. Forged Piston Set" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Description / Technical Notes</label>
                  <Input 
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Describe specific fitment, material, or compatibility..." 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full bg-muted border border-border rounded-xl h-12 px-4 text-[11px] font-bold uppercase tracking-widest outline-none"
                  >
                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Engine">Engine</option>
                    <option value="Suspension">Suspension</option>
                    <option value="Transmission">Transmission</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Brand / Manufacturer</label>
                  <Input 
                    value={newProduct.brand}
                    onChange={e => setNewProduct({...newProduct, brand: e.target.value})}
                    placeholder="e.g. Bosch, Brembo" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">SKU Code</label>
                  <Input 
                    value={newProduct.sku}
                    onChange={e => setNewProduct({...newProduct, sku: e.target.value})}
                    placeholder="GW-XXX-000" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Supplier Name</label>
                  <Input 
                    value={newProduct.supplier}
                    onChange={e => setNewProduct({...newProduct, supplier: e.target.value})}
                    placeholder="Enter vendor name" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>

                <Separator className="col-span-2 bg-border/50 my-2" />

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Cost Price (GHS)</label>
                  <Input 
                    required
                    type="number"
                    value={newProduct.costPrice}
                    onChange={e => setNewProduct({...newProduct, costPrice: e.target.value})}
                    placeholder="How much you paid" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Selling Price (GHS)</label>
                  <Input 
                    required
                    type="number"
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="How much you sell it for" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Current Stock</label>
                  <Input 
                    required
                    type="number"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                    placeholder="0" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Low Stock Alert Level</label>
                  <Input 
                    required
                    type="number"
                    value={newProduct.minStock}
                    onChange={e => setNewProduct({...newProduct, minStock: e.target.value})}
                    placeholder="5" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>

                <Separator className="col-span-2 bg-border/50 my-2" />

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Storage Warehouse</label>
                  <select 
                    value={newProduct.warehouse}
                    onChange={e => setNewProduct({...newProduct, warehouse: e.target.value})}
                    className="w-full bg-muted border border-border rounded-xl h-12 px-4 text-[11px] font-bold uppercase tracking-widest outline-none"
                  >
                    {warehouses.filter(w => w !== 'All').map(w => <option key={w} value={w}>{w}</option>)}
                    <option value="Accra Main">Accra Main</option>
                    <option value="Kumasi Branch">Kumasi Branch</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Shelf / Bin Location</label>
                  <Input 
                    value={newProduct.shelfLocation}
                    onChange={e => setNewProduct({...newProduct, shelfLocation: e.target.value})}
                    placeholder="e.g. A-12-B" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-border mt-6">
                <Button type="button" variant="ghost" onClick={() => setShowAddProduct(false)} className="flex-grow rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest">Cancel</Button>
                <Button type="submit" className="flex-grow bg-accent hover:bg-accent/80 text-accent-foreground rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest shadow-md">Complete Registration</Button>
              </div>
            </form>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4 bg-card p-6 rounded-[24px] border border-border shadow-sm transition-all">
        <div className="relative flex-grow w-full">
          <Input
            placeholder="Search by SKU, Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-muted border-border rounded-xl pl-10 h-12 focus:ring-accent transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="flex flex-col gap-1.5 flex-grow">
            <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground ml-1">Warehouse Node</label>
            <select 
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="bg-muted border border-border rounded-xl h-12 px-4 text-[11px] font-bold uppercase tracking-widest focus:ring-accent outline-none"
            >
              {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          
          <div className="flex flex-col gap-1.5 flex-grow">
            <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground ml-1">Category Stack</label>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-muted border border-border rounded-xl h-12 px-4 text-[11px] font-bold uppercase tracking-widest focus:ring-accent outline-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-[24px] border border-border shadow-sm min-h-[500px] transition-all overflow-hidden flex flex-col">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <Table className="text-[13px] min-w-[800px] lg:min-w-full">
            <TableHeader>
            <TableRow className="border-border hover:bg-transparent bg-muted/50 transition-all">
              <TableHead className="w-[120px] text-[11px] font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60">SKU</TableHead>
              <TableHead 
                className="text-[11px] font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60 cursor-pointer hover:text-accent transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Product Name
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead 
                className="text-[11px] font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60 text-right cursor-pointer hover:text-accent transition-colors"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center justify-end gap-1">
                  Unit Price
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead 
                className="text-[11px] font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60 text-center cursor-pointer hover:text-accent transition-colors"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center justify-center gap-1">
                  Qty
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="text-[11px] font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60">Warehouse</TableHead>
              <TableHead className="text-[11px] font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60">Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow 
                key={item.id} 
                className={`border-border/50 hover:bg-muted/50 transition-colors group relative overflow-hidden ${
                  lastUpdatedId === item.id ? 'bg-accent/5' : ''
                }`}
              >
                {lastUpdatedId === item.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{ duration: 2, times: [0, 0.2, 1] }}
                    className="absolute inset-0 bg-accent pointer-events-none z-0"
                  />
                )}
                <TableCell className="font-mono text-[10px] text-accent font-bold relative z-10">{item.sku}</TableCell>
                <TableCell className="relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted overflow-hidden flex-shrink-0 border border-border">
                      {item.image ? (
                        <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-4 h-4 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-foreground transition-all">{item.name}</div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{item.category}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium text-foreground transition-all relative z-10">GHS {item.price.toLocaleString()}</TableCell>
                <TableCell className="text-center font-bold text-foreground transition-all relative z-10">
                  <div className="relative inline-flex items-center justify-center">
                    <motion.span
                      animate={lastUpdatedId === item.id ? { 
                        scale: [1, 1.2, 1],
                        color: ["#ffffff", lastUpdatedId && updateDelta?.type === 'Damaged' ? "#ef4444" : "#22c55e", "#ffffff"] 
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {item.stock}
                    </motion.span>
                    
                    <AnimatePresence>
                      {updateDelta && updateDelta.id === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: -20 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`absolute font-black text-xs whitespace-nowrap ${updateDelta.type === 'Damaged' ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {updateDelta.type === 'Damaged' ? `-${updateDelta.qty}` : `+${updateDelta.qty}`}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </TableCell>
                <TableCell className="relative z-10">
                  <div className="text-xs font-medium text-muted-foreground transition-all">{item.warehouse}</div>
                </TableCell>
                <TableCell className="relative z-10">
                  <div className={`inline-flex px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${item.stock < 10 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    {item.stock < 10 ? 'Low Stock' : 'In Stock'}
                  </div>
                </TableCell>
                <TableCell className="relative z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="hover:bg-muted rounded-full h-8 w-8 transition-all" />}>
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border text-foreground transition-all">
                        <DropdownMenuItem className="focus:bg-muted font-bold text-xs uppercase tracking-widest">Edit Details</DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => { setSelectedProduct(item); setShowQR(true); }}
                          className="focus:bg-muted focus:text-accent font-bold text-xs uppercase tracking-widest"
                        >
                          <QrCode className="w-4 h-4 mr-2" /> View QR Code
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => { setSelectedProduct(item); setShowIssueDialog(true); }}
                          className="focus:bg-muted focus:text-orange-500 font-bold text-xs uppercase tracking-widest"
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" /> Report Damage / Return
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-muted font-bold text-xs uppercase tracking-widest">Stock Transfer</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-500 font-bold text-xs uppercase tracking-widest">Delete Product</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>

      {/* Quality Issues Log */}
      {qualityIssues.length > 0 && (
        <Card className="bg-card border-border rounded-[24px] shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 italic font-serif">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Recent Quality Control Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="text-[12px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/30">
                  <TableHead className="font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60">Type</TableHead>
                  <TableHead className="font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60">Product</TableHead>
                  <TableHead className="font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60">Quantity</TableHead>
                  <TableHead className="font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60">Reason</TableHead>
                  <TableHead className="text-right font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60">Loss Value</TableHead>
                  <TableHead className="text-right font-bold italic font-serif uppercase tracking-widest text-muted-foreground/60">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qualityIssues.map((issue) => (
                  <TableRow key={issue.id} className="border-border/50">
                    <TableCell>
                      <Badge variant="outline" className={`rounded-lg uppercase text-[9px] font-black ${issue.type === 'Damaged' ? 'border-red-500/50 text-red-500 bg-red-500/5' : 'border-blue-500/50 text-blue-500 bg-blue-500/5'}`}>
                        {issue.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold">{issue.item}</TableCell>
                    <TableCell className="font-mono">{issue.quantity}</TableCell>
                    <TableCell className="text-muted-foreground italic">{issue.reason}</TableCell>
                    <TableCell className="text-right font-bold">GHS {issue.value}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{issue.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="max-w-sm bg-card border-border text-foreground rounded-[2rem] p-8 shadow-2xl transition-all">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold uppercase tracking-tight">Product Label</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6 text-center space-y-6">
            <div ref={qrRef} className="bg-white p-6 rounded-3xl group shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all">
              <QRCodeCanvas 
                value={`${window.location.origin}/dashboard/inventory/product?id=${selectedProduct?.id}`}
                size={180}
                level="H"
                includeMargin={false}
              />
            </div>
            <div>
              <div className="text-xl font-bold">{selectedProduct?.name}</div>
              <div className="text-[11px] text-accent font-bold uppercase tracking-[0.2em] mt-1">{selectedProduct?.sku}</div>
              <div className="text-sm text-muted-foreground mt-2">{selectedProduct?.warehouse}</div>
            </div>
            <div className="flex w-full gap-3 pt-4">
              <Button onClick={() => window.print()} className="flex-grow bg-card hover:bg-muted text-foreground border border-border rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest transition-all">
                <Printer className="w-4 h-4 mr-2" /> Print Label
              </Button>
              <Button 
                onClick={downloadQRCode}
                className="flex-grow bg-accent hover:bg-accent/80 text-accent-foreground rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest transition-all shadow-md"
              >
                <Download className="w-4 h-4 mr-2" /> Download PNG
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Damage/Return Dialog */}
      <Dialog open={showIssueDialog} onOpenChange={setShowIssueDialog}>
        <DialogContent className="max-w-md bg-card border-border text-foreground rounded-[2rem] p-8 shadow-2xl transition-all">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 italic font-serif">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Report Stock Issue
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-2 mb-6">
            <div className="text-sm font-bold">{selectedProduct?.name}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{selectedProduct?.sku}</div>
          </div>
          <form onSubmit={handleReportIssue} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Issue Type</label>
                <select 
                  value={issueData.type}
                  onChange={e => setIssueData({...issueData, type: e.target.value as any})}
                  className="w-full bg-muted border border-border rounded-xl h-12 px-4 text-[11px] font-bold uppercase tracking-widest outline-none"
                >
                  <option value="Damaged">🚨 Damaged</option>
                  <option value="Returned">↩️ Returned</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Quantity</label>
                <Input 
                  type="number"
                  required
                  min="1"
                  max={issueData.type === 'Damaged' ? selectedProduct?.stock : 999}
                  value={issueData.quantity}
                  onChange={e => setIssueData({...issueData, quantity: e.target.value})}
                  className="bg-muted border-border rounded-xl h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Reason for report</label>
              <Input 
                required
                placeholder="e.g. Broken packaging, wrong fitment..."
                value={issueData.reason}
                onChange={e => setIssueData({...issueData, reason: e.target.value})}
                className="bg-muted border-border rounded-xl h-12"
              />
            </div>
            <div className="text-[10px] text-muted-foreground italic font-medium leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/50">
              {issueData.type === 'Damaged' 
                ? "Note: Reporting damaged stock will remove the items from your current sellable inventory tally."
                : "Note: Reporting a return will add the items back into your inventory tally."}
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={() => setShowIssueDialog(false)} className="flex-grow rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest">Cancel</Button>
              <Button type="submit" className="flex-grow bg-accent hover:bg-accent/80 text-accent-foreground rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest shadow-md">Submit Report</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
