'use client';

import { useState } from 'react';
import {  useSelector } from 'react-redux';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Trophy, Clock, Users, ChevronRight } from 'lucide-react';



export default function CompetitionsPage() {
  // Get competition data from Redux store
  const { activeCompetitions, upcomingCompetitions, error } = useSelector(state => state.competitions);
  
  // Competition Card Component
  const CompetitionCard = ({ id, title, description, startDate, endDate, status, participants, prize, slug, featured, image, mobileImage }) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };

    const getStatusBadge = () => {
      switch(status) {
        case 'active':
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
              Active
            </span>
          );
        case 'upcoming':
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Clock className="w-3 h-3 mr-1" />
              Upcoming
            </span>
          );
        case 'completed':
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <Trophy className="w-3 h-3 mr-1" />
              Completed
            </span>
          );
        default:
          return null;
      }
    };

    // Different layout for active competitions (banner style)
    if (status === 'active') {
      return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300">
          {/* Large banner image */}
          {image && (
            <div className="relative h-[90vw] md:h-[45vw] lg:h-[38vw] xl:h-[38vw] bg-gray-100">
              {/* Mobile Image - Shows only on mobile */}
              <Image
                src={mobileImage || image}
                alt={title}
                fill
                sizes="100vw"
                className="object-fill block md:hidden"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Desktop Image - Shows only on desktop */}
              <Image
                src={image}
                alt={title}
                fill
                sizes="100vw"
                className="object-fill hidden md:block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* Details section - left aligned */}
          <div className="p-8">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-10 mb-4 font-heading">{title}</h3>
            <p className="text-gray-700 text-lg mb-6 font-body">{description}</p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center text-gray-600 font-body">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
              </div>
              
              {participants > 0 && (
                <div className="flex items-center text-gray-600 font-body">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{participants} participants</span>
                </div>
              )}
              
              <div className="flex items-center text-green-600 font-medium font-body">
                <Trophy className="w-5 h-5 mr-2" />
                <span>{prize}</span>
              </div>
            </div>
            
            {/* Centered Register button */}
            <div className="flex justify-center">
              <Link
                href={`/competition/${slug}`}
                className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-lg font-medium transition-colors inline-flex items-center gap-2 text-lg font-body"
              >
                View Details
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // Default card layout for non-active competitions
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">        
        {image && (
          <div className="relative h-48 bg-gray-100">
            {/* Mobile Image - Shows only on mobile */}
            <Image
              src={mobileImage || image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover block md:hidden"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Desktop Image - Shows only on desktop */}
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover hidden md:block"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-primary-10 line-clamp-2 font-heading">{title}</h3>
            {getStatusBadge()}
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 font-body">{description}</p>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-gray-500 font-body">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
            </div>
            
            {participants > 0 && (
              <div className="flex items-center text-sm text-gray-500 font-body">
                <Users className="w-4 h-4 mr-2" />
                <span>{participants} participants</span>
              </div>
            )}
            
            <div className="flex items-center text-sm font-medium text-green-600 font-body">
              <Trophy className="w-4 h-4 mr-2" />
              <span>{prize}</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link
              href={`/competition/${slug}`}
              className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-lg font-medium transition-colors inline-flex items-center gap-2 font-body"
            >
              {status === 'upcoming' ? 'Learn More' : 'View Results'}
            </Link>
          </div>
        </div>
      </div>
    );
  };



  
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 space-y-16 md:space-y-24">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-10 mb-4 font-heading">
            Competitions & Contests
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-body">
            Join our exciting competitions and showcase your creativity! Win amazing prizes and get featured in our community.
          </p>
        </div>

        {/* Active Competitions Section */}
        {activeCompetitions.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-primary-10 font-heading">Active Competitions</h2>
              {/* <Link 
                href="/competition?status=active" 
                className="text-primary-600 hover:text-primary-800 flex items-center gap-2 font-body"
              >
                View All
                <ChevronRight className="h-5 w-5" />
              </Link> */}
            </div>
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4">
              {activeCompetitions.slice(0, 1).map(comp => (
                <CompetitionCard key={comp.id} {...comp} />
              ))}
            </div>
            {activeCompetitions.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {activeCompetitions.slice(1, 4).map(comp => (
                  <CompetitionCard key={comp.id} {...comp} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Upcoming Competitions Section */}
        {/* {upcomingCompetitions.length > 0 && (
          // <section>
          //   <div className="flex items-center justify-between mb-8">
          //     <h2 className="text-3xl font-bold text-primary-10 font-heading">Upcoming Competitions</h2>
          //     <Link 
          //       href="/competition?status=upcoming" 
          //       className="text-primary-600 hover:text-primary-800 flex items-center gap-2 font-body"
          //     >
          //       View All
          //       <ChevronRight className="h-5 w-5" />
          //     </Link>
          //   </div>
          //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          //     {upcomingCompetitions.slice(0, 4).map(comp => (
          //       <CompetitionCard key={comp.id} {...comp} />
          //     ))}
          //   </div>
          // </section>
        )} */}


      </div>
    </div>
  );
} 