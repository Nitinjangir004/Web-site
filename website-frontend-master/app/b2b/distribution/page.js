'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Truck, MapPin, TrendingUp, Users, CheckCircle, Star, ArrowLeft, Package, Percent, Target, Award } from 'lucide-react';

export default function DistributionPage() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        currentBrands: '',
        deliveryFleet: '',
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
                address: '',
                currentBrands: '',
                deliveryFleet: '',
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
                    <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-body text-sm mb-4">
                        <Truck className="h-4 w-4 mr-2" />
                        Distribution Partnership Program
                    </div>
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-10 mb-6">Distribution Partnerships</h1>
                    <p className="font-body text-gray-700 text-lg max-w-3xl mx-auto mb-8">
                        Become a regional powerhouse for Churan Chacha products. Our distribution program offers exclusive territorial rights,
                        comprehensive logistics support, and attractive volume-based incentives to help you build a profitable business.
                    </p>
                    <div className="relative h-80 md:h-[650px]  w-full rounded-xl overflow-hidden">
                    <Image
                            src="/b2b/distribution/distribution.png"
                            alt="Distribution Partnership"
                            fill
                            className="object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                </div>

                {/* Key Benefits */}
                <div className="mb-16">
                    <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Why Choose Distribution Partnership?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center  text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                        <Image
                                src="/b2b/distribution/exclusive_rights.png"
                                alt="Dedicated Support"
                                width={150}   // adjust as per your image
                                height={100}  // maintain aspect ratio
                            />
                            <h3 className="font-heading text-xl text-primary-10 mb-2">Exclusive Territorial Rights</h3>

                        </div>

                        <div className="flex flex-col items-center  text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                        <Image
                                src="/b2b/distribution/growth_incentives.png"
                                alt="Dedicated Support"
                                width={150}   // adjust as per your image
                                height={100}  // maintain aspect ratio
                            />
                            <h3 className="font-heading text-xl text-primary-10 mb-2">High Margins</h3>

                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                            <Image
                                src="/b2b/distribution/dedicated_support.png"
                                alt="Dedicated Support"
                                width={150}   // adjust as per your image
                                height={100}  // maintain aspect ratio
                            />

                            <h3 className="font-heading text-xl text-primary-10 mb-2">Dedicated Support</h3>

                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                        <Image
                                src="/b2b/distribution/marketing_material.png"
                                alt="Dedicated Support"
                                width={150}   // adjust as per your image
                                height={100}  // maintain aspect ratio
                            />
                            <h3 className="font-heading text-xl text-primary-10 mb-2">Marketing Support</h3>

                        </div>
                    </div>
                </div>

                {/* Territory Map */}
                <div className="bg-yellow-50 p-8 md:p-12 rounded-xl mb-16">
                    <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Available Territories</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                    <MapPin className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-lg text-primary-10">North India</h3>
                                    <p className="font-body text-gray-600 text-sm">Available</p>
                                </div>
                            </div>
                            <p className="font-body text-gray-700 text-sm mb-3">
                                Delhi NCR, Punjab, Haryana, Uttar Pradesh, Uttarakhand
                            </p>
                            <div className="text-center p-2 bg-green-50 rounded-lg">
                                <span className="font-body text-green-800 text-sm">Prime Territory</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <MapPin className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-lg text-primary-10">West India</h3>
                                    <p className="font-body text-gray-600 text-sm">Limited Availability</p>
                                </div>
                            </div>
                            <p className="font-body text-gray-700 text-sm mb-3">
                                Maharashtra, Gujarat, Rajasthan, Madhya Pradesh
                            </p>
                            <div className="text-center p-2 bg-blue-50 rounded-lg">
                                <span className="font-body text-blue-800 text-sm">High Potential</span>
                            </div>
                        </div>

                        {/* <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                                    <MapPin className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-lg text-primary-10">South India</h3>
                                    <p className="font-body text-gray-600 text-sm">Available</p>
                                </div>
                            </div>
                            <p className="font-body text-gray-700 text-sm mb-3">
                                Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Kerala
                            </p>
                            <div className="text-center p-2 bg-orange-50 rounded-lg">
                                <span className="font-body text-orange-800 text-sm">Growth Market</span>
                            </div>
                        </div> */}

                        {/* <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                    <MapPin className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-lg text-primary-10">East India</h3>
                                    <p className="font-body text-gray-600 text-sm">Available</p>
                                </div>
                            </div>
                            <p className="font-body text-gray-700 text-sm mb-3">
                                West Bengal, Bihar, Jharkhand, Odisha, Assam
                            </p>
                            <div className="text-center p-2 bg-purple-50 rounded-lg">
                                <span className="font-body text-purple-800 text-sm">Emerging Market</span>
                            </div>
                        </div> */}

                        {/* <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                    <MapPin className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-lg text-primary-10">Central India</h3>
                                    <p className="font-body text-gray-600 text-sm">Available</p>
                                </div>
                            </div>
                            <p className="font-body text-gray-700 text-sm mb-3">
                                Chhattisgarh, Madhya Pradesh Interior, Goa
                            </p>
                            <div className="text-center p-2 bg-red-50 rounded-lg">
                                <span className="font-body text-red-800 text-sm">Untapped Potential</span>
                            </div>
                        </div> */}

                        {/* <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                                    <MapPin className="h-6 w-6 text-teal-600" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-lg text-primary-10">Northeast India</h3>
                                    <p className="font-body text-gray-600 text-sm">Available</p>
                                </div>
                            </div>
                            <p className="font-body text-gray-700 text-sm mb-3">
                                All Seven Sister States, Sikkim
                            </p>
                            <div className="text-center p-2 bg-teal-50 rounded-lg">
                                <span className="font-body text-teal-800 text-sm">Special Focus</span>
                            </div>
                        </div> */}
                    </div>

                    <div className="text-center">
                        <p className="font-body text-gray-700 mb-4">
                            Interested in a specific territory? Contact us to discuss availability and requirements.
                        </p>
                        <a href="#application-form" className="bg-white text-primary-10 border-2 border-primary-10 px-6 py-3 rounded-lg hover:bg-primary-10 hover:text-white transition-colors font-body">
                            Apply for Territory
                        </a>
                    </div>
                </div>

                {/* Investment & Requirements */}
                {/* <div className="mb-16">
                    <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Investment & Requirements</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                            <h3 className="font-heading text-2xl text-primary-10 mb-6">Financial Requirements</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="font-body text-gray-700">Initial Investment</span>
                                    <span className="font-heading text-primary-10">₹5-15 Lakhs</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="font-body text-gray-700">Security Deposit</span>
                                    <span className="font-heading text-primary-10">₹2 Lakhs</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="font-body text-gray-700">Minimum Monthly Order</span>
                                    <span className="font-heading text-primary-10">₹3 Lakhs</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-body text-gray-700">Working Capital</span>
                                    <span className="font-heading text-primary-10">₹5-10 Lakhs</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                            <h3 className="font-heading text-2xl text-primary-10 mb-6">Infrastructure Requirements</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1" />
                                    <span className="font-body text-gray-700">Warehouse space: Minimum 2000 sq ft</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1" />
                                    <span className="font-body text-gray-700">Climate-controlled storage capability</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1" />
                                    <span className="font-body text-gray-700">Own delivery fleet or logistics partnerships</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1" />
                                    <span className="font-body text-gray-700">Experienced sales team (minimum 3 people)</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1" />
                                    <span className="font-body text-gray-700">Valid trade licenses and GST registration</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1" />
                                    <span className="font-body text-gray-700">3+ years experience in FMCG distribution</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

               

                {/* Success Story */}
                {/* <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-16">
                    <h2 className="font-heading text-3xl text-primary-10 mb-6 text-center">Distributor Success Story</h2>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/3">
                            <div className="relative aspect-square rounded-xl overflow-hidden">
                                <Image
                                    src="/testimonials/3.png"
                                    alt="Successful Distributor"
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
                                <span className="font-body text-primary-10">Regional Distributor since 2021</span>
                            </div>
                            <h3 className="font-heading text-2xl text-primary-10 mb-2">Gateway Distributors Pvt. Ltd.</h3>
                            <p className="font-body text-gray-600 mb-4">Delhi NCR Territory</p>
                            <blockquote className="font-body text-gray-700 italic mb-4">
                                "Partnering with Churan Chacha has been one of our best business decisions. We started with just Delhi and
                                now cover the entire NCR region. The product quality, brand recognition, and support from the team has helped
                                us build a sustainable and profitable business. We've expanded from 50 retailers to over 200 outlets in just 2 years."
                            </blockquote>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <div className="font-heading text-lg text-primary-10">200+</div>
                                    <div className="font-body text-gray-600 text-sm">Retail Outlets</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <div className="font-heading text-lg text-orange-600">45%</div>
                                    <div className="font-body text-gray-600 text-sm">YoY Growth</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <div className="font-heading text-lg text-purple-600">₹50L</div>
                                    <div className="font-body text-gray-600 text-sm">Monthly Revenue</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Application Form */}
                <div id="application-form" className="bg-yellow-50 p-8 rounded-xl mb-16">
                    <h2 className="font-heading text-3xl text-primary-10 mb-6 text-center">Apply for Distribution Partnership</h2>
                    <p className="font-body text-gray-700 text-center max-w-3xl mx-auto mb-8">
                        Ready to become a regional distributor for Churan Chacha? Fill out the detailed application form below.
                        Our distribution partnerships team will review your application and schedule a meeting within 48 hours.
                    </p>

                    {formStatus === 'success' ? (
                        <div className="bg-white p-6 rounded-lg border border-green-200 text-center max-w-2xl mx-auto">
                            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-heading text-xl text-primary-10 mb-2">Application Submitted Successfully!</h3>
                            <p className="font-body text-gray-700 mb-4">
                                Thank you for your interest in becoming a Churan Chacha distributor. Our business development team will
                                review your application and contact you within 48 hours to schedule a detailed discussion.
                            </p>
                            <Link href="/shop" className="bg-primary-10 text-white px-6 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body">
                                Explore Our Product Range
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

                            <div className="mb-4">
                                <label htmlFor="address" className="block font-body text-gray-700 mb-1">Company Address*</label>
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
                                <label htmlFor="deliveryFleet" className="block font-body text-gray-700 mb-1">Delivery Capability*</label>
                                <select
                                    id="deliveryFleet"
                                    name="deliveryFleet"
                                    value={formData.deliveryFleet}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                                    required
                                >
                                    <option value="">Select Delivery Capability</option>
                                    <option value="Own Fleet">Own Fleet</option>
                                    <option value="Third-party Logistics">Third-party Logistics</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="currentBrands" className="block font-body text-gray-700 mb-1">Current Brands Distributed</label>
                                <input
                                    type="text"
                                    id="currentBrands"
                                    name="currentBrands"
                                    value={formData.currentBrands}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                                    placeholder="List the brands you currently distribute"
                                />
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
                                    placeholder="Tell us about your distribution network, market reach, and why you want to partner with Churan Chacha..."
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-white text-primary-10 border-2 border-primary-10 px-8 py-3 rounded-lg hover:bg-primary-10 hover:text-white transition-colors font-body"
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
                    <h3 className="font-heading text-xl text-primary-10 mb-4">Ready to Discuss Your Territory?</h3>
                    <p className="font-body text-gray-700 mb-4">
                        Our distribution partnerships team is ready to discuss opportunities in your region.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="mailto:distribution@churanchacha.com" className="bg-white text-primary-10 border-2 border-primary-10 px-6 py-3 rounded-lg hover:bg-primary-10 hover:text-white transition-colors font-body">
                            Email Our Team
                        </Link>
                        <Link href="tel:+91-9876543211" className="bg-primary-10 text-white border-2 border-primary-10 px-6 py-3 rounded-lg hover:bg-white hover:text-primary-10 transition-colors font-body">
                            Call Us: +91-9876543211
                        </Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
} 