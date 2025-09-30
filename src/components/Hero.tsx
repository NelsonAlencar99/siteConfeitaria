import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg',
      title: 'Seus sonhos mais doces viram realidade',
      subtitle: 'Bolos únicos e irresistíveis feitos com muito amor'
    },
    {
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg',
      title: 'Sabores que encantam',
      subtitle: 'Cada doce é uma obra de arte especial para você'
    },
    {
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
      title: 'Momentos especiais merecem sabores únicos',
      subtitle: 'Criamos memórias deliciosas para sua família'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="inicio" className="relative bg-gradient-to-br from-pink-50 to-orange-50 py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0 z-10">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'cursive' }}>
              {slides[currentSlide].title.split(' ').slice(0, 3).join(' ')}<br />
              <span className="text-pink-500">{slides[currentSlide].title.split(' ').slice(3).join(' ')}</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {slides[currentSlide].subtitle}
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

          <div className="lg:w-1/2 flex justify-center relative">
            <div className="relative w-80 h-80">
              <div className="w-80 h-80 bg-pink-200 rounded-full absolute top-4 left-4 -z-10"></div>
              
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className={`w-80 h-80 rounded-full object-cover shadow-2xl border-8 border-white absolute top-0 left-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>

              <div className="absolute -bottom-4 -right-4 bg-orange-400 text-white p-4 rounded-2xl shadow-lg z-10">
                <p className="font-bold text-sm">100% Artesanal</p>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-pink-500' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;