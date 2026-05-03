import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_ITEMS, REVIEWS } from '../data';

export default function Home() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-4 sm:px-6 lg:px-10 py-16 lg:py-24 border-b border-bakery-border max-w-7xl mx-auto w-full overflow-hidden bg-bakery-bg-alt">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/kitchen.png')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-bakery-bg-alt via-bakery-bg-alt/90 to-transparent"></div>
        <div className="relative z-10 w-full lg:w-3/5 text-center lg:text-left space-y-4 lg:space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold leading-tight text-bakery-accent-darker">
            Homemade and <span className="text-bakery-accent">Baked with Love</span>
          </h1>
          <p className="text-lg text-bakery-ink-medium max-w-lg mx-auto lg:mx-0">
            The warm, comforting taste of family recipes delivered straight from our kitchen to yours.
          </p>
          <Link to="/order" className="inline-block text-center bg-bakery-accent-dark hover:bg-bakery-accent-darker text-white text-lg px-8 py-3 rounded-md font-bold transition-transform transform hover:-translate-y-0.5 shadow-lg w-full sm:w-auto mt-4">
            Start Your Order
          </Link>
        </div>
        <div className="relative z-10 w-full lg:w-2/5 h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-sm border-[6px] border-white bg-[#FDFBF7] flex items-center justify-center p-4 bg-opacity-90 backdrop-blur-sm">
          <img 
            src="/logo.jpg" 
            alt="Blume's Bakery Logo" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Main Content Split (Desktop) */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto border-x border-bakery-border bg-white flex-1 overflow-hidden shadow-sm lg:mb-12 border-t mt-0 lg:mt-8">
        
        {/* Featured Favorites Section */}
        <section className="w-full lg:w-2/3 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-bakery-border">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-bakery-accent shrink-0"></span>
              <h2 className="text-2xl font-bold font-serif text-bakery-accent-darker">Fresh from the Oven</h2>
            </div>
            <p className="text-sm text-bakery-ink-medium ml-11 italic">
              Home Based Business Pre-Order Only. We offer 12 packs of cinnamon rolls, Big and mini cookies. Below are the Cookies that are currently available.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURED_ITEMS.map((item) => (
              <div key={item.id} className="bg-bakery-bg border border-bakery-border rounded-xl p-4 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
                <Link to={`/product/${item.slug}`} className="relative h-40 overflow-hidden rounded-lg mb-4 bg-[#EEDCB3] flex items-center justify-center block">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="flex flex-col flex-grow">
                  <Link to={`/product/${item.slug}`} className="font-bold text-base text-bakery-ink mb-1 hover:text-bakery-accent transition-colors block">
                    {item.name}
                  </Link>
                  <p className="text-sm text-bakery-ink-medium mb-4 flex-grow line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-bakery-accent">{item.price.split(' ')[0]}</span>
                    <Link 
                      to={`/product/${item.slug}`}
                      className="text-xs bg-bakery-border text-bakery-ink px-4 py-2 rounded-full font-bold hover:bg-bakery-accent hover:text-white transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/menu" className="text-bakery-accent hover:text-bakery-accent-hover font-bold inline-flex items-center space-x-2 text-sm underline underline-offset-4 decoration-2">
              <span>View Full Menu</span>
            </Link>
          </div>
        </section>

        {/* Story & Reviews Column */}
        <div className="w-full lg:w-1/3 flex flex-col bg-white">
          
          {/* Story Section */}
          <section className="p-6 sm:p-8 lg:p-10 bg-bakery-bg-alt border-b border-bakery-border flex-1">
            <h3 className="text-xl font-bold font-serif mb-4 text-bakery-accent-darker">Our Story</h3>
            <div className="space-y-3 text-sm text-bakery-ink-medium leading-relaxed">
              <p>
                Hi all! My name is Emily Blume and here's some things you should know about me.
              </p>
              <p>
                I have an incredible blended family of four boys and my sweet husband who all have vetted each of my recipes. We moved to the Mooresville area not too long ago from Plainfield/ Avon.
              </p>
              <p>
                I quickly decided we lived entirely too far from any popular gourmet cookie shops, so I took matters into my own hands. My pregnancy cookie cravings turned into a business I want to bless our community with...
              </p>
              <div className="pt-2">
                <p className="font-serif text-lg font-bold text-bakery-accent italic">Emily Blume</p>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/story" className="text-bakery-accent hover:text-bakery-accent-hover font-bold text-sm underline underline-offset-4 decoration-2">
                Read More
              </Link>
            </div>
          </section>

          {/* Social Proof / Reviews */}
          <section className="p-6 sm:p-8 lg:p-10 bg-bakery-bg flex-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-bakery-accent-dark mb-4 drop-shadow-sm">Customer Love</h3>
            <div className="space-y-4">
              {REVIEWS.map((review) => (
                <div key={review.id} className="p-4 bg-white rounded-lg border border-bakery-border shadow-sm flex flex-col justify-between">
                  <p className="text-xs text-bakery-ink-medium italic mb-2">"{review.text}"</p>
                  <p className="text-[11px] font-bold text-bakery-accent">— {review.author}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
