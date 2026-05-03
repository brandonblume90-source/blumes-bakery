import React, { useState } from 'react';
import { FEATURED_ITEMS } from '../data';
import { ShoppingCart, Plus, Minus, Trash2, CheckCircle2, X } from 'lucide-react';

export default function Order() {
  const [cart, setCart] = useState<{id: number, optionId: string, quantity: number}[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getProduct = (id: number) => FEATURED_ITEMS.find(p => p.id === id);

  const cartTotal = cart.reduce((total, item) => {
    const product = getProduct(item.id);
    if (!product) return total;
    const option = (product as any).priceOptions.find((o: any) => o.id === item.optionId);
    const price = option ? option.price : 0;
    return total + (price * item.quantity);
  }, 0);

  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append('form-name', 'order');
    
    // Add cart contents to the form data
    const orderDetails = cart.map(item => {
      const product = getProduct(item.id);
      const option = (product as any).priceOptions.find((o: any) => o.id === item.optionId);
      return `${item.quantity}x ${product?.name} (${option?.name})`;
    }).join('\n');
    
    formData.append('cart_items', orderDetails);
    formData.append('total', cartTotal.toFixed(2));
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });
      setOrderComplete(true);
    } catch (error) {
      console.error(error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionChange = (id: number, optionId: string) => {
    setSelectedOptions(prev => ({...prev, [id]: optionId}));
  };

  const updateQuantity = (id: number, optionId: string, delta: number) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === id && item.optionId === optionId);
      if (existingIndex === -1) {
        if (delta > 0) return [...prev, { id, optionId, quantity: 1 }];
        return prev;
      }
      
      const newQuantity = prev[existingIndex].quantity + delta;
      if (newQuantity <= 0) {
        return prev.filter((_, idx) => idx !== existingIndex);
      }
      return prev.map((item, idx) => idx === existingIndex ? { ...item, quantity: newQuantity } : item);
    });
  };

  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-12 flex flex-col lg:flex-row gap-8">
      {/* Menu Area */}
      <div className="w-full lg:w-2/3">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[2px] bg-bakery-accent shrink-0"></span>
          <h1 className="text-3xl font-bold font-serif text-bakery-accent-darker">Order Online</h1>
        </div>

        <div className="space-y-6">
          {FEATURED_ITEMS.map((item: any) => {
            const currentOptionId = selectedOptions[item.id] || item.priceOptions[0].id;
            const currentOption = item.priceOptions.find((o: any) => o.id === currentOptionId)!;
            const cartItem = cart.find(c => c.id === item.id && c.optionId === currentOptionId);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div key={item.id} className="bg-white border border-bakery-border rounded-xl p-4 flex gap-4 shadow-sm group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-[#EEDCB3] overflow-hidden shrink-0 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex flex-col flex-grow py-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-lg text-bakery-ink leading-tight">{item.name}</h3>
                    <span className="font-bold text-bakery-accent whitespace-nowrap">${currentOption.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-bakery-ink-medium mt-1 mb-4 line-clamp-2 sm:line-clamp-none">{item.description}</p>
                  
                  <div className="mt-auto flex flex-col sm:flex-row justify-between items-end sm:items-center gap-3">
                    <select 
                      value={currentOptionId} 
                      onChange={(e) => handleOptionChange(item.id, e.target.value)}
                      className="border border-bakery-border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-bakery-accent text-sm w-full sm:w-auto text-bakery-ink"
                    >
                      {item.priceOptions.map((opt: any) => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </select>

                    {quantity > 0 ? (
                      <div className="flex items-center gap-3 bg-bakery-bg border border-bakery-border rounded-full px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, currentOptionId, -1)}
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-bakery-ink hover:text-bakery-accent shadow-sm transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-bakery-ink w-4 text-center">{quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, currentOptionId, 1)}
                          className="w-7 h-7 rounded-full bg-bakery-accent flex items-center justify-center text-white shadow-sm hover:bg-bakery-accent-hover transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => updateQuantity(item.id, currentOptionId, 1)}
                        className="text-sm bg-bakery-border text-bakery-ink px-5 py-2 rounded-full font-bold hover:bg-bakery-accent hover:text-white transition-all shadow-sm"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-full lg:w-1/3">
        <div className="sticky top-28 bg-white border border-bakery-border rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[80vh]">
          <div className="bg-bakery-bg-alt p-5 border-b border-bakery-border flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-bakery-accent-darker" />
            <h2 className="text-xl font-bold font-serif text-bakery-accent-darker">Your Order</h2>
            <span className="ml-auto bg-bakery-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>

          <div className="p-5 flex-grow overflow-y-auto w-full">
            {cart.length === 0 ? (
              <div className="text-center py-10 text-bakery-ink-medium">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Your cart is empty.</p>
                <p className="text-sm mt-1">Add some fresh baked goods!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, cartIdx) => {
                  const product: any = getProduct(item.id);
                  if (!product) return null;
                  const option = product.priceOptions.find((o: any) => o.id === item.optionId);
                  if (!option) return null;
                  const price = option.price;

                  return (
                    <div key={`${item.id}-${item.optionId}-${cartIdx}`} className="flex gap-3 justify-between items-center group">
                      <div className="flex-grow">
                        <p className="font-bold text-sm text-bakery-ink leading-tight pr-2">{product.name}</p>
                        <p className="text-xs text-bakery-ink-medium mt-0.5">
                          {option.name} • ${price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-bold text-sm text-bakery-ink">${(price * item.quantity).toFixed(2)}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.optionId, -item.quantity)}
                          className="text-bakery-ink-light hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 bg-bakery-bg border-t border-bakery-border">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-bakery-ink">Subtotal</span>
                <span className="font-bold text-xl text-bakery-ink">${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-bakery-ink-medium mb-4 italic">Taxes and pickup schedule calculated at checkout.</p>
              <button 
                onClick={() => setShowCheckout(true)}
                className="w-full bg-bakery-accent-dark hover:bg-bakery-accent-darker text-white py-3.5 rounded-full font-bold shadow-md transition-colors text-lg"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-bakery-ink/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => {
                setShowCheckout(false);
                if (orderComplete) {
                  setCart([]);
                  setOrderComplete(false);
                }
              }}
              className="absolute right-4 top-4 text-bakery-ink-light hover:text-bakery-ink transition-colors p-2"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            
            {!orderComplete ? (
              <>
                <h2 className="text-2xl font-bold font-serif text-bakery-accent-darker mb-2">Almost there!</h2>
                <p className="text-bakery-ink-medium mb-6">Please enter your details to complete your order.</p>
                
                <form onSubmit={handleCheckoutSubmit} className="space-y-4" name="order" data-netlify="true">
                  <input type="hidden" name="form-name" value="order" />
                  <div>
                    <label className="block text-sm font-bold text-bakery-ink mb-1">Name</label>
                    <input name="name" required type="text" className="w-full border border-bakery-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-accent" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-bakery-ink mb-1">Email</label>
                    <input name="email" required type="email" className="w-full border border-bakery-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-accent" placeholder="jane@example.com" />
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-bakery-ink mb-1">Pickup Date</label>
                        <input 
                          name="pickupDate"
                          required 
                          type="date" 
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full border border-bakery-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-accent text-bakery-ink" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-bakery-ink mb-1">Timeframe</label>
                        <select name="timeframe" required className="w-full border border-bakery-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-accent text-bakery-ink">
                          <option value="">Select time...</option>
                          <option>Morning (8am - 12pm)</option>
                          <option>Afternoon (12pm - 4pm)</option>
                          <option>Late Afternoon (4pm - 6pm)</option>
                        </select>
                      </div>
                    </div>
                  
                  <button type="submit" disabled={isSubmitting} className="w-full bg-bakery-accent hover:bg-bakery-accent-hover disabled:bg-bakery-accent/50 text-white py-3 rounded-full font-bold shadow-md transition-colors mt-6">
                    {isSubmitting ? 'Processing...' : `Place Order ($${cartTotal.toFixed(2)})`}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold font-serif text-bakery-accent-darker mb-2">Order Confirmed!</h2>
                <p className="text-bakery-ink-medium mb-6">Thank you for choosing Blume's Bakery. We'll have your fresh baked goods ready for you!</p>
                <button 
                  onClick={() => {
                    setShowCheckout(false);
                    setOrderComplete(false);
                    setCart([]);
                  }}
                  className="bg-bakery-bg border border-bakery-border text-bakery-ink hover:text-bakery-accent px-8 py-2.5 rounded-full font-bold transition-colors w-full"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
