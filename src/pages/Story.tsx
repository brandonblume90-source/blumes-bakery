import React from 'react';

export default function Story() {
  return (
    <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-12 lg:py-20">
      <div className="flex flex-col gap-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-bakery-accent-darker leading-tight">Baking the Way It Should Be.</h1>
          <p className="text-lg text-bakery-ink-medium italic">Our story starts in the kitchen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-md bg-[#FDFBF7]">
            <img 
              src="/Family.jpg" 
              alt="The Blume Family" 
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-md bg-[#FDFBF7]">
            <img 
              src="/Emily.jpg" 
              alt="Emily Blume and baby" 
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        <div className="space-y-6 text-lg text-bakery-ink-medium leading-relaxed bg-white p-8 md:p-12 rounded-3xl border border-bakery-border shadow-sm">
          <p>
            Hi all! My name is Emily Blume and here's some things you should know about me.
          </p>
          <ul className="list-decimal pl-5 space-y-4">
            <li>
              I have an incredible blended family of four boys and my sweet husband who all have vetted each of my recipes ☺️
            </li>
            <li>
              We moved to the Mooresville area not too long ago from Plainfield/ Avon.
            </li>
            <li>
              I quickly decided we lived entirely too far from any popular gourmet cookie shops, so I took matters into my own hands. My pregnancy cookie cravings turned into a business I want to bless our community with.
            </li>
          </ul>
          <p className="font-medium text-bakery-ink italic mt-2">
            So let me feed your cookie cravings and save you a drive in the mean time. 😉🍪
          </p>
          
          <div className="pt-6 mt-6 border-t border-bakery-border">
            <p className="font-serif text-2xl font-bold text-bakery-accent italic">Emily Blume</p>
          </div>
        </div>
      </div>
    </main>
  );
}
