'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { Building, TrendingUp, Users, CheckCircle, Star, ArrowLeft, Package, Percent, ShoppingCart, Headphones } from 'lucide-react';
import { fetchFeaturedProductsRequest } from '../../../store/products/productActions';

export default function RetailPartnershipsPage() {
  const dispatch = useDispatch();
  const { featuredProducts } = useSelector(state => state.products);
  
  const [formData, setFormData] = useState({
    storeName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    storeType: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    console.log('Dispatching fetchFeaturedProductsRequest...');
    dispatch(fetchFeaturedProductsRequest());
  }, [dispatch]);

  // Debug: Log featured products when they change
  useEffect(() => {
    console.log('Featured products updated:', featuredProducts);
  }, [featuredProducts]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        storeName: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        storeType: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/b2b" className="font-body text-gray-600 hover:text-primary-10 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to B2B Partnerships
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-body text-sm mb-4">
            <Building className="h-4 w-4 mr-2" />
            Retail Partnership Program
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-10 mb-6">Retail Partnerships</h1>
          <p className="font-body text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            Join the Churan Chacha family and bring the taste of nostalgia to your customers. 
            Our retail partnership program offers excellent margins, marketing support, and a proven product range that drives customer loyalty.
          </p>
          <div className="relative h-80 md:h-[650px]  w-full rounded-xl overflow-hidden">
            <Image
              src="/b2b/1.png"
              alt="Retail Store Partnership"
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Why Partner With Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Percent className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Attractive Margins</h3>
             
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Complete Product Range</h3>
             
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Marketing Support</h3>
             
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Headphones className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Dedicated Support</h3>
             
            </div>
          </div>
        </div>

                {/* Product Portfolio */}
        <div className="bg-yellow-50 p-8 md:p-12 rounded-xl mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Our Product Portfolio</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.slice(0, 5).map((product, index) => (
                <div key={product._id || index} className="text-center">
                  <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-white shadow-sm">
                    <Image
                      src={product.image || '/HeroBanner/1.png'}
                      alt={product.name || 'Product'}
                      fill
                      className="object-contain p-2"
                      onError={(e) => {
                        e.currentTarget.src = '/HeroBanner/1.png';
                      }}
                    />
                  </div>
                  <h3 className="font-heading text-lg text-primary-10 mb-1">{product.name}</h3>
                </div>
              ))
            ) : (
              // Loading skeleton for 5 products
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-gray-200">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-pulse bg-gray-300 w-full h-full rounded-xl"></div>
                    </div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-5 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                  </div>
                </div>
              ))
            )}
          </div>
          
        </div>

        {/* Success Story */}
        {/* <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-6 text-center">Success Story</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/testimonials/2.png"
                  alt="Successful Retail Partner"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <Star className="h-5 w-5 text-yellow-500 mr-4" />
                <span className="font-body text-primary-10">Premium Partner since 2022</span>
              </div>
              <h3 className="font-heading text-2xl text-primary-10 mb-2">Sweet Memories Confectionery</h3>
              <p className="font-body text-gray-600 mb-4">Mumbai, Maharashtra</p>
              <blockquote className="font-body text-gray-700 italic mb-4">
                "Partnering with Churan Chacha has been a game-changer for our store. The nostalgic appeal of their products 
                resonates perfectly with our customers, and we've seen a 40% increase in overall foot traffic since we started 
                stocking their products. The support team is incredibly responsive, and the margins are excellent."
              </blockquote>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-heading text-lg text-primary-10">40%</div>
                  <div className="font-body text-gray-600 text-sm">Increase in Footfall</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-heading text-lg text-orange-600">₹2.5L</div>
                  <div className="font-body text-gray-600 text-sm">Monthly Revenue from CC Products</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Application Form */}
        <div id="application-form" className="bg-yellow-50 p-8 rounded-xl mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-6 text-center">Apply for Retail Partnership</h2>
          <p className="font-body text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Ready to join the Churan Chacha family? Fill out the application form below and our retail partnerships team 
            will review your application and get back to you within 48 hours.
          </p>
          
          {formStatus === 'success' ? (
            <div className="bg-white p-6 rounded-lg border border-green-200 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Application Submitted Successfully!</h3>
              <p className="font-body text-gray-700 mb-4">
                Thank you for your interest in becoming a Churan Chacha retail partner. Our team will review your application 
                and contact you within 48 hours to discuss the next steps.
              </p>
              <Link href="/shop" className="bg-primary-10 text-white px-6 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body">
                Explore Our Products
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="storeName" className="block font-body text-gray-700 mb-1">Store Name*</label>
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactPerson" className="block font-body text-gray-700 mb-1">Contact Person*</label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block font-body text-gray-700 mb-1">Email Address*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-body text-gray-700 mb-1">Phone Number*</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="block font-body text-gray-700 mb-1">Store Address*</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="storeType" className="block font-body text-gray-700 mb-1">Store Type*</label>
                <select
                  id="storeType"
                  name="storeType"
                  value={formData.storeType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                  required
                >
                  <option value="">Select Store Type</option>
                  <option value="Confectionery Store">Confectionery Store</option>
                  <option value="General Store">General Store</option>
                  <option value="Supermarket">Supermarket</option>
                  <option value="Specialty Food Store">Specialty Food Store</option>
                  <option value="Department Store">Department Store</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              

              
              <div className="mb-6">
                <label htmlFor="message" className="block font-body text-gray-700 mb-1">Additional Information</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                  rows={4}
                  placeholder="Tell us about your current product range, target customers, or any specific requirements..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary-10 text-white px-8 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Information */}
        {/* <div className="text-center">
          <h3 className="font-heading text-xl text-primary-10 mb-4">Have Questions?</h3>
          <p className="font-body text-gray-700 mb-4">
            Our retail partnership team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="mailto:retail@churanchacha.com" className="bg-white text-primary-10 border-2 border-primary-10 px-6 py-3 rounded-lg hover:bg-primary-10 hover:text-white transition-colors font-body">
              Email Us
            </Link>
            <Link href="tel:+91-9876543210" className="bg-primary-10 text-white border-2 border-primary-10 px-6 py-3 rounded-lg hover:bg-white hover:text-primary-10 transition-colors font-body">
              Call Us: +91-9876543210
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
} 