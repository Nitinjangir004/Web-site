'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-12 py-8 bg-white relative font-body">
      {/* Comic style background */}
      {/* <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/footer/comic-footer-bg.svg"
          alt="Comic Footer Background"
          fill
          className="object-cover"
          priority
        />
      </div> */}
      
      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        {/* Back to top button */}
        <div className="mb-1">
          <a href="#top" className="inline-block">
            <Image
              src="/footer/Back_to_top2.png"
              alt="Back to top"
              width={120}
              height={150}
              className="hover:scale-105 transition-transform duration-300 w-[100px] h-auto sm:w-[120px] md:w-[150px]"
            />
          </a>
        </div>
        
        {/* Logo */}
        <div className="mb-6 md:mb-6">
          <Image
            src="/logo/Churan-Chacha-logo.png"
            alt="Churan Chacha"
            width={300}
            height={120}
            className="h-auto w-[180px] sm:w-[220px] md:w-[200px]"
          />
        </div>
        
        {/* Footer Navigation - reorganized */}
        <nav className="mb-6 w-full">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 bg-white bg-opacity-80 rounded-lg py-3 px-2">
            <li>
              <Link href="#" className="text-gray-800 hover:text-blue-500 text-sm md:text-base font-heading">Shop Page</Link>
            </li>
            <li>
              <Link href="#" className="text-gray-800 hover:text-blue-500 text-sm md:text-base font-heading">Toons & Tales</Link>
            </li>
            <li>
              <Link href="/competitions" className="text-gray-800 hover:text-blue-500 text-sm md:text-base font-heading">Competition</Link>
            </li>
            <li>
              <Link href="/about-us" className="text-gray-800 hover:text-blue-500 text-sm md:text-base font-heading">About us</Link>
            </li>
            <li>
              <Link href="/contact-us" className="text-gray-800 hover:text-blue-500 text-sm md:text-base font-heading">Contact us</Link>
            </li>
            <li>
              <Link href="/b2b" className="text-gray-800 hover:text-blue-500 text-sm md:text-base font-heading">B2B</Link>
            </li>
            <li>
              <Link href="/legal/terms-of-service" className="text-gray-800 hover:text-blue-500 text-sm md:text-base font-heading">Terms of use</Link>
            </li>
            <li>
              <Link href="/legal/privacy-policy" className="text-gray-800 hover:text-blue-500 text-sm md:text-base font-heading">Privacy</Link>
            </li>
            <li>
              <Link href="#" className="text-gray-800 hover:text-blue-500 text-sm md:text-base font-heading">Sitemap</Link>
            </li>
          </ul>
        </nav>
        
        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://www.linkedin.com/company/churan-chacha" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-blue-700 hover:text-blue-900 text-2xl">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/churan.chacha/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-pink-500 hover:text-pink-700 text-2xl">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@churan_chacha" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-red-600 hover:text-red-800 text-2xl">
            <FaYoutube />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-blue-600 hover:text-blue-800 text-2xl">
            <FaFacebook />
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-center bg-white bg-opacity-80 rounded-lg py-2 px-4">
          <p className="text-gray-800 text-xs sm:text-sm font-body">
            © {new Date().getFullYear()} Churan Chacha. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 