import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          setIsScrolled(self.direction === 1 || self.scroll() > 50);
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const bgClasses = isScrolled || isMobileMenuOpen
    ? 'bg-background/95 backdrop-blur-xl border border-primary/10 shadow-lg text-primary translate-y-0'
    : 'bg-transparent border-transparent text-background -translate-y-2';

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-0 pointer-events-none">
      <nav 
        ref={navRef}
        className={`pointer-events-auto flex flex-col px-6 py-3 rounded-[2.5rem] transition-all duration-500 w-full max-w-4xl overflow-hidden ${bgClasses}`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <img src="/Logomarca.png" alt="Villa das Flores" className="h-14 md:h-16 w-auto object-contain py-1" />
          </div>
          
          <div className="hidden md:flex items-center gap-4 lg:gap-6 font-mono text-[10px] lg:text-xs xl:text-sm uppercase tracking-widest">
            <a href="#buquê-de-rosas" className="hover:opacity-60 transition-opacity">Rosas</a>
            <a href="#buquê-mix-de-flores" className="hover:opacity-60 transition-opacity">Mix</a>
            <a href="#buquê-de-girassol" className="hover:opacity-60 transition-opacity">Girassol</a>
            <a href="#cestas-para-presente" className="hover:opacity-60 transition-opacity">Cestas</a>
            <a href="#orquídeas-e-vasos" className="hover:opacity-60 transition-opacity">Plantas</a>
          </div>

          <div className="hidden md:block">
            <Button variant={isScrolled ? 'primary' : 'outline-light'} href="https://wa.me/556233002097" target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </Button>
          </div>

          <button 
            className="md:hidden p-2 -mr-2 flex items-center justify-center transition-opacity hover:opacity-70"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 pt-6 pb-4 px-2 w-full border-t border-primary/10 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <a href="#buquê-de-rosas" onClick={() => setIsMobileMenuOpen(false)} className="font-mono text-sm uppercase tracking-widest py-3 border-b border-primary/5 hover:bg-primary/5 px-4 rounded-lg transition-colors">Rosas</a>
            <a href="#buquê-mix-de-flores" onClick={() => setIsMobileMenuOpen(false)} className="font-mono text-sm uppercase tracking-widest py-3 border-b border-primary/5 hover:bg-primary/5 px-4 rounded-lg transition-colors">Mix</a>
            <a href="#buquê-de-girassol" onClick={() => setIsMobileMenuOpen(false)} className="font-mono text-sm uppercase tracking-widest py-3 border-b border-primary/5 hover:bg-primary/5 px-4 rounded-lg transition-colors">Girassol</a>
            <a href="#cestas-para-presente" onClick={() => setIsMobileMenuOpen(false)} className="font-mono text-sm uppercase tracking-widest py-3 border-b border-primary/5 hover:bg-primary/5 px-4 rounded-lg transition-colors">Cestas</a>
            <a href="#orquídeas-e-vasos" onClick={() => setIsMobileMenuOpen(false)} className="font-mono text-sm uppercase tracking-widest py-3 border-b border-primary/5 hover:bg-primary/5 px-4 rounded-lg transition-colors">Plantas</a>
            <a href="https://wa.me/556233002097" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="font-mono text-sm uppercase tracking-widest py-3 text-accent font-bold mt-2 hover:bg-accent/10 px-4 rounded-lg transition-colors flex items-center justify-between">
              Falar no WhatsApp
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};
