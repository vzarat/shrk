"use client";

import { useState } from "react";
import { AnimatePresence, motion as motionClient } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Smartphone, Mail } from "lucide-react";

type ProjectType = "marca" | "inmobiliario" | "web_dev" | "marketing";

export default function FormularioPasos() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleProjectTypeSelect = (type: ProjectType) => {
    setProjectType(type);
    setTimeout(() => {
      setStep(2);
    }, 300);
  };

  const handleNextStep = () => {
    if (step === 2 && !businessName.trim()) return;
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPhone.trim() || !contactEmail.trim()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectType,
          businessName,
          contactPhone,
          contactEmail,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        alert(data.error || "Ocurrió un error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error de conexión. Por favor, intenta de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden bg-white border-t border-gray-200">
      
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Title */}
        <div className="mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#00319A] uppercase block mb-3 font-jakarta">
            04 / HAGAMOS HISTORIA
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-jakarta tracking-tighter text-gray-dark uppercase mb-4">
            Comienza tu proyecto
          </h2>
          <p className="text-sm font-light text-gray-muted max-w-lg">
            Cada gran proyecto comienza con una visión clara. Comparte la tuya y transformémosla en realidad comercial.
          </p>
        </div>

        {/* Wizard Card Container - Square, Minimal */}
        <div className="border border-gray-200 bg-white p-8 md:p-12 relative rounded-none">
          
          {/* Progress Indicator */}
          {!isSubmitted && (
            <div className="mb-10">
              <div className="flex items-center justify-between text-xs text-gray-muted uppercase tracking-widest mb-3 font-bold">
                <span>Paso {step} de 3</span>
                <span className="text-[#00319A] font-black">
                  {step === 1 && "Tipo de Proyecto"}
                  {step === 2 && "Tu Negocio"}
                  {step === 3 && "Contacto"}
                </span>
              </div>
              <div className="w-full h-1 bg-gray-100 rounded-none overflow-hidden">
                <motionClient.div
                  className="h-full bg-[#00319A]"
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait" custom={step}>
            {isSubmitted ? (
              <motionClient.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-10 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-none bg-gray-50 border border-[#00319A] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#00319A]" />
                </div>
                <h3 className="text-2xl font-bold font-jakarta text-gray-dark tracking-tighter mb-3 uppercase">
                  ¡Visión Recibida!
                </h3>
                <p className="text-sm font-light text-gray-muted max-w-md mb-8 leading-relaxed">
                  Gracias por dar el primer paso. Nuestro equipo en Reynosa y McAllen analizará tu propuesta y nos pondremos en contacto contigo en menos de 24 horas hábiles.
                </p>
                <button
                  onClick={() => {
                    setStep(1);
                    setProjectType(null);
                    setBusinessName("");
                    setContactPhone("");
                    setContactEmail("");
                    setIsSubmitted(false);
                  }}
                  className="px-6 py-3 text-xs font-bold tracking-widest uppercase bg-transparent border border-gray-900 text-gray-dark hover:bg-gray-900 hover:text-white transition-all duration-200 rounded-none cursor-pointer"
                >
                  Enviar otra propuesta
                </button>
              </motionClient.div>
            ) : (
              <form onSubmit={handleSubmit} className="min-h-[250px] flex flex-col justify-between">
                
                {/* STEP 1: PROJECT TYPE */}
                {step === 1 && (
                  <motionClient.div
                    key="step1"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={1}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-6"
                  >
                    <h3 className="text-lg font-bold font-jakarta text-gray-dark tracking-tight mb-2">
                      ¿Qué tipo de proyecto deseas realizar?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "marca", label: "Identidad de Marca", desc: "Marcas culinarias, menús y empaque estético." },
                        { id: "inmobiliario", label: "Real Estate / Inmobiliario", desc: "Desarrollos, señalética y branding espacial." },
                        { id: "web_dev", label: "Web & Programación Dev", desc: "Plataformas, portafolios, CRMs y desarrollo interactivo." },
                        { id: "marketing", label: "Soluciones de Marketing", desc: "Segmentación, SEO, pauta digital y presentaciones corporativas." },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleProjectTypeSelect(item.id as ProjectType)}
                          className={`text-left p-5 border transition-all duration-200 rounded-none cursor-pointer ${
                            projectType === item.id
                              ? "bg-[#00319A]/5 border-[#00319A] text-[#00319A]"
                              : "bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                          }`}
                        >
                          <span className="block text-sm font-bold tracking-wide mb-1 text-gray-dark">
                            {item.label}
                          </span>
                          <span className="block text-xs text-gray-muted leading-relaxed">
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motionClient.div>
                )}

                {/* STEP 2: BUSINESS NAME */}
                {step === 2 && (
                  <motionClient.div
                    key="step2"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={step}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold font-jakarta text-gray-dark tracking-tight mb-2">
                        ¿Cómo se llama tu negocio o proyecto?
                      </h3>
                      <p className="text-xs text-gray-muted">
                        Si es una idea nueva, puedes compartir un nombre tentativo o de referencia.
                      </p>
                    </div>
                    <div className="relative mt-4">
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Ej. Tinto Bodegas, Raíces Soluciones"
                        required
                        className="w-full bg-transparent text-xl md:text-2xl font-bold border-b border-gray-200 py-3 text-gray-dark focus:outline-none focus:border-[#00319A] transition-colors placeholder:text-gray-300 rounded-none"
                        autoFocus
                      />
                    </div>
                  </motionClient.div>
                )}

                {/* STEP 3: CONTACT INFORMATION */}
                {step === 3 && (
                  <motionClient.div
                    key="step3"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={step}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold font-jakarta text-gray-dark tracking-tight mb-2">
                        ¿Dónde podemos coordinar tu proyecto?
                      </h3>
                      <p className="text-xs text-gray-muted">
                        Ingresa tus canales de comunicación para agendar una llamada exploratoria.
                      </p>
                    </div>
                    <div className="flex flex-col gap-6 mt-4">
                      <div className="relative flex items-center">
                        <Smartphone className="absolute left-4 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="WhatsApp (ej. +52 o +1)"
                          required
                          className="w-full bg-white border border-gray-200 py-4 pl-12 pr-4 text-sm text-gray-dark focus:outline-none focus:border-[#00319A] transition-all placeholder:text-gray-300 rounded-none"
                        />
                      </div>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Correo Electrónico Corporativo"
                          required
                          className="w-full bg-white border border-gray-200 py-4 pl-12 pr-4 text-sm text-gray-dark focus:outline-none focus:border-[#00319A] transition-all placeholder:text-gray-300 rounded-none"
                        />
                      </div>
                    </div>
                  </motionClient.div>
                )}

                {/* NAVIGATION BUTTONS */}
                {step > 1 && (
                  <div className="flex items-center justify-between mt-12 border-t border-gray-100 pt-6">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-muted hover:text-gray-dark transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Atrás
                    </button>

                    {step === 2 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!businessName.trim()}
                        className={`flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                          businessName.trim()
                            ? "bg-[#00319A] text-white hover:bg-brand-blue-hover cursor-pointer"
                            : "bg-gray-100 text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        Continuar
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting || !contactPhone.trim() || !contactEmail.trim()}
                        className={`flex items-center gap-2 px-8 py-3.5 rounded-none text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                          contactPhone.trim() && contactEmail.trim() && !isSubmitting
                            ? "bg-[#00319A] text-white hover:bg-brand-blue-hover cursor-pointer"
                            : "bg-gray-100 text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Procesando
                          </div>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4" />
                            Enviar Visión
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
