'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { BookOpen, Bookmark, Share2, ChevronRight, Star, Clock, Heart, Headphones, PlayCircle, Video, Camera, ArrowRight } from 'lucide-react';

// Embedded FanStoriesCarousel Component
const FanStoriesCarousel = ({ stories }) => {
  const [paused, setPaused] = useState(false);
  const [zoomIdx, setZoomIdx] = useState(null);

  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 bg-background-paper">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <h2 className="section-title text-center mb-8 flex items-center justify-center gap-2">
          <span className="inline-block rotate-[-10deg] text-2xl md:text-3xl text-accent-500">🍬</span>
          Stories from Our Fans
          <span className="inline-block rotate-[10deg] text-2xl md:text-3xl text-accent-500">🍬</span>
        </h2>
        <div className="flex overflow-x-auto gap-2 md:gap-4 pb-4" style={{ scrollBehavior: 'smooth' }}>
          {stories.slice(0, 10).map((story, idx) => (
            <div
              key={story.id || idx}
              className="flex-shrink-0 w-[62vw] md:w-[31vw] lg:w-[17vw] max-w-[380px] aspect-[4/5] relative cursor-zoom-in"
              onClick={() => { setPaused(true); setZoomIdx(idx); }}
            >
              <Image
                src={story.image || `/images/Stories-from-Our-Fans/${idx + 1}.png`}
                alt={story.title || `Fan story ${idx + 1}`}
                fill
                className="object-contain rounded-2xl bg-white transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 62vw, (max-width: 1024px) 31vw, 17vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
        {/* Zoom Modal */}
        {zoomIdx !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-all"
            onClick={() => { setPaused(false); setZoomIdx(null); }}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] w-[80vw] md:w-[50vw] aspect-[4/5] flex items-center justify-center animate-zoomIn">
              <Image
                src={stories[zoomIdx]?.image || `/images/Stories-from-Our-Fans/${zoomIdx + 1}.png`}
                alt={stories[zoomIdx]?.title || `Fan story zoomed ${zoomIdx + 1}`}
                fill
                className="object-contain rounded-2xl shadow-2xl"
                sizes="80vw"
                priority
              />
              <button
                className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 text-xl font-bold text-primary-800 hover:bg-opacity-100 transition"
                onClick={e => { e.stopPropagation(); setPaused(false); setZoomIdx(null); }}
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
      </div>
    </section>
  );
};

export default function ToonsAndTellsPage() {
  const router = useRouter();
  
  // Get data from Redux store
  const { comicOfMonth, featuredComics, comics } = useSelector(state => state.comics);
  const { featuredAudioStories, audioStories } = useSelector(state => state.audioStories);
  const { featuredVideos, videos } = useSelector(state => state.videos);
  const { customerStories } = useSelector(state => state.customerStories);

  // Check if any content is available, if not redirect to shop
  useEffect(() => {
    const hasContent = (
      (comicOfMonth || (featuredComics && featuredComics.length > 0) || (comics && comics.length > 0)) ||
      (featuredAudioStories && featuredAudioStories.length > 0) ||
      (featuredVideos && featuredVideos.length > 0) ||
      (customerStories && customerStories.length > 0)
    );

    if (!hasContent) {
      router.push('/shop');
    }
  }, [comicOfMonth, featuredComics, comics, featuredAudioStories, featuredVideos, customerStories, router]);

  // Get featured comic (comicOfMonth first, then first featured comic)
  const featuredComic = comicOfMonth || (featuredComics && featuredComics.length > 0 ? featuredComics[0] : null);
  
  // Get 4 featured comics (excluding the main featured one)
  const displayComics = featuredComics && featuredComics.length > 0 
    ? (comicOfMonth ? featuredComics.slice(0, 4) : featuredComics.slice(1, 5))
    : (comics ? comics.slice(0, 4) : []);

  // Get content for other sections
  const displayAudioStories = featuredAudioStories && featuredAudioStories.length > 0 
    ? featuredAudioStories.slice(0, 4) 
    : (audioStories ? audioStories.slice(0, 4) : []);
    
  const displayVideos = featuredVideos && featuredVideos.length > 0 
    ? featuredVideos.slice(0, 2) 
    : (videos ? videos.slice(0, 2) : []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white relative">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary-50 via-primary-50/95 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl text-primary-800 mb-6 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500">
                Toons & Tales
              </span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent-400 rounded-full"></span>
            </h1>
            <p className="font-body text-lg text-primary-700/90 mb-8 leading-relaxed [text-shadow:0_1px_1px_rgba(0,0,0,0.02)]">
              Discover a world of creativity through our collection of comics, stories, and visual narratives.
            </p>
          </div>
        </div>
      </section>
        
      <div className="container mx-auto px-4 py-8">
        <div className="container-custom">
          {/* Featured Content Hero */}
          {featuredComic && (
            <div className="mb-12">
              <h2 className="font-display text-2xl text-primary-800 mb-6 flex items-center">
                <Star className="h-6 w-6 text-accent-500 mr-3" />
                Featured Comic
              </h2>
              <div className="bg-background-paper rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6">
                  <div className="flex items-center justify-center">
                    <div className="relative w-full aspect-[3/2.4] rounded-xl overflow-hidden bg-primary-50">
                      <Image
                        src={featuredComic.image}
                        alt={featuredComic.title}
                        fill
                        className="object-contain transition-transform duration-300 hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-xl text-primary-800 mb-2">{featuredComic.title}</h3>
                      <p className="font-display text-base text-accent-600 mb-3">{featuredComic.subtitle}</p>
                      <p className="font-body text-primary-700 mb-4 leading-relaxed text-sm">{featuredComic.description}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                          <h4 className="font-display text-primary-800 text-xs mb-1">Characters</h4>
                          <p className="font-body text-primary-600 text-xs">{featuredComic.characters}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                          <h4 className="font-display text-primary-800 text-xs mb-1">Recommended Age</h4>
                          <p className="font-body text-primary-600 text-xs">{featuredComic.age}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link 
                        href={`/toons-and-tells/comics/${featuredComic.slug}`} 
                        className="btn-primary flex-1 inline-flex items-center justify-center gap-2 py-2"
                      >
                        <BookOpen className="h-4 w-4" />
                        Read Comic
                      </Link>
                      <button 
                        className="btn-secondary flex-1 inline-flex items-center justify-center gap-2 py-2"
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: featuredComic.title,
                              text: featuredComic.description,
                              url: window.location.href
                            });
                          }
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Comics Section */}
          {displayComics && displayComics.length > 0 && (
            <section className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl text-primary-800 flex items-center gap-3 pb-2 group">
                  <BookOpen className="h-6 w-6 text-primary-500 transition-transform duration-200 hover:rotate-6 hover:text-accent-500" />
                  <span className="relative inline-block pb-1">
                    Comics
                    <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-accent-400 transition-all duration-300"></span>
                  </span>
                </h2>
                <Link 
                  href="/toons-and-tells/comics" 
                  className="btn-secondary text-sm relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View All Comics
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-50/0 via-primary-50/20 to-primary-50/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {displayComics.map(comic => (
                  <div key={comic.id} className="flex flex-col items-center bg-white rounded-2xl shadow-sm p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:ring-1 hover:ring-primary-50 group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 via-primary-50/0 to-accent-50/0 group-hover:opacity-20 opacity-0 transition-opacity duration-300 -z-10"></div>
                    <div className="relative w-full aspect-[3/4] mb-4 rounded-xl overflow-hidden">
                      <Image
                        src={comic.image}
                        alt={comic.title}
                        fill
                        className="object-contain transition-transform duration-200 hover:scale-105"
                        priority
                      />
                    </div>
                    
                    <div className="w-full">
                      <div className="flex flex-wrap justify-start mb-3 gap-2">
                        <span className="text-xs font-display px-3 py-1 rounded-full bg-tertiary-100 text-tertiary-700">
                          Comic
                        </span>
                      </div>
                      
                      <h3 className="font-display text-lg text-primary-800 mb-2 text-center line-clamp-1">{comic.title}</h3>
                      <p className="font-body text-primary-600 text-sm mb-4 text-center line-clamp-1">{comic.subtitle}</p>
                      
                      <Link 
                        href={`/toons-and-tells/comics/${comic.slug}`} 
                        className="btn-primary w-full text-center block relative overflow-hidden transition-all duration-200 hover:brightness-105 hover:shadow-sm"
                      >
                        <BookOpen className="h-4 w-4 inline-block mr-1 transition-transform duration-200 hover:scale-110 hover:text-accent-500" />
                        Read Comic
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Audio Stories Section */}
          {displayAudioStories && displayAudioStories.length > 0 && (
            <section className="mb-16 pt-8 border-t-4 border-secondary-100 border-dashed">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl text-primary-800 flex items-center">
                  <Headphones className="h-6 w-6 text-secondary-500 mr-3" />
                  Audio Stories
                </h2>
                <Link href="/toons-and-tells/audio-stories" className="btn-secondary text-sm">
                  View All Audio Stories
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {displayAudioStories.map(story => (
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
                        <div className="bg-white/80 rounded-full p-2">
                          <PlayCircle className="h-10 w-10 text-secondary-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full">
                      <div className="flex flex-wrap justify-start mb-3 gap-2">
                        <span className="text-xs font-display px-3 py-1 rounded-full bg-secondary-100 text-secondary-700">
                          Audio
                        </span>
                        <span className="text-xs font-display px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                          {story.duration}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-lg text-primary-800 mb-2 text-center line-clamp-1">{story.title}</h3>
                      <p className="font-body text-primary-600 text-sm mb-4 text-center line-clamp-1">Narrator: {story.narrator}</p>
                      
                      <Link 
                        href={`/toons-and-tells/audio/${story.slug}`} 
                        className="btn-secondary w-full text-center block"
                      >
                        Listen Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Videos Section */}
          {displayVideos && displayVideos.length > 0 && (
            <section className="mb-16 pt-8 border-t-4 border-accent-100 border-dashed">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl text-primary-800 flex items-center">
                  <Video className="h-6 w-6 text-accent-500 mr-3" />
                  Videos
                </h2>
                <Link href="/toons-and-tells/videos" className="btn-secondary text-sm">
                  View All Videos
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {displayVideos.map(video => (
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
                        <div className="bg-white/80 rounded-full p-3">
                          <PlayCircle className="h-12 w-12 text-accent-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full">
                      <div className="flex flex-wrap justify-start mb-3 gap-2">
                        <span className="text-xs font-display px-3 py-1 rounded-full bg-accent-100 text-accent-700">
                          Video
                        </span>
                        <span className="text-xs font-display px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                          {video.duration}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-lg text-primary-800 mb-2">{video.title}</h3>
                      <p className="font-body text-primary-600 text-sm mb-4 line-clamp-2">{video.description}</p>
                      
                      <Link 
                        href={`/toons-and-tells/video/${video.slug}`} 
                        className="btn-accent w-full text-center block"
                      >
                        Watch Video
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Stories from Our Fans */}
          {customerStories && customerStories.length > 0 && (
            <div className="pt-8 border-t-4 border-primary-100 border-dashed mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl text-primary-800 flex items-center">
                  <Camera className="h-6 w-6 text-primary-500 mr-3" />
                  Stories from Our Fans
                </h2>
                <Link href="/toons-and-tells/customer-stories" className="btn-secondary text-sm">
                  View All Stories
                </Link>
              </div>
              <FanStoriesCarousel stories={customerStories} />
            </div>
          )}
          
          {/* Call to Action - Submit Your Story */}
          <section className="py-8 bg-gradient-to-r from-accent-50 to-tertiary-50 rounded-2xl px-6 md:px-10 mb-8">
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
                className="btn-primary inline-flex items-center gap-2"
              >
                <Camera className="h-5 w-5" /> Submit Your Story
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 