'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Video, ArrowLeft, PlayCircle, Clock } from 'lucide-react';

export default function VideosPage() {
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

  return (
    <div className="py-8 md:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/toons-and-tells" className="flex items-center text-primary-600 hover:text-primary-800 mr-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="font-accent">Back to Toons & Tells</span>
          </Link>
          
          <h1 className="font-display text-2xl md:text-3xl text-primary-800">Videos Collection</h1>
        </div>
        
        <div className="text-center mb-12">
          <p className="font-body text-primary-700 text-lg max-w-3xl mx-auto">
            Watch our entertaining videos featuring the colorful world of Churan Chacha, 
            from behind-the-scenes to fun challenges!
          </p>
        </div>
        
        {/* Videos Grid */}
        {allVideos && allVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVideos.map(video => (
              <div key={video.id} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 transition-transform hover:scale-105">
                <div className="relative w-full aspect-video mb-4 rounded-xl overflow-hidden bg-accent-50">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 rounded-full p-3 transform transition-transform hover:scale-110">
                      <PlayCircle className="h-12 w-12 text-accent-500" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-accent flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </div>
                </div>
                
                <div className="w-full">
                  <div className="flex flex-wrap justify-start mb-3 gap-2">
                    <span className="text-xs font-accent px-3 py-1 rounded-full bg-accent-100 text-accent-700">
                      Video
                    </span>
                    <span className="text-xs font-accent px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      Presenter: {video.presenter}
                    </span>
                  </div>
                  
                  <h3 className="font-accent text-lg text-primary-800 mb-2">{video.title}</h3>
                  <p className="font-body text-primary-600 text-sm mb-4 line-clamp-2">{video.description}</p>
                  
                  <Link 
                    href={`/toons-and-tells/video/${video.slug}`} 
                    className="btn-accent w-full text-center block"
                  >
                    <Video className="h-4 w-4 inline-block mr-1" /> Watch Video
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-body text-primary-600 text-lg mb-6">
              No videos available at the moment.
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