import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Contact() {
  return (
    <div className="bg-background text-foreground transition-colors duration-500 overflow-hidden">
      {/* Hero Header */}
      <section className="relative pt-32 pb-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-6 border-accent/30 text-accent uppercase tracking-widest font-bold text-[10px] px-3">
              Direct Support
            </Badge>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12 uppercase italic">
              Connect with the <span className="text-accent underline decoration-1 underline-offset-8">Experts.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-xl leading-relaxed">
              Technical inquiries, wholesale requests, or restoration consultations. We're here to power your build.
            </p>
          </div>
        </div>
        
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 -z-10 translate-x-20" />
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            {/* Contact Information */}
            <div className="space-y-16">
              <div className="space-y-8">
                <h2 className="text-xs uppercase font-bold tracking-[0.3em] text-accent">Contact Points</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="group">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Inquiries</div>
                    <div className="text-xl font-bold">+233 24 123 4567</div>
                  </div>

                  <div className="group">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Email Terminal</div>
                    <div className="text-xl font-bold">hq@godswayent.com</div>
                  </div>

                  <div className="group">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Global HQ</div>
                    <div className="text-xl font-bold">North Industrial Area, Accra, Ghana</div>
                  </div>

                  <div className="group">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Operations</div>
                    <div className="text-xl font-bold">Mon - Sat: 08:00 - 18:00</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-xs uppercase font-bold tracking-[0.3em] text-accent">Digital Presence</h2>
                <div className="flex gap-4">
                  {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <Button key={i} variant="outline" size="icon" className="w-14 h-14 rounded-full border-border hover:bg-accent hover:text-accent-foreground transition-all duration-500">
                      <Icon className="w-5 h-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Messaging Module */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-12 rounded-[3rem] shadow-xl relative"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="w-3 border-t-2 border-accent" />
                <div className="h-3 border-r-2 border-accent mt-[-2px]" />
              </div>

              <h3 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Send Inquiry.</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Full Name</label>
                    <Input placeholder="Kofi Mensah" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Email ID</label>
                    <Input placeholder="kmensah@me.com" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Service Subject</label>
                  <Input placeholder="Parts Availability / Bulk Order" className="h-14 bg-muted border-border rounded-xl px-6 focus:ring-accent" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Your Message</label>
                  <Textarea 
                    placeholder="Describe your technical requirements..." 
                    className="min-h-[160px] bg-muted border-border rounded-2xl p-6 focus:ring-accent"
                  />
                </div>

                <Button className="w-full h-16 bg-accent hover:bg-accent/80 text-accent-foreground font-bold uppercase tracking-[0.2em] text-xs rounded-xl shadow-lg transition-all active:scale-95 group">
                  Transmit Message
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Segment Placeholder */}
      <section className="h-[500px] bg-muted border-y border-border relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center grayscale" />
         <div className="z-10 text-center space-y-4">
           <Badge className="bg-accent text-accent-foreground rounded-full px-6 py-2 uppercase tracking-widest font-bold">Locate Us</Badge>
           <h2 className="text-4xl font-light italic text-foreground">Accra Gateway Branch</h2>
         </div>
      </section>
    </div>
  );
}
