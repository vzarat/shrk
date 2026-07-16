"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
  id: number;
  title: string;
  client: string;
  category: "gourmet" | "inmobiliario" | "web";
  categoryLabel: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Tinto Premium Wine Selection",
    client: "Tinto Bodegas",
    category: "gourmet",
    categoryLabel: "Gourmet",
    image: "/images/tinto_wine.png",
    description: "Diseño de identidad visual minimalista y empaque premium para vino de reserva."
  },
  {
    id: 2,
    title: "Raíces Identidad Corporativa",
    client: "Raíces Soluciones Inmobiliarias",
    category: "inmobiliario",
    categoryLabel: "Inmobiliario",
    image: "/images/raices_branding.png",
    description: "Desarrollo de papelería, tarjetas corporativas con relieve metálico y branding de marca."
  },
  {
    id: 3,
    title: "Aurora Creative Editorial Slide",
    client: "Aurora Design Agency",
    category: "web",
    categoryLabel: "Web & Narrativas",
    image: "/images/visual_pitch.png",
    description: "Presentaciones y guías de marca editoriales interactivas para audiencias binacionales."
  }
];

export default function PortfolioShowcase() {
  const [filter, setFilter] = useState<"todos" | "gourmet" | "inmobiliario" | "web">("todos");
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = sectionRef.current;
    if (!container) return;

    const line = container.querySelector(".section-divider");
    const text = container.querySelectorAll("span, h2");
    if (!line) return;

    gsap.set(line, { scaleX: 0 });
    gsap.set(text, { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.to(line, {
      scaleX: 1,
      duration: 0.9,
      ease: "power2.inOut",
      willChange: "transform"
    })
    .to(text, {
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08
    }, "-=0.6");
  }, { scope: sectionRef });

  const filteredProjects = filter === "todos"
    ? projects
    : projects.filter((project) => project.category === filter);

  const filterTabs = [
    { id: "todos", label: "Todos" },
    { id: "gourmet", label: "Gourmet" },
    { id: "inmobiliario", label: "Inmobiliario" },
    { id: "web", label: "Web" },
  ] as const;

  return (
    <section ref={sectionRef} id="portafolio" className="py-24 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-8 border-b border-gray-200">
          <div className="max-w-xl section-header-group">
            <span className="text-xs font-bold tracking-[0.25em] text-[#00319A] uppercase block mb-3 font-jakarta">
              05 / PROYECTOS DESTACADOS
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-jakarta tracking-tighter leading-none text-gray-dark uppercase">
              Estética funcional.
            </h2>
            <div className="h-[1px] bg-[#00319A] w-full mt-6 section-divider origin-left" />
          </div>

          {/* Filters - Squared Grid layout */}
          <div className="flex flex-wrap gap-px bg-gray-200 border border-gray-200 self-start lg:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-none cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#00319A] text-white"
                    : "bg-white text-gray-muted hover:bg-gray-50 hover:text-[#00319A]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid - Architecture-inspired borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-gray-200">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group border-r border-b border-gray-200 p-6 flex flex-col justify-between aspect-[4/3] bg-white transition-all duration-300 hover:border-[#00319A] relative z-10 hover:z-20 cursor-pointer"
              >
                {/* Project Image Box */}
                <div className="relative w-full h-[65%] overflow-hidden border border-gray-200 group-hover:border-[#00319A] transition-all duration-300">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out filter grayscale group-hover:grayscale-0 group-hover:scale-102"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Project Info - Rigid typography */}
                <div className="mt-4 flex flex-col justify-between flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#00319A]">
                      {project.categoryLabel}
                    </span>
                    <span className="text-[10px] font-bold text-gray-muted tracking-wider">
                      {project.client}
                    </span>
                  </div>
                  
                  <div className="flex items-end justify-between mt-2">
                    <div className="max-w-[85%]">
                      <h3 className="text-lg md:text-xl font-bold font-jakarta text-gray-dark tracking-tight leading-tight group-hover:text-[#00319A] transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-muted mt-1 line-clamp-1 font-light">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="w-8 h-8 border border-gray-200 group-hover:border-[#00319A] group-hover:bg-[#00319A] group-hover:text-white flex items-center justify-center transition-all duration-200">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
