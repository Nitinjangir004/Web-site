'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, User, Tag, Smile, BookOpen, Volume2, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
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
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (e) => {
    if (audioRef.current) {
      const rect = e.target.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const skipTime = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    }
  };
  
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // If audio story not found
  if (!audioStory) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h2 className="font-display text-2xl text-primary-700 mb-4">Audio Story Not Found</h2>
          <p className="font-body text-primary-600 mb-6">The audio story you're looking for doesn't exist or has been moved.</p>
          <Link href="/toons-and-tells" className="btn-primary">
            Back to Toons & Tells
          </Link>
        </div>
      </div>
    );
  }
  
  // Check if audio file is available
  const audioAvailable = !!audioStory.audioFile;
  
  return (
    <div className="py-8 md:py-12 bg-background-cream">
      <div className="container-custom">
        <div className="mb-6">
          <Link href="/toons-and-tells" className="flex items-center font-accent text-primary-600 hover:text-primary-800 transition-colors w-max">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Toons & Tells
          </Link>
        </div>
        
        {/* Audio Story Header */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 mb-8 md:mb-12">
          {/* Cover Image */}
          <div className="w-full md:w-1/3 max-w-xs mx-auto md:mx-0">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src={audioStory.image}
                  alt={audioStory.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Audio Story Details */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center mb-3">
              <span className="text-xs font-accent px-3 py-1 rounded-full bg-secondary-100 text-secondary-700">
                Audio Story
              </span>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl text-primary-800 mb-2">{audioStory.title}</h1>
            {audioStory.subtitle && <p className="font-accent text-lg text-accent-600 mb-6">{audioStory.subtitle}</p>}
            {audioStory.narrator && <p className="font-accent text-lg text-accent-600 mb-6">Narrated by: {audioStory.narrator}</p>}
            
            <p className="font-body text-primary-700 mb-6">{audioStory.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {audioStory.characters && (
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-accent text-primary-800 text-sm">Characters</h3>
                    <p className="font-body text-primary-600 text-sm">{audioStory.characters}</p>
                  </div>
                </div>
              )}
              
              {audioStory.themes && (
                <div className="flex items-start gap-2">
                  <Tag className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-accent text-primary-800 text-sm">Themes</h3>
                    <p className="font-body text-primary-600 text-sm">{audioStory.themes}</p>
                  </div>
                </div>
              )}
              
              {audioStory.mood && (
                <div className="flex items-start gap-2">
                  <Smile className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-accent text-primary-800 text-sm">Mood</h3>
                    <p className="font-body text-primary-600 text-sm">{audioStory.mood}</p>
                  </div>
                </div>
              )}
              
              {audioStory.age && (
                <div className="flex items-start gap-2">
                  <BookOpen className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-accent text-primary-800 text-sm">Recommended Age</h3>
                    <p className="font-body text-primary-600 text-sm">{audioStory.age}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Audio Player */}
        {audioAvailable ? (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <audio
              ref={audioRef}
              src={audioStory.audioFile}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            
            <div className="flex flex-col space-y-4">
              {/* Main Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => skipTime(-10)}
                  className="p-2 rounded-full bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                
                <button
                  onClick={togglePlayPause}
                  className="p-4 rounded-full bg-secondary-500 text-white hover:bg-secondary-600 transition-colors"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                
                <button
                  onClick={() => skipTime(10)}
                  className="p-2 rounded-full bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div
                  className="w-full h-2 bg-secondary-200 rounded-full cursor-pointer"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-secondary-500 rounded-full transition-all"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm text-primary-600 font-accent">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              
              {/* Volume Control */}
              <div className="flex items-center justify-center space-x-2">
                <Volume2 className="h-4 w-4 text-primary-500" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-secondary-500"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 text-center">
            <div className="flex flex-col items-center py-8">
              <div className="text-accent-500 text-5xl mb-4">🔜</div>
              <h2 className="font-display text-2xl text-primary-800 mb-4">Coming Soon!</h2>
              <p className="font-body text-primary-600 max-w-xl mx-auto mb-6">
                We're working hard to bring this audio story to you. It will be available for listening shortly.
              </p>
              <div className="bg-accent-50 rounded-full px-4 py-2 text-accent-600 font-accent text-sm">
                Check back soon for updates!
              </div>
            </div>
          </div>
        )}
        
        {/* Similar Audio Stories */}
        <div className="mt-12">
          <h2 className="font-accent text-2xl text-primary-800 mb-6">More Audio Stories You Might Enjoy</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allAudioStories.filter(item => item.id !== audioStory.id).slice(0, 4).map(item => (
              <div key={item.id} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4">
                <div className="relative w-full aspect-square mb-3 rounded-xl overflow-hidden group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="w-full">
                  {item.age && (
                    <div className="flex flex-wrap justify-start mb-3 gap-2">
                      <span className="text-xs font-accent px-3 py-1 rounded-full bg-secondary-100 text-secondary-700">
                        {item.age}
                      </span>
                    </div>
                  )}
                  
                  <h3 className="font-accent text-lg text-primary-800 mb-2 text-center line-clamp-1">{item.title}</h3>
                  
                  <Link href={`/toons-and-tells/audio/${item.slug}`} className="btn-secondary w-full text-center block">
                    Listen Now
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