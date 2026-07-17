"use client";

import { motion } from "framer-motion";
import { Compass, Megaphone, Video, Code2, ArrowUpRight } from "lucide-react";

export default function Servicios() {
  const services = [
    {
      num: "01",
      icon: Video,
      title: "CONTENIDO",
      items: ["Fotografía", "Producción Audiovisual", "Edición de Video"],
      tag: "MEDIA & NARRATIVE"
    },
    {
      num: "02",
      icon: Compass,
      title: "DISEÑO",
      items: ["Identidad Visual", "Diseño Gráfico", "Logotipos"],
      tag: "BRAND IDENTITY"
    },
    {
      num: "03",
      icon: Megaphone,
      title: "MARKETING",
      items: ["Publicidad Digital", "SEO", "Automatización", "Analítica"],
      tag: "PERFORMANCE"
    },
    {
      num: "04",
      icon: Code2,
      title: "DESARROLLO DIGITAL",
      items: ["Sitios Web", "Landing Pages", "CRM", "Apps"],
      tag: "ENGINEERING"
    }
  ];

  return (
    <section id="servicios" className="bg-white">
      <div className="max-w-7xl mx-auto border-x border-gray-200">
        
        {/* Section Header */}
        <div className="p-8 md:p-16 border-b border-gray-200 section-header-group">
          <span className="text-xs font-bold tracking-[0.3em] text-[#00319A] uppercase block mb-3 font-jakarta">
            02 / SERVICIOS
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-jakarta tracking-tighter leading-none text-gray-dark uppercase">
            NUESTROS SERVICIOS & VERTICALES.
          </h2>
          <div className="h-[1px] bg-[#00319A] w-full mt-6 section-divider origin-left" />
        </div>

        {/* Services Grid with 1px border separations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-200 gap-px border-b border-gray-200">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title} 
                className="service-card bg-white p-8 md:p-10 flex flex-col justify-between group transition-all duration-300 ease-in-out hover:bg-[#00319A] rounded-none relative overflow-hidden cursor-pointer"
              >
                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  <div>
                    {/* Top indicator with icon & tag */}
                    <div className="flex items-center justify-between mb-8">
                      <motion.div 
                        whileHover={{ rotate: 15 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-10 h-10 border border-gray-200 group-hover:border-white/30 group-hover:bg-white/10 flex items-center justify-center text-[#00319A] group-hover:text-white transition-all duration-300 ease-in-out rounded-none"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.div>
                      <span className="text-[9px] font-bold tracking-widest text-[#00319A] group-hover:text-white transition-colors duration-300 ease-in-out uppercase">
                        {service.tag}
                      </span>
                    </div>

                    {/* Title and Category Number */}
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-black font-jakarta text-[#00319A] group-hover:text-white transition-colors duration-300 ease-in-out uppercase tracking-tight max-w-[70%]">
                        {service.title}
                      </h3>
                      <span className="text-3xl font-black font-mono text-[#00319A] group-hover:text-white/20 transition-colors duration-300 ease-in-out">
                        {service.num}
                      </span>
                    </div>
                    
                    {/* Sub-elements styled list */}
                    <ul className="mt-8 flex flex-col gap-3.5">
                      {service.items.map((item) => (
                        <li 
                          key={item} 
                          className="text-sm font-light text-gray-muted group-hover:text-white transition-colors duration-300 ease-in-out flex items-center gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-300 group-hover:bg-white transition-colors duration-300 ease-in-out rounded-none inline-block flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Details Button */}
                  <button className="vertical-details-btn w-full text-left mt-12 pt-4 border-t border-gray-100 group-hover:border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#00319A] group-hover:text-white transition-all duration-300 ease-in-out cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white">
                    <span>Detalles de Vertical</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
