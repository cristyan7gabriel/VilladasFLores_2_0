import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag } from 'lucide-react';
import { productsData } from '../../data/productsData';

gsap.registerPlugin(ScrollTrigger);

export const ProductCatalog = () => {
  const catalogRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate category titles
      gsap.utils.toArray('.category-title').forEach(title => {
        gsap.fromTo(title,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
            }
          }
        );
      });

      // Animate product cards
      gsap.utils.toArray('.product-grid').forEach(grid => {
        const cards = grid.querySelectorAll('.product-card');
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
            }
          }
        );
      });
    }, catalogRef);

    return () => ctx.revert();
  }, []);

  const handleBuyClick = (productName) => {
    const phoneNumber = "556233002097";
    const text = `Olá, gostaria de comprar o produto: ${productName}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <section id="catalogo" ref={catalogRef} className="py-24 px-3 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="font-sans text-xl md:text-2xl tracking-widest uppercase mb-4 opacity-80">Nossa Vitrine</h2>
        <p className="font-serif text-4xl md:text-6xl italic text-primary">Beleza em cada detalhe.</p>
      </div>

      <div className="space-y-24">
        {productsData.map((category, index) => (
          <div key={index} id={category.category.replace(/\s+/g, '-').toLowerCase()} className="category-section">
            <h3 className="category-title font-sans font-semibold text-2xl md:text-3xl text-dark mb-8 border-b border-primary/20 pb-4">
              {category.category}
            </h3>
            
            <div className="product-grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {category.items.map((product) => (
                <div key={product.id} className="product-card group bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-lg border border-primary/5 hover:shadow-xl transition-all duration-500 flex flex-col">
                  <div className="relative h-36 md:h-80 overflow-hidden bg-background/50">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  <div className="p-3 md:p-8 flex flex-col flex-grow text-center items-center">
                    <h4 className="font-sans font-bold text-[13px] md:text-lg text-dark mb-1 md:mb-2 line-clamp-2 leading-tight">{product.title}</h4>
                    
                    {product.observation && (
                      <p className="font-sans text-[9px] md:text-xs text-dark/70 leading-[1.1] mb-2 px-1 text-center font-medium italic">
                        {product.observation}
                      </p>
                    )}
                    
                    <div className="mt-auto mb-3 md:mb-6 flex flex-col items-center">
                      <p className="font-mono text-[10px] md:text-sm text-dark/70 mb-0 md:mb-1">{product.installments}</p>
                      <p className="font-serif italic text-xl md:text-4xl text-accent font-semibold leading-none mt-1 md:mt-2">R$ {product.price}</p>
                    </div>

                    <button 
                      onClick={() => handleBuyClick(product.title)}
                      className="group/btn relative w-full overflow-hidden rounded-[1rem] md:rounded-full bg-primary text-background py-2 md:py-4 px-2 md:px-6 flex items-center justify-center gap-1 md:gap-2 hover:scale-[1.02] transition-transform duration-300 ease-out"
                    >
                      <span className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></span>
                      <span className="relative font-sans tracking-wide text-[11px] md:text-sm font-semibold z-10 flex items-center gap-1 md:gap-2">
                        <span className="hidden sm:inline">Comprar agora</span><span className="sm:hidden">Comprar</span> <ShoppingBag size={14} className="md:w-[18px] md:h-[18px]" />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
