'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Play, User, Tag, Smile, BookOpen, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  
  // Get videos data from Redux store
  const { videos, featuredVideos } = useSelector(state => state.videos);
  
  // Combine all videos (featured + regular, remove duplicates)
  const allVideos = React.useMemo(() => {
    const videosMap = new Map();
    
    // Add featured videos first
    if (featuredVideos && featuredVideos.length > 0) {
      featuredVideos.forEach(video => {
        videosMap.set(video.id, video);
      });
    }
    
    // Add regular videos
    if (videos && videos.length > 0) {
      videos.forEach(video => {
        videosMap.set(video.id, video);
      });
    }
    
    return Array.from(videosMap.values());
  }, [videos, featuredVideos]);
  
  // Find the current video by slug
  const video = allVideos.find(item => item.slug === slug);
  
  // If video not found
  if (!video) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h2 className="font-display text-2xl text-primary-700 mb-4">Video Not Found</h2>
          <p className="font-body text-primary-600 mb-6">The video you're looking for doesn't exist or has been moved.</p>
          <Link href="/toons-and-tells" className="btn-primary">
            Back to Toons & Tells
          </Link>
        </div>
      </div>
    );
  }
  
  // Check if video file is available
  const videoAvailable = !!video.videoFile;
  
  return (
    <div className="py-8 md:py-12 bg-background-cream">
      <div className="container-custom">
        <div className="mb-6">
          <Link href="/toons-and-tells" className="flex items-center font-accent text-primary-600 hover:text-primary-800 transition-colors w-max">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Toons & Tells
          </Link>
        </div>
        
        {/* Video Player */}
        {videoAvailable ? (
          <div className="mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <video
                  controls
                  className="w-full h-full object-contain"
                  poster={video.image}
                >
                  <source src={video.videoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 rounded-full p-6">
                    <div className="text-accent-500 text-3xl mb-2">🔜</div>
                    <p className="font-accent text-primary-700 text-sm">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Video Details */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center mb-3">
            <span className="text-xs font-accent px-3 py-1 rounded-full bg-accent-100 text-accent-700">
              Video
            </span>
            {video.duration && (
              <span className="ml-2 text-xs font-accent px-3 py-1 rounded-full bg-primary-100 text-primary-700 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {video.duration}
              </span>
            )}
          </div>
          
          <h1 className="font-display text-2xl md:text-3xl text-primary-800 mb-2">{video.title}</h1>
          {video.subtitle && <p className="font-accent text-lg text-accent-600 mb-4">{video.subtitle}</p>}
          {video.presenter && <p className="font-accent text-lg text-accent-600 mb-6">Presented by: {video.presenter}</p>}
          
          <p className="font-body text-primary-700 mb-6">{video.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {video.characters && (
              <div className="flex items-start gap-2">
                <User className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-accent text-primary-800 text-sm">Characters</h3>
                  <p className="font-body text-primary-600 text-sm">{video.characters}</p>
                </div>
              </div>
            )}
            
            {video.themes && (
              <div className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-accent text-primary-800 text-sm">Themes</h3>
                  <p className="font-body text-primary-600 text-sm">{video.themes}</p>
                </div>
              </div>
            )}
            
            {video.mood && (
              <div className="flex items-start gap-2">
                <Smile className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-accent text-primary-800 text-sm">Mood</h3>
                  <p className="font-body text-primary-600 text-sm">{video.mood}</p>
                </div>
              </div>
            )}
            
            {video.age && (
              <div className="flex items-start gap-2">
                <BookOpen className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-accent text-primary-800 text-sm">Recommended Age</h3>
                  <p className="font-body text-primary-600 text-sm">{video.age}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Coming Soon for non-available videos */}
        {!videoAvailable && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 text-center">
            <div className="flex flex-col items-center py-8">
              <div className="text-accent-500 text-5xl mb-4">🔜</div>
              <h2 className="font-display text-2xl text-primary-800 mb-4">Coming Soon!</h2>
              <p className="font-body text-primary-600 max-w-xl mx-auto mb-6">
                We're working hard to bring this video to you. It will be available for watching shortly.
              </p>
              <div className="bg-accent-50 rounded-full px-4 py-2 text-accent-600 font-accent text-sm">
                Check back soon for updates!
              </div>
            </div>
          </div>
        )}
        
        {/* Similar Videos */}
        <div className="mt-12">
          <h2 className="font-accent text-2xl text-primary-800 mb-6">More Videos You Might Enjoy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVideos.filter(item => item.id !== video.id).slice(0, 3).map(item => (
              <div key={item.id} className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-video group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {item.duration}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  {item.age && (
                    <div className="flex flex-wrap justify-start mb-3 gap-2">
                      <span className="text-xs font-accent px-3 py-1 rounded-full bg-accent-100 text-accent-700">
                        {item.age}
                      </span>
                    </div>
                  )}
                  
                  <h3 className="font-accent text-lg text-primary-800 mb-2 line-clamp-2">{item.title}</h3>
                  
                  {item.presenter && (
                    <p className="font-body text-primary-600 text-sm mb-3">by {item.presenter}</p>
                  )}
                  
                  <Link href={`/toons-and-tells/video/${item.slug}`} className="btn-secondary w-full text-center block">
                    Watch Video
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