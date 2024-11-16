'use client';

import Link from 'next/link'
import { RiContactsBook2Line, RiGroup2Line, RiHome2Line, RiOpenArmLine, RiServiceLine } from '@remixicon/react'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



const MenuBottom = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const toggleVisibility = () => {
        const scrollTop = window.pageYOffset; // Jarak dari atas halaman
        const windowHeight = window.innerHeight; // Tinggi viewport
        const documentHeight = document.documentElement.scrollHeight; // Tinggi halaman keseluruhan
        if (scrollTop > 300 && scrollTop < documentHeight - windowHeight - 100) {
            
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener('scroll', toggleVisibility);

      return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="menu-bottom"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className='frame_home__demos'
        >
            
                <Link
                    className="frame_home__demos-item"
                    href="/"
                >
                    <div className="nav-icon"><RiHome2Line /></div>
                    <span className="nav-text">Home</span>
                </Link>
                <Link
                    className="frame_home__demos-item nav-link"
                    href="/about"
                >
                    <div className="nav-icon"><RiGroup2Line /></div>
                    <span className="nav-text">About</span>
                </Link>
                <Link
                    className="frame_home__demos-item nav-link"
                    href="/work"
                >
                    <div className="nav-icon"><RiOpenArmLine /></div>
                    <span className="nav-text">Work</span>
                </Link>
                
                <Link
                    className="frame_home__demos-item nav-link"
                    href="/services"
                >
                    <div className="nav-icon"><RiServiceLine /></div>
                    <span className="nav-text">Service</span>
                </Link>
                <Link
                    className="frame_home__demos-item nav-link"
                    href="/contact"
                >
                    <div className="nav-icon"><RiContactsBook2Line /></div>
                    <span className="nav-text">Contact</span>
                </Link>
            
            </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MenuBottom
