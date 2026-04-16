import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, CreditCard, Shield } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { usePageSEO } from '../hooks/usePageSEO';

export default function Cart() {
  usePageSEO({
    title: 'Shopping Cart — VAG Leicester Shop',
    description: 'Review your selected VAG parts and accessories before checkout.',
  });

  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => `£${price.toFixed(2)}`;

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-brand" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-[var(--text)]/50 mb-8">Browse our shop to find OEM VAG parts and accessories.</p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse Shop
            </Link>
          </motion.div>
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
          <h1 className="text-4xl font-bold mb-2">Shopping <span className="text-brand">Cart</span></h1>
          <p className="text-[var(--text)]/50">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-vw p-6 flex gap-6"
              >
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-[var(--bg)] shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4 mb-2">
                    <h3 className="font-bold text-lg truncate">{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-[var(--text)]/50 mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center hover:border-brand transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center hover:border-brand transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[var(--text)]/40 uppercase tracking-widest">Subtotal</span>
                      <p className="text-xl font-bold text-brand">{formatPrice(parseFloat(item.price.replace(/[£,]/g, '')) * item.quantity)}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`text-[10px] uppercase tracking-widest ${item.condition === 'new' ? 'text-green-600' : 'text-amber-600'}`}>
                      {item.condition === 'new' ? '12 months warranty' : '28 days warranty'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-vw p-6 sticky top-32">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text)]/60">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text)]/60">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t border-[var(--border)] pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold text-brand">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-primary w-full flex items-center justify-center gap-2 mb-4"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="w-full flex items-center justify-center gap-2 text-sm text-[var(--text)]/50 hover:text-brand transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>

              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text)]/40 mb-2">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-lg">💳</span>
                  <span className="text-lg">🍎</span>
                  <span className="text-lg">🅿️</span>
                  <span className="text-lg">💳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}