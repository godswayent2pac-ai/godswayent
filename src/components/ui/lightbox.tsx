import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

export function Lightbox({ isOpen, onClose, images, initialIndex = 0 }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12"
          onClick={onClose}
        >
          {/* Header Controls */}
          <div className="absolute top-8 right-8 flex items-center gap-4 z-[110]" onClick={(e) => e.stopPropagation()}>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mr-4">
              {currentIndex + 1} / {images.length}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Large Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-full max-h-full aspect-[4/5] md:aspect-auto flex items-center justify-center"
              >
                <img
                  src={images[currentIndex]}
                  alt={`Product view ${currentIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 z-[110]"
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 z-[110]"
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnails Strip */}
          {images.length > 1 && (
            <div 
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 z-[110]"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all active:scale-90 ${
                    currentIndex === idx ? 'border-accent scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
