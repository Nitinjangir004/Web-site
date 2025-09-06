'use client';

import { X } from 'lucide-react';
import { useCartStore } from '../../lib/store/cartStore';
import { cn } from '../../lib/utils';

export default function SlideCart({ isOpen, onClose }) {
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      
      {/* Cart Slide-out */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">Your Cart ({totalItems})</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex border-b pb-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-md mr-4 flex-shrink-0"></div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm">${item.price?.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center border-t border-b">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button 
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 