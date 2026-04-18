import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, MessageSquare, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const POST = {
  id: '1',
  title: 'Top 5 Maintenance Tips for High-Performance Engines',
  slug: 'maintenance-tips',
  content: `
    <p>Performance engines are engineered for high power output but this comes with the need for meticulous care. Failing to follow these steps can lead to decreased power, poor reliability and costly repairs.</p>
    
    <h3>1. Use Premium Lubricants</h3>
    <p>Always opt for high-quality synthetic oils designed specifically for performance applications. These lubricants maintain their viscosity at higher temperatures and provide superior protection against engine wear.</p>

    <h3>2. Monitor Cooling System Health</h3>
    <p>Heat is the enemy of performance. Ensure your radiator, coolant pumps, and thermostats are in top condition. Inspect hoses regularly for any signs of cracking or leakage.</p>

    <h3>3. Frequent Air Filter Replacement</h3>
    <p>A restricted engine is an inefficient one. High-performance air filters allow for maximum airflow while providing excellent filtration. Check these more frequently if you drive in dusty environments.</p>

    <h3>4. Precision Spark Plug Gapping</h3>
    <p>Combustion is key. Using the correct spark plugs and ensuring they are gapped to the manufacturer's exact specification ensures efficient fuel ignition and maximizes power output.</p>
    
    <h3>5. Listen for Unusual Sounds</h3>
    <p>A knock, ping, or unusual rattle is often an early warning sign of something serious. Don't ignore it. A quick inspection now can save a total engine rebuild later.</p>
  `,
  author: 'John Mensah',
  authorBio: 'Chief Technical Officer at God\'s Way Ent with 15 years experience in performance tuning.',
  date: 'March 24, 2024',
  category: 'Expert Advice',
  tags: ['Maintenance', 'Performance', 'Engine Care'],
  img: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1200'
};

export default function BlogPostDetail() {
  const { slug } = useParams();

  return (
    <article className="pb-24">
      {/* Hero Header */}
      <header className="relative h-[60vh] flex flex-col justify-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={POST.img} 
            className="w-full h-full object-cover opacity-30" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10">
          <Link to="/blog" className="inline-flex items-center text-sm text-orange-500 font-bold uppercase tracking-widest mb-6 group transition-all">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> All Articles
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-orange-600 uppercase tracking-widest text-[10px] px-3 font-bold border-none">{POST.category}</Badge>
              <Separator orientation="vertical" className="h-4 bg-neutral-700" />
              <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {POST.date}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {POST.author}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight uppercase mb-0">
              {POST.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 -mt-10">
        <div className="lg:w-2/3 bg-neutral-900/50 border border-neutral-800 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 z-20">
          <div 
            className="prose prose-invert prose-orange max-w-none text-neutral-300 leading-relaxed text-lg
              prose-h3:text-2xl prose-h3:font-bold prose-h3:text-neutral-100 prose-h3:mt-12 prose-h3:mb-6
              prose-p:mb-8"
            dangerouslySetInnerHTML={{ __html: POST.content }}
          />

          <Separator className="my-16 bg-neutral-800" />

          <div className="flex flex-wrap gap-3">
            {POST.tags.map(tag => (
              <Badge key={tag} variant="outline" className="border-neutral-800 text-neutral-500 uppercase tracking-widest text-[9px] px-4 py-1 hover:text-orange-500 transition-colors">
                <Tag className="w-3 h-3 mr-2" /> {tag}
              </Badge>
            ))}
          </div>
        </div>

        <aside className="lg:w-1/3 space-y-8 h-fit lg:sticky lg:top-32">
          {/* Author Card */}
          <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-3xl">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-6">About the Author</h4>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-xl font-bold uppercase text-white shadow-lg">
                {POST.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-neutral-100">{POST.author}</div>
                <div className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Tech Specialist</div>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              {POST.authorBio}
            </p>
            <Button variant="outline" className="w-full border-neutral-800 rounded-xl font-bold text-xs uppercase tracking-widest">
              View All Posts
            </Button>
          </div>

          {/* Social Share */}
          <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-3xl flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Share Article</span>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="hover:bg-neutral-800 rounded-xl">
                 <Share2 className="w-5 h-5 text-neutral-400" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-neutral-800 rounded-xl">
                 <MessageSquare className="w-5 h-5 text-neutral-400" />
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Badge({ children, className, variant }: any) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
}
