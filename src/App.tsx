/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CartProvider } from './lib/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Services from './pages/Services';
import Showcase from './pages/Showcase';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Info from './pages/Info';

function ScrollToTop() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [pathname, i18n.language]);
  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <div className={isAdmin ? '' : 'min-h-screen flex flex-col'}>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? '' : 'flex-grow'}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/info" element={<Info />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatBot />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}