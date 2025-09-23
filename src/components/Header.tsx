import React from 'react';
import { ShoppingCart, User, Heart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface HeaderProps {
  onCartClick: () => void;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onAdminClick }) => {
  const { getTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/public/WhatsApp Image 2025-09-23 at 19.50.39 (2).jpeg" 
              alt="Ge Bolos Gourmet" 
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-pink-600" style={{ fontFamily: 'cursive' }}>
                Ge Bolos Gourmet
              </h1>
              <p className="text-sm text-gray-600">Confeitaria Artesanal</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-pink-600 transition-colors">
              Início
            </a>
            <a href="#produtos" className="text-gray-700 hover:text-pink-600 transition-colors">
              Produtos
            </a>
            <a href="#categorias" className="text-gray-700 hover:text-pink-600 transition-colors">
              Categorias
            </a>
            <a href="#contato" className="text-gray-700 hover:text-pink-600 transition-colors">
              Contato
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            
            <Heart className="h-6 w-6 text-gray-700 hover:text-pink-600 transition-colors cursor-pointer" />
            
            <button
              onClick={onAdminClick}
              className="w-3 h-3 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors"
              title="Admin"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;