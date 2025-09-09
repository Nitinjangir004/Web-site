'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Users, Calendar, Briefcase, CheckCircle, Star, ArrowLeft, Package, Palette, Heart, Award } from 'lucide-react';

export default function CorporateGiftingPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    giftQuantity: '',
    budget: '',
    customization: '',
    deliveryLocation: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState('idle');
  
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
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        giftQuantity: '',
        budget: '',
        customization: '',
        deliveryLocation: '',
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
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-body text-sm mb-4">
            <Gift className="h-4 w-4 mr-2" />
            Corporate & Event Gifting Solutions
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-primary-10 mb-6">Corporate & Event Gifting</h1>
          <p className="font-body text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            Create memorable experiences with nostalgic Churan Chacha products. Perfect for corporate events, employee appreciation, 
            client gifts, weddings, and special occasions. Custom packaging and bulk discounts available.
          </p>
          <div className="relative h-80 md:h-[650px]  w-full rounded-xl overflow-hidden">
            <Image
              src="/b2b/event/event.png"
              alt="Corporate Gifting Solutions"
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Gifting Categories */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Perfect for Every Occasion</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Corporate Events</h3>
              
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Client Appreciation</h3>
             
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Weddings & Celebrations</h3>
             
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Festival Hampers</h3>
             
            </div>
          </div>
        </div>

        {/* Custom Packaging Options */}
        <div className="bg-yellow-50 p-8 md:p-12 rounded-xl mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Custom Packaging Solutions</h2>
          
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden">
                <Image
                  src="/testimonials/4.png"
                  alt="Premium Corporate Box"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Premium Gift Boxes</h3>
              <p className="font-body text-gray-700 text-sm mb-3">
                Elegant wooden or premium cardboard boxes with custom branding and foam inserts
              </p>
              <div className="bg-white p-3 rounded-lg">
                <span className="font-heading text-primary-10">Starting at ₹150/box</span>
              </div>
            </div>

            <div className="text-center">
              <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden">
                <Image
                  src="/testimonials/6.png"
                  alt="Custom Branded Pouches"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Branded Pouches</h3>
              <p className="font-body text-gray-700 text-sm mb-3">
                Eco-friendly jute or cotton pouches with your company logo and message
              </p>
              <div className="bg-white p-3 rounded-lg">
                <span className="font-heading text-primary-10">Starting at ₹75/pouch</span>
              </div>
            </div>

            <div className="text-center">
              <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden">
                <Image
                  src="/testimonials/9.png"
                  alt="Deluxe Hampers"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Deluxe Hampers</h3>
              <p className="font-body text-gray-700 text-sm mb-3">
                Complete gift hampers with all flavors, comics, and branded merchandise
              </p>
              <div className="bg-white p-3 rounded-lg">
                <span className="font-heading text-primary-10">Starting at ₹500/hamper</span>
              </div>
            </div>
          </div> */}

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-heading text-xl text-primary-10 mb-4 text-center">Customization Options</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border border-gray-200 rounded-lg">
                <Palette className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                <span className="font-body text-gray-700 text-sm">Custom Colors</span>
              </div>
              <div className="text-center p-3 border border-gray-200 rounded-lg">
                <Package className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                <span className="font-body text-gray-700 text-sm">Logo Printing</span>
              </div>
              <div className="text-center p-3 border border-gray-200 rounded-lg">
                <Gift className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                <span className="font-body text-gray-700 text-sm">Ribbon & Tags</span>
              </div>
              <div className="text-center p-3 border border-gray-200 rounded-lg">
                <Heart className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                <span className="font-body text-gray-700 text-sm">Personal Messages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Structure */}
        {/* <div className="mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Bulk Pricing & Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <h3 className="font-heading text-xl text-primary-10 mb-2">Starter Package</h3>
                <p className="font-body text-gray-600 text-sm">50-200 units</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-body text-gray-700">Per Unit Cost</span>
                  <span className="font-heading text-primary-10">₹8.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-gray-700">Custom Packaging</span>
                  <span className="font-heading text-primary-10">₹25-75</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-gray-700">Minimum Order</span>
                  <span className="font-heading text-primary-10">50 units</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Basic custom packaging</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Logo printing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Standard delivery</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-300 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-body">Most Popular</span>
              </div>
              <div className="text-center mb-4">
                <h3 className="font-heading text-xl text-primary-10 mb-2">Business Package</h3>
                <p className="font-body text-gray-600 text-sm">200-1000 units</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-body text-gray-700">Per Unit Cost</span>
                  <span className="font-heading text-primary-10">₹7.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-gray-700">Custom Packaging</span>
                  <span className="font-heading text-primary-10">₹50-150</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-gray-700">Minimum Order</span>
                  <span className="font-heading text-primary-10">200 units</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Premium packaging options</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Multi-color printing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Priority delivery</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Dedicated support</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <h3 className="font-heading text-xl text-primary-10 mb-2">Enterprise Package</h3>
                <p className="font-body text-gray-600 text-sm">1000+ units</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-body text-gray-700">Per Unit Cost</span>
                  <span className="font-heading text-primary-10">₹6.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-gray-700">Custom Packaging</span>
                  <span className="font-heading text-primary-10">₹75-500</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-gray-700">Minimum Order</span>
                  <span className="font-heading text-primary-10">1000 units</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Luxury packaging</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Full customization</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Express delivery</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="font-body text-gray-700 text-sm">Account manager</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Popular Gift Combinations */}
        {/* <div className="bg-white p-8 md:p-12 rounded-xl mb-16 shadow-lg border border-gray-200">
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Popular Gift Combinations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/testimonials/1.png"
                  alt="Trial Pack Combo"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">The Explorer</h3>
              <p className="font-body text-gray-700 text-sm mb-3">
                1 Trial Pack + 1 Comic Book + Custom Card
              </p>
              <div className="text-center p-2 bg-white rounded-lg">
                <span className="font-heading text-primary-10">₹275 per gift</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/testimonials/2.png"
                  alt="Flavor Mix Combo"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">The Nostalgia Box</h3>
              <p className="font-body text-gray-700 text-sm mb-3">
                20 packets (5 of each flavor) + 2 Comics
              </p>
              <div className="text-center p-2 bg-white rounded-lg">
                <span className="font-heading text-orange-600">₹350 per gift</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/testimonials/7.png"
                  alt="Premium Hamper"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">The Celebration</h3>
              <p className="font-body text-gray-700 text-sm mb-3">
                40 packets + All Comics + Branded Merchandise
              </p>
              <div className="text-center p-2 bg-purple-50 rounded-lg">
                <span className="font-heading text-purple-600">₹650 per gift</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/testimonials/11.png"
                  alt="Custom Combo"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">The Custom Choice</h3>
              <p className="font-body text-gray-700 text-sm mb-3">
                Design your own combination based on requirements
              </p>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <span className="font-heading text-green-600">Custom Pricing</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Success Story */}
        {/* <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-6 text-center">Client Success Story</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/testimonials/12.png"
                  alt="Corporate Client Success"
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
                <span className="font-body text-primary-10">Enterprise Client since 2022</span>
              </div>
              <h3 className="font-heading text-2xl text-primary-10 mb-2">TechCorp Solutions</h3>
              <p className="font-body text-gray-600 mb-4">IT Services Company, Bangalore</p>
              <blockquote className="font-body text-gray-700 italic mb-4">
                "We've been using Churan Chacha products for our corporate events and client gifts for over a year now. 
                The nostalgic appeal of their candies creates instant conversations and memorable moments. The custom packaging 
                with our company branding looks professional and the response from our clients has been overwhelmingly positive. 
                It's become our signature gift!"
              </blockquote>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-heading text-lg text-primary-10">500+</div>
                  <div className="font-body text-gray-600 text-sm">Gifts Delivered</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-heading text-lg text-orange-600">12</div>
                  <div className="font-body text-gray-600 text-sm">Events Covered</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-heading text-lg text-purple-600">95%</div>
                  <div className="font-body text-gray-600 text-sm">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-heading text-2xl text-blue-600">1</span>
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Consultation</h3>
              <p className="font-body text-gray-700 text-sm">
                Discuss your requirements, budget, and customization needs with our team
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-heading text-2xl text-orange-600">2</span>
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Design</h3>
              <p className="font-body text-gray-700 text-sm">
                Our design team creates custom packaging concepts and mock-ups for approval
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-heading text-2xl text-purple-600">3</span>
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Production</h3>
              <p className="font-body text-gray-700 text-sm">
                We produce and package your custom gifts with attention to quality and detail
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-heading text-2xl text-green-600">4</span>
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Delivery</h3>
              <p className="font-body text-gray-700 text-sm">
                Timely delivery to your location or directly to recipients as per your requirements
              </p>
            </div>
          </div>
        </div>

        {/* Quote Request Form */}
        <div id="quote-form" className="bg-yellow-50 p-8 rounded-xl mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-6 text-center">Request a Custom Quote</h2>
          <p className="font-body text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Ready to create memorable gifts for your next event? Tell us about your requirements and our corporate gifting 
            specialists will create a custom proposal just for you.
          </p>
          
          {formStatus === 'success' ? (
            <div className="bg-white p-6 rounded-lg border border-green-200 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Quote Request Submitted!</h3>
              <p className="font-body text-gray-700 mb-4">
                Thank you for your interest in our corporate gifting solutions. Our specialists will review your requirements 
                and send you a detailed proposal within 24 hours.
              </p>
              <Link href="/shop" className="bg-primary-10 text-white px-6 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body">
                Browse Our Products
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="companyName" className="block font-body text-gray-700 mb-1">Company Name*</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="eventType" className="block font-body text-gray-700 mb-1">Event Type*</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                    required
                  >
                    <option value="">Select Event Type</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Client Appreciation">Client Appreciation</option>
                    <option value="Employee Recognition">Employee Recognition</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Festival Celebration">Festival Celebration</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Conference/Seminar">Conference/Seminar</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="eventDate" className="block font-body text-gray-700 mb-1">Event Date*</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="giftQuantity" className="block font-body text-gray-700 mb-1">Required Quantity*</label>
                  <select
                    id="giftQuantity"
                    name="giftQuantity"
                    value={formData.giftQuantity}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                    required
                  >
                    <option value="">Select Quantity</option>
                    <option value="50-100">50-100 gifts</option>
                    <option value="100-300">100-300 gifts</option>
                    <option value="300-500">300-500 gifts</option>
                    <option value="500-1000">500-1000 gifts</option>
                    <option value="1000+">1000+ gifts</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block font-body text-gray-700 mb-1">Budget per Gift*</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                    required
                  >
                    <option value="">Select Budget Range</option>
                    <option value="₹100-250">₹100-250</option>
                    <option value="₹250-500">₹250-500</option>
                    <option value="₹500-750">₹500-750</option>
                    <option value="₹750-1000">₹750-1000</option>
                    <option value="₹1000+">₹1000+</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="customization" className="block font-body text-gray-700 mb-1">Customization Required*</label>
                  <select
                    id="customization"
                    name="customization"
                    value={formData.customization}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                    required
                  >
                    <option value="">Select Customization</option>
                    <option value="Basic - Logo only">Basic - Logo only</option>
                    <option value="Standard - Logo + Colors">Standard - Logo + Colors</option>
                    <option value="Premium - Full branding">Premium - Full branding</option>
                    <option value="Custom - Unique design">Custom - Unique design</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="deliveryLocation" className="block font-body text-gray-700 mb-1">Delivery Location*</label>
                  <input
                    type="text"
                    id="deliveryLocation"
                    name="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                    placeholder="City, State"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block font-body text-gray-700 mb-1">Additional Requirements</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                  rows={4}
                  placeholder="Tell us about specific customization needs, packaging preferences, delivery requirements, or any other details..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary-10 text-white px-8 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Submitting Request...' : 'Request Custom Quote'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Information */}
        {/* <div className="text-center">
          <h3 className="font-heading text-xl text-primary-10 mb-4">Need Immediate Assistance?</h3>
          <p className="font-body text-gray-700 mb-4">
            Our corporate gifting specialists are ready to help you create the perfect gifting solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="mailto:gifts@churanchacha.com" className="bg-white text-primary-10 border-2 border-primary-10 px-6 py-3 rounded-lg hover:bg-primary-10 hover:text-white transition-colors font-body">
              Email Our Team
            </Link>
            <Link href="tel:+91-9876543212" className="bg-primary-10 text-white border-2 border-primary-10 px-6 py-3 rounded-lg hover:bg-white hover:text-primary-10 transition-colors font-body">
              Call Us: +91-9876543212
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
} 