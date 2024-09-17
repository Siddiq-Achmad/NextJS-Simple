"use client";

import React,{ useEffect } from 'react';
import gsap from 'gsap';

const loading = () => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to('.preloader', {
        width: '100%',
        duration: 1,
        ease: 'power1.inOut',
    }).to('.preloader', { width: '0%', duration: 1, ease: 'power1.inOut' });
}, []);

  return (
    <div className="preloader">
        <div className="loader">
        </div>
        <img src="/img/loader.png" alt="loader" className="absolute" />
    </div>
    
  )
}

export default loading
