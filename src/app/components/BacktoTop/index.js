
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

    
export default function BacktoTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener('scroll', toggleVisibility);

      return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    return (
        <>
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="backtotop"
          aria-label="Back to Top"
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
    </>
    )
}
    