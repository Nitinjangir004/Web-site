'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, User, BookOpen, Headphones } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function AudioStoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

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

  // Find the current audio story by slug
  const audioStory = allAudioStories.find(item => item.slug === slug);

  // Audio player functions
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (volume > 0) {
        // Store the current volume before muting
        audioRef.current.dataset.previousVolume = volume.toString();
        setVolume(0);
        audioRef.current.volume = 0;
      } else {
        // Restore the previous volume or set to 1 if not available
        const previousVolume = audioRef.current.dataset.previousVolume 
          ? parseFloat(audioRef.current.dataset.previousVolume) 
          : 1;
        setVolume(previousVolume);
        audioRef.current.volume = previousVolume;
      }
    }
  };

  // If audio story not found
  if (!audioStory) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h2 className="font-display text-2xl text-primary-700 mb-4">Audio Story Not Found</h2>
          <p className="font-body text-primary-600 mb-6">The audio story you're looking for doesn't exist or has been moved.</p>
          <Link href="/toons-and-tells/audio-stories" className="btn-primary">
            Back to Audio Stories
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8 md:py-12 bg-background-cream">
      <div className="container-custom">
        {/* Global styles for audio waveform animation */}
        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { height: var(--h); opacity: 0.7; }
            50% { height: calc(var(--h) * 1.3); opacity: 1; }
          }
          .animate-pulse {
            animation: pulse 0.8s infinite;
          }
        `}</style>

        <div className="mb-16">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/toons-and-tells/audio-stories" className="flex items-center font-accent text-[#9c2990] hover:text-primary-800 transition-colors w-max">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Audio Stories
            </Link>
          </div>
          
          {/* Title Row */}
          <div className="flex items-center mb-4">
            <span className="inline-block text-xs font-accent px-3 py-1 rounded-full bg-[#b3f2e9] text-[#0e7490] mr-4">
              Audio Story
            </span>
            <h1 className="font-display text-2xl md:text-3xl text-[#9c2990]">{audioStory.title}</h1>
          </div>
          
          {/* Main layout: two columns */}
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Left: Details */}
            <div className="w-full md:w-3/5 order-2 md:order-1">
              {audioStory.subtitle && (
                <p className="font-accent text-[#9c2990] text-lg mb-2">{audioStory.subtitle}</p>
              )}
              <p className="font-body text-primary-700 mb-6">{audioStory.description}</p>
              <div className="flex flex-row flex-wrap gap-8 mb-2 items-center">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-[#9c2990] mr-2" />
                  <div>
                    <h3 className="text-xs font-accent text-[#9c2990]">Recommended Age</h3>
                    <p className="text-primary-700 font-medium text-base">{audioStory.age || '6+'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Headphones className="h-5 w-5 text-[#9c2990] mr-2" />
                  <div>
                    <h3 className="text-xs font-accent text-[#9c2990]">Duration</h3>
                    <p className="text-primary-700 font-medium text-base">{audioStory.duration || '--:--'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-[#9c2990] mr-2" />
                  <div>
                    <h3 className="text-xs font-accent text-[#9c2990]">Narrator</h3>
                    <p className="text-primary-700 font-medium text-base">{audioStory.narrator || 'Unknown'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Audio Player */}
            <div className="w-full md:w-2/5 flex justify-end order-1 md:order-2">
              <div className="flex flex-col items-center w-full max-w-[340px]">
                {/* Image Holder: square, white background, padding, rounded corners, sits above the blue player */}
                <div className="bg-white rounded-2xl shadow-md w-[90%] aspect-square flex items-center justify-center mb-0 z-10 relative -mb-8" style={{marginTop: '0.5rem'}}>
                  <div className="relative w-full h-full p-2">
                    <Image
                      src={audioStory.image}
                      alt={audioStory.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                
                {/* Blue Player: rounded, contains waveform, timeline, controls */}
                <div className="bg-[#0e7490] rounded-3xl shadow-lg w-full flex flex-col items-center pt-12 pb-8 px-0 -mt-8">
                  {/* Static Waveform */}
                  <div className="w-full flex justify-center items-center mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(16)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-white rounded-full"
                          style={{ height: `${12 + 12 * Math.abs(Math.sin(i / 2))}px` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="w-[85%] flex items-center mb-6">
                    <div className="w-full relative">
                      <div className="w-full h-[2px] bg-black rounded-full" />
                      <div
                        className="absolute top-1/2 left-0 transform -translate-y-1/2"
                        style={{ left: `${(currentTime / duration) * 100 || 0}%` }}
                      >
                        <div className="h-4 w-4 bg-white border-2 border-black rounded-full -translate-x-1/2" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Controls Row */}
                  <div className="w-full flex justify-center items-center gap-8 mt-2">
                    <button
                      className="bg-white text-[#0e7490] rounded-full p-4 shadow-lg focus:outline-none hover:bg-gray-100"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="7" y="6" width="3" height="12" rx="1" fill="#0e7490" />
                          <rect x="14" y="6" width="3" height="12" rx="1" fill="#0e7490" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <polygon points="8,5 19,12 8,19" fill="#0e7490" />
                        </svg>
                      )}
                    </button>
                    <button
                      className="text-white hover:text-gray-200 focus:outline-none transition"
                      onClick={toggleMute}
                    >
                      {volume === 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Hidden audio element */}
                  <audio
                    ref={audioRef}
                    className="hidden"
                    onTimeUpdate={updateProgress}
                    onLoadedMetadata={updateProgress}
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source src={audioStory.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Coming Soon Message for Audio Stories */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 text-center">
          <div className="flex flex-col items-center py-8">
            <div className="text-secondary-500 text-5xl mb-4">🔜</div>
            <h2 className="font-display text-2xl text-primary-800 mb-4">Coming Soon!</h2>
            <p className="font-body text-primary-600 max-w-xl mx-auto mb-6">
              We're working hard to bring this audio story to you. It will be available for listening shortly.
            </p>
            <div className="bg-secondary-50 rounded-full px-4 py-2 text-secondary-600 font-accent text-sm">
              Check back soon for updates!
            </div>
          </div>
        </div>
        
        {/* Similar Audio Stories */}
        <div className="mt-12">
          <h2 className="font-accent text-2xl text-primary-800 mb-6">More Audio Stories You Might Enjoy</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {allAudioStories.filter(item => item.id !== audioStory.id).slice(0, 4).map(item => (
              <div key={item.id} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 transition-transform hover:scale-105">
                <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-secondary-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="w-full">
                  <div className="flex flex-wrap justify-start mb-3 gap-2">
                    <span className="text-xs font-accent px-3 py-1 rounded-full bg-secondary-100 text-secondary-700">
                      Audio
                    </span>
                    <span className="text-xs font-accent px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      {item.duration}
                    </span>
                  </div>
                  
                  <h3 className="font-accent text-lg text-primary-800 mb-2 text-center line-clamp-1">{item.title}</h3>
                  <p className="font-body text-primary-600 text-sm mb-4 text-center line-clamp-1">
                    Narrator: {item.narrator}
                  </p>
                  
                  <Link 
                    href={`/toons-and-tells/audio-stories/${item.slug}`} 
                    className="btn-secondary w-full text-center block"
                  >
                    <Headphones className="h-4 w-4 inline-block mr-1" /> Listen Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 