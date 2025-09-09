'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Send, ChevronDown, ChevronUp } from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState('idle');
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send this data to your backend
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-10 mb-6">Get in Touch</h1>
          <p className="font-body text-gray-700 text-lg max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have a question about our products, 
            need help with an order, or just want to say hello, our team is here for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="font-heading text-2xl text-primary-10 mb-6">Send Us a Message</h2>
            
            {formStatus === 'success' ? (
              <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-heading text-xl text-primary-10 mb-2">Message Sent!</h3>
                <p className="font-body text-gray-700 mb-4">
                  Thank you for reaching out. We've received your message and will get back to you shortly.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="bg-white text-primary-10 border-2 border-primary-10 px-6 py-3 rounded-lg hover:bg-primary-10 hover:text-white transition-colors font-body"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-body text-gray-700 mb-1">Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-body text-gray-700 mb-1">Email*</label>
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block font-body text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block font-body text-gray-700 mb-1">Subject*</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10 appearance-none"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="Order Inquiry">Order Inquiry</option>
                      <option value="Product Information">Product Information</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block font-body text-gray-700 mb-1">Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-primary-10"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-primary-10 text-white px-6 py-3 rounded-lg hover:bg-primary-9 transition-colors font-body w-full md:w-auto"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Company Address */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="font-heading text-2xl text-primary-10 mb-4">Our Location</h2>
              <div className="font-body space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-primary-10">Corporate Office:</p>
                    <p className="text-gray-700">
                      Pansoriya Foods Private Limited<br />
                      Plot No. 41 A,  Shankar Nagar Vihar<br />
                      Murlipura, Jaipur<br />
                      Rajasthan - 302039, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-primary-10">Phone:</p>
                    <p className="text-gray-700">+91 8739975375 (WhatsApp)</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-primary-10">Email:</p>
                    <p className="text-gray-700">hello@churanchacha.in</p>
                  </div>
                </div>
                
               
              </div>
            </div>
            
            {/* Map */}
          
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl text-primary-10 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to select international locations. Shipping times and costs vary based on destination. Please contact our customer service for more details about international shipping options."
              },
              {
                question: "What is your return policy?",
                answer: "We accept returns within 7 days of delivery if products are damaged or defective. For quality and safety reasons, we generally don't accept returns for food items unless there's a specific issue with the product."
              },
              {
                question: "Are your products vegetarian?",
                answer: "Yes, all our products are 100% vegetarian. We take great care to ensure our ingredients meet vegetarian standards and are transparently labeled."
              },
              {
                question: "Can I place bulk orders for events?",
                answer: "Absolutely! We offer special pricing for bulk orders for events, weddings, or corporate gifting. Please contact our B2B team at business@churanchacha.com for inquiries."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-heading text-xl text-primary-10">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-primary-10 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary-10 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
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