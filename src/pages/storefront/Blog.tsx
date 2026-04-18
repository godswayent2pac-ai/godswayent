import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_POSTS = [
  { 
    id: '1', 
    title: 'Top 5 Maintenance Tips for High-Performance Engines', 
    slug: 'maintenance-tips', 
    excerpt: 'Keeping your engine at peak performance requires more than just regular oil changes. Discover the expert secrets...', 
    author: 'John Mensah', 
    date: 'Mar 24, 2024',
    category: 'Expert Advice',
    img: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=800'
  },
  { 
    id: '2', 
    title: 'Why Forged Pistons are Essential for Turbocharged Builds', 
    slug: 'forged-pistons-turbo', 
    excerpt: 'When it comes to boost, strength is everything. Learn why upgrading to forged internals is the best investment for your car...', 
    author: 'Godsway Admin', 
    date: 'Mar 20, 2024',
    category: 'Technical',
    img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c3d8?q=80&w=800'
  },
  { 
    id: '3', 
    title: 'Understanding Brake Fade and How to Prevent It', 
    slug: 'brake-fade-prevention', 
    excerpt: 'Sprinting is easy, stopping is hard. We break down the science of braking and how to ensure your car stops every single time...', 
    author: 'Abena Osei', 
    date: 'Mar 15, 2024',
    category: 'Safety',
    img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800'
  },
];

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">THE JOURNAL.</h1>
          <p className="text-neutral-500">Insights, guides, and engineering wisdom from the experts at God's Way Ent.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Input 
            placeholder="Search articles..." 
            className="bg-neutral-900 border-neutral-800 rounded-2xl pl-10 h-12"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {MOCK_POSTS.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-neutral-900 mb-8 border border-neutral-800 transition-all duration-500 hover:border-orange-500/50">
              <img 
                src={post.img} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6">
                <Badge className="bg-orange-600 font-bold uppercase tracking-widest text-[9px] px-3 border-none">
                  {post.category}
                </Badge>
              </div>
            </Link>
            
            <div className="space-y-4 px-2">
              <div className="flex items-center gap-4 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <Separator orientation="vertical" className="h-3 bg-neutral-800" />
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
              </div>
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold leading-tight group-hover:text-orange-500 transition-colors uppercase tracking-tight">
                  {post.title}
                </h2>
              </Link>
              <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter Section */}
      <section className="mt-32 p-12 md:p-20 bg-neutral-900/40 border border-neutral-800 rounded-[3rem] relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 uppercase">Stay in the fast lane.</h2>
          <p className="text-neutral-400 mb-10">Subscribe to get technical guides, new stock arrival alerts, and exclusive performance tips delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input 
              placeholder="Your email address" 
              className="bg-neutral-950 border-neutral-800 h-14 rounded-2xl px-6 flex-grow"
            />
            <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-2xl h-14 px-10 font-bold uppercase tracking-widest">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Badge({ children, className }: any) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
}

function Separator({ orientation, className }: any) {
  return (
    <div className={`${orientation === 'vertical' ? 'w-[1px] h-full' : 'w-full h-[1px]'} ${className}`} />
  );
}
