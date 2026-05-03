import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_ITEMS } from '../data';

export default function Menu() {
  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-12">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-8 h-[2px] bg-bakery-accent shrink-0"></span>
        <h1 className="text-3xl font-bold font-serif text-bakery-accent-darker">Full Menu</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_ITEMS.map((item) => (
          <div key={item.id} className="bg-bakery-bg border border-bakery-border rounded-xl p-4 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
            <Link to={`/product/${item.slug}`} className="relative h-48 overflow-hidden rounded-lg mb-4 bg-[#EEDCB3] flex items-center justify-center block">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="flex flex-col flex-grow">
              <Link to={`/product/${item.slug}`} className="font-bold text-lg text-bakery-ink mb-2 hover:text-bakery-accent transition-colors block">
                {item.name}
              </Link>
              <p className="text-sm text-bakery-ink-medium mb-6 flex-grow">{item.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-bakery-accent">{item.price.split(' ')[0]}</span>
                <Link 
                  to={`/product/${item.slug}`}
                  className="text-sm bg-bakery-accent hover:bg-bakery-accent-hover text-white px-5 py-2 rounded-full font-bold shadow-sm transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Placeholder for more items to make it look like a full menu */}
        <div className="bg-bakery-bg border border-bakery-border rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center opacity-70">
           <h3 className="font-bold text-lg text-bakery-ink mb-2">More Items Coming Soon</h3>
           <p className="text-sm text-bakery-ink-medium">We're always baking something new!</p>
        </div>
      </div>
    </main>
  );
}
