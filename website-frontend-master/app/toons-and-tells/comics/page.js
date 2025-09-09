'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { BookOpen, ArrowLeft } from 'lucide-react';

export default function ComicsPage() {
  // Get comics data from Redux store
  const { comics, featuredComics } = useSelector(state => state.comics);
  
  // Combine all comics (featured + regular, remove duplicates)
  const allComics = React.useMemo(() => {
    const comicsMap = new Map();
    
    // Add featured comics first
    if (featuredComics && featuredComics.length > 0) {
      featuredComics.forEach(comic => {
        comicsMap.set(comic.id, comic);
      });
    }
    
    // Add regular comics
    if (comics && comics.length > 0) {
      comics.forEach(comic => {
        comicsMap.set(comic.id, comic);
      });
    }
    
    return Array.from(comicsMap.values());
  }, [comics, featuredComics]);

  return (
    <div className="py-8 md:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/toons-and-tells" className="flex items-center text-primary-600 hover:text-primary-800 mr-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="font-accent">Back to Toons & Tells</span>
          </Link>
          
          <h1 className="font-display text-2xl md:text-3xl text-primary-800">Comics Collection</h1>
        </div>
        
        <div className="text-center mb-12">
          <p className="font-body text-primary-700 text-lg max-w-3xl mx-auto">
            Explore our entire collection of colorful comics that bring the nostalgic world of Churan Chacha to life!
          </p>
        </div>
        
        {/* Comics Grid */}
        {allComics && allComics.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {allComics.map(comic => (
              <div key={comic.id} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 transition-transform hover:scale-105">
                <div className="relative w-full aspect-[3/4] mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={comic.image}
                    alt={comic.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                <div className="w-full">
                  <div className="flex flex-wrap justify-start mb-3 gap-2">
                    <span className="text-xs font-accent px-3 py-1 rounded-full bg-tertiary-100 text-tertiary-700">
                      Comic
                    </span>
                    <span className="text-xs font-accent px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      Age: {comic.age}
                    </span>
                  </div>
                  
                  <h3 className="font-accent text-lg text-primary-800 mb-2 text-center line-clamp-1">{comic.title}</h3>
                  <p className="font-body text-primary-600 text-sm mb-4 text-center line-clamp-1">{comic.subtitle}</p>
                  
                  <Link 
                    href={`/toons-and-tells/comics/${comic.slug}`} 
                    className="btn-primary w-full text-center block"
                  >
                    <BookOpen className="h-4 w-4 inline-block mr-1" /> Read Comic
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-body text-primary-600 text-lg mb-6">
              No comics available at the moment.
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