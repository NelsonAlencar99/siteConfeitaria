import React from 'react';
import { categories } from '../data/products';

const Categories: React.FC = () => {
  return (
    <section id="categorias" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'cursive' }}>
            Nossas Especialidades
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra nossa variedade de doces únicos, cada um feito com ingredientes selecionados e muito carinho
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-pink-200">Ver produtos →</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;