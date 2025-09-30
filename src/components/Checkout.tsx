import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Order } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, onOrderComplete }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [orders, setOrders] = useLocalStorage<Order[]>('ge-bolos-orders', []);
  
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      items: cartItems,
      total: getTotalPrice(),
      status: 'pending',
      createdAt: new Date(),
      paymentMethod: 'pix',
    };

    setOrders(prev => [...prev, newOrder]);
    clearCart();
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      onOrderComplete();
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pedido Confirmado!</h2>
          <p className="text-gray-600 mb-4">
            Seu pedido foi realizado com sucesso. Entraremos em contato em breve para confirmar os detalhes.
          </p>
          <p className="text-sm text-gray-500">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Finalizar Pedido</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Seus Dados</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-2 text-gray-700 mb-2">
                      <User className="h-4 w-4" />
                      <span>Nome Completo *</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-gray-700 mb-2">
                      <Mail className="h-4 w-4" />
                      <span>Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-gray-700 mb-2">
                      <Phone className="h-4 w-4" />
                      <span>Telefone *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="(85) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-gray-700 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>Endereço Completo *</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Rua, número, bairro, cidade, CEP"
                    ></textarea>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <span className="font-semibold text-gray-700">Pagamento via PIX</span>
                    </div>
                    <div className="text-center">
                      <img
                        src="https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=300&h=300"
                        alt="QR Code PIX"
                        className="w-48 h-48 mx-auto mb-2"
                      />
                      <p className="text-sm text-gray-600 mb-1">Chave PIX:</p>
                      <p className="font-mono text-sm bg-white p-2 rounded border">
                        gvrocha1977@gmail.com
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Confirmar Pedido
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.quantity}x R$ {item.price.toFixed(2)}</p>
                      </div>
                      <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <hr className="my-3" />
                  
                  <div className="flex justify-between items-center text-xl font-bold text-pink-500">
                    <span>Total:</span>
                    <span>R$ {getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;