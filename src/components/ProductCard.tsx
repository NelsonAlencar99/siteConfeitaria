import React from 'react';
import { Plus, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-pink-100 transition-colors">
          <Heart className="h-4 w-4 text-gray-600 hover:text-pink-500" />
        </button>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-pink-500">
              R$ {product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">{product.category}</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition-colors hover:scale-110 transform"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;