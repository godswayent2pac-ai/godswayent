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
import { Download, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6'];

export default function Analytics() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase">Intelligence.</h1>
          <p className="text-muted-foreground text-sm mt-1">Deep dive into sales trends, inventory velocity, and financial health.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border bg-card rounded-xl h-10 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all">
            <Calendar className="w-4 h-4 mr-2" /> Jan 1, 2024 - Jun 30, 2024
          </Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-widest shadow-lg transition-all">
            <Download className="w-4 h-4 mr-2" /> Download Full PDF
          </Button>
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
