"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { prefix: "+", value: 30, suffix: "", label: "Clientes Satisfechos", desc: "Relaciones comerciales a largo plazo basadas en resultados." },
  { prefix: "+", value: 50, suffix: "", label: "Proyectos Entregados", desc: "Estrategias de marca, plataformas web e ingeniería de software." },
  { prefix: "", value: 98, suffix: "%", label: "Tasa de Satisfacción", desc: "Índice medido por cumplimiento de objetivos comerciales." },
  { prefix: "", value: 2, suffix: "", label: "Ecosistemas Activos", desc: "Operación de marca e infraestructura en México y Estados Unidos." },
];

const testimonials = [
  {
    quote: "La precisión y rigor técnico de SHRK transformó nuestra identidad en el mercado de Real Estate. Su entendimiento binacional es insustituible.",
    author: "Alejandro Garza",
    role: "Director de Operaciones",
    company: "Terra Development",
  },
  {
    quote: "Desarrollaron una plataforma web que no solo es estéticamente superior, sino robusta y optimizada a nivel de ingeniería. Superaron las expectativas.",
    author: "Elena Rostova",
    role: "VP de Producto",
    company: "Kinetix Digital US",
  },
  {
    quote: "El branding gastronómico desarrollado por SHRK capturó la esencia de nuestra marca con una sofisticación y cuidado al detalle extraordinarios.",
    author: "Mauricio Sada",
    role: "Chef & Fundador",
    company: "Grupo Tinto Gourmet",
  },
];

export default function Resultados() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = sectionRef.current;
    if (!container) return;

    // 1. Línea divisoria y desvanecimiento de cabecera
    const line = container.querySelector(".section-divider");
    const headerText = container.querySelectorAll(".section-header-group span, .section-header-group h2");
    if (line) {
      gsap.set(line, { scaleX: 0 });
      gsap.set(headerText, { autoAlpha: 0 });

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
      .to(headerText, {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08
      }, "-=0.6");
    }

    // 2. Animación del contador de números desde 0
    const numberElements = container.querySelectorAll(".stat-number");
    numberElements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute("data-target") || "0", 10);
      const proxy = { value: 0 };

      gsap.to(proxy, {
        value: targetVal,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          el.textContent = Math.round(proxy.value).toString();
        }
      });
    });

    // 3. Animación de entrada de las tarjetas (stats y testimonios)
    const cards = container.querySelectorAll(".stat-card, .testimonial-card");
    if (cards.length > 0) {
      gsap.fromTo(cards,
        {
          autoAlpha: 0,
          y: 30,
          willChange: "transform,opacity"
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          clearProps: "willChange,transform",
          scrollTrigger: {
            trigger: container.querySelector(".stat-card"),
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="resultados" className="bg-white">
      <div className="max-w-7xl mx-auto border-x border-t border-gray-200">
        
        {/* Section Header */}
        <div className="p-8 md:p-16 border-b border-gray-200 section-header-group">
          <span className="text-xs font-bold tracking-[0.3em] text-[#00319A] uppercase block mb-3 font-jakarta">
            04 / RESULTADOS Y CONFIANZA
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-jakarta tracking-tighter leading-none text-gray-dark uppercase">
            Métricas que respaldan la estética.
          </h2>
          <div className="h-[1px] bg-[#00319A] w-full mt-6 section-divider origin-left" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-gray-200 gap-px border-b border-gray-200">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card bg-white p-8 md:p-10 flex flex-col justify-between group transition-all duration-300 rounded-none relative overflow-hidden">
              <div>
                <span className="text-xs font-bold tracking-widest text-gray-muted uppercase block mb-6">
                  {stat.label}
                </span>
                <div className="text-4xl md:text-5xl lg:text-6xl font-black font-jakarta text-gray-dark tracking-tighter mb-4 flex items-baseline select-none">
                  {stat.prefix && <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00319A] mr-1">{stat.prefix}</span>}
                  <span className="stat-number" data-target={stat.value}>0</span>
                  {stat.suffix && <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00319A] ml-1">{stat.suffix}</span>}
                </div>
              </div>
              <p className="text-xs font-light text-gray-muted leading-relaxed mt-4">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Sub-header */}
        <div className="p-8 md:p-16 border-b border-gray-200 bg-gray-50/50">
          <span className="text-[10px] font-bold tracking-widest text-[#00319A] uppercase">
            Recomendaciones Directas
          </span>
          <h3 className="text-xl md:text-2xl font-black font-jakarta text-gray-dark uppercase mt-2">
            La perspectiva de nuestros partners.
          </h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-200 gap-px border-b border-gray-200">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card bg-white p-8 md:p-10 flex flex-col justify-between group transition-all duration-300 rounded-none relative overflow-hidden">
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <span className="text-4xl font-serif text-[#00319A]/20 block mb-6 leading-none select-none">“</span>
                  <p className="text-sm font-light text-gray-dark leading-relaxed italic mb-8">
                    {t.quote}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-dark uppercase tracking-wider">
                    {t.author}
                  </span>
                  <span className="text-[10px] text-gray-muted uppercase tracking-widest">
                    {t.role} — <span className="text-[#00319A] font-medium">{t.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
