'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Camera, ArrowLeft } from 'lucide-react';

export default function CustomerStoriesPage() {
  const [zoomIdx, setZoomIdx] = useState(null);
  
  // Get customer stories data from Redux store
  const { customerStories, featuredCustomerStories } = useSelector(state => state.customerStories);
  
  // Debug logging
  console.log('Customer Stories Debug:', {
    customerStories: customerStories?.length || 0,
    featuredCustomerStories: featuredCustomerStories?.length || 0,
    customerStoriesData: customerStories,
    featuredCustomerStoriesData: featuredCustomerStories
  });
  
  // Combine all customer stories (featured + regular, remove duplicates)
  const allCustomerStories = React.useMemo(() => {
    const storiesMap = new Map();
    
    // Add featured customer stories first
    if (featuredCustomerStories && featuredCustomerStories.length > 0) {
      featuredCustomerStories.forEach(story => {
        storiesMap.set(story.id, story);
      });
    }
    
    // Add regular customer stories
    if (customerStories && customerStories.length > 0) {
      customerStories.forEach(story => {
        storiesMap.set(story.id, story);
      });
    }
    
    const result = Array.from(storiesMap.values());
    console.log('Combined customer stories:', result.length, result);
    return result;
  }, [customerStories, featuredCustomerStories]);
  
  return (
    <div className="py-8 md:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/toons-and-tells" className="flex items-center text-primary-600 hover:text-primary-800 mr-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="font-accent">Back to Toons & Tells</span>
          </Link>
          
          <h1 className="font-display text-2xl md:text-3xl text-primary-800">Stories from Our Fans</h1>
        </div>
        
        <div className="text-center mb-12">
          <p className="font-body text-primary-700 text-lg max-w-3xl mx-auto">
            Browse through heartwarming stories and creative artwork shared by Churan Chacha fans from all across India!
            Click on any story to view in full size.
          </p>
          
          <div className="mt-6">
            <Link 
              href="/toons-and-tells/submit-story" 
              className="btn-accent inline-flex items-center gap-2"
            >
              <Camera className="h-5 w-5" /> Share Your Story
            </Link>
          </div>
        </div>
        
        {/* Debug Info */}
        <div className="mb-4 p-4 bg-gray-100 rounded text-sm">
          <strong>Debug:</strong> Showing {allCustomerStories?.length || 0} customer stories
        </div>
        
        {/* All Stories Grid with Zoom Functionality */}
        {allCustomerStories && allCustomerStories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {allCustomerStories.map((story, idx) => (
              <div
                key={story.id}
                className="mx-auto flex-shrink-0 w-full aspect-[4/5] relative cursor-zoom-in"
                onClick={() => setZoomIdx(idx)}
              >
                <Image
                  src={story.image || `/images/Stories-from-Our-Fans/${idx + 1}.png`}
                  alt={story.title || `Fan story ${idx + 1}`}
                  fill
                  className="object-contain rounded-2xl bg-white transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  priority={idx < 8}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-body text-primary-600 text-lg mb-6">
              No customer stories available at the moment.
            </p>
            <Link 
              href="/toons-and-tells" 
              className="btn-primary inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Toons & Tells
            </Link>
          </div>
        )}
        
        {/* Zoom Modal */}
        {zoomIdx !== null && allCustomerStories && allCustomerStories.length > 0 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-all"
            onClick={() => setZoomIdx(null)}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] w-[80vw] md:w-[50vw] aspect-[4/5] flex items-center justify-center animate-zoomIn">
              <Image
                src={allCustomerStories[zoomIdx]?.image || `/images/Stories-from-Our-Fans/${zoomIdx + 1}.png`}
                alt={allCustomerStories[zoomIdx]?.title || `Fan story zoomed ${zoomIdx + 1}`}
                fill
                className="object-contain rounded-2xl shadow-2xl"
                sizes="80vw"
                priority
              />
              <button
                className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 text-xl font-bold text-primary-800 hover:bg-opacity-100 transition"
                onClick={e => { e.stopPropagation(); setZoomIdx(null); }}
                aria-label="Close zoom"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <style jsx global>{`
          @keyframes zoomIn {
            from { transform: scale(0.7); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-zoomIn {
            animation: zoomIn 0.3s cubic-bezier(0.4,0,0.2,1);
          }
        `}</style>
        
        {/* Submit Your Story CTA */}
        <div className="mt-16 py-8 bg-gradient-to-r from-tertiary-50 to-accent-50 rounded-2xl px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl text-primary-800 mb-4">
              Share Your Churan Chacha Story!
            </h2>
            <p className="font-body text-primary-700 mb-6">
              Have a fun memory with Churan Chacha's candies? Draw it, write it, or photograph it - 
              we'd love to feature your story in our collection!
            </p>
            <Link 
              href="/toons-and-tells/submit-story" 
              className="btn-accent inline-flex items-center gap-2"
            >
              <Camera className="h-5 w-5" /> Submit Your Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 