'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Check, Plus, Minus, Trash2, Divide, Calendar, Trophy, Clock, Users, ChevronRight } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCartStore } from '../lib/store/cartStore';
import { cn } from '../lib/utils';
import {
  fetchFeaturedProductsRequest,
  fetchTrialPackRequest,
  fetchComboProductsRequest
} from '../store/products/productActions';

export default function Home() {
  // Get product data from Redux store
  const { featuredProducts, trialPack, comboProducts, error } = useSelector(state => state.products);
  
  // Get comics data from Redux store
  const { comics } = useSelector(state => state.comics);
  
  // Get competitions data from Redux store
  const { featuredCompetitions, activeCompetitions } = useSelector(state => state.competitions);
  
  // Filter featured comics from all comics
  const featuredComics = React.useMemo(() => {
    if (!comics || comics.length === 0) return [];
    return comics.filter(comic => comic.isFeatured === true).slice(0, 4);
  }, [comics]);
  
  // Get first 4 comics as fallback if no featured comics
  const displayComics = featuredComics.length > 0 ? featuredComics : (comics ? comics.slice(0, 4) : []);
  
  // Fan Stories Carousel State
  const [fanStoriesPaused, setFanStoriesPaused] = useState(false);
  const [fanStoriesZoomIdx, setFanStoriesZoomIdx] = useState(null);
  
  // Testimonial images data
  const testimonialImages = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    src: `/testimonials/${index + 1}.png`,
    alt: `Customer testimonial ${index + 1}`
  }));
  
  // Hero Carousel State
  const [heroMounted, setHeroMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Hero carousel setup
  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
    };

    updateDimensions();
    setHeroMounted(true);
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Hero carousel images - responsive images for mobile and desktop
  const carouselImages = [
    {
      desktop: "/HeroBanner/1.png",
      mobile: "/HeroBanner/1-mobile.png",
      alt: "Churan Chacha Hero Banner 1"
    },
    {
      desktop: "/HeroBanner/2.png",
      mobile: "/HeroBanner/2-mobile.png",
      alt: "Churan Chacha Hero Banner 2"
    },
    {
      desktop: "/HeroBanner/3.png",
      mobile: "/HeroBanner/3-mobile.png",
      alt: "Churan Chacha Hero Banner 3"
    },
    {
      desktop: "/HeroBanner/4.png",
      mobile: "/HeroBanner/4-mobile.png",
      alt: "Churan Chacha Hero Banner 4"
    }
  ];



  // Custom Arrow Components
  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <Image
        src="/HeroBanner/left.svg"
        alt="Previous"
        width={24}
        height={24}
        className="w-4 h-4 md:w-6 md:h-6"
      />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg"
      onClick={onClick}
      aria-label="Next slide"
    >
      <Image
        src="/HeroBanner/right.svg"
        alt="Next"
        width={24}
        height={24}
        className="w-4 h-4 md:w-6 md:h-6"
      />
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />
        }
      }
    ]
  };

  // Product Card Component
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
      <div
        // href={`/shop/${product.slug}`} 
        className=" bg-white rounded-xl shadow-lg border border-gray-200 p-3 flex flex-col justify-between min-h-[310px] w-sw mx-sm transition-transform hover:scale-[1.02]"
      >
        {/* Product Image */}
        <div className="flex mx-sm justify-center items-center mb-2 mt-1">
          {product.image && !imageError ? (
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
        <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain rounded-lg bg-white"
                sizes="144px, (min-width: 640px) 176px"
                onError={handleImageError}
          priority
        />
            </div>
          ) : (
            <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center bg-gray-100 rounded-lg">
              <span className="text-primary-400 text-lg sm:text-xl font-heading">{product.name}</span>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between w-full">
          <h3 className="text-base sm:text-lg text-primary-800 mb-1 leading-tight line-clamp-2 text-center font-heading">{product.name}</h3>
          {/* <p className="text-xs sm:text-sm text-primary-600 mb-2 line-clamp-2 text-center font-body">{product.description}</p> */}
          <div className="flex items-center flex-col ss:flex-row justify-between mt-auto gap-2 w-full">
            <span className="text-primary-10 xs:max-ss:pl-4 text-xs sm:text-sm  font-body">Coming Soon</span>
            
            {isInCart ? (
              <div className="flex items-center space-x-1 bg-white rounded-lg shadow p-1">
                <button
                  onClick={(e) => handleQuantityUpdate(e, cartQuantity - 1)}
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4 text-primary-600" />
                </button>
                <span className="text-primary-800 min-w-[1.5rem] text-center text-base font-body">
                  {cartQuantity}
                </span>
                <button
                  onClick={(e) => handleQuantityUpdate(e, cartQuantity + 1)}
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4 text-primary-10" />
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
                // onClick={handleAddToCart}
                className={`${isAddedToCart ? 'bg-secondary-500' : 'bg-primary-600 hover:bg-primary-10'} text-white px-3 py-2 rounded-lg shadow transition-all flex items-center space-x-1 text-xs font-body`}
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
      </div>
    );
  };

  // Add to Cart Button Component
  const AddToCartButton = ({ product, quantity = 1, className = "bg-primary-500 hover:bg-primary-600 text-white font-accent px-4 py-2 rounded-lg shadow transition-all flex items-center", children }) => {
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
          <span className="text-primary-800 min-w-[1.5rem] text-center text-base font-body">
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

  // Combo Preview Component
  

  // Hero Carousel Component
  const HeroCarousel = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      // Set client-side flag
      setIsClient(true);
      
      const checkScreenSize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        console.log(`Screen size check: ${window.innerWidth}px, Mobile: ${mobile}`);
      };

      // Initial check
      checkScreenSize();
      
      // Add resize listener
      window.addEventListener('resize', checkScreenSize);
      
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (!heroMounted || !isClient) {
      return (
        <div className="relative w-full h-[50vh] md:h-[80vh]">
          <div className="relative w-full h-full bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="hero-carousel-fullscreen w-full h-full relative">
        <Slider {...sliderSettings}>
          {carouselImages.map((image, index) => {
            const imageSrc = isMobile ? image.mobile : image.desktop;
            console.log(`Rendering image ${index + 1}: ${imageSrc}`);
            
            return (
              <div key={`${index}-${isMobile ? 'mobile' : 'desktop'}`} className="carousel-slide-fullscreen w-full h-full">
                <div className="relative w-full h-[100vw] md:h-[53vw] lg:h-[47vw] xl:h-[42vw]">
                  <Image
                    src={imageSrc}
                    alt={`${image.alt} - ${isMobile ? 'Mobile' : 'Desktop'} Version`}
                    fill
                    sizes="100vw"
                    className="object-fill  "
                    priority={index === 0}
                    quality={90}
                    unoptimized={false}
                    onLoad={() => {
                      console.log(`✅ Successfully loaded: ${imageSrc}`);
                    }}
                    onError={(e) => {
                      console.error(`❌ Failed to load: ${imageSrc}`, e);
                    }}
                  />                
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  };

  // Competition Card Component (same as in competition page)
  const CompetitionCard = ({ id, title, description, startDate, endDate, status, participants, prize, slug, featured, image, mobileImage }) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };

    const getStatusBadge = () => {
      switch(status) {
        case 'active':
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
              Active
            </span>
          );
        case 'upcoming':
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Clock className="w-3 h-3 mr-1" />
              Upcoming
            </span>
          );
        case 'completed':
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <Trophy className="w-3 h-3 mr-1" />
              Completed
            </span>
          );
        default:
          return null;
      }
    };

    // Banner style layout for featured competition
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300">
        {/* Large banner image */}
        {image && (
          <div className="relative h-[80vw] md:h-[45vw] lg:h-[38vw] xl:h-[30vw] bg-white">
            {/* Mobile Image - Shows only on mobile */}
            <Image
              src={mobileImage || image}
              alt={title}
              fill
              sizes="100vw"
              className="object-fill block md:hidden"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Desktop Image - Shows only on desktop */}
            <Image
              src={image}
              alt={title}
              fill
              sizes="100vw"
              className="object-fill hidden md:block"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* Details section - left aligned */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            {getStatusBadge()}
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-primary-10 mb-4 font-heading">{title}</h3>
          <p className="text-gray-700 text-lg mb-6 font-body">{description}</p>
          
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center text-gray-600 font-body">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
            </div>
            
            {participants > 0 && (
              <div className="flex items-center text-gray-600 font-body">
                <Users className="w-5 h-5 mr-2" />
                <span>{participants} participants</span>
              </div>
            )}
            
            <div className="flex items-center text-green-600 font-medium font-body">
              <Trophy className="w-5 h-5 mr-2" />
              <span>{prize}</span>
            </div>
          </div>
          
          {/* Centered Register button */}
          <div className="flex justify-center">
            <Link
              href={`/competition/${slug}`}
              className="bg-primary-600 hover:bg-primary-10 text-white py-3 px-8 rounded-lg font-medium transition-colors inline-flex items-center gap-2 font-body"
            >
              {status === 'active' ? 'View Details' : status === 'upcoming' ? 'Learn More' : 'View Results'}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full Screen Carousel */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <HeroCarousel />
      </div>

      {/* Featured Products Section */}
      <section className="pt-6 mt-4 md:pt-8 md:mt-8 pb-4 md:pb-10 bg-white">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl md:text-5xl text-center mb-4 md:mb-8 text-primary-10 font-heading">Our Products</h2>
          
          {error.featuredProducts ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-red-500 font-body">Failed to load products. Please try refreshing the page.</p>
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 gap-5 lg:grid-cols-4 gap-5 xl:grid-cols-5 gap-6">
              {featuredProducts.map(product => (
                <ProductCardWithCart
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-8">
              <p className="text-gray-500 font-body">Loading products...</p>
            </div>
          )}
          
          <div className="text-center mt-8 md:mt-10">
            <div href="#" className="bg-primary-600 hover:bg-primary-10 text-white px-6 py-3 rounded-lg font-medium inline-block transition-colors relative group font-body">
              View All Products
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Competition Section */}
      {(featuredCompetitions && featuredCompetitions.length > 0) || (activeCompetitions && activeCompetitions.length > 0) ? (
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-10 mb-4 font-heading">
                Featured Competition
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-body">
                Join our exciting competition and showcase your creativity! Win amazing prizes and get featured in our community.
              </p>
            </div>
            
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <div className="max-w-7xl mx-auto px-4">
                <CompetitionCard 
                  {...(featuredCompetitions && featuredCompetitions.length > 0 
                    ? featuredCompetitions[0] 
                    : activeCompetitions[0]
                  )} 
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Toons & Tales - Comics Only */}
      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl text-center mb-4 md:mb-8 text-primary-10 font-heading">Toons & Tales: Comic Books</h2>
          
          {/* Dynamic comics from store */}
          {displayComics && displayComics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayComics.map((comic) => {
                return (
                  <div key={comic.id} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4">
                    <div className="relative w-full aspect-[3/4] mb-4 rounded-xl overflow-hidden">
                      <Image
                        src={comic.image}
                        alt={comic.title}
                        fill
                        className="object-contain"                       
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2 text-center line-clamp-1 font-heading">
                      {comic.title || comic.name || 'Untitled Comic'}
                    </h3>
                    <Link 
                      href={`/toons-and-tells/comic/${comic.slug || 'default'}`} 
                      className="bg-primary-500 hover:bg-primary-600 text-white w-full text-center mt-2 py-2 rounded-lg font-medium transition-colors font-body"
                    >
                      Read Comic
                    </Link>
                  </div>
                );
              })}
            </div>
          ) }
          
          <div className="text-center mt-8">
            <div className="bg-primary-600 hover:bg-primary-10 text-white px-6 py-3 rounded-lg font-medium inline-block transition-colors font-body">
              View All Comics & Stories
            </div>
          </div>
        </div>
      </section>


      {/* <section className="py-8 md:py-12 bg-white"> */}
        {/* Title and Description - Can have padding */}
        {/* <div className="w-full px-4 md:px-6 lg:px-8 mb-8">
          <h2 className="text-3xl md:text-5xl text-center mb-4 md:mb-6 text-primary-10 font-heading">What Our Customers Are Saying</h2>
          <p className="text-center text-gray-700 text-base md:text-lg max-w-2xl mx-auto font-body">
            We love hearing from our customers! Here's what some of them have to say about their experience with Churan Chacha
          </p>
        </div> */}
        
        {/* Full-width Testimonial Images Carousel */}
        {/* <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <Marquee gradient={false} speed={40} pauseOnHover={true} direction="left">
            {testimonialImages.map((testimonial) => (
              <div
                key={testimonial.id}
                className="mx-2 md:mx-2 flex-shrink-0 w-[280px] md:w-[300px] lg:w-[300px] aspect-[4/5] relative cursor-pointer"
              >
                <Image
                  src={testimonial.src}
                  alt={testimonial.alt}
                  fill
                  className="object-contain  transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 300px) 280px, (max-width: 1024px) 320px, 380px"
                  priority={testimonial.id <= 4}
                />
              </div>
            ))}
          </Marquee>
        </div> */}
      {/* </section> */}

      {/* Brand Commitments Marquee Section */}
      <section className="py-8 md:py-12 container mx-auto ">
        {/* Title - Can have padding */}
        <div className="w-full px-4 md:px-6 lg:px-8 mb-6">
          <h2 className="text-3xl md:text-5xl text-center mb-4 md:mb-6 text-primary-10 font-heading">Churan Chacha Ke Commitments</h2>
        </div>
        
        {/* Full-width Commitments Images Row */}
        <div className=" relative  px-2 my-4 py-16">
          <div className="flex grid grid-cols-3 md:grid-cols-6 justify-center mx-auto md:gap-2 lg:gap-0 ">
            {/* Commitment 1 */}
            <div className="flex flex-col items-center mx-auto flex-1 max-w-[120px] md:max-w-[140px] lg:max-w-[160px]">
              <div className="relative w-full aspect-square mb-2 lg:mb-4 lg:mt-4">
                <Image
                  src="/commitments/1.png"
                  alt="Quality Assurance Commitment"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
                />
              </div>
              <h3 className="text-xs md:text-sm text-center text-primary-10 font-heading">
                Quality First Always
              </h3>
            </div>

            {/* Commitment 2 */}
            <div className="flex flex-col items-center mx-auto flex-1 max-w-[120px] md:max-w-[140px] lg:max-w-[160px]">
              <div className="relative w-full aspect-square mb-2">
                <Image
                  src="/commitments/2.png"
                  alt="Natural Ingredients Commitment"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
                />
              </div>
              <h3 className="text-xs md:text-sm text-center text-primary-10 font-heading">
                Natural Ingredients Only
              </h3>
            </div>

            {/* Commitment 3 */}
            <div className="flex flex-col mx-auto items-center flex-1 max-w-[120px] md:max-w-[140px] lg:max-w-[160px]">
              <div className="relative w-full aspect-square mb-2">
                <Image
                  src="/commitments/3.png"
                  alt="Customer Satisfaction Commitment"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
                />
              </div>
              <h3 className="text-xs md:text-sm text-center text-primary-10 font-heading">
                Customer Satisfaction Guaranteed
              </h3>
            </div>

            {/* Commitment 4 */}
            <div className="flex flex-col mx-auto items-center flex-1 max-w-[120px] md:max-w-[140px] lg:max-w-[160px]">
              <div className="relative w-full aspect-square mb-2">
                <Image
                  src="/commitments/4.png"
                  alt="Affordable Pricing Commitment"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
                />
              </div>
              <h3 className="text-xs md:text-sm text-center text-primary-10 font-heading">
                Affordable Pricing Always
              </h3>
            </div>

            {/* Commitment 5 */}
            <div className="flex flex-col mx-auto items-center flex-1 max-w-[120px] md:max-w-[140px] lg:max-w-[160px]">
              <div className="relative w-full aspect-square mb-2 lg:mb-4 lg:mt-4">
                <Image
                  src="/commitments/5.png"
                  alt="Fast Delivery Commitment"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
                />
              </div>
              <h3 className="text-xs md:text-sm text-center text-primary-10 font-heading">
                Fast Delivery Service
              </h3>
            </div>

            {/* Commitment 6 */}
            <div className="flex flex-col mx-auto items-center flex-1 max-w-[120px] md:max-w-[140px] lg:max-w-[160px]">
              <div className="relative w-full aspect-square mb-2">
                <Image
                  src="/commitments/6.png"
                  alt="Trust and Transparency Commitment"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
                />
              </div>
              <h3 className="text-xs md:text-sm text-center text-primary-10 font-heading">
                Trust And Transparency
              </h3>
            </div>
          </div>
        </div>
      </section>

     

      {/* Newsletter Subscribe Section - Minimal */}
      <section className="py-8 md:py-12 bg-yellow-50 ">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Email Subscription */}
            <div className="bg-white rounded-lg shadow p-6   ">
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Join Churan Chacha's Candy Club!</h3>
              <p className="text-gray-600 text-sm mb-4 font-body">
                We will send you the latest information about our brand and new launches.
              </p>
              <form className="flex flex-col gap-3 lg:flex-row">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none font-body "
                  required
                />
                <button 
                  type="submit" 
                  className="w-2xs bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap font-body"
                >
                  Join Now
                </button>
              </form>
            </div>

            {/* WhatsApp Campaign */}
            <div className="bg-white rounded-lg shadow p-6  ">
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Join our WhatsApp Fun</h3>
              <p className="text-gray-600 text-sm mb-4 font-body md:max-xl:mb-10">
                We will send you fun jokes, and latest updates.
              </p>
              <form className="flex flex-col gap-3 lg:flex-row">
                <input 
                  type="tel" 
                  placeholder="Your WhatsApp number" 
                  className="w-full flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none font-body"
                  required
                  pattern="[0-9]{10}"
                />
                <button 
                  type="submit" 
                  className=" w-2xs bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap font-body"
                >
                  Join Fun
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
