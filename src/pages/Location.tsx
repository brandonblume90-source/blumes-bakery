import React from 'react';
import { MapPin, Phone, Mail, Facebook } from 'lucide-react';

export default function Location() {
  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-12 lg:py-20">
      <div className="flex items-center gap-3 mb-10">
        <span className="w-8 h-[2px] bg-bakery-accent shrink-0"></span>
        <h1 className="text-3xl lg:text-4xl font-bold font-serif text-bakery-accent-darker">Contact Us</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-8">
          
          <div className="bg-white p-8 rounded-3xl border border-bakery-border shadow-sm">
            <p className="text-xl font-medium text-bakery-ink mb-8 text-center text-bakery-accent-darker">
              Call or message us to place an order!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-4 text-bakery-accent shrink-0 mt-1" />
                <p className="text-lg text-bakery-ink-medium leading-relaxed">
                  358 N Bur Oak Dr.<br />
                  Mooresville, Indiana
                </p>
              </div>

              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-4 text-bakery-accent shrink-0" />
                <p className="text-lg text-bakery-ink-medium">
                  317-646-8024
                </p>
              </div>

              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4 text-bakery-accent shrink-0" />
                <p className="text-lg text-bakery-ink-medium">
                  blumesbakery@gmail.com
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-bakery-border">
              <a 
                href="https://www.facebook.com/profile.php?id=61584259015051" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-[#1877F2] hover:bg-[#166fe5] text-white px-6 py-4 rounded-xl font-bold transition-colors shadow-sm"
              >
                 <Facebook className="w-6 h-6 mr-3 shrink-0 fill-current" />
                 Visit our Facebook Page
              </a>
            </div>
          </div>

        </div>

        <div className="w-full h-[400px] lg:h-auto min-h-[400px] rounded-3xl overflow-hidden shadow-sm border border-bakery-border bg-bakery-bg flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 bg-[#E6D5B8] opacity-20 hidden lg:block"></div>
          <img 
            src="/Blumes Bakery Flour.jpeg" 
            alt="Flume's Bakery Flour" 
            className="w-full h-full object-cover rounded-2xl relative z-10"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </main>
  );
}
