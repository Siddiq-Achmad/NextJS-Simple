
"use client";

import { useState, useEffect } from "react";
import Preloader from '@/app/components/preloader/Preloader'
import Loading from './loading'
import Menu from '@/app/components/menu/Menu';
import BacktoTop from "./components/BacktoTop";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from 'next/navigation';

export default function ClientPreloader({ children }) {

  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };
    // Simulasikan animasi preloader yang selesai dalam 2 detik

    const timer = setTimeout(handleLoad, 2000);
    return () => clearTimeout(timer);

     //window.addEventListener("load", handleLoad);

    //return () => window.removeEventListener("load", handleLoad);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" >
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        
        <div className="home">
          {/* {pathname && (
          <motion.div
              key={pathname}
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: '0%' }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ duration: 0.5 }}
            > */}
            <Menu />
            {children}
            <BacktoTop/>
          {/* </motion.div>
          )} */}
       </div>
      )}
    </AnimatePresence>
    
  );
}
