"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Control background style
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Shark scroll behavior: hide quickly scrolling down, show smoothly scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Mercado", href: "#mercado" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "py-3 border-b border-gray-200"
          : "py-5 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleScrollTo(e, "")}
          className="flex items-center"
        >
          <svg viewBox="0 0 916 166" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
            <path d="M684.406 96.18C689.902 102.134 692.65 109.92 692.65 119.538V162.819H642.957V134.652C642.957 125.034 640.438 117.935 635.4 113.584C630.362 109.233 621.889 106.943 609.752 106.943H545.174V162.819H495.71V5.26703H623.263C669.063 5.26703 691.963 19.007 691.963 46.258V48.777C691.963 65.494 682.116 76.944 662.651 83.356C671.582 85.875 678.91 89.997 684.406 96.18ZM640.209 56.563V56.334C640.209 51.754 638.606 48.09 635.4 45.342C632.194 42.594 627.156 40.991 620.286 40.991H545.174V72.135H620.286C627.156 72.135 632.194 70.532 635.4 67.784C638.606 65.036 640.209 61.143 640.209 56.563Z" fill="#00319A"/>
            <path d="M241.881 162.819V2.97705H296.383V61.143H413.402V2.97705H468.133V162.819H413.402V99.8441H296.383V162.819H241.881Z" fill="#00319A"/>
            <path d="M102.134 165.796C84.73 165.796 69.387 164.422 56.563 161.674C43.51 158.926 33.434 155.72 26.335 151.827C19.465 147.934 13.74 143.125 9.618 137.629C5.496 132.133 2.748 127.095 1.603 122.744C0.458 118.393 0 113.584 0 108.546V106.256H57.021C58.166 123.202 70.532 131.675 103.966 131.675H116.561C127.553 131.675 132.133 130.988 139.461 130.072C146.56 129.156 151.827 128.011 155.033 126.179C158.468 124.347 160.529 122.744 161.674 120.912C162.819 119.08 163.277 117.019 163.277 114.5C163.277 111.065 162.361 108.317 160.529 106.256C158.697 104.424 154.117 102.592 147.247 100.989C140.377 99.615 130.53 98.699 117.477 98.47L100.302 98.012L87.478 97.783C30.686 96.409 2.29 80.608 2.29 50.838V48.777C2.29 43.739 2.977 38.93 4.351 34.579C5.725 30.228 8.473 25.877 12.824 21.297C16.946 16.946 22.442 13.282 29.312 10.305C36.182 7.328 45.342 4.80899 57.021 2.977C68.471 0.916002 81.982 0 97.325 0H113.584C129.385 0 143.583 0.916002 155.72 2.977C168.086 5.038 177.704 7.557 185.032 10.763C192.36 13.969 198.314 17.862 202.894 22.442C207.474 27.022 210.68 31.602 212.283 35.953C214.115 40.533 215.031 45.342 215.031 50.609V52.67H158.239C157.781 51.067 157.323 49.464 156.865 48.319C156.407 47.174 155.033 45.571 152.972 43.51C150.911 41.449 148.392 39.846 144.957 38.472C141.751 37.327 136.713 36.182 130.301 35.037C123.889 34.121 118.851 33.663 110.149 33.663H102.134C88.852 33.663 80.608 34.35 73.509 35.724C66.639 37.327 62.288 38.93 60.914 40.533C59.311 42.136 58.624 44.426 58.624 47.403C58.624 50.151 59.311 52.212 61.143 54.044C62.746 55.647 66.639 57.25 72.822 58.853C79.005 60.227 87.707 60.914 98.928 61.143L111.752 61.372L128.24 61.601C160.987 62.059 184.345 66.181 198.772 73.738C213.428 81.295 220.527 92.974 220.527 109.233V112.21C220.527 118.164 219.84 123.431 218.466 128.011C217.092 132.591 214.115 137.4 209.764 142.438C205.413 147.247 199.688 151.369 192.36 154.575C185.032 158.01 175.185 160.529 162.59 162.59C149.995 164.88 135.11 165.796 118.164 165.796H102.134Z" fill="#00319A"/>
            <path d="M766.8 55.1891H785.577L848.323 4.57977H911.527L820.156 76.944L915.879 162.819H821.715C839.336 133.495 784.472 120.239 788.474 120.238H821.715C814.025 90.9935 793.68 73.7734 784.469 68.819C795.362 121.202 758.838 153.312 739.214 162.819H717.106V4.57977H766.8V55.1891Z" fill="#00319A"/>
          </svg>
          <span className="w-3 h-3 bg-[#00319A] mx-4 inline-block rounded-none" />
          <span className="text-gray-600 tracking-widest text-sm uppercase font-light">
            STUDIO
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href.substring(1))}
              className="text-xs font-bold uppercase tracking-widest text-gray-muted hover:text-[#00319A] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button - Square */}
        <div className="hidden md:flex items-center">
          <a
            href="#contacto"
            onClick={(e) => handleScrollTo(e, "contacto")}
            className="group inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold tracking-widest uppercase border border-gray-300 text-gray-dark bg-transparent hover:bg-[#00319A] hover:text-white hover:border-[#00319A] transition-all duration-200 rounded-none"
          >
            <span className="flex items-center gap-1.5">
              Iniciar Proyecto
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-dark hover:text-[#00319A] transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed inset-x-0 top-[65px] bg-white border-b border-gray-200 p-6 md:hidden flex flex-col gap-6 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href.substring(1))}
              className="text-sm font-bold uppercase tracking-wider text-gray-dark hover:text-[#00319A] transition-colors duration-200 py-2 border-b border-gray-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contacto"
          onClick={(e) => handleScrollTo(e, "contacto")}
          className="w-full text-center py-3 text-xs font-bold tracking-widest uppercase bg-[#00319A] text-white hover:bg-brand-blue-hover transition-colors duration-200 rounded-none"
        >
          Iniciar Proyecto
        </a>
      </div>
    </header>
  );
}
