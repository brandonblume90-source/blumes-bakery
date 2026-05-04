import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-bakery-ink text-bakery-border pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 text-xs text-center sm:text-left">
          
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-widest text-white">Blume's Bakery</h4>
            <p className="text-bakery-border/90">
              Homemade goodness baked fresh daily. Experience the warmth of a true neighborhood bakery.
            </p>
          </div>

          <div className="space-y-2 lg:text-right">
            <h4 className="font-bold uppercase tracking-widest text-white">Contact Us</h4>
            <p>317-646-8024</p>
            <p>order@blumesbakery.com</p>
          </div>
        </div>
        
        <div className="border-t border-bakery-border/20 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-bakery-border/50 text-center md:text-left gap-4">
          <p>&copy; {new Date().getFullYear()} Blume's Bakery. Handmade with love.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
