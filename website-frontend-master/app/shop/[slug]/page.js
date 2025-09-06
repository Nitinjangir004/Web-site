'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { ChevronLeft, Minus, Plus, Heart, Share2, ShoppingBag, Check, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../../lib/store/cartStore';

export default function ProductPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // Get product data from Redux store
  const { products, trialPack, comboProducts } = useSelector(state => state.products);
  
  // Find product by slug and set related products
  useEffect(() => {
    // Combine all products
    const allProducts = [...products];
    if (trialPack) allProducts.push(trialPack);
    if (comboProducts) allProducts.push(...comboProducts);
    
    // Find the product by slug
    const foundProduct = allProducts.find(p => p.slug === resolvedParams.slug);
    
    if (!foundProduct) {
      // Redirect to shop page if product not found
      router.push('/shop');
      return;
    }
    
    setProduct(foundProduct);
    
    // Set related products based on product type
    let related = [];
    if (foundProduct.isCombo) {
      // For combo products, show trial pack and other combos
      if (trialPack) related.push(trialPack);
      related.push(...comboProducts.filter(p => p.id !== foundProduct.id));
    } else if (foundProduct.isTrialPack) {
      // For trial pack, show individual products and combos
      related.push(...products.slice(0, 3));
      if (comboProducts.length > 0) related.push(comboProducts[0]);
    } else {
      // For individual products, show trial pack and other individual products
      if (trialPack) related.push(trialPack);
      related.push(...products.filter(p => p.id !== foundProduct.id));
    }
    
    // Shuffle and take first 4
    const shuffled = related.sort(() => 0.5 - Math.random());
    setRelatedProducts(shuffled.slice(0, 4));
  }, [resolvedParams.slug, products, trialPack, comboProducts, router]);

  // Add to Cart Button Component
  const AddToCartButton = ({ product, quantity = 1, className = "bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow transition-all flex items-center", children }) => {
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
      }, quantity);
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
            <Minus className="h-4 w-4 text-blue-600" />
          </button>
          <span className="font-bold text-blue-800 min-w-[1.5rem] text-center text-base">
            {cartQuantity}
          </span>
          <button
            onClick={(e) => handleQuantityUpdate(e, cartQuantity + 1)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4 text-blue-600" />
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

  // Show loading if product not found yet
  if (!product) {
    return (
      <div className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Get product images
  const productImages = product.image ? [product.image] : [];
  if (product.additionalImages && Array.isArray(product.additionalImages)) {
    productImages.push(...product.additionalImages);
  }
  
  // Image error handler
  const handleImageError = () => {
    console.error(`Failed to load image: ${productImages[selectedImage]}`);
    setImageError(true);
  };
  
  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  
  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
  };

  return (
    <div className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 md:mb-6">
          <Link href="/shop" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 bg-white p-2 rounded-lg">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-blue-50">
                {productImages[selectedImage] && !imageError ? (
                  <Image
                    src={productImages[selectedImage]}
                    alt={`${product.name} - View ${selectedImage + 1}`}
                    fill
                    className="object-contain"
                    onError={handleImageError}
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-blue-500 text-2xl font-bold">{product.name}</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Additional Images Thumbnails */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={`thumbnail-${index}-${image?.split('/').pop() || index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative rounded-md overflow-hidden bg-blue-50 border ${selectedImage === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-blue-200'} cursor-pointer hover:border-blue-500 transition-colors`}
                    aria-label={`View image ${index + 1}`}
                  >
                    {image && (
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h1>
            
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-yellow-600 mr-4">₹{product.price}</span>
              <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm">
                In Stock
              </span>
            </div>
            
            <div>
              <p className="text-gray-700 whitespace-pre-line text-sm md:text-base">
                {product.longDescription}
              </p>
            </div>
            
            {/* Quantity Selector */}
            <div>
              <label className="block font-medium text-gray-800 mb-2">Quantity</label>
              <div className="flex items-center">
                <button 
                  onClick={decreaseQuantity}
                  className="h-8 w-8 md:h-10 md:w-10 rounded-l-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center border border-blue-300"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4 text-blue-800" />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  min="1"
                  className="h-8 w-12 md:h-10 md:w-16 border-y border-blue-300 text-center text-gray-800 focus:outline-none"
                />
                <button 
                  onClick={increaseQuantity}
                  className="h-8 w-8 md:h-10 md:w-10 rounded-r-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center border border-blue-300"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4 text-blue-800" />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-4">
              <AddToCartButton
                product={product}
                quantity={quantity}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow transition-all flex items-center space-x-1"
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                Add
              </AddToCartButton>
              
              <button className="border-2 border-blue-300 bg-white hover:bg-blue-50 text-blue-800 font-medium px-4 py-2 md:px-6 md:py-3 rounded-xl transition-all flex items-center text-sm md:text-base">
                <Heart className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Add to Wishlist
              </button>
              
              <button className="border-2 border-blue-300 bg-white hover:bg-blue-50 text-blue-800 font-medium px-4 py-2 md:px-6 md:py-3 rounded-xl transition-all flex items-center text-sm md:text-base">
                <Share2 className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Share
              </button>
            </div>
            
            {/* Product Information */}
            <div className="space-y-3 border-t border-blue-200 pt-4">
              {product.ingredients && (
                <div>
                  <h3 className="font-medium text-gray-800 mb-1 text-sm md:text-base">Ingredients</h3>
                  <p className="text-gray-600 text-sm">{product.ingredients}</p>
                </div>
              )}
              
              {product.weight && (
                <div>
                  <h3 className="font-medium text-gray-800 mb-1 text-sm md:text-base">Package Size</h3>
                  <p className="text-gray-600 text-sm">{product.weight}</p>
                </div>
              )}
              
              {product.dietaryInfo && (
                <div>
                  <h3 className="font-medium text-gray-800 mb-1 text-sm md:text-base">Dietary Information</h3>
                  <p className="text-gray-600 text-sm">{product.dietaryInfo}</p>
                </div>
              )}
              
              {product.category && (
                <div>
                  <h3 className="font-medium text-gray-800 mb-1 text-sm md:text-base">Category</h3>
                  <p className="text-gray-600 text-sm">{product.category.replace('-', ' & ').charAt(0).toUpperCase() + product.category.slice(1)}</p>
                </div>
              )}
              
              {product.flavor && (
                <div>
                  <h3 className="font-medium text-gray-800 mb-1 text-sm md:text-base">Flavor Profile</h3>
                  <p className="text-gray-600 text-sm">{product.flavor.charAt(0).toUpperCase() + product.flavor.slice(1)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-blue-200">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">You Might Also Like</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {relatedProducts.map((relatedProduct, index) => (
                <div key={`related-${relatedProduct.id}-${index}`} className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 group hover:scale-[1.02] transition-transform">
                  <Link 
                    href={`/shop/${relatedProduct.slug}`}
                    className="block"
                  >
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-blue-50 mb-3">
                      {relatedProduct.image ? (
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-blue-400 font-medium">{relatedProduct.name.split(' ')[0]}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-800 mb-1 text-sm md:text-base line-clamp-2">{relatedProduct.name}</h3>
                    <p className="font-bold text-yellow-600 text-sm">₹{relatedProduct.price}</p>
                  </Link>
                  <div className="mt-2">
                    <AddToCartButton
                      product={relatedProduct}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-2 rounded-lg shadow transition-all flex items-center justify-center space-x-1 text-xs w-full"
                    >
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      Add
                    </AddToCartButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 