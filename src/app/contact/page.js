'use client';
import styles from './page.module.css'
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { disperse } from './anim';
import Link from 'next/link';
import gsap from 'gsap';


const links = [
    {
        title: 'Call Us',
        url: 'https://wa.me/628116111662'
    },
    {
        title: 'Insta',
        url: 'https://instagram.com/luxima.id'
    },
    {
        title: 'Email',
        url: 'mailto:hello@luxima.id'
    }
]

export default function page() {

  const background = useRef(null);

  const setBackground = (isActive) => {
    gsap.to(background.current, {opacity: isActive ? 0.8 : 0})
  }

  return (
    <main className={styles.main}>
      <div className={styles.section}>

        <div className={styles.introLine}>
          <motion.p
            animate={{ y: "0%", opacity: 1 }}
            initial={{ y: "100%", opacity: 0 }}
            transition={{ delay: 0.6, duration: 1}}
          >LUXIMA</motion.p>
          <motion.p
            animate={{ x: "0%", opacity: 1 }}
            initial={{ x: "-100%", opacity: 0 }}
            transition={{ delay: 0.8, duration: 1}}
          >STUDIO</motion.p>
        </div>

        <div className={styles.introLine}>
          <p>Creative </p>
          <p> Dev</p>
        </div>

        <div className={styles.introLine}>
          <p>&</p>
          <p>Photography</p>
        </div>

        <TextDipserse setBackground={setBackground}>
          <Link href="https://wa.me/628116111662">+628116111662</Link>
        </TextDipserse>
        

        <TextDipserse setBackground={setBackground}>
          <p>→Email</p>
        </TextDipserse>
        <TextDipserse setBackground={setBackground}>
          <p>→Insta</p>
        </TextDipserse>
        

      </div>
      <div ref={background} className={styles.background}></div>
    </main>
  )
}

function TextDipserse(props) {
  
  const { children, setBackground } = props;

  const [isAnimated, setIsAnimated] = useState(false);

  const getChars = (element) => {
    let chars = [];
    if(children.length){
      children.forEach( (el, i) => {
        chars.push(splitWord(el.props.children, i))
      })
    }
    else{
      chars.push(splitWord(element.props.children, 1))
    }
    return chars;
  }

  const splitWord = (word, indexOfWord) => {
    let chars = [];
    word.split("").forEach( (char, i) => {
      chars.push(<motion.span custom={indexOfWord * i} variants={disperse} animate={isAnimated ? "open" : "closed"} key={char + i}>{char}</motion.span>)
    })
    return chars;
  }

  const manageMouseEnter = () => {
    setBackground(true)
    setIsAnimated(true);
  }
  const manageMouseLeave = () => {
    setBackground(false)
    setIsAnimated(false);
  }

  return (
    <div style={{cursor: "pointer"}} onMouseEnter={() => {manageMouseEnter()}} onMouseLeave={() => {manageMouseLeave(false)}} className={styles.introLine}>
    { getChars(children) }
    </div>
  )
}