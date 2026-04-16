import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../lib/CartContext';

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      to="/cart"
      className="relative p-2 hover:bg-brand/10 rounded-lg transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand text-white text-xs font-bold rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}