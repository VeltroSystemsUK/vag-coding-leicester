import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Shield, CheckCircle2, Mail, User, MapPin, Phone } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { usePageSEO } from '../hooks/usePageSEO';

export default function Checkout() {
  usePageSEO({
    title: 'Checkout — VAG Leicester Shop',
    description: 'Complete your purchase of VAG parts and accessories.',
  });

  const { items, totalPrice, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    notes: '',
  });

  const formatPrice = (price: number) => `£${price.toFixed(2)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    clearCart();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-[var(--text)]/50 mb-8">Add some items to your cart first.</p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Browse Shop
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Received!</h1>
            <p className="text-[var(--text)]/50 mb-2">Thank you for your order.</p>
            <p className="text-sm text-[var(--text)]/40">We'll contact you shortly with payment details and delivery options.</p>
          </motion.div>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-[var(--text)]/50 hover:text-brand mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold">Checkout</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div className="card-vw p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">First Name</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">Last Name</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card-vw p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand" />
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">City</label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand"
                        placeholder="Leicester"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">Postcode</label>
                      <input
                        required
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand"
                        placeholder="LE1 1AB"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[var(--text)]/40 font-bold">Order Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:border-brand resize-none"
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-vw p-6 sticky top-32">
                <h2 className="text-xl font-bold mb-6">Your Order</h2>
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-[var(--text)]/60">{item.name} x{item.quantity}</span>
                      <span className="font-medium">{formatPrice(parseFloat(item.price.replace(/[£,]/g, '')) * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--border)] pt-3 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text)]/60">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text)]/60">Shipping</span>
                    <span>Calculated after order</span>
                  </div>
                  <div className="border-t border-[var(--border)] pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-xl text-brand">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Place Order
                </button>

                <div className="mt-4 pt-4 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2 text-xs text-[var(--text)]/40 mb-3">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout — SSL encrypted</span>
                  </div>
                  <div className="flex justify-center gap-3 text-lg">
                    <span>💳</span>
                    <span>🍎</span>
                    <span>🅿️</span>
                    <span>💳</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}