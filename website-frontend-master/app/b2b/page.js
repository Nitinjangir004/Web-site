'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  CheckCircle, 
  ChevronRight, 
  Star,
  MapPin,
  Award,
  Target,
  Handshake,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Package,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function B2BPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    businessType: '',
    requirements: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState('idle');
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "What is the minimum order quantity?",
      answer: "We keep our MOQ flexible to support growing businesses. Starting from as low as 50 units for retail partnerships. We can discuss customized quantities based on your business needs and location."
    },
    {
      question: "Do you offer custom packaging?",
      answer: "Yes! We offer custom packaging solutions for bulk orders and special events. Our team can help design packaging that reflects your brand while maintaining our authentic churan candy experience."
    },
    {
      question: "What are your payment terms?",
      answer: "We offer flexible payment options to support new partnerships. Typically 50% advance with balance on delivery. As we grow together, we can explore additional payment terms. We accept all major payment methods."
    },
    {
      question: "How fresh are your products?",
      answer: "Our candies have a shelf life of 12-15 months from manufacture date. We ensure all products shipped to partners have at least 10 months of shelf life remaining, guaranteeing freshness for your customers."
    },
    {
      question: "What support do you provide?",
      answer: "We believe in growing together! We provide marketing materials, product training, promotional support, and dedicated account management to help ensure your success with our products."
    },
    {
      question: "How do I get started?",
      answer: "Simple! Fill out our partnership inquiry form above, and our team will contact you within 48 hours to discuss opportunities that fit your business goals and location."
    }
  ];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        businessType: '',
        requirements: '',
        message: '',
      });
    }, 1500);
  };
  
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section - Enhanced */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-body text-sm mb-6">
            <Handshake className="h-4 w-4 mr-2" />
            Partner with India's Favorite Nostalgic Candy Brand
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-10 mb-6">
            Grow Your Business with <span className="text-primary-10">Churan Chacha</span>
          </h1>
          <p className="font-body text-gray-700 text-lg md:text-xl max-w-4xl mx-auto mb-8 leading-relaxed">
            Join the exciting journey of India's authentic nostalgic candy brand and tap into the ₹50,000 crore confectionery market. 
            Whether you're a retailer, distributor, corporate buyer, or event planner, we offer profitable partnership opportunities with great potential.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <div className="font-heading text-2xl text-primary-10">20+</div>
              <div className="font-body text-gray-600 text-sm">Growing Partners</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <div className="font-heading text-2xl text-orange-600">8+</div>
              <div className="font-body text-gray-600 text-sm">Cities & Growing</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <div className="font-heading text-2xl text-blue-600">4</div>
              <div className="font-body text-gray-600 text-sm">Unique Flavors</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <div className="font-heading text-2xl text-green-600">100%</div>
              <div className="font-body text-gray-600 text-sm">Authentic Recipe</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#partnership-options" className="bg-primary-10 text-white px-8 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body">
              Explore Partnerships
            </a>
            <a href="#inquiry-form" className="bg-white text-primary-10 border-2 border-primary-10 px-8 py-3 rounded-lg hover:bg-primary-10 hover:text-white transition-colors font-body">
              Get Started Today
            </a>
          </div>

          <div className="relative h-80 md:h-[650px]  w-full rounded-xl overflow-hidden">
            <Image
              src="/b2b/1.png"
              alt="Churan Chacha Business Partnership"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 "></div>
          </div>
        </div>
        
        {/* Value Proposition - New Section */}
        <div className="mb-20">
          <h2 className="font-heading text-3xl md:text-4xl text-primary-10 mb-4 text-center">
            Why Churan Chacha is the Perfect Partner
          </h2>
          <p className="font-body text-gray-700 text-center max-w-3xl mx-auto mb-12">
            We're not just another candy brand. We're a nostalgic experience that creates emotional connections 
            and drives customer loyalty like no other product in the market.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-3">Authentic Heritage Brand</h3>
              <p className="font-body text-gray-700 mb-4">
                India's most authentic churan candy with traditional recipes and high-quality ingredients that create memorable taste experiences.
              </p>
              <div className="text-sm font-body text-orange-600">Traditional recipes, modern appeal</div>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-3">Rapid Growth Potential</h3>
              <p className="font-body text-gray-700 mb-4">
                Join us on our exciting journey as we expand across India with growing customer base and increasing market presence.
              </p>
              <div className="text-sm font-body text-orange-600">Growing brand with huge potential</div>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-3">Universal Appeal</h3>
              <p className="font-body text-gray-700 mb-4">
                Nostalgic flavors that connect with all age groups - from children discovering new tastes to adults reliving memories.
              </p>
              <div className="text-sm font-body text-orange-600">Nostalgic connection across generations</div>
            </div>
          </div>
        </div>
        
        {/* Partnership Types - Enhanced */}
        <div id="partnership-options" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-primary-10 mb-4">Choose Your Partnership Path</h2>
            <p className="font-body text-gray-700 max-w-2xl mx-auto">
              Four ways to build a profitable business with Churan Chacha. Each path offers unique benefits 
              tailored to different business models and investment levels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Retail Partnership Card */}
            <div className="group bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:border-primary-10 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-body">Most Popular</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-2xl text-primary-10 mb-3">Retail Partnerships</h3>
              <p className="font-body text-gray-700 mb-6">
                Perfect for store owners looking to add a high-margin, fast-moving product to their inventory. 
                Minimal investment with maximum returns.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700">Attractive profit margins</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700">Low minimum order quantity</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700">Free marketing materials</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700">Dedicated account support</span>
                </div>
              </div>
              
              <a 
                href="/b2b/retail-partnerships" 
                className="bg-primary-10 text-white w-full py-3 px-4 rounded-lg hover:bg-primary-9 transition-colors flex items-center justify-center font-body"
              >
                Explore More <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            {/* Distribution Card */}
            <div className="group bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:border-orange-500 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-body">High Growth</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-heading text-2xl text-primary-10 mb-3">Distribution Rights</h3>
              <p className="font-body text-gray-700 mb-6">
                Become the exclusive distributor for your region. Build a sustainable business with 
                territorial protection and volume incentives.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span className="font-body text-gray-700">Exclusive territory rights</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span className="font-body text-gray-700">Competitive distributor margins</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span className="font-body text-gray-700">Logistics & supply support</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span className="font-body text-gray-700">Performance bonuses</span>
                </div>
              </div>
              
              <a 
                href="/b2b/distribution" 
                className="bg-primary-10 text-white w-full py-3 px-4 rounded-lg hover:bg-primary-9 transition-colors flex items-center justify-center font-body"
              >
                Explore More <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            {/* Corporate Gifting Card */}
            <div className="group bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:border-purple-500 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-body">Custom</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-heading text-2xl text-primary-10 mb-3">Event Gifting</h3>
              <p className="font-body text-gray-700 mb-6">
                Create memorable experiences with custom packaging for weddings, celebrations, 
                and special events.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="font-body text-gray-700">Custom packaging & branding</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="font-body text-gray-700">Bulk discount pricing</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="font-body text-gray-700">Event planning support</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="font-body text-gray-700">Direct delivery service</span>
                </div>
              </div>
              
              <a 
                href="/b2b/event-gifting" 
                className="bg-primary-10 text-white w-full py-3 px-4 rounded-lg hover:bg-primary-9 transition-colors flex items-center justify-center font-body"
              >
                Explore More <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            {/* Corporate Partnership Card */}
            <div className="group bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:border-green-500 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-body">B2B</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Handshake className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-heading text-2xl text-primary-10 mb-3">Corporate Partnership</h3>
              <p className="font-body text-gray-700 mb-6">
                Partner with us for employee rewards, client appreciation, and corporate events with volume benefits.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700">Volume-based pricing</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700">Corporate branding options</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700">Flexible payment terms</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-body text-gray-700">Account management</span>
                </div>
              </div>
              
              <a 
                href="/b2b/corporate-partnerships" 
                className="bg-primary-10 text-white w-full py-3 px-4 rounded-lg hover:bg-primary-9 transition-colors flex items-center justify-center font-body"
              >
                Explore More <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Why Partner With Us */}
        <div className="bg-yellow-50 p-8 md:p-12 rounded-xl mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Why Partner With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-primary-10 mb-2">Authentic Products</h3>
                <p className="font-body text-gray-700">
                  Our candies are crafted using traditional recipes and high-quality ingredients, ensuring 
                  an authentic taste that stands out in the market.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-primary-10 mb-2">Strong Brand Recognition</h3>
                <p className="font-body text-gray-700">
                  The Churan Chacha brand resonates with customers of all ages, combining nostalgia with 
                  modern appeal through our distinctive branding and mascot.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-primary-10 mb-2">Marketing Support</h3>
                <p className="font-body text-gray-700">
                  We provide comprehensive marketing materials, including product displays, promotional 
                  banners, and digital assets to help drive sales.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-primary-10 mb-2">Flexible Order Options</h3>
                <p className="font-body text-gray-700">
                  Our minimum order quantities are designed to be accessible for businesses of all sizes, 
                  with volume-based discounts and customization options.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-primary-10 mb-2">Reliable Supply Chain</h3>
                <p className="font-body text-gray-700">
                  Our robust production capabilities and logistics network ensure timely delivery and 
                  consistent product availability throughout the year.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-primary-10 mb-2">Dedicated Account Management</h3>
                <p className="font-body text-gray-700">
                  Each business partner is assigned a dedicated account manager who provides personalized 
                  support and guidance throughout the partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Success Stories */}
        <div className="mb-16 hidden"> {/* This div is hidden*/}
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Partner Success Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                  <Image 
                    src="/b2b/partner-1.jpg"
                    alt="Partner"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary-10">Raj's Corner Store</h3>
                  <p className="font-body text-gray-600">Local Retailer, Mumbai</p>
                </div>
              </div>
              <p className="font-body text-gray-700 italic mb-4">
                "Churan Chacha products are flying off my shelves! Customers love the authentic taste and keep asking for more. 
                The nostalgic packaging attracts both kids and adults."
              </p>
              <p className="font-body text-gray-700">
                <span className="text-orange-600 font-heading">Impact:</span> 25% increase in foot traffic, 
                kids section became most popular area
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                  <Image 
                    src="/b2b/partner-2.jpg"
                    alt="Partner"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary-10">Priya Event Solutions</h3>
                  <p className="font-body text-gray-600">Event Planner, Delhi</p>
                </div>
              </div>
              <p className="font-body text-gray-700 italic mb-4">
                "We used Churan Chacha candies for a corporate event and the response was amazing! 
                The custom packaging looked fantastic and everyone was talking about the unique flavors."
              </p>
              <p className="font-body text-gray-700">
                <span className="text-orange-600 font-heading">Impact:</span> Featured in 5 events, 
                became signature offering for Indian-themed celebrations
              </p>
            </div>
          </div>
        </div>
        
        {/* Inquiry Form */}
        <div id="inquiry-form" className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-6 text-center">Partner With Us</h2>
          <p className="font-body text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Interested in partnering with Churan Chacha? Fill out the form below and our 
            business development team will get back to you within 48 hours.
          </p>
          
          {formStatus === 'success' ? (
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Thank You for Your Interest!</h3>
              <p className="font-body text-gray-700 mb-4">
                We've received your inquiry and our team will review it shortly. Expect to hear from us within 48 hours.
                In the meantime, you can explore our product catalog.
              </p>
              <Link href="/shop" className="bg-primary-10 text-white px-6 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body">
                Browse Our Products
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="fullName" className="block font-body text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                    required
                  />
                </div>
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
                <label htmlFor="businessType" className="block font-body text-gray-700 mb-1">Type of Business*</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="Retail Store">Retail Store</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Online Retailer">Online Retailer</option>
                  <option value="Event Planner">Event Planner</option>
                  <option value="Corporate Gifting">Corporate Gifting</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="requirements" className="block font-body text-gray-700 mb-1">Requirements*</label>
                <select
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                  required
                >
                  <option value="">Select Requirements</option>
                  <option value="Retail Partnership">Retail Partnership</option>
                  <option value="Distribution Rights">Distribution Rights</option>
                  <option value="Bulk Order">Bulk Order (&gt;100 units)</option>
                  <option value="Custom Packaging">Custom Packaging</option>
                  <option value="Corporate Gifting">Corporate Gifting</option>
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
                  placeholder="Tell us more about your business and partnership goals..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-white text-primary-10 border-2 border-primary-10 px-8 py-3 rounded-lg hover:bg-primary-10 hover:text-white transition-colors font-body"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Contact Information Section */}
        {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl mb-16">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl text-primary-10 mb-4">Get in Touch</h2>
            <p className="font-body text-gray-700 max-w-2xl mx-auto">
              Ready to start your partnership journey? Our business development team is here to help you every step of the way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Business Hotline</h3>
              <p className="font-body text-gray-700">+91 98765 43210</p>
              <p className="font-body text-gray-600 text-sm">Mon-Fri 9AM-6PM</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Partnership Email</h3>
              <p className="font-body text-gray-700">partnerships@churanchacha.com</p>
              <p className="font-body text-gray-600 text-sm">Response within 24 hours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Headquarters</h3>
              <p className="font-body text-gray-700">Mumbai, Maharashtra</p>
              <p className="font-body text-gray-600 text-sm">Schedule a visit</p>
            </div>
          </div>
        </div> */}
        
        {/* FAQ Section */}
        <div>
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="font-heading text-xl text-primary-10">
                    {faq.question}
                  </h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="font-body text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 