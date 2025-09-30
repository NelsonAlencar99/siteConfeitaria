import React from 'react';
import { Heart, Instagram, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src="/WhatsApp Image 2025-09-23 at 19.50.39 (2) copy.jpeg" 
                alt="Ge Bolos Gourmet Logo" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold text-amber-400" style={{ fontFamily: 'cursive' }}>
                  Ge Bolos Gourmet
                </h3>
                <p className="text-gray-300">Confeitaria Artesanal</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Criamos momentos especiais através dos nossos doces únicos e irresistíveis. 
              Cada produto é feito com muito amor e ingredientes selecionados.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/gebolosgoumet?igsh=ejBwNnp4ejhpMnd5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Contato</h4>
            <div className="space-y-4">
              <a
                href="https://wa.me/5585841281952"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>+55 85 8412-8195</span>
              </a>
              
              <a
                href="https://www.instagram.com/gebolosgoumet?igsh=ejBwNnp4ejhpMnd5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>@gebolosgoumet</span>
              </a>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5" />
                <span>Fortaleza - CE</span>
              </div>
            </div>
          </div>

          <div>
            <div className="p-4 bg-amber-100/20 rounded-lg border border-amber-200/30">
              <h5 className="font-semibold text-amber-400 mb-2">Pagamento via PIX</h5>
              <p className="text-sm text-gray-300">
                Chave PIX: <span className="font-mono">gvrocha1977@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="text-gray-400">
            © 2025 Ge Bolos Gourmet. Todos os direitos reservados.
          </p>
          <p className="flex items-center space-x-2 text-gray-400 mt-4 md:mt-0">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-amber-400" />
            <span>para você</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;