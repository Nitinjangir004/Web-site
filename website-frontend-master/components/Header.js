'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  ShoppingBag,
  Store,
  BookOpen,
  Trophy,
  Info,
  Mail,
  UserCircle2,
  Building2,
  Menu,
  X,
  Lock
} from 'lucide-react';
import { useCartStore } from '../lib/store/cartStore';
import { cn } from '../lib/utils';
import SlideCart from './cart/SlideCart';
import { 
  fetchProducts, 
  fetchFeaturedProducts, 
  fetchTrialPack, 
  fetchComboProducts 
} from '../store/products/productActions';
import { 
  fetchComics, 
  fetchFeaturedComics, 
  fetchComicOfMonth,
  fetchComicMoods,
  fetchComicAges
} from '../store/comics/comicActions';
import { 
  fetchAudioStories, 
  fetchFeaturedAudioStories, 
  fetchNarrators,
  fetchAudioStoryAges
} from '../store/audioStories/audioStoryActions';
import { 
  fetchVideos, 
  fetchFeaturedVideos, 
  fetchPresenters,
  fetchVideoAges
} from '../store/videos/videoActions';
import { 
  fetchCustomerStories, 
  fetchFeaturedCustomerStories, 
  fetchAuthors
} from '../store/customerStories/customerStoryActions';
import { 
  fetchCompetitions, 
  fetchFeaturedCompetitions, 
  fetchActiveCompetitions, 
  fetchUpcomingCompetitions, 
  fetchCompetitionStatuses
} from '../store/competition/competitionActions';

// Define navigation items array
const navigation = [
  {
    title: 'Shop',
    href: '/shop',
    icon: <Store className="w-6 h-6 stroke-[1.5]" />,
    color: 'bg-[#FFE6DD]',
    locked: true
  },
  {
    title: 'Toons & Tales',
    href: '/toons-and-tales',
    icon: <BookOpen className="w-6 h-6 stroke-[1.5]" />,
    color: 'bg-[#D1FAE5]',
    locked: true
  },
  {
    title: 'Competitions',
    href: '/competition',
    icon: <Trophy className="w-6 h-6 stroke-[1.5]" />,
    color: 'bg-[#FEF3C7]'
  },
  {
    title: 'B2B',
    href: '/b2b',
    icon: <Building2 className="w-6 h-6 stroke-[1.5]" />,
    color: 'bg-[#F3E8FF]'
  },
  {
    title: 'About Us',
    href: '/about',
    icon: <Info className="w-6 h-6 stroke-[1.5]" />,
    color: 'bg-[#DBEAFE]'
  },
  {
    title: 'Contact',
    href: '/contact-us',
    icon: <Mail className="w-6 h-6 stroke-[1.5]" />,
    color: 'bg-[#FCE7F3]'
  }
];

