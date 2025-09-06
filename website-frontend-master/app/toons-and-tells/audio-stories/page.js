'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Headphones, ArrowLeft, PlayCircle } from 'lucide-react';

export default function AudioStoriesPage() {
  // Get audio stories data from Redux store
  const { audioStories, featuredAudioStories } = useSelector(state => state.audioStories);
  
  // Combine all audio stories (featured + regular, remove duplicates)
  const allAudioStories = React.useMemo(() => {
    const storiesMap = new Map();
    
    // Add featured audio stories first
    if (featuredAudioStories && featuredAudioStories.length > 0) {
      featuredAudioStories.forEach(story => {
        storiesMap.set(story.id, story);
      });
    }
    
    // Add regular audio stories
    if (audioStories && audioStories.length > 0) {
      audioStories.forEach(story => {
        storiesMap.set(story.id, story);
      });
    }
    
    return Array.from(storiesMap.values());
  }, [audioStories, featuredAudioStories]);

  return (
    <div className="py-8 md:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/toons-and-tells" className="flex items-center text-primary-600 hover:text-primary-800 mr-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="font-accent">Back to Toons & Tells</span>
          </Link>
          
          <h1 className="font-display text-2xl md:text-3xl text-primary-800">Audio Stories Collection</h1>
        </div>
        
        <div className="text-center mb-12">
          <p className="font-body text-primary-700 text-lg max-w-3xl mx-auto">
            Listen to our delightful collection of audio stories that transport you to the nostalgic 
            world of Indian candies and childhood adventures!
          </p>
        </div>
        
        {/* Audio Stories Grid */}
        {allAudioStories && allAudioStories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {allAudioStories.map(story => (
              <div key={story.id} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 transition-transform hover:scale-105">
                <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-secondary-50">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 rounded-full p-2 transform transition-transform hover:scale-110">
                      <PlayCircle className="h-10 w-10 text-secondary-500" />
                    </div>
                  </div>
                </div>
                
                <div className="w-full">
                  <div className="flex flex-wrap justify-start mb-3 gap-2">
                    <span className="text-xs font-accent px-3 py-1 rounded-full bg-secondary-100 text-secondary-700">
                      Audio
                    </span>
                    <span className="text-xs font-accent px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      {story.duration}
                    </span>
                  </div>
                  
                  <h3 className="font-accent text-lg text-primary-800 mb-2 text-center line-clamp-1">{story.title}</h3>
                  <p className="font-body text-primary-600 text-sm mb-4 text-center line-clamp-1">
                    Narrator: {story.narrator}
                  </p>
                  
                  <Link 
                    href={`/toons-and-tells/audio/${story.slug}`} 
                    className="btn-secondary w-full text-center block"
                  >
                    <Headphones className="h-4 w-4 inline-block mr-1" /> Listen Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-body text-primary-600 text-lg mb-6">
              No audio stories available at the moment.
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
      </div>
    </div>
  );
} 