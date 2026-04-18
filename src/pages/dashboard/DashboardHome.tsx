import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  ShoppingCart,
  Clock,
  MapPin,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SALES_DATA = [
  { name: 'Mon', total: 4500, expenses: 3200 },
  { name: 'Tue', total: 5200, expenses: 3800 },
  { name: 'Wed', total: 4800, expenses: 3100 },
  { name: 'Thu', total: 6100, expenses: 4400 },
  { name: 'Fri', total: 5900, expenses: 4000 },
  { name: 'Sat', total: 7200, expenses: 5100 },
  { name: 'Sun', total: 4100, expenses: 2900 },
];

const TOP_PRODUCTS = [
  { name: 'Forged Pistons', sales: 124, trend: 'up' },
  { name: 'Brake Pads', sales: 89, trend: 'up' },
  { name: 'LED Lights', sales: 56, trend: 'down' },
  { name: 'Air Filters', sales: 45, trend: 'up' },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground font-serif italic">Ops Command</h2>
          <p className="text-muted-foreground text-xs mt-1 uppercase font-bold tracking-widest">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border bg-card rounded-xl h-10 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Filters
          </Button>
          <Button className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-widest shadow-sm">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: ShoppingCart, label: 'New Sale', path: '/dashboard/pos', color: 'bg-blue-500/10 text-blue-500' },
          { icon: Package, label: 'Add Stock', path: '/dashboard/inventory', color: 'bg-green-500/10 text-green-500' },
          { icon: Users, label: 'New Employee', path: '/dashboard/employees', color: 'bg-purple-500/10 text-purple-500' },
          { icon: MapPin, label: 'Warehouse Management', path: '/dashboard/warehouses', color: 'bg-orange-500/10 text-orange-500' },
        ].map((action, i) => (
          <Link key={i} to={action.path}>
            <Button variant="ghost" className="w-full h-auto py-5 rounded-[24px] bg-card border border-border hover:border-accent hover:bg-accent/5 flex flex-col items-center gap-4 transition-all group shadow-sm">
              <div className={`p-4 rounded-2xl ${action.color} group-hover:scale-110 transition-transform shadow-inner`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground text-center">
                  {action.label}
                </div>
                <div className="text-[9px] font-mono text-muted-foreground/30 uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Execute Cmd_{i+1}
                </div>
              </div>
            </Button>
          </Link>
        ))}
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: 'GHS 248k', trend: '↑ 12%', trendColor: 'text-green-500', desc: 'this month', icon: TrendingUp },
          { label: 'Total Expenses', value: 'GHS 171.5k', trend: '↑ 5%', trendColor: 'text-red-500', desc: 'stock & ops', icon: Package },
          { label: 'Net Profit', value: 'GHS 76.5k', trend: '↑ 8%', trendColor: 'text-green-500', desc: 'after all costs', icon: DollarSign },
          { label: 'Profit Margin', value: '30.8%', trend: '↑ 2%', trendColor: 'text-green-500', desc: 'efficiency', icon: ArrowUpRight },
        ].map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-[20px] shadow-sm border border-border group hover:border-accent transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</div>
              <stat.icon className={`w-4 h-4 ${i === 1 ? 'text-red-500' : 'text-accent'}`} />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <span className={stat.trendColor}>{stat.trend}</span>
              <span className="text-muted-foreground font-normal lowercase italic">{stat.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Health & Issue Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card border-border rounded-[24px] shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-sm font-bold text-foreground uppercase tracking-[0.2em] flex items-center gap-2 italic font-serif">
              <TrendingUp className="w-4 h-4 text-accent" />
              Profit & Loss Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Total Sales</div>
                <div className="text-lg font-bold">GHS 248,000</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-2xl space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Cost of Goods</div>
                <div className="text-lg font-bold text-red-500">- GHS 142,500</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-2xl space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Sales Expenses</div>
                <div className="text-lg font-bold text-red-500">- GHS 29,000</div>
              </div>
              <div className="p-4 bg-accent/10 rounded-2xl border border-accent/20 space-y-1">
                <div className="text-[10px] font-bold text-accent uppercase">Net Income</div>
                <div className="text-lg font-bold text-accent">GHS 76,500</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border rounded-[24px] shadow-sm overflow-hidden text-foreground">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 italic font-serif">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Stock Quality Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { type: 'Damaged', item: 'T60 Turbocharger', reason: 'Packaging failure during transit', value: '4,200', date: 'Yesterday' },
                { type: 'Returned', item: 'Brake Pad Set', reason: 'Incorrect fitment for vehicle model', value: '250', date: '2 days ago' },
                { type: 'Damaged', item: 'Forged Pitons', reason: 'Manufacturing defect found on inspection', value: '1,200', date: '3 days ago' },
              ].map((issue, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 hover:bg-muted/50 rounded-xl transition-colors border border-transparent hover:border-border">
                  <div className="flex gap-3 items-center">
                    <div className={`p-2 rounded-lg ${issue.type === 'Damaged' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {issue.type === 'Damaged' ? <XCircle className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{issue.item}</div>
                      <div className="text-[10px] text-muted-foreground italic line-clamp-1">{issue.reason}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold">GHS {issue.value}</div>
                    <div className="text-[9px] text-muted-foreground font-medium">{issue.date}</div>
                  </div>
                </div>
              ))}
              <Link to="/dashboard/inventory">
                <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent h-10 italic">
                  View All Stock Issue Logs
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sales & Expense Chart */}
        <Card className="lg:col-span-2 bg-card border-border rounded-[24px] shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-sm font-bold text-foreground uppercase tracking-widest italic font-serif">Financial Performance</CardTitle>
              <p className="text-[10px] text-muted-foreground mt-1 font-bold italic">Comparing total revenue against spending over the last 7 days.</p>
            </div>
          </CardHeader>
          <CardContent className="h-[250px] md:h-[350px] pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9A00" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF9A00" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="currentColor" 
                  className="text-muted-foreground/50"
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="currentColor" 
                  className="text-muted-foreground/50"
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `GHS ${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '10px', color: 'var(--foreground)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  name="Revenue"
                  stroke="#FF9A00" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  name="Expenses"
                  stroke="#EF4444" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorExpenses)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity Sidebar */}
        <div className="space-y-6">
          <Card className="bg-card border-border rounded-[24px] shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest italic font-serif">Category Velocity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: 'Engine Parts', value: 65, color: 'var(--accent)' },
                  { name: 'Suspension', value: 45, color: 'var(--accent)' },
                  { name: 'Body Parts', value: 30, color: 'var(--muted-foreground)' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="text-foreground">{item.value}%</span>
                    </div>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border rounded-[24px] shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest italic font-serif">Urgent Orders</CardTitle>
                <Link to="/dashboard/orders" className="text-[9px] font-bold text-accent uppercase hover:underline">View All</Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { user: 'Kofi Mensah', id: '#ORD-9821', time: '12m ago', total: '1,200', status: 'ready' },
                { user: 'Abena Osei', id: '#ORD-9820', time: '45m ago', total: '850', status: 'pending' },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:bg-muted transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 rounded-full border border-border">
                      <AvatarFallback className="text-[10px] font-bold">{order.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xs font-bold text-foreground">{order.user}</div>
                      <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{order.id}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-foreground">GHS {order.total}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
