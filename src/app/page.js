"use client";
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { preloadImages } from '@/lib/utils'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { RiContactsBook2Line, RiGroup2Line, RiHeartLine, RiHome2Line, RiOpenArmLine, RiServiceLine } from '@remixicon/react'
import Splitting from 'splitting'
import './page.module.css'
import Slider from './components/slider';
import ParallaxInfo from './components/ParallaxText';
import MenuBottom from './components/menu/MenuBottom';
import { motion } from "motion/react"



gsap.registerPlugin(ScrollTrigger);

const page = () => {

  const titlesRef = useRef([]);
  const contentRefs = useRef([]); // This will store references to all .content--sticky elements

  
  

  // Smooth scrolling initialization using Lenis
  const initSmoothScrolling = () => {
    const lenis = new Lenis({
      lerp: 0.2, // Lower values create a smoother scroll effect
      smoothWheel: true, // Enables smooth scrolling for mouse wheel events
    });

    // Update ScrollTrigger on scroll
    lenis.on('scroll', () => ScrollTrigger.update());

    // Recursive animation frame loop for smooth scroll
    const scrollFn = (time) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };
    requestAnimationFrame(scrollFn);
  };
  // Scroll-triggered animations using GSAP
  const scrollAnimations = () => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return; // Make sure the element exists before running animations

      const isLast = index === contentRefs.current.length - 1;

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=100%',
          scrub: true,
        },
      })
      .to(el, {
        ease: 'none',
        startAt: { filter: 'brightness(100%) contrast(100%)' },
        filter: isLast ? 'none' : 'brightness(60%) contrast(135%)',
        yPercent: isLast ? 0 : -15,
      }, 0)
      .to(el.querySelector('.content_home__img'), {
        ease: 'power1.in',
        yPercent: -40,
        rotation: -20,
      }, 0);


    });
  };

  

  useEffect(() => {
  // Execute only on client-side
  if(typeof window !== 'undefined') {
    preloadImages('.content_home__img').then(() => {
      document.body.classList.remove('loading');
      initSmoothScrolling(); // Initialize smooth scrolling
      scrollAnimations(); // Initialize scroll-triggered animations
      
    });
  }

  Splitting();



  
        
        
  
  // Animasi GSAP dengan ScrollTrigger
  titlesRef.current.forEach((title) => {
    const effect = title.dataset.effect;
      // Effect 16
      if (effect === '16') {
        gsap.fromTo(title, {
            transformOrigin: '0% 50%',
            rotate: 3,
        }, {
            rotate: 0,
            scrollTrigger: {
                trigger: title,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
            },
        });

        const words = title.querySelectorAll('.word');
        gsap.fromTo(words, {
            'will-change': 'opacity',
            opacity: 0.1,
        }, {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: title,
                start: 'top bottom-=20%',
                end: 'center top+=20%',
                scrub: true,
            },
        });
    }
    //Effect 17
    if (effect === '17') {
      const chars = title.querySelectorAll('.char');
        
        chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 })); 
        
        gsap.fromTo(chars, { 
            'will-change': 'opacity, transform', 
            opacity: 0,
            rotateX: () => gsap.utils.random(-120,120),
            z: () => gsap.utils.random(-200,200),
        }, 
        {
            ease: 'none',
            opacity: 1,
            rotateX: 0,
            z: 0,
            stagger: 0.02,
            scrollTrigger: {
                trigger: title,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });
      }


    // Effect 25
    if (effect === '25') {
        gsap.fromTo(title.querySelectorAll('.char'), {
            'will-change': 'transform',
            transformOrigin: '50% 100%',
            scaleY: 0
        }, {
            ease: 'power3.in',
            opacity: 1,
            scaleY: 1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: title,
                start: 'center center',
                end: '+=500%',
                scrub: true,
                pin: title.parentNode,
            },
        });
    }

    // Effect 27
    if (effect === '27') {
        const words = [...title.querySelectorAll('.word')];

        words.forEach(word => gsap.set(word.parentNode, { perspective: 1000 }));

        gsap.fromTo(words, {
            'will-change': 'opacity, transform',
            z: () => gsap.utils.random(500, 950),
            opacity: 0,
            xPercent: () => gsap.utils.random(-100, 100),
            yPercent: () => gsap.utils.random(-10, 10),
            rotationX: () => gsap.utils.random(-90, 90),
        }, {
            ease: 'expo',
            opacity: 1,
            rotationX: 0,
            rotationY: 0,
            xPercent: 0,
            yPercent: 0,
            z: 0,
            scrollTrigger: {
                trigger: title,
                start: 'center center',
                end: '+=300%',
                scrub: true,
                pin: title.parentNode,
            },
            stagger: {
                each: 0.006,
                from: 'random',
            },
        });
    }

    // Effect 28
    if (effect === '28') {
      const words = [...title.querySelectorAll('.word')];
        
        for (const word of words) {

            const chars = word.querySelectorAll('.char');
            const charsTotal = chars.length;
            
            gsap.fromTo(chars, {
                'will-change': 'transform, filter', 
                transformOrigin: '50% 100%',
                scale: position => {
                    const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                    return gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0.5, 2.1, factor);
                },
                y: position => {
                    const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                    return gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0, 60, factor);
                },
                rotation: position => {
                    const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                    return position < charsTotal/2 ? gsap.utils.mapRange(0, Math.ceil(charsTotal/2), -4, 0, factor) : gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0, 4, factor);
                },
                filter: 'blur(12px) opacity(0)',
            }, 
            {
                ease: 'power2.inOut',
                y: 0,
                rotation: 0,
                scale: 1,
                filter: 'blur(0px) opacity(1)',
                scrollTrigger: {
                    trigger: word,
                    start: 'top bottom+=40%',
                    end: 'top top+=15%',
                    scrub: true,
                },
                stagger: {
                    amount: 0.15,
                    from: 'center'
                }
            });

        }
    }
    // Effect 29
    if (effect === '29') {
      const words = [...title.querySelectorAll('.word')];
        
        for (const [pos,word] of words.entries()) {
            
            const chars = word.querySelectorAll('.char');
            
            gsap.fromTo(chars, {
                'will-change': 'transform', 
                transformOrigin: `${pos%2 ? 0 : 100}% ${pos%2 ? 100 : 0}%`,
                scale: 0
            }, 
            {
                ease: 'power4',
                scale: 1,
                stagger:  {
                    each: 0.03,
                    from: pos%2 ? 'end' : 'start'
                },
                scrollTrigger: {
                    trigger: word,
                    start: 'top bottom-=10%',
                    end: 'top top',
                    scrub: true,
                }
            });
        }
        
    }
    
  });

  return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };

 

    
  }, []);


  return (
    
    <>
      
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>HOME | LUXIMA ID</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="Luxima" />
        <link rel="shortcut icon" href="favicon.ico"></link>
        </Head>

        
        <main className="home bg-image">
        <div
          className="frame_home frame_home--header"
          style={{ backgroundImage: "url(img/7.png)", backgroundSize: "60vw" }}
        >
        <motion.div 
          animate={{ x: "0%", opacity: 1 }}
          initial={{ x: "-100%", opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5}}
          className='frame_home__title'>
         hello@luxima.id
        </motion.div>
        <motion.div 
          animate={{ x: "0%", opacity: 1 }}
          initial={{ x: "-100%", opacity: 0 }}
          transition={{ delay: 1.6, duration: 0.5}}
          className='frame_home__back'>
          +62811 611 1662
        </motion.div>
        <motion.div 
          animate={{ x: "0%", opacity: 1 }}
          initial={{ x: "-100%", opacity: 0 }}
          transition={{ delay: 1.7, duration: 0.5}}
          className='frame_home__prev'>
          
        </motion.div>
        <motion.div 
        animate={{ x: "0%", opacity: 1 }}
          initial={{ x: "-100%", opacity: 0 }}
          transition={{ delay: 1.8, duration: 0.5}}
          className='frame_home__sub'>
          LUXIMA.ID
          </motion.div>
          <motion.div 
            animate={{ x: "0%", opacity: 1 }}
          initial={{ x: "-100%", opacity: 0 }}
          transition={{ delay: 1.9, duration: 0.5}}
            className='frame_home__sponsor'>
          Social Media
          </motion.div>
         
				<MenuBottom/>
          
          <motion.div
            animate={{ x: "0%", opacity: 1 }}
            initial={{ x: "100%", opacity: 0 }}
            transition={{ delay: 1, duration: 0.5}}
           className="frame_home__heading">
            <Slider/>
            
            <motion.h2 
              animate={{ y: "0%", opacity: 1 }}
              initial={{ y: "100%", opacity: 0 }}
              transition={{ delay: 1.5, duration: 1}}
              className="content_home__title" data-splitting >
              <i>LUXIMA</i> Studio
            </motion.h2>
            <motion.p 
              animate={{ y: "0%", opacity: 1 }}
              initial={{ y: "-100%", opacity: 0 }}
              transition={{ delay: 1.8, duration: 1}}
            className="text-meta" data-splitting >Creative Studio, Web Design & Development, Photography & Content Marketing </motion.p>
            
          </motion.div>
         
        </div>
        
        <div className="content_home content_home--highlight content_home--intro" >
          <p className="text-large" data-splitting 
                data-effect="29" 
                ref={(el) => titlesRef.current.push(el)}>
                  Transforming visions into impactful digital and creative experiences.
            
          </p>
          <div className='content_home-end'>
            <ParallaxInfo/>
          </div>
          
        </div>
         
        <div className="wrap">
          
          <div className="content_home content_home--sticky content_home--grid" ref={el => contentRefs.current[0] = el} >
            <img
              className="content_home__img content_home__img--large content_home__img--left"
              src="img/8.png"
            />
            <h2 className="content_home__title" data-splitting 
                data-effect="28" 
                ref={(el) => titlesRef.current.push(el)}>
              <i>About</i> Us
            </h2>
            <p className="content_home__text content_home__text--left text-meta" data-splitting 
                data-effect="16" 
                ref={(el) => titlesRef.current.push(el)}>
             LUXIMA.ID adalah perusahaan yang berdedikasi di bidang <span className='italic'>Creative Studio, Web Development & System, Content Marketing, serta Wedding Photography & Wedding Planner. </span>
             Berdiri dengan tujuan menghadirkan solusi kreatif yang inovatif, LUXIMA.ID menggabungkan seni dan teknologi untuk menghasilkan hasil yang inspiratif dan bernilai bagi klien kami.
            </p>
          </div>
          <div className="content_home content_home--sticky content_home--grid" ref={el => contentRefs.current[1] = el} >
            <img
              className="content_home__img content_home__img--large content_home__img--left"
              src="img/9.png"
            />
            <h2 className="content_home__title" data-splitting 
                data-effect="28" 
                ref={(el) => titlesRef.current.push(el)}>
              <i>Vision &</i> Mission
            </h2>
            <p className="content_home__text content_home__text--left text-meta" data-splitting 
                data-effect="16" 
                ref={(el) => titlesRef.current.push(el)}>
              <strong>Visi:</strong> Menjadi mitra utama bagi individu dan bisnis dalam mewujudkan ide kreatif dan solusi digital yang unggul. <br/>
              <strong>Misi:</strong>
              Menghadirkan layanan berkualitas tinggi di bidang kreatif, pemasaran konten, dan teknologi.
              Membantu klien menciptakan cerita visual yang berdampak dan berkesan melalui pendekatan fotografi profesional dan perencanaan acara.
              Mengoptimalkan kehadiran digital klien dengan pendekatan pemasaran konten yang tepat sasaran.
            </p>
          </div>
          <div className="content_home content_home--sticky content_home--grid" ref={el => contentRefs.current[2] = el} >
            <img
              className="content_home__img content_home__img--large content_home__img--left"
              src="img/7.png"
            />
            <h2 className="content_home__title" data-splitting 
                data-effect="28" 
                ref={(el) => titlesRef.current.push(el)}>
              <i>Our</i> Services
            </h2>
            <ul className="content_home__text content_home__text--left text-meta" data-splitting 
                data-effect="16" 
                ref={(el) => titlesRef.current.push(el)}>
                <li>Creative Studio</li>
                <li>Web Development & System</li>
                <li>Content Marketing</li>
                <li>Wedding Photography & Wedding Planner</li>
            </ul>
          </div>
          <div className="content_home content_home--sticky content_home--grid" ref={el => contentRefs.current[3] = el} >
            <img
              className="content_home__img content_home__img--large content_home__img--left"
              src="img/10.png"
            />
            <h2 className="content_home__title" data-splitting 
                data-effect="28" 
                ref={(el) => titlesRef.current.push(el)}>
              <i>Why</i> Us
            </h2>
            <ul className="content_home__text content_home__text--left text-meta" data-splitting 
                data-effect="16" 
                ref={(el) => titlesRef.current.push(el)}>
              
                <li><strong>Solusi Menyeluruh:</strong> Dari branding hingga pengembangan web, kami menyediakan layanan komprehensif untuk memenuhi kebutuhan bisnis dan individu.</li>
                <li><strong>Kreativitas & Teknologi:</strong> Kami menggabungkan pendekatan kreatif dengan inovasi teknologi, memberikan pengalaman yang memukau dan fungsional.</li>
                <li><strong>Tim Berpengalaman:</strong> Didukung oleh tim profesional yang berpengalaman di bidangnya, kami siap membantu klien mencapai hasil terbaik.</li>
                <li><strong>Pendekatan Klien yang Personal:</strong> Kami percaya setiap klien unik; pendekatan kami selalu disesuaikan dengan kebutuhan spesifik mereka untuk hasil yang memuaskan.</li>
              
            </ul>
          </div>
          <div className="content_home content_home--sticky content_home--grid"  ref={el => contentRefs.current[4] = el} >
            <img
              className="content_home__img content_home__img--large content_home__img--left"
              src="img/11.png"
            />
            <h2 className="content_home__title" data-splitting 
                data-effect="28" 
                ref={(el) => titlesRef.current.push(el)}>
              <i>The </i> Portofolio
            </h2>
            <p className="content_home__text content_home__text--left text-meta" data-splitting 
                data-effect="16" 
                ref={(el) => titlesRef.current.push(el)}>
              Di setiap proyek, kami bangga menghasilkan karya yang berkualitas dan sesuai harapan klien. Kami memiliki portofolio yang mencakup berbagai proyek kreatif, web development, serta dokumentasi pernikahan yang elegan dan berkesan.
            </p>
          </div>
          <div className="content_home content_home--sticky content_home--grid" ref={el => contentRefs.current[5] = el} >
            <img
              className="content_home__img content_home__img--large content_home__img--left"
              src="img/12.png"
            />
            <h2 className="content_home__title" data-splitting 
                data-effect="28" 
                ref={(el) => titlesRef.current.push(el)}>
              <i>Client </i>Testimonials
            </h2>
            <ul className="content_home__text content_home__text--left text-meta"data-splitting 
                data-effect="16" 
                ref={(el) => titlesRef.current.push(el)}>
              
                <li><strong>Mulyadi </strong><i>Staff Dipo</i><br/>Hasilnya sangat memuaskan, rekomended bgt nih untuk yg mw abadikan moment spesialnya </li>
                <li><strong>Yulia Amira</strong><br/>Thank you Luxima and the team for the idea, the concept, the direction of the style, the tone of photos and videos and above all, thanks a bunch for your patience</li>
              
            </ul>
          </div>
        </div>
        <div className="content_home content_home--highlight content_home--outro">
          <p className="text-large" data-splitting 
                data-effect="29" 
                ref={(el) => titlesRef.current.push(el)}>
            Beauty and quality need the right time to be conceived and realised even in a world that is in too much of a hurry.
          </p>
          <Link href='/contact' className="btn btn-large">Contact Us</Link>
          <img className="content_home__img spacer" src="img/7.png" />
        </div>
        <footer className="frame_home frame_home--footer">
          <p className="frame_home__credits">Built with <RiHeartLine /> by <a href="https://siddiq.luxima.id">Siddiq Achmad</a></p>
          <p className="frame_home__author"><span>Made by <a href="https://luxima.id">LUXIMA.ID</a></span> </p>
			</footer>
        
      </main>


    </>
  );
}

export default page;
