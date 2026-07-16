"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Play, Eye, Clock } from "lucide-react";

// Ensure GSAP context and useGSAP are registered
gsap.registerPlugin(useGSAP);

interface ReelItem {
  id: number;
  src: string;
  category: string;
  title: string;
  duration: string;
  views: string;
}

const listReels: ReelItem[] = [
  { 
    id: 1, 
    src: 'https://jahzpxhqpwxkurixacnb.supabase.co/storage/v1/object/public/reels/Mildred.MP4', 
    category: 'SOCIAL MEDIA', 
    title: 'EIREN MESSI CASE STUDY', 
    duration: '0:15', 
    views: '24.2K' 
  },
  { 
    id: 2, 
    src: 'https://jahzpxhqpwxkurixacnb.supabase.co/storage/v1/object/public/reels/Tracy%202%20final.mov', 
    category: 'BRANDING', 
    title: 'MALVINAS IDENTITY MOTION', 
    duration: '0:30', 
    views: '18.5K' 
  },
  { 
    id: 3, 
    src: 'https://jahzpxhqpwxkurixacnb.supabase.co/storage/v1/object/public/reels/Tracy%203%20final.mov', 
    category: 'PRODUCTION', 
    title: 'MILDRED AUDIOVISUAL PROD', 
    duration: '0:20', 
    views: '32.1K' 
  }
];

interface ReelColumnProps {
  items: ReelItem[];
  direction: "up" | "down";
  startDelay?: number; // stagger the column transitions
  className?: string;
}

function ReelColumn({ items, direction, startDelay = 0, className = "" }: ReelColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Duplicate elements once to ensure a seamless loop
  const duplicatedItems = [...items, ...items];

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Create a timeline that repeats infinitely
    const tl = gsap.timeline({
      repeat: -1,
      delay: startDelay,
    });

    if (direction === "up") {
      // Set initial position at index 0 (0%)
      gsap.set(track, { yPercent: 0 });

      // Move UP (scrolling down: 0% -> -100% -> -200% -> -300%)
      // Each transition takes 0.6s and holds for exactly 2 seconds
      tl.to(track, { yPercent: -100, duration: 0.6, ease: "power2.inOut" }, "+=2")
        .to(track, { yPercent: -200, duration: 0.6, ease: "power2.inOut" }, "+=2")
        .to(track, { yPercent: -300, duration: 0.6, ease: "power2.inOut" }, "+=2")
        .set(track, { yPercent: 0 }); // Instantly snap back to 0
    } else {
      // Set initial position at copy index 3 (-300% of height)
      gsap.set(track, { yPercent: -300 });

      // Move DOWN (scrolling up: -300% -> -200% -> -100% -> 0%)
      tl.to(track, { yPercent: -200, duration: 0.6, ease: "power2.inOut" }, "+=2")
        .to(track, { yPercent: -100, duration: 0.6, ease: "power2.inOut" }, "+=2")
        .to(track, { yPercent: 0, duration: 0.6, ease: "power2.inOut" }, "+=2")
        .set(track, { yPercent: -300 }); // Instantly snap back to -300
    }

    timelineRef.current = tl;

    return () => {
      if (tl) tl.kill();
    };
  }, { scope: containerRef, dependencies: [direction, startDelay] });

  // Handle hover pause and resume
  const handleMouseEnter = () => {
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`bg-white relative border border-transparent hover:border-[#00319A] transition-colors duration-300 z-10 hover:z-20 aspect-[9/16] overflow-hidden group/column cursor-pointer ${className}`}
    >
      {/* Scrollable Track - each child occupies 100% height and width */}
      <div ref={trackRef} className="absolute inset-0 flex flex-col w-full h-full">
        {duplicatedItems.map((item, idx) => (
          <div 
            key={`${item.id}-${idx}`} 
            className="w-full h-full flex-shrink-0 relative select-none bg-gray-100 overflow-hidden rounded-none"
          >
            {/* Native HTML5 Video Element (full bleed, absolute inset-0) */}
            <video 
              src={item.src}
              loop 
              muted 
              autoPlay 
              playsInline 
              preload="auto"
              controls={false}
              className="absolute inset-0 w-full h-full object-cover rounded-none block"
            />
            
            {/* Duration Badge with subtle dark background */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[9px] font-bold font-jakarta tracking-wider text-white flex items-center gap-1 uppercase rounded-none z-10 shadow-md">
              <Clock className="w-2.5 h-2.5 text-[#00319A]" />
              {item.duration}
            </div>

            {/* Play Button Overlay on Hover */}
            <div className="absolute inset-0 bg-[#00319A]/5 opacity-0 group-hover/column:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
              <div className="w-12 h-12 bg-white border border-[#00319A] flex items-center justify-center text-[#00319A] transform translate-y-4 group-hover/column:translate-y-0 transition-all duration-300 rounded-none shadow-[3px_3px_0px_rgba(0,49,154,0.15)]">
                <Play className="w-4 h-4 fill-[#00319A]" />
              </div>
            </div>

            {/* TikTok-style Text Overlay with dark gradient mask bottom-up */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end text-white z-10 pointer-events-none">
              <span className="text-[9px] font-bold text-blue-400 tracking-[0.2em] uppercase font-jakarta">
                {item.category}
              </span>
              <h4 className="text-xs md:text-sm font-black tracking-tight uppercase mt-1 line-clamp-2 leading-tight">
                {item.title}
              </h4>
              <div className="flex items-center gap-1 text-[9px] text-white/60 mt-1 uppercase font-semibold">
                <Eye className="w-2.5 h-2.5 text-white/60" />
                <span>{item.views} vistas</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReelsMovimiento() {
  return (
    <section id="reels" className="py-24 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado rígido con línea animada (se vincula al ScrollTrigger global) */}
        <div className="max-w-4xl section-header-group mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#00319A] uppercase block mb-3 font-jakarta">
            03 / REDES SOCIALES & VIRALIDAD
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-jakarta tracking-tighter leading-none md:leading-[1.1] text-black uppercase">
            CONTENIDO DE ALTO IMPACTO: MILLONES DE VISITAS.
          </h2>
          <div className="h-[2px] bg-[#00319A] w-full mt-4 section-divider origin-left" />
        </div>

        {/* Retícula de columnas con efecto de bordes compartidos */}
        {/* La transición de cada columna está escalonada (startDelay) para crear un ritmo asíncrono y elegante */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          <ReelColumn items={listReels} direction="up" startDelay={0} />
          <ReelColumn items={listReels} direction="down" startDelay={0.5} className="hidden md:block" />
          <ReelColumn items={listReels} direction="up" startDelay={1.0} className="hidden md:block" />
          <ReelColumn items={listReels} direction="down" startDelay={1.5} className="hidden lg:block" />
        </div>

      </div>
    </section>
  );
}
