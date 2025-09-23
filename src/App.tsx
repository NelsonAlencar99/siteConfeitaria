import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const handleAdminLogin = (email: string, password: string) => {
    if (email === 'grvidal03@gmail.com' && password === '08052003') {
      setShowAdminLogin(false);
      setShowAdminDashboard(true);
    } else {
      alert('Credenciais inválidas');
    }
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = () => {
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onCartClick={() => setShowCart(true)}
        onAdminClick={() => setShowAdminLogin(true)}
      />
      
      <Hero />
      <Categories />
      <Products />
      <Footer />

      <Cart 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={handleCheckout}
      />

      <Checkout 
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onOrderComplete={handleOrderComplete}
      />

      <AdminLogin 
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleAdminLogin}
      />

      <AdminDashboard 
        isOpen={showAdminDashboard}
        onClose={() => setShowAdminDashboard(false)}
      />
    </div>
  );
}

export default App;