'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, User, Tag, Smile, BookOpen, Download, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function ComicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  
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
  
  // Find the current comic by slug
  const comic = allComics.find(item => item.slug === slug);
  
  // If comic not found
  if (!comic) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h2 className="font-display text-2xl text-primary-700 mb-4">Comic Not Found</h2>
          <p className="font-body text-primary-600 mb-6">The comic you're looking for doesn't exist or has been moved.</p>
          <Link href="/toons-and-tells" className="btn-primary">
            Back to Toons & Tells
          </Link>
        </div>
      </div>
    );
  }
  
  // Check if PDF is available (for now, only The Hope comic has PDF)
  const pdfAvailable = comic.slug === slug && comic.location;
  const pdfPath = pdfAvailable ? `${comic.location}` : '';
  
  return (
    <div className="py-8 md:py-12 bg-background-cream">
      <div className="container-custom">
        <div className="mb-6">
          <Link href="/toons-and-tells" className="flex items-center font-accent text-primary-600 hover:text-primary-800 transition-colors w-max">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Toons & Tells
          </Link>
        </div>
        
        {/* Comic Header */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 mb-8 md:mb-12">
          {/* Cover Image */}
          <div className="w-full md:w-1/3 max-w-xs mx-auto md:mx-0">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src={comic.image}
                  alt={comic.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Comic Details */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center mb-3">
              <span className="text-xs font-accent px-3 py-1 rounded-full bg-tertiary-100 text-tertiary-700">
                Comic
              </span>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl text-primary-800 mb-2">{comic.title}</h1>
            {comic.subtitle && <p className="font-accent text-lg text-accent-600 mb-6">{comic.subtitle}</p>}
            {comic.author && <p className="font-accent text-lg text-accent-600 mb-6">By: {comic.author}</p>}
            
            <p className="font-body text-primary-700 mb-6">{comic.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {comic.characters && (
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-accent text-primary-800 text-sm">Characters</h3>
                    <p className="font-body text-primary-600 text-sm">{comic.characters}</p>
                  </div>
                </div>
              )}
              
              {comic.themes && (
                <div className="flex items-start gap-2">
                  <Tag className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-accent text-primary-800 text-sm">Themes</h3>
                    <p className="font-body text-primary-600 text-sm">{comic.themes}</p>
                  </div>
                </div>
              )}
              
              {comic.mood && (
                <div className="flex items-start gap-2">
                  <Smile className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-accent text-primary-800 text-sm">Mood</h3>
                    <p className="font-body text-primary-600 text-sm">{comic.mood}</p>
                  </div>
                </div>
              )}
              
              {comic.age && (
                <div className="flex items-start gap-2">
                  <BookOpen className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-accent text-primary-800 text-sm">Recommended Age</h3>
                    <p className="font-body text-primary-600 text-sm">{comic.age}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {pdfAvailable ? (
                <>
                  <a 
                    href={pdfPath} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <Eye className="h-5 w-5" /> Preview Comic
                  </a>
                  <a 
                    href={pdfPath}
                    download
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" /> Download PDF
                  </a>
                </>
              ) : (
                <div className="bg-accent-50 border border-accent-200 text-accent-700 px-4 py-3 rounded-lg font-accent flex items-center justify-center">
                  <span className="text-accent-600 mr-2">🔜</span>
                  Coming Soon! This comic will be available for reading shortly.
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Coming Soon for non-available comics */}
        {!pdfAvailable && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 text-center">
            <div className="flex flex-col items-center py-8">
              <div className="text-accent-500 text-5xl mb-4">🔜</div>
              <h2 className="font-display text-2xl text-primary-800 mb-4">Coming Soon!</h2>
              <p className="font-body text-primary-600 max-w-xl mx-auto mb-6">
                We're working hard to bring this comic to you. It will be available for reading and download shortly.
              </p>
              <div className="bg-accent-50 rounded-full px-4 py-2 text-accent-600 font-accent text-sm">
                Check back soon for updates!
              </div>
            </div>
          </div>
        )}
        
        {/* Similar Comics */}
        <div className="mt-12">
          <h2 className="font-accent text-2xl text-primary-800 mb-6">More Comics You Might Enjoy</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allComics.filter(item => item.id !== comic.id).slice(0, 4).map(item => (
              <div key={item.id} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4">
                <div className="relative w-full aspect-[3/4] mb-3 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="w-full">
                  {item.age && (
                    <div className="flex flex-wrap justify-start mb-3 gap-2">
                      <span className="text-xs font-accent px-3 py-1 rounded-full bg-tertiary-100 text-tertiary-700">
                        {item.age}
                      </span>
                    </div>
                  )}
                  
                  <h3 className="font-accent text-lg text-primary-800 mb-2 text-center line-clamp-1">{item.title}</h3>
                  
                  <Link href={`/toons-and-tells/comics/${item.slug}`} className="btn-secondary w-full text-center block">
                    Read Comic
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