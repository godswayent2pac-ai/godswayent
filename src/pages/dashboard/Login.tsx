import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, you'd verify password. For this demo, we use context.
      await login(email, 'SUPER_ADMIN');
      toast.success('Access Granted. Welcome back, Admin!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Terminal access denied. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] transition-all" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] transition-all" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Storefront
        </Link>
        
        <div className="bg-card/50 border border-border backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl transition-all">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-accent rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-accent/20 transition-all">
              <Shield className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter text-foreground uppercase transition-all">Manager Access.</h1>
            <p className="text-muted-foreground text-sm mt-2 transition-all">Enter credentials to enter the command center.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground px-1">Staff Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@godswayent.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border h-14 rounded-xl focus:ring-accent px-4 transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between px-1">
                <Label htmlFor="pass" className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Access Key</Label>
                <button type="button" className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent hover:underline transition-all">Forgot?</button>
              </div>
              <Input 
                id="pass" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border h-14 rounded-xl focus:ring-accent px-4 transition-all"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl text-md font-bold uppercase tracking-widest transition-all shadow-lg shadow-accent/20 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enter Dashboard'}
            </Button>
          </form>

          <div className="mt-8 text-center text-xs text-muted-foreground/60 uppercase tracking-widest font-bold transition-all">
            Authorized Personnel Only
          </div>
        </div>
      </motion.div>
    </div>
  );
}
