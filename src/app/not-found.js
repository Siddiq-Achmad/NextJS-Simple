'use client'
import Link from 'next/link'
import React from 'react'
import { MdArrowForward } from "react-icons/md";
import { motion } from 'framer-motion';

export default function page() {
  return (
    <motion.div 
    animate={{ y: "0%", opacity: 1 }}
    initial={{ y: "100%", opacity: 0 }}
    transition={{  duration: 1}}
    className='not-found'>
      <motion.h2
      animate={{ y: "0%", opacity: 1 }}
      initial={{ y: "-100%", opacity: 0 }}
      transition={{ delay:1,  duration: 1}}>404</motion.h2>
      <motion.p
      animate={{ y: "0%", opacity: 1 }}
      initial={{ y: "100%", opacity: 0 }}
      transition={{ delay:1.4,  duration: 1}}
      >Page not found</motion.p>
      <motion.div 
      animate={{ y: "0%", opacity: 1 }}
      initial={{ y: "100%", opacity: 0 }}
      transition={{ delay:1.8,  duration: 1, ease: [0.76, 0, 0.24, 1]}}
      className='not-found__link-container'>
        <Link className='not-found__link' href='/'>Back to Homepage <span className='arrow'><MdArrowForward style={{ rotate: '-45deg' , width: '2rem', height: '2rem' }} /></span></Link>
      </motion.div>
    </motion.div>
  )
}
