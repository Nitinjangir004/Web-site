'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Leaf, Shield, Smile, Star, Trophy } from 'lucide-react';

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState('introduction');
  const [activeVisionMissionTab, setActiveVisionMissionTab] = useState('vision');

  const a= "churan chacha 2";

  const contentData = {
    introduction: {
      title: "Introduction",
      content: (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            हर इंसान के अंदर एक बच्चा होता हैं,<br />
            जो बढ़ती उम्र और जिम्मेदारियों के चलते कहीं गुम सा हो जाता हैं,<br />
            हम आपके उस मासूम से बचपने को वापस जगा रहे हैं।
          </p>
          <p className="text-lg leading-relaxed">
            याद करो वो शरारतें, वो हँसी, वो मस्ती, और वो यादें,<br />
            जो उम्र बढ़ने के साथ कहीं पीछे छूट गईं।<br />
            इस भागती दुनिया को ज़रा सा रोक के,<br />
            हम फिर से वही बचपन वाली गलियाँ दिखाने आए हैं।
          </p>
          <p className="text-xl font-bold text-primary-10 mt-6">
            चुरन चाचा,<br />
            क्योंकि उम्र भले ही बढ़ गई हो, पर बचपना अभी भी बाकी है।
          </p>
        </div>
      )
    },
    whoWeAre: {
      title: "Who We Are?",
      content: (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            Churan Chacha is not just a candy brand - it's an emotion, a storyteller, and a time-traveling ticket to the most colorful parts of our Indian childhood. We bring back the chatpata taste of desi life through handcrafted candies and heartfelt storytelling.
          </p>
          <p className="text-lg leading-relaxed">
            Every product is a sweet-sour reminder of the mischief, magic, and memories that made growing up in India so unforgettable. In today's busy and fast moving world we exist to slow you down for a bit and bring your inner child out again.
          </p>
          <div className="mt-6">
            <p className="text-lg font-semibold text-primary-10 mb-3">At our core, we are:</p>
            <ul className="space-y-2 text-lg">
              <li><strong>Rooted in tradition</strong> – Inspired by dadi ke nuskhe and traditional Indian treats.</li>
              <li><strong>Wrapped in fun</strong> – Every candy is a blend of taste, emotion, and storytelling</li>
              <li><strong>Built for connection</strong> – We don't just sell; we relive, recreate, and reconnect</li>
            </ul>
          </div>
          <p className="text-lg font-semibold text-primary-10 mt-6">
            We are the bridge between India's rich flavor heritage and its new-age storytelling spirit.
          </p>
        </div>
      )
    },
    whyWeExist: {
      title: "Why We Exist?",
      content: (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            In a world obsessed with imported chocolates and synthetic sweets, Churan Chacha dares to taste different.
          </p>
          <ul className="space-y-3 text-lg">
            <li>• We believe in <strong>asli desi flavours</strong> that taste like home</li>
            <li>• We celebrate <strong>Indian culture</strong> through taste and tale</li>
            <li>• We want to bring <strong>joy and laughter</strong> back into everyday life</li>
          </ul>
        </div>
      )
    },
    whatWeOffer: {
      title: "What We Offer?",
      content: (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            Our offerings are more than products, they're pieces of a world we're building:
          </p>
          <ul className="space-y-3 text-lg">
            <li>• <strong>Desi candies</strong> made from traditional & 100% natural ingredients</li>
            <li>• <strong>Comics, characters, and stories</strong> that reflect India's heartland mischief</li>
            <li>• <strong>A brand personality</strong> that feels like a mix of your best friend and your childhood diary</li>
          </ul>
          <p className="text-lg font-semibold text-primary-10 mt-6">
            We create an experience that melts on your tongue and stays in your heart.
          </p>
        </div>
      )
    },
    ourImpact: {
      title: "Our Impact",
      content: (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            Churan Chacha is not just a brand but a revival of desi nostalgia, wrapped in sweetness. It's a growing community that cherishes the charm of simplicity in a fast-paced world, bonds over shared memories, and finds happiness in the little, familiar joys of Indian life.
          </p>
          <div className="mt-6 space-y-3 text-lg leading-relaxed">
            <p>हम वो गलियाँ सजाते हैं<br />जहां हँसी गूंजती है,<br />जहां बचपन अब भी जिंदा है।</p>
            <p>हम वो पल लौटाते हैं,<br />जो दिल ने कभी छोड़ें ही नही।</p>
            <p>हम सिर्फ कैंडी नही, शरारतें बेचते हैं।<br />हर पैक में छुपा है एक क़िस्सा<br />थोड़ा खट्टा, थोड़ा मीठा, पूरा देसी।</p>
          </div>
        </div>
      )
         }
   };

   const visionMissionData = {
     vision: {
       title: "Our Vision",
       content: (
         <div className="space-y-4">
           <p className="text-xl font-bold text-primary-10 leading-relaxed">
             "To become India's most loved desi candy brand that revives emotions, stories, and the tangy taste of childhood."
           </p>
           <p className="text-lg leading-relaxed">
             We envision a world where Indian flavors stand tall with pride, where a candy is not just eaten — it's remembered. We want to be the brand that brings back nostalgia, connection, and cultural sweetness in every bite.
           </p>
           <p className="text-lg leading-relaxed font-semibold text-primary-10">
             Our vision is to be more than a product —<br />
             To become a part of everyday life, celebrations, and chai-break conversations — just like childhood used to be.
           </p>
         </div>
       )
     },
     mission: {
       title: "Our Mission",
       content: (
         <div className="space-y-4">
           <p className="text-xl font-bold text-primary-10 leading-relaxed">
             "To recreate the magic of India's traditional candy culture through authentic taste, meaningful storytelling, and heartwarming fun."
           </p>
           <p className="text-lg leading-relaxed">We do this by:</p>
           <ul className="space-y-3 text-lg">
             <li>• Using <strong>100% desi ingredients</strong> and traditional recipes</li>
             <li>• Blending <strong>flavour with fiction</strong> — comics, characters, and relatable stories</li>
             <li>• Designing products that make people <strong>smile, remember, and share</strong></li>
             <li>• Building a community that celebrates <strong>childhood joy and cultural roots</strong></li>
             <li>• Ensuring <strong>quality, purity, and emotion</strong> in every product we create</li>
           </ul>
           <p className="text-lg font-bold text-primary-10 mt-6">
             "हम सिर्फ कैंडी नहीं बनाते — हम रिश्तों, यादों और मुस्कान का पैकेट बेचते हैं।"
           </p>
           <p className="text-lg leading-relaxed">
             Our mission is to remind every Indian — no matter their age — that<br />
             <span className="font-bold text-primary-10">"Kyoki Bachpana abhi baki hai."</span>
           </p>
         </div>
       )
     }
   };

  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-8 md:py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl text-center mb-8 text-primary-10 font-heading">
            Our Story
          </h1>
                      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[50vh] md:h-[80vh] object-contain"
              >
                <source src="/aboutUs/1.mp4" type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </div>
        </div>

              {/* Our Story Slider Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl text-primary-10 mb-8 text-center font-heading">Know More About Us</h2>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {Object.entries(contentData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300 font-heading text-sm md:text-base ${
                  activeTab === key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {data.title}
              </button>
            ))}
          </div>

          {/* Content Display */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 min-h-[400px]">
            <h3 className="text-2xl md:text-3xl text-primary-10 mb-6 font-heading text-center">
              {contentData[activeTab].title}
            </h3>
            <div className="font-body text-gray-700 max-w-4xl mx-auto">
              {contentData[activeTab].content}
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl text-primary-10 mb-8 text-center font-heading">Our Vision & Mission</h2>
          
          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            {Object.entries(visionMissionData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveVisionMissionTab(key)}
                className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-medium transition-all duration-300 font-heading text-base md:text-lg ${
                  activeVisionMissionTab === key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {data.title}
              </button>
            ))}
          </div>

          {/* Content Display */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 min-h-[400px]">
            <h3 className="text-2xl md:text-3xl text-primary-10 mb-6 font-heading text-center">
              {visionMissionData[activeVisionMissionTab].title}
            </h3>
            <div className="font-body text-gray-700 max-w-4xl mx-auto">
              {visionMissionData[activeVisionMissionTab].content}
            </div>
          </div>
        </div>
 
        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl text-primary-10 mb-6 text-center font-heading">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 py-8 text-center h-52 flex flex-col justify-center items-center hover:shadow-3xl transition-all duration-300">
              <Image 
                src="/aboutUs/value icons/1.png" 
                alt="Desi Pride" 
                width={112} 
                height={112} 
                className="mx-auto mb-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h3 className="text-sm text-primary-10 font-heading">Desi Pride</h3>
            </div>
            
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 py-8 text-center h-52 flex flex-col justify-center items-center hover:shadow-3xl transition-all duration-300">
              <Image 
                src="/aboutUs/value icons/2.png" 
                alt="Childlike Joy" 
                width={112} 
                height={112} 
                className="mx-auto mb-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h3 className="text-sm text-primary-10 font-heading">Childlike Joy</h3>
            </div>
            
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 py-8 text-center h-52 flex flex-col justify-center items-center hover:shadow-3xl transition-all duration-300">
              <Image 
                src="/aboutUs/value icons/3.png" 
                alt="Emotional Storytelling" 
                width={112} 
                height={112} 
                className="mx-auto mb-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h3 className="text-sm text-primary-10 font-heading">Emotional Storytelling</h3>
            </div>
            
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 py-8 text-center h-52 flex flex-col justify-center items-center hover:shadow-3xl transition-all duration-300">
              <Image 
                src="/aboutUs/value icons/4.png" 
                alt="Quality without Compromise" 
                width={112} 
                height={112} 
                className="mx-auto mb-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h3 className="text-sm text-primary-10 font-heading">Quality without Compromise</h3>
            </div>
            
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 py-8 text-center h-52 flex flex-col justify-center items-center hover:shadow-3xl transition-all duration-300">
              <Image 
                src="/aboutUs/value icons/5.png" 
                alt="Inclusive Fun" 
                width={112} 
                height={112} 
                className="mx-auto mb-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h3 className="text-sm text-primary-10 font-heading">Inclusive Fun</h3>
            </div>
            
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 py-8 text-center h-52 flex flex-col justify-center items-center hover:shadow-3xl transition-all duration-300">
              <Image 
                src="/aboutUs/value icons/6.png" 
                alt="Consistency in Character" 
                width={112} 
                height={112} 
                className="mx-auto mb-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h3 className="text-sm text-primary-10 font-heading">Consistency in Character</h3>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl text-primary-10 mb-6 text-center font-heading">Meet Our Team</h2>
          
          {/* First Row - Founders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center mb-12">
            <div className="text-center">
              <div className="relative w-64 h-64 rounded-xl overflow-hidden mb-4 border-2 border-primary-600 shadow-lg">
                <Image 
                  src="/aboutUs/team/keshav.png"
                  alt="Keshav Sharma"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="text-2xl text-primary-10 font-heading">Keshav Sharma</h3>
              <p className="font-body text-gray-600 text-lg">Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-64 h-64 rounded-xl overflow-hidden mb-4 border-2 border-primary-600 shadow-lg">
                <Image 
                  src="/aboutUs/team/hitesh2.png"
                  alt="Hitesh Sharma"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="text-2xl text-primary-10 font-heading">Hitesh Sharma</h3>
              <p className="font-body text-gray-600 text-lg">Co-Founder & COO</p>
            </div>
          </div>

          {/* Second Row - Team Members */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="text-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 border-2 border-primary-600 shadow-lg max-w-[150px] mx-auto">
                <Image 
                  src="/aboutUs/team/charvi.png"
                  alt="Charvi Vyas"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="text-sm text-primary-10 font-heading">Charvi Vyas</h3>
              <p className="font-body text-gray-600 text-xs">Visual Designer</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 border-2 border-primary-600 shadow-lg max-w-[150px] mx-auto">
                <Image 
                  src="/aboutUs/team/laveena.jpeg"
                  alt="Laveena Keshwani"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="text-sm text-primary-10 font-heading">Laveena Keshwani</h3>
              <p className="font-body text-gray-600 text-xs">EIR - Founder's Office</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 border-2 border-primary-600 shadow-lg max-w-[150px] mx-auto">
                <Image 
                  src="/aboutUs/team/harsh.jpeg"
                  alt="Harsh Joshi"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="text-sm text-primary-10 font-heading">Harsh Joshi</h3>
              <p className="font-body text-gray-600 text-xs">Head of Operations</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 border-2 border-primary-600 shadow-lg max-w-[150px] mx-auto">
                <Image 
                  src="/aboutUs/team/rani.jpg"
                  alt="Rani Kumawat"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="text-sm text-primary-10 font-heading">Rani Kumawat</h3>
              <p className="font-body text-gray-600 text-xs">Creative Head</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm mb-16">
          <h2 className="text-3xl md:text-4xl text-primary-10 mb-6 text-center font-heading">Our Affiliations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="w-36 h-36 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center p-6">
                <Image 
                  src="/aboutUs/affiliations/dpiit.png"
                  alt="FSSAI Certified"
                  width={96}
                  height={96}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-36 h-36 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center p-6">
                <Image 
                  src="/aboutUs/affiliations/istart.png"
                  alt="ISO 9001"
                  width={96}
                  height={96}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-36 h-36 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center p-6">
                <Image 
                  src="/aboutUs/affiliations/msme.png"
                  alt="100% Vegetarian"
                  width={96}
                  height={96}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-36 h-36 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center p-6">
                <Image 
                  src="/aboutUs/affiliations/fssai.png"
                  alt="Export Quality"
                  width={96}
                  height={96}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
} 