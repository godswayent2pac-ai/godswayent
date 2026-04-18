import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar, ArrowUpRight, ArrowDownRight, FileText, Table as TableIcon } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { toast } from 'sonner';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 45000, costs: 22000 },
  { month: 'Feb', revenue: 52000, costs: 24000 },
  { month: 'Mar', revenue: 48000, costs: 21000 },
  { month: 'Apr', revenue: 61000, costs: 28000 },
  { month: 'May', revenue: 55000, costs: 25000 },
  { month: 'Jun', revenue: 67000, costs: 30000 },
];

const CATEGORY_DISTRIBUTION = [
  { name: 'Engine', value: 400 },
  { name: 'Body', value: 300 },
  { name: 'Lights', value: 200 },
  { name: 'Suspension', value: 278 },
];

const INVENTORY_SUMMARY = [
  { item: 'Forged Pistons', stock: 12, sales_velocity: 'High', value: 14400 },
  { item: 'Brake Pads', stock: 45, sales_velocity: 'Medium', value: 11250 },
  { item: 'T60 Turbo', stock: 2, sales_velocity: 'Low', value: 8400 },
  { item: 'LED Headlights', stock: 8, sales_velocity: 'Medium', value: 6800 },
];

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6'];

export default function Analytics() {
  const exportToCSV = () => {
    try {
      const financialData = REVENUE_DATA.map(item => ({
        Month: item.month,
        Revenue: item.revenue,
        Costs: item.costs,
        Profit: item.revenue - item.costs,
        'Profit Margin (%)': (((item.revenue - item.costs) / item.revenue) * 100).toFixed(2)
      }));

      const inventoryData = INVENTORY_SUMMARY.map(item => ({
        'Product Name': item.item,
        'Stock Level': item.stock,
        'Sales Velocity': item.sales_velocity,
        'Inventory Value (GHS)': item.value
      }));

      // Combine into one CSV with headers for sections
      const csvContent = [
        ['FINANCIAL DATA'],
        ...Object.keys(financialData[0]).map(k => [k]), // This is just a placeholder, let's do it properly
      ];

      const financialCsv = Papa.unparse(financialData);
      const inventoryCsv = Papa.unparse(inventoryData);
      
      const fullCsv = `FINANCIAL REPORTS\n${financialCsv}\n\nINVENTORY SUMMARY\n${inventoryCsv}`;
      
      const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `GodsWay_Analytics_Report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('CSV Report exported successfully');
    } catch (error) {
      console.error('CSV Export Error:', error);
      toast.error('Failed to export CSV report');
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(22);
      doc.setTextColor(79, 32, 13); // #4F200D
      doc.text("GOD'S WAY ENT.", 105, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setTextColor(125, 107, 93); // #7D6B5D
      doc.text("BUSINESS INTELLIGENCE REPORT", 105, 30, { align: 'center' });
      
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 38, { align: 'center' });
      
      // Financial Section
      doc.setFontSize(14);
      doc.setTextColor(255, 154, 0); // #FF9A00
      doc.text("1. Financial Performance", 14, 50);
      
      autoTable(doc, {
        startY: 55,
        head: [['Month', 'Revenue (GHS)', 'Costs (GHS)', 'Profit (GHS)', 'Margin (%)']],
        body: REVENUE_DATA.map(d => [
          d.month, 
          d.revenue.toLocaleString(), 
          d.costs.toLocaleString(), 
          (d.revenue - d.costs).toLocaleString(),
          (((d.revenue - d.costs) / d.revenue) * 100).toFixed(1) + '%'
        ]),
        theme: 'striped',
        headStyles: { fillColor: [79, 32, 13] },
      });
      
      // Inventory Section
      const finalY = (doc as any).lastAutoTable.finalY + 15;
      doc.text("2. Inventory Summary", 14, finalY);
      
      autoTable(doc, {
        startY: finalY + 5,
        head: [['Item Name', 'Stock Level', 'Velocity', 'Value (GHS)']],
        body: INVENTORY_SUMMARY.map(d => [
          d.item, 
          d.stock.toString(), 
          d.sales_velocity, 
          d.value.toLocaleString()
        ]),
        theme: 'grid',
        headStyles: { fillColor: [255, 154, 0] },
      });
      
      doc.save(`GodsWay_Analytics_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('PDF Report exported successfully');
    } catch (error) {
      console.error('PDF Export Error:', error);
      toast.error('Failed to export PDF report');
    }
  };

  return (
    <div className="space-y-8 pb-12 transition-all duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase">Intelligence.</h1>
          <p className="text-muted-foreground text-sm mt-1">Deep dive into sales trends, inventory velocity, and financial health.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="border-border bg-card rounded-xl h-10 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all">
            <Calendar className="w-4 h-4 mr-2" /> Jan 1, 2024 - Jun 30, 2024
          </Button>
          <div className="flex gap-2">
            <Button 
              onClick={exportToCSV}
              variant="outline" 
              className="border-border bg-card hover:bg-muted text-foreground rounded-xl h-10 px-4 font-bold text-xs uppercase tracking-widest shadow-sm transition-all"
            >
              <TableIcon className="w-4 h-4 mr-2 text-green-600" /> Export CSV
            </Button>
            <Button 
              onClick={exportToPDF}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-widest shadow-lg transition-all"
            >
              <FileText className="w-4 h-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Gross Profit', value: 'GHS 248k', change: '+24.5%', trend: 'up' },
          { label: 'Avg Order Value', value: 'GHS 850', change: '+5.2%', trend: 'up' },
          { label: 'Inventory Turnover', value: '4.2x', change: '-1.8%', trend: 'down' },
          { label: 'Return Rate', value: '1.4%', change: '-0.5%', trend: 'up' },
        ].map((stat, i) => (
          <Card key={i} className="bg-card border-border backdrop-blur-xl rounded-2xl transition-all">
            <CardContent className="p-6">
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-bold mb-2 text-foreground">{stat.value}</div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change} <span className="text-muted-foreground/60 ml-1 italic font-normal text-[9px]">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-card border-border backdrop-blur-xl rounded-3xl overflow-hidden transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">Revenue vs Operating Costs</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="currentColor" 
                  className="text-muted-foreground"
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="currentColor" 
                  className="text-muted-foreground"
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `GHS ${val/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: 'currentColor', className: 'text-muted/20' }}
                  contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '10px', color: 'var(--foreground)' }}
                />
                <Bar dataKey="revenue" fill="#E2B857" radius={[4, 4, 0, 0]} />
                <Bar dataKey="costs" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border backdrop-blur-xl rounded-3xl overflow-hidden transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="60%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: 'var(--card)', border: 'none', borderRadius: '12px', fontSize: '10px', color: 'var(--foreground)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="px-8 space-y-3 mt-6">
              {CATEGORY_DISTRIBUTION.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{entry.name}</span>
                  </div>
                  <span className="text-xs font-light text-foreground">{entry.value} Sales</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border backdrop-blur-xl rounded-3xl overflow-hidden transition-all">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">Stock Velocity Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" vertical={false} />
              <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="currentColor" className="text-muted-foreground" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '10px', color: 'var(--foreground)' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#E2B857" strokeWidth={3} dot={{ fill: '#E2B857', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
