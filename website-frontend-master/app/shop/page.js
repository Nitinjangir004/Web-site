'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { ShoppingBag, Check, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../../lib/store/cartStore';

export default function ShopPage() {
  // Get product data from Redux store
  const { products, trialPack, comboProducts, error } = useSelector(state => state.products);
  
  // Filter individual products (exclude trial pack and combos)
  const individualProducts = products.filter(product => 
    !product.isTrialPack && !product.isCombo
  );

  // Product Card Component with Cart Integration
  const ProductCardWithCart = ({ product }) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);
    const cartItems = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

    // Check if product is in cart
    useEffect(() => {
      const checkCartStatus = () => {
        const inCart = cartItems.find(item => item.id === product.id);
        setIsInCart(!!inCart);
        setCartQuantity(inCart ? inCart.quantity : 0);
      };
      
      checkCartStatus();
    }, [cartItems, product.id]);

    const handleImageError = () => {
      setImageError(true);
    };

    const handleAddToCart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      
      setIsAddedToCart(true);
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000);
    };

    const handleRemoveFromCart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      removeItem(product.id);
    };

    const handleQuantityUpdate = (e, newQuantity) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (newQuantity === 0) {
        handleRemoveFromCart(e);
        return;
      }
      
      updateItemQuantity(product.id, newQuantity);
    };

    return (
      <Link 
        href={`/shop/${product.slug}`} 
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex flex-col justify-between min-h-[380px] transition-transform hover:scale-[1.02] hover:shadow-xl"
      >
        {/* Product Image */}
        <div className="flex justify-center items-center mb-4">
          {product.image && !imageError ? (
            <div className="relative w-48 h-48 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain rounded-lg bg-white"
                sizes="192px"
                onError={handleImageError}
                priority
              />
            </div>
          ) : (
            <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded-lg">
              <span className="text-gray-500 text-lg font-medium">{product.name}</span>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight line-clamp-2 text-center">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 text-center">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-yellow-600">₹{product.price}</span>
            
            {isInCart ? (
              <div className="flex items-center space-x-1 bg-white rounded-lg shadow p-1">
                <button
                  onClick={(e) => handleQuantityUpdate(e, cartQuantity - 1)}
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4 text-primary-600" />
                </button>
                <span className="font-bold text-primary-800 min-w-[1.5rem] text-center text-base">
                  {cartQuantity}
                </span>
                <button
                  onClick={(e) => handleQuantityUpdate(e, cartQuantity + 1)}
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4 text-primary-600" />
                </button>
                <button
                  onClick={handleRemoveFromCart}
                  className="p-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors ml-1"
                  aria-label="Remove from cart"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAddToCart}
                className={`${isAddedToCart ? 'bg-secondary-500' : 'bg-primary-500 hover:bg-primary-600'} text-white font-medium px-3 py-2 rounded-lg shadow transition-all flex items-center space-x-1 text-xs`}
                aria-label="Add to cart"
              >
              {isAddedToCart ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add</span>
                </>
              )}
            </button>
            )}
          </div>
        </div>
      </Link>
    );
  };

  // Add to Cart Button Component
  const AddToCartButton = ({ product, children, className = "bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg shadow transition-all text-center" }) => {
    const [isAdded, setIsAdded] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);
    const cartItems = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
    
    // Check if product is in cart
    useEffect(() => {
      const checkCartStatus = () => {
        const inCart = cartItems.find(item => item.id === product.id);
        setIsInCart(!!inCart);
        setCartQuantity(inCart ? inCart.quantity : 0);
      };
      
      checkCartStatus();
    }, [cartItems, product.id]);
    
    const handleAddToCart = () => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      setIsAdded(true);
      
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    };
    
    const handleRemoveFromCart = (e) => {
      e.stopPropagation();
      removeItem(product.id);
    };

    const handleQuantityUpdate = (e, newQuantity) => {
      e.stopPropagation();
      
      if (newQuantity === 0) {
        handleRemoveFromCart(e);
        return;
      }
      
      updateItemQuantity(product.id, newQuantity);
    };
    
    if (isInCart) {
      return (
        <div className="flex items-center space-x-1 bg-white rounded-lg shadow p-1">
          <button
            onClick={(e) => handleQuantityUpdate(e, cartQuantity - 1)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4 text-primary-600" />
          </button>
          <span className="font-bold text-primary-800 min-w-[1.5rem] text-center text-base">
            {cartQuantity}
          </span>
          <button
            onClick={(e) => handleQuantityUpdate(e, cartQuantity + 1)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4 text-primary-600" />
          </button>
          <button
            onClick={handleRemoveFromCart}
            className="p-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors ml-1"
            aria-label="Remove from cart"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      );
    }
    
    return (
      <button
        onClick={handleAddToCart}
        className={className}
        disabled={isAdded}
      >
        {isAdded ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            <span>Added!</span>
          </>
        ) : (
          children || (
            <>
              <ShoppingBag className="h-4 w-4 mr-1" />
              <span>Add</span>
            </>
          )
        )}
      </button>
    );
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Shop Our Churan Collection</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore our wide range of traditional Indian churans, each crafted to bring back nostalgic flavors and childhood memories.
          </p>
        </div>

        {/* Trial Pack Banner */}
        {trialPack && (
          <div className="mb-12 rounded-2xl overflow-hidden bg-yellow-50 border-2 border-dashed border-yellow-300">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="w-full md:w-2/5 bg-white p-4">
                <div className="relative aspect-square">
                  <Image
                    src={trialPack.image || '/images/products/trial_pack/main_productcard.png'}
                    alt="Churan Chacha Trial Pack"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Special Offer
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {trialPack.name}
                </h2>
                <p className="text-gray-700 mb-4">
                  {trialPack.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mr-2">
                      <span>✓</span>
                    </div>
                    <span className="text-gray-800">4 Flavors</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mr-2">
                      <span>✓</span>
                    </div>
                    <span className="text-gray-800">40 Packets</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mr-2">
                      <span>✓</span>
                    </div>
                    <span className="text-gray-800">₹5 per packet</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mr-2">
                      <span>✓</span>
                    </div>
                    <span className="text-gray-800">₹200 Total</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href={`/shop/${trialPack.slug}`}
                    className="bg-primary-500 hover:bg-primary-600 text-white text-center px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    View Details
                  </Link>
                  <AddToCartButton 
                    product={trialPack}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg shadow transition-all flex items-center justify-center"
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Add
                  </AddToCartButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Products Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Individual Flavors</h2>
          
          {error.products ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-red-500">Failed to load individual products. Please try refreshing the page.</p>
            </div>
          ) : individualProducts && individualProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {individualProducts.map(product => (
                <ProductCardWithCart
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-8">
              <p className="text-gray-500">Loading individual products...</p>
            </div>
          )}
        </div>

        {/* Combo Products Section */}
        <div className="py-8">
          <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Value Combos</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Get twice the flavor with our specially curated combo packs. 
              Each combo contains 80 packets (40 of each flavor) for ₹400!
            </p>
          </div>
          
          {error.comboProducts ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-red-500">Failed to load combo products. Please try refreshing the page.</p>
            </div>
          ) : comboProducts && comboProducts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {comboProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg border border-yellow-200 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Image */}
                    <div className="w-full sm:w-2/5 p-4">
                      <div className="relative aspect-square">
                        {product.image && (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="w-full sm:w-3/5 p-5 flex flex-col justify-between">
                      <div>
                        <div className="mb-2">
                          <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                            Value Combo
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-gray-700 text-sm mb-3">{product.description}</p>
                        
                        <div className="text-yellow-600 font-bold text-xl mb-4">₹{product.price}</div>
                      </div>
                      
                      <div className="flex flex-row gap-3">
                        <Link 
                          href={`/shop/${product.slug}`}
                          className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg shadow transition-all text-center flex-1"
                        >
                          View Details
                        </Link>
                        <AddToCartButton 
                          product={product}
                          className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg shadow transition-all flex items-center justify-center flex-1"
                        >
                          <ShoppingBag className="h-4 w-4 mr-1" />
                          Add
                        </AddToCartButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-8">
              <p className="text-gray-500">Loading combo products...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 