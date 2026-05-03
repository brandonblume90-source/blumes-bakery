import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = 0; // Keeping this static for the scope, or use a context later

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-bakery-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Blume's Bakery Logo" className="h-12 w-auto object-contain rounded-full shadow-sm" onError={(e) => {
                e.currentTarget.style.display = 'none';
              }} />
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-bakery-accent-dark hidden sm:block">
                Blume's Bakery
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-bakery-ink-light hover:text-bakery-accent font-medium text-sm transition-colors">Home</Link>
            <Link to="/menu" className="text-bakery-ink-light hover:text-bakery-accent font-medium text-sm transition-colors">Menu</Link>
            <Link to="/story" className="text-bakery-ink-light hover:text-bakery-accent font-medium text-sm transition-colors">Our Story</Link>
            <Link to="/location" className="text-bakery-ink-light hover:text-bakery-accent font-medium text-sm transition-colors">Contact Us</Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/order" className="flex items-center text-bakery-ink hover:text-bakery-accent transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-bakery-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shrink-0 leading-none pb-[1px]">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/order" className="bg-bakery-accent hover:bg-bakery-accent-hover text-white px-6 py-2 rounded-full font-bold text-sm shadow-md transition-colors inline-block text-center">
              Order Online
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/order" className="flex items-center text-bakery-ink relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-bakery-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-bakery-ink p-2"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-bakery-border">
          <div className="px-4 pt-2 pb-6 space-y-4 shadow-inner">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-bakery-ink-light hover:text-bakery-accent" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/menu" className="block px-3 py-2 text-base font-medium text-bakery-ink-light hover:text-bakery-accent" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
            <Link to="/story" className="block px-3 py-2 text-base font-medium text-bakery-ink-light hover:text-bakery-accent" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
            <Link to="/location" className="block px-3 py-2 text-base font-medium text-bakery-ink-light hover:text-bakery-accent" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
            <Link to="/order" onClick={() => setIsMobileMenuOpen(false)} className="block w-full mt-4 bg-bakery-accent hover:bg-bakery-accent-hover text-white px-4 py-3 rounded-full font-bold shadow-md text-center">
              Order Online
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
