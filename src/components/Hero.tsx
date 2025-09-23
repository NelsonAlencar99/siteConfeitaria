import React from 'react';
import { ArrowRight, Phone, Instagram } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-pink-50 to-orange-50 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'cursive' }}>
              Seus sonhos mais<br />
              <span className="text-pink-500">doces</span> viram realidade
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Criamos bolos únicos e irresistíveis com muito amor e dedicação. 
              Cada doce é uma obra de arte feita especialmente para você.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all hover:scale-105"
              >
                <span>Ver Produtos</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <a
                href="https://wa.me/5585841281952"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all"
              >
                <Phone className="h-5 w-5" />
                <span>Fazer Pedido</span>
              </a>
            </div>

            <div className="flex items-center space-x-6 text-gray-600">
              <a
                href="https://wa.me/5585841281952"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-pink-500 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+55 85 8412-8195</span>
              </a>
              <a
                href="https://www.instagram.com/gebolosgoumet?igsh=ejBwNnp4ejhpMnd5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-pink-500 transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>@gebolosgoumet</span>
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-pink-200 rounded-full absolute top-4 left-4 -z-10"></div>
              <img
                src="/public/WhatsApp Image 2025-09-23 at 19.50.39 (2).jpeg"
                alt="Ge Bolos Gourmet"
                className="w-80 h-80 rounded-full object-cover shadow-2xl border-8 border-white"
              />
              <div className="absolute -bottom-4 -right-4 bg-orange-400 text-white p-4 rounded-2xl shadow-lg">
                <p className="font-bold text-sm">100% Artesanal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;