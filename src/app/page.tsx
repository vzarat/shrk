"use client";

import { 
  Building2, 
  Globe, 
  Megaphone, 
  Compass, 
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Workflow,
  Camera,
  Video,
  Code2
} from "lucide-react";

import Header from "@/components/Header";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import FormularioPasos from "@/components/FormularioPasos";
import { motion } from "framer-motion";

export default function Home() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.012,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      rotate: 4,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 14,
        stiffness: 110,
      }
    },
  };

  const services = [
    {
      icon: Compass,
      title: "Identidad de Marca",
      desc: "Fusionamos la esencia culinaria con una estética funcional para crear identidades que se saborean con la vista.",
      tag: "Gastronomía"
    },
    {
      icon: Building2,
      title: "Real Estate o Inmobiliario",
      desc: "Creamos marcas que habitan el espacio. Diseñamos identidades visuales para el sector inmobiliario.",
      tag: "Real Estate"
    },
    {
      icon: Globe,
      title: "Web & Experience",
      desc: "Desarrollamos experiencias digitales donde la estética y la funcionalidad convergen.",
      tag: "Digital Product"
    },
    {
      icon: Megaphone,
      title: "Segmentación y SEO",
      desc: (
        <div>
          <p>Estrategias avanzadas de posicionamiento, optimización SEO y pauta digital. Incluye la integración de ecosistemas en:</p>
          <div className="flex items-center gap-3 mt-4">
            {/* Facebook */}
            <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24" aria-label="Facebook"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            {/* Instagram */}
            <svg className="w-4 h-4 fill-[#E4405F]" viewBox="0 0 24 24" aria-label="Instagram"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            {/* WhatsApp */}
            <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24" aria-label="WhatsApp"><path d="M19.057 18.815a8.936 8.936 0 001.782-5.074c-.005-4.914-4.017-8.913-8.936-8.913-4.918 0-8.924 4.007-8.924 8.925 0 2.186.793 4.29 2.233 5.925l-1.344 4.91 5.044-1.323a8.916 8.916 0 004.305 1.1c4.919 0 8.929-4.007 8.929-8.925.002-2.457-.962-4.767-2.712-6.522l-1.357 1.374a6.953 6.953 0 012.024 5.148c.002 3.844-3.12 6.966-6.96 6.966a6.942 6.942 0 01-3.64-.997l-.29-.172-3.003.788.802-2.928-.19-.302a6.944 6.944 0 01-1.077-3.707c0-3.846 3.124-6.97 6.969-6.97 3.843 0 6.96 3.12 6.962 6.966a6.953 6.953 0 01-1.385 4.145l1.357 1.374z"/></svg>
            {/* LinkedIn */}
            <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
            {/* TikTok */}
            <svg className="w-4 h-4 fill-[#000000]" viewBox="0 0 24 24" aria-label="TikTok"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.02-2.89-.35-4.15-1.11-.13-.07-.26-.17-.43-.27v7.24c.01 1.51-.31 3.07-1.11 4.36-.8 1.32-2.06 2.38-3.53 2.92-1.63.63-3.47.7-5.15.22-1.74-.47-3.34-1.57-4.4-3.1-1.11-1.59-1.57-3.62-1.39-5.56.2-1.95 1.14-3.83 2.7-5.06 1.49-1.22 3.49-1.85 5.44-1.7 1.44.1 2.85.64 3.97 1.56.09-1.76.04-3.53.05-5.3 0-.09-.04-.15-.05-.24z"/></svg>
          </div>
        </div>
      ),
      tag: "Marketing Digital"
    },
    {
      icon: Workflow,
      title: "Presentaciones y Tarjetas Corporativas",
      desc: "Diseñamos presentaciones que transforman información compleja en narrativas claras y papelería corporativa fina con acabados de alta gama.",
      tag: "Presentaciones"
    },
    {
      icon: Compass,
      title: "Logotipos & Isotipos",
      desc: "Diseñamos identidades visuales que sintetizan la esencia de cada negocio.",
      tag: "Diseño de Marca"
    },
    {
      icon: Camera,
      title: "Fotografía Profesional",
      desc: "Captura de producto, espacios arquitectónicos y fotografía corporativa con iluminación avanzada y alta definición.",
      tag: "Media"
    },
    {
      icon: Video,
      title: "Producción Audiovisual",
      desc: "Creación de contenido en video de alta calidad, reels dinámicos, comerciales y postproducción cinematográfica para marcas.",
      tag: "Video Production"
    },
    {
      icon: Code2,
      title: "Programación DEV",
      desc: "Desarrollo e ingeniería de sistemas complejos a la medida, automatizaciones, integraciones robustas de bases de datos y CRMs avanzados.",
      tag: "Software Engineering"
    }
  ];

  return (
    <>
      {/* Navigation Header */}
      <Header />

      <main className="flex-1 w-full bg-white">
        
        {/* HERO SECTION */}
        <section className="border-b border-gray-200 min-h-[90vh] flex flex-col justify-between bg-white pt-20">
          <div className="max-w-7xl mx-auto w-full border-x border-gray-200 flex-1 grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-200">
              
              {/* Technical Indicator */}
              <div className="inline-flex items-center gap-2 mb-8">
                <Sparkles className="w-3.5 h-3.5 text-[#00319A]" />
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#00319A] uppercase font-jakarta">
                  01 / PRODUCT DESIGN PORTFOLIO 2026
                </span>
              </div>

              {/* Headline */}
              <motion.h1 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-jakarta tracking-tight leading-[1.2] text-gray-900 uppercase max-w-4xl w-full"
              >
                {"ESTÉTICA FUNCIONAL Y ".split("").map((char, index) => (
                  <motion.span key={`char-1-${index}`} variants={letterVariants} className="inline-block whitespace-pre">
                    {char}
                  </motion.span>
                ))}
                <span className="text-[#00319A] inline-block">
                  {"NARRATIVAS VISUALES".split("").map((char, index) => (
                    <motion.span key={`char-2-${index}`} variants={letterVariants} className="inline-block whitespace-pre">
                      {char}
                    </motion.span>
                  ))}
                </span>
                {" QUE TRANSFORMAN NEGOCIOS.".split("").map((char, index) => (
                  <motion.span key={`char-3-${index}`} variants={letterVariants} className="inline-block whitespace-pre">
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Sub-headline */}
              <p className="text-sm md:text-base font-light text-gray-muted max-w-2xl leading-relaxed mt-8">
                Diseñamos el punto de contacto entre tu marca y su audiencia. Desde identidades gourmet e inmobiliarias hasta experiencias digitales de alto rendimiento.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-12 w-full sm:w-auto">
                <button
                  onClick={() => handleScrollTo("portafolio")}
                  className="relative overflow-visible px-8 py-4 text-xs font-bold uppercase tracking-widest border border-gray-900 text-gray-dark hover:text-[#00319A] hover:border-[#00319A] transition-all duration-300 rounded-none cursor-pointer group"
                >
                  <motion.span 
                    className="absolute -inset-0.5 border border-gray-300 pointer-events-none rounded-none opacity-0"
                    whileHover={{ 
                      scale: [1, 1.15],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 0.1
                    }}
                  />
                  Ver Portafolio
                </button>
                
                <button
                  onClick={() => handleScrollTo("contacto")}
                  className="group relative overflow-visible px-8 py-4 text-xs font-black uppercase tracking-widest bg-[#00319A] hover:bg-[#00226b] text-white transition-all duration-300 rounded-none flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <motion.span 
                    className="absolute -inset-0.5 border border-[#00319A] pointer-events-none rounded-none opacity-0"
                    whileHover={{ 
                      scale: [1, 1.15],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 0.1
                    }}
                  />
                  Iniciar Proyecto
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Spacer & Technical Watermark Column */}
            <div className="lg:col-span-4 p-8 md:p-12 flex flex-col justify-between bg-gray-50/50">
              <div className="flex flex-col gap-2 border-b border-gray-200 pb-8 text-xs font-bold text-gray-muted tracking-wider uppercase font-jakarta">
                <span>SHRK Media Studio</span>
                <span>Product Design Portfolio</span>
                <span className="text-[#00319A]">Edición 2026</span>
              </div>
              <div className="text-[10px] text-gray-muted uppercase tracking-widest leading-relaxed font-mono mt-8">
                <span>REYNOSA, TAM, MX / MCALLEN, TX, US</span>
                <br />
                <span>ESTADO: DISPONIBLE PARA NUEVOS PROYECTOS</span>
              </div>
            </div>

          </div>
        </section>


        {/* SERVICES SECTION */}
        <section id="servicios" className="bg-white">
          <div className="max-w-7xl mx-auto border-x border-gray-200">
            
            {/* Section Header */}
            <div className="p-8 md:p-16 border-b border-gray-200">
              <span className="text-xs font-bold tracking-[0.3em] text-[#00319A] uppercase block mb-3 font-jakarta">
                02 / SERVICIOS
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-jakarta tracking-tighter leading-none text-gray-dark uppercase">
                Retícula Rígida de Soluciones.
              </h2>
            </div>

            {/* Services Grid with 1px border separations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-200 gap-px border-b border-gray-200">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div 
                    key={service.title} 
                    whileHover="hover"
                    className="bg-white p-8 md:p-10 flex flex-col justify-between group transition-all duration-300 rounded-none relative overflow-hidden"
                  >
                    {/* Swim wave background gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-100/40 to-gray-50 opacity-0 pointer-events-none rounded-none"
                      style={{ backgroundSize: "200% 100%" }}
                      variants={{
                        hover: { 
                          opacity: 1,
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                      }}
                    />

                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div>
                        {/* Indicador superior con icono y etiqueta */}
                        <div className="flex items-center justify-between mb-8">
                          <motion.div 
                            variants={{
                              hover: { rotate: 15 }
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-10 h-10 border border-gray-200 group-hover:border-[#00319A] group-hover:bg-[#00319A]/5 flex items-center justify-center text-gray-muted group-hover:text-[#00319A] transition-all duration-200 rounded-none"
                          >
                            <Icon className="w-4 h-4" />
                          </motion.div>
                          <span className="text-[9px] font-bold tracking-widest text-[#00319A] uppercase">
                            {service.tag}
                          </span>
                        </div>

                        {/* Título del Servicio */}
                        <h3 className="text-lg font-bold font-jakarta text-gray-dark group-hover:text-[#00319A] transition-colors duration-200 uppercase">
                          {service.title}
                        </h3>
                        
                        {/* Descripción / Elemento Personalizado */}
                        <div className="text-sm font-light text-gray-muted mt-4 leading-relaxed">
                          {service.desc}
                        </div>
                      </div>

                      {/* Botón inferior de Detalle */}
                      <div className="mt-12 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-muted group-hover:text-[#00319A] transition-colors duration-200">
                        <span>Detalles de Vertical</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>


        {/* PORTFOLIO SHOWCASE */}
        <PortfolioShowcase />


        {/* INTERNATIONAL MARKET SECTION */}
        <section id="mercado" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Boxed outline layout */}
            <div className="border border-gray-200 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-50/30">
              
              {/* Coordinates panel */}
              <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-gray-200 pb-8 lg:pb-0 lg:pr-8 flex flex-col gap-4">
                <span className="text-xs font-bold tracking-[0.25em] text-[#00319A] uppercase block font-jakarta">
                  03 / ENFOQUE BINACIONAL
                </span>
                <div className="text-xs font-mono text-gray-muted uppercase tracking-wider leading-relaxed">
                  Reynosa, MX: 26.0908° N, 98.2778° W
                  <br />
                  McAllen, US: 26.2034° N, 98.2300° W
                </div>
              </div>

              {/* Copy panel */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00319A]/5 border border-[#00319A]/20 mb-4 rounded-none">
                  <Globe2 className="w-3.5 h-3.5 text-[#00319A]" />
                  <span className="text-[10px] font-bold tracking-widest text-[#00319A] uppercase">
                    Mercado Binacional
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-jakarta tracking-tighter leading-none text-gray-dark uppercase mb-6">
                  Diseño sin fronteras.
                </h2>
                <p className="text-base md:text-lg font-light text-gray-muted leading-relaxed">
                  Conectamos marcas en el mercado internacional, adaptando la narrativa visual para audiencias bilingües con un impacto comercial directo.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* LEAD CAPTURE FORM */}
        <FormularioPasos />

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto border-x border-gray-200">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-gray-200 border-b border-gray-200">
            
            {/* Info Col */}
            <div className="md:col-span-5 bg-white p-8 md:p-12 flex flex-col justify-between min-h-[250px]">
              <div>
                <a href="#" className="text-xl font-black tracking-[0.2em] font-jakarta text-gray-dark block mb-4 uppercase">
                  SHRK<span className="text-[#00319A]">.</span>
                </a>
                <p className="text-xs font-light text-gray-muted max-w-sm leading-relaxed">
                  Estudio boutique de diseño de producto, branding gourmet y desarrollo digital. Activos visuales de alto rendimiento en el mercado binacional.
                </p>
              </div>

              {/* Social links - rectangular icons */}
              <div className="flex items-center gap-2 mt-8">
                {[
                  { href: "https://instagram.com", label: "Instagram", icon: "IG" },
                  { href: "https://linkedin.com", label: "LinkedIn", icon: "LN" },
                  { href: "https://dribbble.com", label: "Dribbble", icon: "DB" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-muted hover:text-white hover:bg-[#00319A] hover:border-[#00319A] transition-all duration-200 rounded-none"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links Col */}
            <div className="md:col-span-3 bg-white p-8 md:p-12 min-h-[250px]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00319A] mb-6 font-jakarta">Explorar</h4>
              <ul className="flex flex-col gap-3 text-xs font-bold uppercase tracking-wider text-gray-muted">
                <li>
                  <a href="#servicios" onClick={(e) => { e.preventDefault(); handleScrollTo("servicios"); }} className="hover:text-[#00319A] transition-colors duration-200">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#portafolio" onClick={(e) => { e.preventDefault(); handleScrollTo("portafolio"); }} className="hover:text-[#00319A] transition-colors duration-200">
                    Portafolio
                  </a>
                </li>
                <li>
                  <a href="#mercado" onClick={(e) => { e.preventDefault(); handleScrollTo("mercado"); }} className="hover:text-[#00319A] transition-colors duration-200">
                    Mercado
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info Col */}
            <div className="md:col-span-4 bg-white p-8 md:p-12 min-h-[250px]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00319A] mb-6 font-jakarta">Oficina Binacional</h4>
              <p className="text-xs text-gray-muted leading-relaxed font-bold">
                Reynosa, Tamaulipas, México / McAllen, Texas, USA
              </p>
              <a 
                href="mailto:hello@shrkstudio.com" 
                className="text-xs font-black uppercase text-gray-dark hover:text-[#00319A] transition-colors duration-200 block mt-3"
              >
                hello@shrkstudio.com
              </a>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white text-[10px] text-gray-muted tracking-widest font-mono">
            <span>SHRKSTUDIO.COM</span>
            <span className="italic">"Cada gran proyecto comienza con una visión clara."</span>
            <span>&copy; 2026 SHRK Media Studio.</span>
          </div>

        </div>
      </footer>
    </>
  );
}
