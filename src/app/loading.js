"use client";

import React,{ useEffect } from 'react';
import gsap from 'gsap';

const Loading = () => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to('.preloader', {
        opacity: 1,
        scale:1,
        duration: 1,
        ease: 'power1.inOut',
    }).to('.preloader', {opacity: 0, scale: 0, duration: 1, ease: 'power1.inOut' });
}, []);

  return (
    <div className="preloader">
        <div className="loader">
        </div>
        <img src="/img/loader.png" alt="loader" className="absolute" />
    </div>
    
  )
}

export default Loading