export default function Header() {
  // State hooks
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  // Effect for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger initial data loading when the component mounts
  useEffect(() => {
    // Fetch all products data
    dispatch(fetchProducts());
    dispatch(fetchFeaturedProducts());
    dispatch(fetchTrialPack());
    dispatch(fetchComboProducts());
    
    // Fetch all comics data
    dispatch(fetchComics());
    dispatch(fetchFeaturedComics());
    dispatch(fetchComicOfMonth());
    dispatch(fetchComicMoods());
    dispatch(fetchComicAges());
    
    // Fetch all audio stories data
    dispatch(fetchAudioStories());
    dispatch(fetchFeaturedAudioStories());
    dispatch(fetchNarrators());
    dispatch(fetchAudioStoryAges());
    
    // Fetch all videos data
    dispatch(fetchVideos());
    dispatch(fetchFeaturedVideos());
    dispatch(fetchPresenters());
    dispatch(fetchVideoAges());
    
    // Fetch all customer stories data
    dispatch(fetchCustomerStories());
    dispatch(fetchFeaturedCustomerStories());
    dispatch(fetchAuthors());
    
    // Fetch all competitions data
    dispatch(fetchCompetitions());
    dispatch(fetchFeaturedCompetitions());
    dispatch(fetchActiveCompetitions());
    dispatch(fetchUpcomingCompetitions());
    dispatch(fetchCompetitionStatuses());
  }, [dispatch]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isCartOpen]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isCartOpen) setIsCartOpen(false);
  };

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 max-w-screen',
          isScrolled ? 'shadow-md backdrop-blur-md bg-white/90' : ''
        )}
        role="banner"
      >
        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Hamburger Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Logo - Centered */}
            <Link 
              href="/" 
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              aria-label="Churan Chacha - Home"
            >
              <Image
                src="/logo/Churan-Chacha-logo.png"
                width={100}
                height={40}
                alt="Churan Chacha"
                className="h-9 w-auto"
                priority
              />
            </Link>
            
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative"
              aria-label={`Shopping Cart with ${cartItemCount} items`}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span 
                  className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center"
                  aria-hidden="true"
                >
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-2">
            <div className="flex items-center justify-between h-24">
              {/* Logo */}
              <Link 
                href="/" 
                className="flex-shrink-0 mr-4"
                aria-label="Churan Chacha - Home"
              >
                <Image
                  src="/logo/Churan-Chacha-logo.png"
                  width={160}
                  height={50}
                  alt="Churan Chacha"
                  className="h-14 w-auto"
                  priority
                  onError={(e) => {
                    // Fallback if image fails to load
                    const imgElement = e.currentTarget;
                    imgElement.onerror = null;
                    imgElement.src = '/logo/fallback-logo.png';
                  }}
                />
              </Link>

              {/* Navigation - Desktop */}
              <nav 
                className="hidden xl:flex items-center justify-center flex-1 space-x-2"
                aria-label="Main Navigation"
              >
                {navigation.map((item) => (
                  item.locked ? (
                    <div
                      key={item.title}
                      className={cn(
                        'group flex flex-col items-center justify-center py-2 px-3 rounded-lg cursor-not-allowed relative',
                        'w-[140px] h-[75px]',
                        item.color
                      )}
                    >
                      <div className="text-gray-600">
                        {item.icon}
                      </div>
                      <span className="mt-1 text-xs font-medium text-gray-600 text-center">
                        {item.title}
                      </span>
                      <div className="absolute top-1 right-1 bg-gray-600 rounded-full w-4 h-4 flex items-center justify-center">
                        <Lock className="w-2 h-2 text-white" />
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        'group flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-300',
                        'hover:-translate-y-1 hover:shadow-md active:translate-y-0',
                        'w-[140px] h-[75px]',
                        item.color,
                        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                      )}
                      aria-label={item.title}
                    >
                      <div className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <span className="mt-1 text-xs font-medium text-gray-600 group-hover:text-gray-900 text-center">
                        {item.title}
                      </span>
                    </Link>
                  )
                ))}
              </nav>

              {/* Simplified Menu for Large Screens but not Extra Large */}
              <nav className="hidden lg:flex xl:hidden items-center space-x-3 flex-1 justify-center">
                {navigation.slice(0, 4).map((item) => (
                  item.locked ? (
                    <div
                      key={item.title}
                      className={cn(
                        'group flex flex-col items-center justify-center py-2 px-3 rounded-lg cursor-not-allowed relative',
                        'w-[110px] h-[75px]',
                        item.color
                      )}
                    >
                      <div className="text-gray-600">
                        {item.icon}
                      </div>
                      <span className="mt-1 text-xs font-medium text-gray-600 text-center">
                        {item.title}
                      </span>
                      <div className="absolute top-1 right-1 bg-gray-600 rounded-full w-4 h-4 flex items-center justify-center">
                        <Lock className="w-2 h-2 text-white" />
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        'group flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-300',
                        'hover:-translate-y-1 hover:shadow-md active:translate-y-0',
                        'w-[110px] h-[75px]',
                        item.color,
                        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                      )}
                      aria-label={item.title}
                    >
                      <div className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <span className="mt-1 text-xs font-medium text-gray-600 group-hover:text-gray-900 text-center">
                        {item.title}
                      </span>
                    </Link>
                  )
                ))}

                {/* Dropdown for remaining items */}
                <div className="relative group">
                  <button 
                    className="flex flex-col items-center justify-center py-2 px-3 rounded-lg w-[110px] h-[75px] bg-[#F3E8FF]"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="text-gray-600 group-hover:text-gray-900">
                      <span className="block w-6 h-0.5 bg-gray-600 mb-1.5"></span>
                      <span className="block w-6 h-0.5 bg-gray-600 mb-1.5"></span>
                      <span className="block w-6 h-0.5 bg-gray-600"></span>
                    </div>
                    <span className="mt-1 text-xs font-medium text-gray-600">More</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {navigation.slice(4).map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Cart and Login */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleCart}
                  className="group flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-300 bg-[#FFF1F2] relative
                    hover:-translate-y-1 hover:shadow-md active:translate-y-0 w-[80px] h-[75px]
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label={`Shopping Cart with ${cartItemCount} items`}
                >
                  <div className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    <ShoppingBag className="w-6 h-6" />
                    {cartItemCount > 0 && (
                      <span 
                        className="absolute top-3 right-2 h-4 w-4 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center"
                        aria-hidden="true"
                      >
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 text-xs font-medium text-gray-600 group-hover:text-gray-900">
                    Cart
                  </span>
                </button>

                <div className="group flex flex-col items-center justify-center py-2 px-3 rounded-lg bg-[#E0F2FE] cursor-not-allowed w-[80px] h-[75px] relative">
                  <div className="text-gray-600">
                    <UserCircle2 className="w-6 h-6" />
                  </div>
                  <span className="mt-1 text-xs font-medium text-gray-600">
                    Login
                  </span>
                  <div className="absolute top-1 right-1 bg-gray-600 rounded-full w-4 h-4 flex items-center justify-center">
                    <Lock className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-out */}
      <div 
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" className="flex-shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/logo/Churan-Chacha-logo.png"
              width={100}
              height={40}
              alt="Churan Chacha"
              className="h-8 w-auto"
            />
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="py-4 overflow-y-auto">
          <nav>
            <ul>
              {navigation.map((item) => (
                <li key={item.title}>
                  {item.locked ? (
                    <div className="flex items-center px-4 py-3 text-gray-700 cursor-not-allowed relative">
                      <div className={`p-2 rounded-lg mr-3 ${item.color}`}>
                        {item.icon}
                      </div>
                      <span>{item.title}</span>
                      <div className="ml-auto bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className={`p-2 rounded-lg mr-3 ${item.color}`}>
                        {item.icon}
                      </div>
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <div className="flex items-center px-4 py-3 text-gray-700 cursor-not-allowed">
                  <div className="p-2 rounded-lg mr-3 bg-[#E0F2FE]">
                    <UserCircle2 className="w-6 h-6" />
                  </div>
                  <span>Login</span>
                  <div className="ml-auto bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* SlideCart */}
      <SlideCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
} 