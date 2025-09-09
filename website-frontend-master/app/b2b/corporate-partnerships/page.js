'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  CheckCircle, 
  Users, 
  Calendar, 
  Package, 
  Star,
  Building2,
  Gift,
  TrendingUp,
  HeartHandshake,
  Trophy,
  Briefcase,
  Clock,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react';

export default function CorporatePartnershipsPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    companySize: '',
    partnershipType: '',
    annualRequirement: '',
    timeline: '',
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
        companySize: '',
        partnershipType: '',
        annualRequirement: '',
        timeline: '',
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-body text-sm mb-6">
            <Building2 className="h-4 w-4 mr-2" />
            Enterprise Solutions
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-primary-10 mb-6">
            Corporate Partnerships<br />
            <span className="text-primary-10">with Churan Chacha</span>
          </h1>
          <p className="font-body text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Partner with us for employee engagement, client appreciation, and corporate events. 
            Our authentic churan candies create memorable experiences that strengthen business relationships and boost team morale.
          </p>
          <div className="relative h-80 md:h-[650px]  w-full rounded-xl overflow-hidden">
            <Image
              src="/b2b/corporate/cooperate_partnership.png"
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
          <h2 className="font-heading text-3xl text-primary-10 text-center mb-12">
            Why Corporates Love Churan Chacha
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <HeartHandshake className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Employee Wellness</h3>
             
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Brand Recognition</h3>
             
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Cost Effective</h3>
            
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-heading text-lg text-primary-10 mb-2">Quality Assured</h3>
              <p className="font-body text-gray-700 text-sm">
                Lab-tested products with long shelf life and consistent quality
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Types */}
        {/* <div className="mb-16">
          <h2 className="font-heading text-3xl text-primary-10 text-center mb-12">
            Corporate Partnership Solutions
          </h2> */}
          
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">*/}
            {/* Employee Rewards */}
            {/* <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-4">Employee Rewards & Wellness</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Monthly wellness packages for employees</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Achievement & milestone celebration gifts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Team building event refreshments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Custom company branding options</span>
                </li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-body text-primary-10 text-sm">Perfect for: 50-1000+ employee companies</p>
              </div>
            </div> */}

            {/* Client Appreciation */}
            {/* <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Gift className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-4">Client Appreciation</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Luxury gift boxes for VIP clients</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Festival & occasion hampers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Contract signing celebration gifts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Personalized thank you packages</span>
                </li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-body text-primary-10 text-sm">Perfect for: B2B companies, consultancies</p>
              </div>
            </div> */}

            {/* Corporate Events */}
            {/* <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-4">Corporate Events</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Conference & seminar welcome kits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Product launch event giveaways</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Trade show & exhibition stands</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-body text-gray-700">Annual party & celebration treats</span>
                </li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-body text-primary-10 text-sm">Perfect for: Event organizers, large corporations</p>
              </div>
            </div>*/}
          {/* </div>   */}
        {/* </div> */}

        {/* Pricing Section */}
        {/* <div id="pricing" className="mb-16">
          <h2 className="font-heading text-3xl text-primary-10 text-center mb-12">
            Corporate Partnership Packages
          </h2> */}
          
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
            {/* Starter Package */}
            {/* <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl text-primary-10 mb-2">Starter Corporate</h3>
                <div className="font-heading text-3xl text-orange-600 mb-2">₹15,000</div>
                <p className="font-body text-gray-600 text-sm">Per quarter (3 months)</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-body text-gray-700">500 units per quarter</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-body text-gray-700">Basic custom packaging</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-body text-gray-700">Company logo inclusion</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-body text-gray-700">Direct delivery service</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-body text-gray-700">Email support</span>
                </li>
              </ul>
               */}
              {/* <div className="text-center">
                <a href="#application-form" className="bg-white text-primary-10 border-2 border-primary-10 px-6 py-3 rounded-lg hover:bg-primary-10 hover:text-white transition-colors font-body w-full block">
                  Choose Starter
                </a>
              </div>
            </div> */}

            {/* Business Package */}
            {/* <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-orange-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full font-body text-sm">Most Popular</span>
              </div>
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl text-primary-10 mb-2">Business Corporate</h3>
                <div className="font-heading text-3xl text-orange-600 mb-2">₹45,000</div>
                <p className="font-body text-gray-600 text-sm">Per quarter (3 months)</p>
              </div>
               */}
              {/* <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="font-body text-gray-700">1,500 units per quarter</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="font-body text-gray-700">Premium custom packaging</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="font-body text-gray-700">Custom message cards</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="font-body text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="font-body text-gray-700">Flexible delivery schedule</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="font-body text-gray-700">Phone & email support</span>
                </li>
              </ul> */}
              
              {/* <div className="text-center">
                <a href="#application-form" className="bg-primary-10 text-white px-6 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body w-full block">
                  Choose Business
                </a>
              </div>
            </div> */}

            {/* Enterprise Package */}
            {/* <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl text-primary-10 mb-2">Enterprise Corporate</h3>
                <div className="font-heading text-3xl text-orange-600 mb-2">₹1,20,000</div>
                <p className="font-body text-gray-600 text-sm">Per quarter (3 months)</p>
              </div>
               */}
              {/* <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-body text-gray-700">5,000+ units per quarter</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-body text-gray-700">Luxury custom packaging</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-body text-gray-700">Complete branding solutions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-body text-gray-700">Priority delivery & handling</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-body text-gray-700">Custom flavor development</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-body text-gray-700">24/7 dedicated support</span>
                </li>
              </ul> */}
              
              {/* <div className="text-center">
                <a href="#application-form" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-body w-full block">
                  Choose Enterprise
                </a>
              </div>
            </div>
          </div>
           */}
          {/* <div className="text-center mt-8">
            <p className="font-body text-gray-600">
              Need a custom package? <a href="#application-form" className="text-orange-600 hover:text-orange-700 font-body">Contact us</a> for personalized solutions.
            </p>
          </div>
        </div> */}

        {/* Success Story */}
        {/* <div className="bg-yellow-50 p-8 md:p-12 rounded-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-3xl text-primary-10 mb-6">Corporate Success Story</h2>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                    <Image 
                      src="/testimonials/5.png"
                      alt="TechVision Solutions"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-primary-10">TechVision Solutions</h3>
                    <p className="font-body text-gray-600">IT Services Company, Bangalore</p>
                  </div>
                </div>
                <p className="font-body text-gray-700 italic mb-4">
                  "Churan Chacha has become our go-to partner for employee wellness and client gifts. 
                  The authentic taste and thoughtful packaging always create positive conversations. 
                  Our employees love the monthly wellness packages!"
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="font-heading text-2xl text-orange-600">90%</div>
                    <div className="font-body text-gray-600 text-sm">Employee Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="font-heading text-2xl text-orange-600">2x</div>
                    <div className="font-body text-gray-600 text-sm">Client Appreciation</div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src="/testimonials/8.png"
                alt="Corporate Partnership Success"
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div> */}

        {/* Application Form */}
        <div id="application-form" className="bg-yellow-50 p-8 rounded-xl mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-6 text-center">Start Your Corporate Partnership</h2>
          <p className="font-body text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Ready to enhance your corporate gifting and employee engagement? Fill out the form below 
            and our corporate partnerships team will contact you within 24 hours.
          </p>
          
          {formStatus === 'success' ? (
            <div className="bg-white p-6 rounded-lg border border-green-200 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-heading text-xl text-primary-10 mb-2">Application Received!</h3>
              <p className="font-body text-gray-700 mb-4">
                Thank you for your interest in our corporate partnership program. Our team will review your 
                application and contact you within 24 hours to discuss next steps.
              </p>
              <Link href="/b2b" className="bg-primary-10 text-white px-6 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body">
                Explore Other Partnerships
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
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
                  <label htmlFor="companySize" className="block font-body text-gray-700 mb-1">Company Size*</label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                    required
                  >
                    <option value="">Select Company Size</option>
                    <option value="10-50 employees">10-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-500 employees">201-500 employees</option>
                    <option value="501-1000 employees">501-1000 employees</option>
                    <option value="1000+ employees">1000+ employees</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="partnershipType" className="block font-body text-gray-700 mb-1">Partnership Interest*</label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                    required
                  >
                    <option value="">Select Partnership Type</option>
                    <option value="Employee Rewards">Employee Rewards & Wellness</option>
                    <option value="Client Appreciation">Client Appreciation</option>
                    <option value="Corporate Events">Corporate Events</option>
                    <option value="All of the above">All of the above</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="annualRequirement" className="block font-body text-gray-700 mb-1">Annual Requirement*</label>
                  <select
                    id="annualRequirement"
                    name="annualRequirement"
                    value={formData.annualRequirement}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                    required
                  >
                    <option value="">Select Annual Requirement</option>
                    <option value="500-1,500 units">500-1,500 units</option>
                    <option value="1,500-5,000 units">1,500-5,000 units</option>
                    <option value="5,000-15,000 units">5,000-15,000 units</option>
                    <option value="15,000+ units">15,000+ units</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block font-body text-gray-700 mb-1">Timeline to Start*</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                    required
                  >
                    <option value="">Select Timeline</option>
                    <option value="Immediate (within 2 weeks)">Immediate (within 2 weeks)</option>
                    <option value="1 month">1 month</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="3+ months">3+ months</option>
                  </select>
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
                  placeholder="Tell us about your specific customization needs, branding requirements, or any other details..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary-10 text-white px-8 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Information */}
        {/* <div className="text-center bg-orange-50 p-8 rounded-xl">
          <h3 className="font-heading text-2xl text-primary-10 mb-4">Need to Speak with Our Corporate Team?</h3>
          <p className="font-body text-gray-700 mb-6">
            Our corporate partnerships specialists are ready to help design the perfect solution for your company.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="tel:+919876543210" 
              className="flex items-center gap-2 text-orange-700 hover:text-orange-800 font-body"
            >
              <Phone className="h-5 w-5" />
              +91 98765 43210
            </Link>
            <Link 
              href="mailto:corporate@churanchacha.com" 
              className="flex items-center gap-2 text-orange-700 hover:text-orange-800 font-body"
            >
              <Mail className="h-5 w-5" />
              corporate@churanchacha.com
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
} 