import { motion } from 'motion/react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0 bg-background overflow-hidden">
          <div className="absolute inset-0 bg-background z-0" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale contrast-125 scale-105"
          >
            <source 
              src="https://cdn.pixabay.com/video/2023/10/24/186355-877716161_large.mp4" 
              type="video/mp4" 
            />
          </video>
          {/* Animated Overlay for Depth */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" 
          />
        </div>

        <div className="container mx-auto px-4 z-20 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold tracking-widest text-[10px] uppercase mb-6">
              Quality Guaranteed
            </span>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8 font-sans transition-all">
              Genuine Auto Parts.<br />
              <span className="text-accent">Direct to Accra.</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-lg mb-10 leading-relaxed transition-all">
              Premium body parts, engine components, and luxury accessories with real-time stock availability. Professional technical support for every vehicle build.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 h-14 text-sm font-bold uppercase tracking-widest group transition-all duration-300 shadow-xl">
                  Explore Catalog
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" className="border-border hover:bg-muted text-foreground rounded-full px-10 h-14 text-sm font-bold uppercase tracking-widest backdrop-blur-md transition-all">
                  Journal
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stat Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-12 right-12 hidden lg:block p-6 bg-card/40 backdrop-blur-xl border border-border rounded-3xl z-20 w-72 transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground shadow-lg transition-all">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">15,000+</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Parts In Stock</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground transition-all">
            From vintage models to the latest luxury cars, we have exactly what you need.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-background transition-colors duration-500">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Original Quality", desc: "100% genuine parts from authorized manufacturers worldwide." },
            { icon: Truck, title: "Fast Delivery", desc: "Swift logistics across Accra and nationwide shipping options." },
            { icon: Zap, title: "Expert Support", desc: "Professional consulting to find the perfect fit for your vehicle." },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-card border border-border rounded-[2.5rem] hover:border-accent/30 transition-all duration-500"
            >
              <item.icon className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm transition-all">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 bg-background relative overflow-hidden transition-colors duration-500">
        <div className="container mx-auto px-4 mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 uppercase text-foreground">Engineered Selection.</h2>
            <p className="text-muted-foreground text-sm transition-all">Pick from our curated categories designed for peak performance.</p>
          </div>
          <Link to="/products" className="text-accent font-bold hover:underline flex items-center gap-2 text-xs uppercase tracking-widest transition-all">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Engine Parts", img: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=800&auto=format&fit=crop" },
            { name: "Body & Paint", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop" },
            { name: "Lighting", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c3d8?q=80&w=800&auto=format&fit=crop" },
            { name: "Brakes & Suspension", img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format&fit=crop" },
          ].map((cat, i) => (
            <Link key={i} to={`/products?cat=${cat.name.toLowerCase()}`} className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-card border border-border group-hover:border-accent/40 transition-all duration-500">
              <img 
                src={cat.img} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 transition-all">
                <h3 className="text-xl font-bold uppercase tracking-tighter text-foreground">{cat.name}</h3>
                <span className="text-[10px] uppercase font-bold text-accent tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
