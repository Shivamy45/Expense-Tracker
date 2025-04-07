"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const HeroSection = () => {
  const imageRef = useRef(null);
  const { isSignedIn, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Only show content after component is mounted to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll animation
  useEffect(() => {
    // Skip if not mounted or on server
    if (!mounted || typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      
      if (scrollPosition > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // Show loading state until component is mounted and auth is loaded
  if (!mounted || !isLoaded) {
    return (
      <section className="pt-40 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="h-16 md:h-24 lg:h-32 bg-gray-200 animate-pulse rounded mb-6"></div>
          <div className="h-6 w-3/4 mx-auto bg-gray-200 animate-pulse rounded mb-8"></div>
          <div className="flex justify-center space-x-4">
            <div className="h-12 w-32 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="hero-image-wrapper mt-5 md:mt-0">
            <div className="h-64 md:h-96 bg-gray-200 animate-pulse rounded-lg mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-40 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href={isSignedIn ? "/dashboard" : "/dashboard"}>
            <Button size="lg" className="px-8">
              {isSignedIn ? "Go to Dashboard" : "Get Started"}
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div 
            ref={imageRef} 
            className={`hero-image transition-all duration-500 ${isScrolled ? 'scrolled' : ''}`}
          >
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
