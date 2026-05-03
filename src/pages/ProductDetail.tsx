import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FEATURED_ITEMS, REVIEWS } from '../data';
import { Heart, ChevronLeft } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = FEATURED_ITEMS.find(item => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-bakery-accent-darker mb-4">Product Not Found</h2>
          <Link to="/menu" className="text-bakery-accent underline hover:text-bakery-accent-hover font-bold">Back to Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow flex flex-col bg-bakery-bg">
      <div className="flex-grow flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        {/* Left Side: Large Image Area */}
        <div className="w-full md:w-1/2 bg-[#B58561] flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <Link to="/menu" className="absolute top-6 left-6 text-white hover:text-white/80 flex items-center gap-2 font-medium z-10 transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <ChevronLeft size={20} />
            Back to Menu
          </Link>
          <div className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] xl:w-[560px] xl:h-[560px] relative z-10 rounded-full border-[8px] border-white/10 shadow-2xl overflow-hidden mt-16 md:mt-0 transition-transform duration-700 hover:scale-[1.02]">
             <img 
               src={product.image} 
               alt={product.name} 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
          </div>
          {/* Decorative wave at bottom for mobile */}
          <div className="absolute bottom-[-5%] left-0 right-0 h-16 bg-bakery-bg rounded-t-[100%] scale-150 md:hidden z-0"></div>
          {/* Decorative wave at right for desktop */}
          <div className="hidden md:block absolute right-[-10%] top-[-10%] bottom-[-10%] w-[20%] bg-bakery-bg rounded-l-[100%] scale-y-150 z-0"></div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-bakery-bg relative z-10">
          <div className="max-w-xl">
            <span className="text-bakery-accent font-bold tracking-widest uppercase text-sm mb-3 block drop-shadow-sm">Served Warm</span>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-serif font-extrabold text-bakery-accent-darker mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="text-lg text-bakery-ink-medium mb-10 leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/order" className="flex-1 bg-bakery-accent hover:bg-bakery-accent-hover text-white text-center text-lg px-8 py-4 rounded-full font-bold transition-all shadow-md">
                Order Now
              </Link>
              <button className="flex-1 flex items-center justify-center gap-2 border-2 border-[#D8C3A5] text-bakery-ink hover:border-bakery-accent hover:text-bakery-accent bg-transparent text-lg px-8 py-4 rounded-full font-bold transition-all shadow-sm">
                <Heart size={20} />
                Add to Favorites
              </button>
            </div>



            {/* Customer Love for this product */}
            <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-bakery-accent-dark mb-4 drop-shadow-sm border-b border-bakery-border pb-2">Customer Love</h3>
               <div className="space-y-4">
                 {REVIEWS.slice(0, 2).map((review) => (
                   <div key={review.id} className="p-5 bg-white rounded-2xl border border-bakery-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                     <p className="text-sm text-bakery-ink-medium italic mb-3 leading-relaxed">"{review.text}"</p>
                     <p className="text-xs font-bold text-bakery-accent tracking-wider uppercase">— {review.author}</p>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
