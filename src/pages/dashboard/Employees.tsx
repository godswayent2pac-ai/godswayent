import { useState, useRef } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  Shield, 
  MapPin,
  Mail,
  UserCheck,
  UserX,
  Camera,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

const PREDEFINED_AVATARS = [
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200',
];

const MOCK_EMPLOYEES = [
  { id: '1', name: 'Godsway Admin', email: 'admin@godswayent.com', role: 'SUPER_ADMIN', warehouse: 'All', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200' },
  { id: '2', name: 'John Mensah', email: 'john@godswayent.com', role: 'WAREHOUSE_MANAGER', warehouse: 'Accra Main', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200' },
  { id: '3', name: 'Abena Osei', email: 'abena@godswayent.com', role: 'EMPLOYEE', warehouse: 'Accra Main', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200' },
  { id: '4', name: 'Kofi Larbi', email: 'kofi@godswayent.com', role: 'EMPLOYEE', warehouse: 'Kumasi Branch', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200' },
];

export default function Employees() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: 'EMPLOYEE',
    warehouse: 'Accra Main',
    img: PREDEFINED_AVATARS[0]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditingEmployee({ ...editingEmployee, img: reader.result as string });
        } else {
          setNewEmployee({ ...newEmployee, img: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployees(prev => prev.map(emp => emp.id === editingEmployee.id ? editingEmployee : emp));
    setShowEditDialog(false);
    setEditingEmployee(null);
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (employees.length + 1).toString();
    setEmployees([{ id, ...newEmployee }, ...employees]);
    setShowAddDialog(false);
    setNewEmployee({
      name: '',
      email: '',
      role: 'EMPLOYEE',
      warehouse: 'Accra Main',
      img: PREDEFINED_AVATARS[0]
    });
  };

  const openEditDialog = (employee: any) => {
    setEditingEmployee({ ...employee });
    setShowEditDialog(true);
  };

  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase tracking-tighter">Registry.</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage personnel, roles, and access across God's Way Ent.</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger render={<Button className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-xl h-12 px-8 font-bold text-xs uppercase tracking-widest shadow-lg transition-all" />}>
            <Plus className="w-4 h-4 mr-2" /> Register Personnel
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-card border-border text-foreground rounded-[2rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold uppercase tracking-tight italic font-serif">Register High-Efficiency Personnel</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-8 mt-6">
              {/* Avatar Selection Area */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Staff Visual Identity</label>
                <div className="flex flex-col md:flex-row items-center gap-8 bg-muted/30 p-6 rounded-3xl border border-border/50">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                      <AvatarImage src={newEmployee.img} />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                  </div>
                  
                  <div className="flex-grow space-y-3">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Select from pre-defined set</div>
                    <div className="flex flex-wrap gap-2">
                      {PREDEFINED_AVATARS.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setNewEmployee({...newEmployee, img: url})}
                          className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all relative ${newEmployee.img === url ? 'border-accent scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        >
                          <img src={url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          {newEmployee.img === url && (
                            <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                              <Check className="w-4 h-4 text-accent-foreground" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Identity Name</label>
                  <Input 
                    required
                    value={newEmployee.name}
                    onChange={e => setNewEmployee({...newEmployee, name: e.target.value})}
                    placeholder="e.g. Samuel Adjei" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Verified Email Node</label>
                  <Input 
                    required
                    type="email"
                    value={newEmployee.email}
                    onChange={e => setNewEmployee({...newEmployee, email: e.target.value})}
                    placeholder="samuel@godswayent.com" 
                    className="bg-muted border-border rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Personnel Role</label>
                  <select 
                    value={newEmployee.role}
                    onChange={e => setNewEmployee({...newEmployee, role: e.target.value})}
                    className="w-full bg-muted border border-border rounded-xl h-12 px-4 text-[11px] font-bold uppercase tracking-widest outline-none transition-all focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                    <option value="WAREHOUSE_MANAGER">WAREHOUSE MANAGER</option>
                    <option value="EMPLOYEE">STAFF PERSONNEL</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Allocation Warehouse</label>
                  <select 
                    value={newEmployee.warehouse}
                    onChange={e => setNewEmployee({...newEmployee, warehouse: e.target.value})}
                    className="w-full bg-muted border border-border rounded-xl h-12 px-4 text-[11px] font-bold uppercase tracking-widest outline-none transition-all focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="All">Global Terminal (All)</option>
                    <option value="Accra Main">Accra Main Node</option>
                    <option value="Kumasi Branch">Kumasi Branch Node</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border mt-8">
                <Button type="button" variant="ghost" onClick={() => setShowAddDialog(false)} className="flex-grow rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest transition-all">Abort</Button>
                <Button type="submit" className="flex-grow bg-accent hover:bg-accent/80 text-accent-foreground rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest shadow-xl transition-all">Authorize Personnel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Employee Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl bg-card border-border text-foreground rounded-[2rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold uppercase tracking-tight italic font-serif">Update Personnel Clearance</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateEmployee} className="space-y-8 mt-6">
            {editingEmployee && (
              <>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Staff Visual Identity</label>
                  <div className="flex flex-col md:flex-row items-center gap-8 bg-muted/30 p-6 rounded-3xl border border-border/50">
                    <div className="relative group">
                      <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                        <AvatarImage src={editingEmployee.img} />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Camera className="w-6 h-6 text-white" />
                      </button>
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
                    </div>
                    
                    <div className="flex-grow space-y-3">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Change Identifier Image</div>
                      <div className="flex flex-wrap gap-2">
                        {PREDEFINED_AVATARS.map((url, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setEditingEmployee({...editingEmployee, img: url})}
                            className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all relative ${editingEmployee.img === url ? 'border-accent scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                          >
                            <img src={url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            {editingEmployee.img === url && (
                              <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                                <Check className="w-4 h-4 text-accent-foreground" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Identity Name</label>
                    <Input 
                      required
                      value={editingEmployee.name}
                      onChange={e => setEditingEmployee({...editingEmployee, name: e.target.value})}
                      placeholder="e.g. Samuel Adjei" 
                      className="bg-muted border-border rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Verified Email Node</label>
                    <Input 
                      required
                      type="email"
                      value={editingEmployee.email}
                      onChange={e => setEditingEmployee({...editingEmployee, email: e.target.value})}
                      className="bg-muted border-border rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Personnel Role</label>
                    <select 
                      value={editingEmployee.role}
                      onChange={e => setEditingEmployee({...editingEmployee, role: e.target.value})}
                      className="w-full bg-muted border border-border rounded-xl h-12 px-4 text-[11px] font-bold uppercase tracking-widest outline-none transition-all focus:ring-2 focus:ring-accent/20"
                    >
                      <option value="SUPER_ADMIN">SUPER ADMIN</option>
                      <option value="WAREHOUSE_MANAGER">WAREHOUSE MANAGER</option>
                      <option value="EMPLOYEE">STAFF PERSONNEL</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Allocation Warehouse</label>
                    <select 
                      value={editingEmployee.warehouse}
                      onChange={e => setEditingEmployee({...editingEmployee, warehouse: e.target.value})}
                      className="w-full bg-muted border border-border rounded-xl h-12 px-4 text-[11px] font-bold uppercase tracking-widest outline-none transition-all focus:ring-2 focus:ring-accent/20"
                    >
                      <option value="All">Global Terminal (All)</option>
                      <option value="Accra Main">Accra Main Node</option>
                      <option value="Kumasi Branch">Kumasi Branch Node</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border mt-8">
                  <Button type="button" variant="ghost" onClick={() => setShowEditDialog(false)} className="flex-grow rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest transition-all">Cancel</Button>
                  <Button type="submit" className="flex-grow bg-accent hover:bg-accent/80 text-accent-foreground rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest shadow-xl transition-all">Update Credentials</Button>
                </div>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>

      <div className="bg-card p-6 rounded-3xl border border-border backdrop-blur-xl transition-all shadow-sm">
        <div className="relative">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-muted border-border rounded-xl pl-10 h-12 focus:ring-accent transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((employee) => (
          <div key={employee.id} className="bg-card border border-border rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden group transition-all shadow-sm hover:shadow-md hover:border-accent/30">
            <div className="absolute top-0 right-0 p-4">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="hover:bg-muted rounded-full h-8 w-8 transition-all" />}>
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border text-foreground transition-all">
                  <DropdownMenuItem 
                    onClick={() => openEditDialog(employee)}
                    className="focus:bg-muted font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-500 font-bold text-xs uppercase tracking-widest cursor-pointer">
                    Terminate Access
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 border-4 border-background mb-6 shadow-2xl transition-all">
                <AvatarImage src={employee.img} />
                <AvatarFallback className="bg-muted text-muted-foreground">{employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-foreground mb-1 transition-all">{employee.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-bold uppercase tracking-widest mb-6 transition-all">
                <Mail className="w-3 h-3" /> {employee.email}
              </div>

              <div className="grid grid-cols-2 w-full gap-4">
                <div className="p-3 bg-muted/30 rounded-2xl border border-border/50 transition-all">
                  <div className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-1">Role</div>
                  <Badge variant="outline" className="text-[9px] font-bold border-accent/30 text-accent uppercase bg-accent/5 transition-all">
                    {employee.role.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="p-3 bg-muted/30 rounded-2xl border border-border/50 transition-all">
                  <div className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-1">Warehouse</div>
                  <div className="text-[10px] font-bold text-foreground/80 truncate transition-all">{employee.warehouse}</div>
                </div>
              </div>

              <div className="mt-8 flex gap-3 w-full">
                <Button variant="ghost" className="flex-grow h-10 text-[10px] items-center gap-2 uppercase tracking-widest font-bold border border-border hover:bg-muted rounded-xl transition-all">
                  <UserCheck className="w-4 h-4 text-green-500" /> Actions
                </Button>
                <Button variant="ghost" className="h-10 text-[10px] items-center gap-2 uppercase tracking-widest font-bold border border-border hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all">
                   Suspend
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
