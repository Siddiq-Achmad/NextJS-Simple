'use client'

import { useEffect, useRef } from 'react';
import  gsap  from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadImages } from '@/lib/utils';
import Lenis from '@studio-freight/lenis';

import './styles.css'

gsap.registerPlugin(ScrollTrigger);

const page = () => {

  const frameRef = useRef(null);
  const frameTitleRef = useRef(null);
  const gridRef = useRef(null);
  
  useEffect(() => {
    preloadImages();
    

    const initSmoothScrolling = () => {
      // Initialize Lenis with a custom lerp value to control the scroll smoothing effect.
      const lenis = new Lenis({
        lerp: 0.15, // Adjust this value to control the smoothness of the scroll
      });

      // Sync ScrollTrigger updates to Lenis' scroll events.
      lenis.on('scroll', ScrollTrigger.update);

      // Use GSAP's ticker to sync animations with Lenis' custom scroll updates.
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert GSAP's time to milliseconds, as Lenis expects ms.
      });

      // Disable GSAP's default lag smoothing to prevent conflicts with Lenis’ custom scroll.
      gsap.ticker.lagSmoothing(0);
    };


    const animateFrame = () => {
      // const frame = document.querySelector('.frame_service'); 
      // const frameTitle = frame.querySelector('.frame_service__title');

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: frameRef.current,
          start: 'clamp(top bottom)', 
          end: 'bottom top',
          scrub: true
        }
      })
      .to(frameRef.current, { yPercent: 35, scale: 0.95, startAt: { filter: 'brightness(100%)' }, filter: 'brightness(20%)' })
      .to(frameTitleRef.current, { xPercent: -80 }, 0);
    };

    const animateFirstGrid = () => {
      const grid = document.querySelector('[data-grid-first]');
      const gridImages = grid.querySelectorAll('.grid_service__img');
      

      gsap.timeline({
        defaults: { ease: 'sine' },
        scrollTrigger: {
          trigger: grid,
          start: 'center center',
          end: '+=250%',
          pin: grid.parentNode,
          scrub: 0.5,
        }
      })
      .from(gridImages, {
        stagger: 0.07,
        y: () => gsap.utils.random(window.innerHeight, window.innerHeight * 1.8)
      })
      .from(grid.parentNode.querySelector('.content_service__title'), {
        duration: 1.2,
        ease: 'power4',
        yPercent: 180,
        autoAlpha: 0
      }, 0.8);
    };

    const animateSecondGrid = () => {
      const grid = document.querySelector('[data-grid-second]');
      const gridImages = grid.querySelectorAll('.grid_service__img');
      
      const middleIndex = Math.floor(gridImages.length / 2);

      gsap.timeline({
        defaults: {
          ease: 'power3'
        },
        scrollTrigger: {
          trigger: grid,
          start: 'center center',
          end: '+=250%',
          pin: grid.parentNode,
          scrub: 0.5,
        }
      })
      .from(gridImages, {
        stagger: {
          amount: 0.3,
          from: 'center'
        },
        y: window.innerHeight,
        transformOrigin: '50% 0%',
        rotation: pos => {
          const distanceFromCenter = Math.abs(pos - middleIndex);
          return pos < middleIndex ? distanceFromCenter * 3 : distanceFromCenter * -3;
        },
      })
      // text content_service
      .from(grid.querySelectorAll('.grid_service__item'), {
        stagger: {
          amount: 0.3,
          from: 'center'
        },
        yPercent: 100,
        autoAlpha: 0
      }, 0);
    };

    const animateThirdGrid = () => {
      const grid = document.querySelector('[data-grid-third]');
      const gridImages = grid.querySelectorAll('.grid_service__img');
      

      gsap.timeline({
        defaults: {
          ease: 'power3'
        },
        scrollTrigger: {
          trigger: grid,
          start: 'center center',
          end: '+=200%',
          pin: grid.parentNode,
          scrub: 0.2,
        }
      })
      .from(gridImages, {
        stagger: 0.06,
        y: window.innerHeight,
        rotation: () => gsap.utils.random(-15,15),
        transformOrigin: '50% 0%'
      })
      .fromTo(gridImages, {
        filter: 'brightness(100%)'
      }, {
        ease: 'none',
        stagger: 0.06,
        filter: pos => pos < gridImages.length-1 ? 'brightness(20%)' : 'brightness(100%)'
      }, 0)
      // text content_service
      .from(grid.querySelectorAll('.grid_service__item'), {
        xPercent: pos => pos%2 ? 100 : -100,
        autoAlpha: 0
      }, 0.06*gridImages.length);
    };

    /**
     * Calculates the initial translation and 3D rotation of an element, moving and rotating it further away from the center of the screen.
     * The rotation and Z-axis translation are proportional to the distance from the center, with elements near the center rotating less and moving less in Z.
     * 
     * @param {Element} element - The DOM element to calculate the translation and rotation for
     * @param {Number} offsetDistance - The distance by which the element will be moved away from the center (default: 250px)
     * @param {Number} maxRotation - The maximum rotation in degrees for farthest elements (default: 300 degrees)
     * @param {Number} maxZTranslation - The maximum Z-axis translation in pixels for farthest elements (default: 2000px)
     * @returns {Object} The x, y, z translation and rotateX, rotateY values as {x, y, z, rotateX, rotateY}
     */
    const calculateInitialTransform = (element, offsetDistance = 250, maxRotation = 300, maxZTranslation = 2000) => {
      const viewportCenter = { width: window.innerWidth / 2, height: window.innerHeight / 2 };
      const elementCenter = { 
        x: element.offsetLeft + element.offsetWidth / 2, 
        y: element.offsetTop + element.offsetHeight / 2 
      };

      // Calculate the angle between the center of the element and the center of the viewport
      const angle = Math.atan2(Math.abs(viewportCenter.height - elementCenter.y), Math.abs(viewportCenter.width - elementCenter.x));

      // Calculate the x and y translation based on the angle and distance
      const translateX = Math.abs(Math.cos(angle) * offsetDistance);
      const translateY = Math.abs(Math.sin(angle) * offsetDistance);

      // Calculate the maximum possible distance from the center (diagonal of the viewport)
      const maxDistance = Math.sqrt(Math.pow(viewportCenter.width, 2) + Math.pow(viewportCenter.height, 2));

      // Calculate the current distance from the center
      const currentDistance = Math.sqrt(Math.pow(viewportCenter.width - elementCenter.x, 2) + Math.pow(viewportCenter.height - elementCenter.y, 2));

      // Scale rotation and Z-translation based on distance from the center (closer elements rotate/translate less, farther ones rotate/translate more)
      const distanceFactor = currentDistance / maxDistance;

      // Calculate the rotation values based on the position relative to the center
      const rotationX = ((elementCenter.y < viewportCenter.height ? -1 : 1) * (translateY / offsetDistance) * maxRotation * distanceFactor);
      const rotationY = ((elementCenter.x < viewportCenter.width ? 1 : -1) * (translateX / offsetDistance) * maxRotation * distanceFactor);

      // Calculate the Z-axis translation (depth) based on the distance from the center
      const translateZ = maxZTranslation * distanceFactor;

      // Determine direction based on position relative to the viewport center
      return {
        x: elementCenter.x < viewportCenter.width ? -translateX : translateX,
        y: elementCenter.y < viewportCenter.height ? -translateY : translateY,
        z: translateZ,
        rotateX: rotationX,
        rotateY: rotationY
      };
    };

    // Function to animate the fourth grid
    const animateFourthGrid = () => {
      const grid = document.querySelector('[data-grid-fourth]');
      const gridImages = grid.querySelectorAll('.grid_service__img');
      

      gsap.timeline({
        defaults: {
          ease: 'expo'
        },
        scrollTrigger: {
          trigger: grid,
          start: 'center center',
          end: '+=200%',
          pin: grid.parentNode,
          scrub: 0.2,
        }
      })
      .set(grid, {perspective: 1000}) // Add perspective for 3D effect
      .fromTo(gridImages, {
        // Define the starting position based on the pre-calculated translation, rotation, and Z-axis translation values
        x: (_, el) => calculateInitialTransform(el).x,
        y: (_, el) => calculateInitialTransform(el).y,
        z: (_, el) => calculateInitialTransform(el).z, // Z-axis translation
        rotateX: (_, el) => calculateInitialTransform(el).rotateX*.5,
        rotateY: (_, el) => calculateInitialTransform(el).rotateY,
        autoAlpha: 0,
        scale: 0.7,
      }, {
        // Animate the images to their original position and remove transform
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        autoAlpha: 1,
        scale: 1,
        stagger: {
          amount: 0.2,
          from: 'center',
          grid: [4, 9]
        }
      });
    };

    // Function to animate the fourth (v2) grid
    const animateFourthV2Grid = () => {
      const grid = document.querySelector('[data-grid-fourth-v2]');
      const gridImages = grid.querySelectorAll('.grid_service__img');
      

      gsap.timeline({
        defaults: {
          ease: 'power4',
        },
        scrollTrigger: {
          trigger: grid,
          start: 'center center',
          end: '+=200%',
          pin: grid.parentNode,
          scrub: 0.2,
        }
      })
      .set(grid, {perspective: 1200}) // Add perspective for 3D effect
      .fromTo(gridImages, {
        // Define the starting position based on the pre-calculated translation, rotation, and Z-axis translation values
        x: (_, el) => calculateInitialTransform(el, 900).x,
        y: (_, el) => calculateInitialTransform(el, 600).y,
        z: (_, el) => calculateInitialTransform(el, _, _, -3000).z, // Z-axis translation
        rotateX: (_, el) => calculateInitialTransform(el, 250, -160, -3000).rotateX,
        rotateY: (_, el) => calculateInitialTransform(el, 250, -160, -3000).rotateY,
        autoAlpha: 0,
        scale: 0.4,
      }, {
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        autoAlpha: 1,
        scale: 1,
        stagger: {
          amount: 0.15,
          from: 'center',
          grid: [4, 9]
        }
      })
    };

    // Function to animate the fourth grid
    const animateFifthGrid = () => {
      const grid = document.querySelector('[data-grid-fifth]');
      const gridImages = grid.querySelectorAll('.grid_service__img');
  
      
      gsap.timeline({
        defaults: {
          ease: 'sine'
        },
        scrollTrigger: {
          trigger: grid,
          start: 'center center',
          end: '+=250%',
          pin: grid.parentNode,
          scrub: 0.3,
        }
      })
      .set(grid, {perspective: 1000})
      .from(gridImages, {
        stagger: {
          amount: 0.4,
          from: 'random',
          grid: [4,9]
        },
        y: window.innerHeight,
        rotationX: -70,
        transformOrigin: '50% 0%',
        z: -900,
        autoAlpha: 0
      });
    };

    // Function to animate the sixth grid
    const animateSixthGrid = () => {
      const grid = document.querySelector('[data-grid-sixth]');
      const gridImages = grid.querySelectorAll('.grid_service__img');
      
      
      gsap.timeline({
        defaults: {
          ease: 'none'
        },
        scrollTrigger: {
          trigger: grid,
          start: 'center center',
          end: '+=200%',
          pin: grid.parentNode,
          scrub: 0.5,
        }
      })
      .from(gridImages, {
        stagger: {
          amount: 0.03,
          from: 'edges',
          grid: [3,3]
        },
        scale: 0.7,
        autoAlpha: 0
      })
      .from(grid, {
        scale: .7,
        skewY: 5,
      }, 0);
    };

    // Function to animate the seventh grid
    const animateSeventhGrid = () => {
      const grid = document.querySelector('[data-grid-seventh]');
      const gridImages = grid.querySelectorAll('.grid_service__img');

      
      gsap.timeline({
        defaults: {
          ease: 'power1'
        },
        scrollTrigger: {
          trigger: grid,
          start: 'center center',
          end: '+=150%',
          pin: grid.parentNode,
          scrub: 0.5,
        }
      })
      .fromTo(gridImages, {
        yPercent: -102,
        //filter: 'brightness(300%) contrast(480%)'
      }, {
        stagger: 0.08,
        yPercent: 0,
        //filter: 'brightness(100%) contrast(100%)'
      })
      .from([...gridImages].map(img => img.querySelector('.grid_service__img-inner')), {
        stagger: 0.08,
        yPercent: 102,
      }, 0)
      // text content_service
      .from(grid.querySelectorAll('.grid_service__item'), {
        yPercent: 20,
        stagger: gridImages.length/2*0.08,
        autoAlpha: 0,
      }, 0);
    };

    // Function to animate the eighth grid
    const animateEighthGrid = () => {
      const grid = document.querySelector('[data-grid-eighth]');
      const gridImages = grid.querySelectorAll('.grid_service__img');
      
      
      gsap.timeline({
        defaults: {
          ease: 'expo'
        },
        scrollTrigger: {
          trigger: grid,
          start: 'center center',
          end: '+=250%',
          pin: grid.parentNode,
          scrub: true,
        }
      })
      .set(grid, {perspective: 2000})
      .from(gridImages, {
        stagger: {
          amount: 0.8,
          from: 'start'
        },
        rotationY: 65,
        transformOrigin: '0% 50%',
        z: -200,
        yPercent: 10 
      })
      .from(gridImages, {
        stagger: {
          amount: 0.8,
          from: 'start'
        },
        duration: 0.2,
        autoAlpha: 0
      }, 0);
    };

    // Function to animate the ninth grid
    const animateNinthGrid = () => {
      const grid = document.querySelector('[data-grid-ninth]');
      const gridImages = grid.querySelectorAll('.grid_service__img');
      
      
      gsap.timeline({
        defaults: {
          ease: 'power3'
        },
        scrollTrigger: {
          trigger: grid,
          start: 'center center',
          end: '+=200%',
          pin: grid.parentNode,
          scrub: true,
        }
      })
      .from(gridImages, {
        transformOrigin: '100% -450%',
        stagger: 0.07,
        scaleX: 1.05,
        skewX: 15,
        xPercent: 50,
        rotation: -10,
        autoAlpha: 0
      });
    };



    // Initialize other animation functions here as well
    
   
      animateFrame();
      animateFirstGrid();
      animateSecondGrid();
      animateThirdGrid();
      animateFourthGrid();
      animateFourthV2Grid();
      animateFifthGrid();
      animateSixthGrid();
      animateSeventhGrid();
      animateEighthGrid();
      animateNinthGrid();
  
    initSmoothScrolling();

   
    // Add calls to other animate functions as needed
    
  }, []);
  return (
    <main className='service_page'>
    
    <header className="frame_service" ref={frameRef}>
      <h2 className="frame_service__title" ref={frameTitleRef}>LUXIMA.ID Studio</h2>
      <div className="frame_service__subline type-tiny">
        <span>Layout Formation on Scroll</span>
        <nav className="frame_service__links flex-line">
          <a href="https://tympanus.net/codrops/?p=80656">Article</a>
          <a href="https://tympanus.net/codrops/demos/">All demos</a>
          <a href="https://github.com/codrops/OnScrollLayoutFormations">GitHub</a>
        </nav>
      </div>
      <nav className="frame_service__tags flex-line type-tiny">
        <a href="https://tympanus.net/codrops/demos/?tag=scroll">#scroll</a>
        <a href="https://tympanus.net/codrops/demos/?tag=grid">#grid</a>
      </nav>
      <span className="frame_service__logo">LUXIMA Studio</span>
    </header>
    <section className="content_service content_service--padded">
      <h4 className="type-tiny">Intro</h4>
      <p className="content_service__text">
        Welcome to Lennox Montgomery's photography portfolio. In a world dominated
        by speed and constant motion, Lennox Montgomery's photography invites you
        to slow down and immerse yourself in a visual experience that touches
        human fragility.
      </p>
    </section>
    <section className="content_service content_service--full content_service--padded">
      <div className="grid_service grid_service--spaced" data-grid-first="" ref={gridRef}>
        <div
          className="grid_service__img pos-1"
          style={{ backgroundImage: "url(/img/39.webp)" }}
        />
        <div
          className="grid_service__img pos-2"
          style={{ backgroundImage: "url(/img/38.webp)" }}
        />
        <div
          className="grid_service__img pos-3"
          style={{ backgroundImage: "url(/img/37.webp)" }}
        />
        <div
          className="grid_service__img pos-4"
          style={{ backgroundImage: "url(/img/36.webp)" }}
        />
        <div
          className="grid_service__img pos-5"
          style={{ backgroundImage: "url(/img/35.webp)" }}
        />
        <div
          className="grid_service__img pos-6"
          style={{ backgroundImage: "url(/img/6.webp)" }}
        />
        <div
          className="grid_service__img pos-7"
          style={{ backgroundImage: "url(/img/7.webp)" }}
        />
        <div
          className="grid_service__img pos-8"
          style={{ backgroundImage: "url(/img/8.webp)" }}
        />
        <div
          className="grid_service__img pos-9"
          style={{ backgroundImage: "url(/img/9.webp)" }}
        />
        <div
          className="grid_service__img pos-10"
          style={{ backgroundImage: "url(/img/1.webp)" }}
        />
        <div
          className="grid_service__img pos-11"
          style={{ backgroundImage: "url(/img/2.webp)" }}
        />
        <div
          className="grid_service__img pos-12"
          style={{ backgroundImage: "url(/img/3.webp)" }}
        />
        <div
          className="grid_service__img pos-13"
          style={{ backgroundImage: "url(/img/4.webp)" }}
        />
        <div
          className="grid_service__img pos-14"
          style={{ backgroundImage: "url(/img/5.webp)" }}
        />
        <div
          className="grid_service__img pos-15"
          style={{ backgroundImage: "url(/img/34.webp)" }}
        />
        <div
          className="grid_service__img pos-16"
          style={{ backgroundImage: "url(/img/16.webp)" }}
        />
        <div
          className="grid_service__img pos-17"
          style={{ backgroundImage: "url(/img/17.webp)" }}
        />
      </div>
      <div className="content_service__title">
        <h2 className="content_service__title-main">Rawness</h2>
        <p className="type-tiny right end">Captured in every moment</p>
      </div>
    </section>
    <section className="content_service content_service--padded">
      <h4 className="type-tiny">About</h4>
      <p className="content_service__text">
        His lens captures the quiet ache of reality, where shadow and light blur
        the line between seen and felt. Soft, muted tones breathe life into the
        ordinary, revealing the sensual curves and fragile textures hidden in
        plain sight. Each image lingers in the tension of what’s almost forgotten,
        where touch and absence coexist. There’s no rush, no spectacle—just the
        raw, intimate beauty of life unfolding in quiet moments. Light grazes
        skin, shadows hold secrets, and the world feels both distant and deeply
        near.
      </p>
    </section>
    <section className="content_service content_service--padded">
      <div className="grid_service grid_service--columns grid_service--spaced" data-grid-second="" ref={gridRef}>
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/23.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/40.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/10.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/17.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/22.webp)" }}
        />
        <div className="grid_service__item pos-6">
          <h4 className="type-tiny">Vision</h4>
          <p>Unveiling the unseen</p>
        </div>
        <div className="grid_service__item pos-7">
          <h4 className="type-tiny">Focus</h4>
          <p>Where color meets form</p>
        </div>
        <div className="grid_service__item pos-18">
          <h4 className="type-tiny">Essence</h4>
          <p>Moments in motion</p>
        </div>
      </div>
    </section>
    <section className="content_service content_service--padded">
      <h4 className="type-tiny">Life</h4>
      <p className="content_service__text">
        Lennox Montgomery, born in 1987 in Brooklyn, grew up attuned to the gentle
        interplay of light and shadow in the city’s quieter corners. His eye was
        drawn to the unnoticed beauty in the mundane, the softness in the grit. In
        his early 20s, he relocated to Los Angeles, where the hazy sunlight, muted
        colors, and sprawling landscapes deepened his introspective approach to
        art. There, he found inspiration in the delicate moments between movement
        and stillness, capturing the fleeting, sensual beauty of everyday life in
        a way that feels both intimate and timeless.
      </p>
    </section>
    <section className="content_service content_service--padded content_service--full">
      <div
        className="grid_service grid_service--columns grid_service--spaced grid_service--single"
        data-grid-third=""
      >
        <div
          className="grid_service__img pos-2"
          style={{ backgroundImage: "url(/img/23.webp)" }}
        />
        <div
          className="grid_service__img pos-2"
          style={{ backgroundImage: "url(/img/24.webp)" }}
        />
        <div
          className="grid_service__img pos-2"
          style={{ backgroundImage: "url(/img/25.webp)" }}
        />
        <div
          className="grid_service__img pos-2"
          style={{ backgroundImage: "url(/img/26.webp)" }}
        />
        <div
          className="grid_service__img pos-2"
          style={{ backgroundImage: "url(/img/27.webp)" }}
        />
        <div className="grid_service__item acenter pos-1">
          <h4 className="type-tiny">Craft</h4>
          <p>His craft reveals the quiet beauty in life’s fleeting moments.</p>
        </div>
        <div className="grid_service__item acenter pos-4">
          <h4 className="type-tiny">Perspective</h4>
          <p>
            His perspective finds depth in stillness, where the unseen speaks.
          </p>
        </div>
      </div>
    </section>
    <section className="content_service content_service--padded">
      <h4 className="type-tiny">Work Ethics</h4>
      <p className="content_service__text">
        Driven by a strong sense of discipline and dedication, his work ethic
        reflects a deep commitment to both his craft and personal growth. With a
        relentless focus on innovation, he consistently seeks to push the
        boundaries of his creativity, drawing inspiration from the diverse
        environments that have shaped his artistic journey. Each project is
        approached with meticulous attention to detail, often requiring long hours
        and unwavering determination to achieve the desired result.
      </p>
    </section>
    <section className="content_service content_service--padded content_service--full">
      <div className="grid_service grid_service--spaced grid_service--small" data-grid-fourth="" ref={gridRef}>
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/28.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/29.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/30.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/1.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/2.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/3.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/4.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/5.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/6.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/7.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/8.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/9.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/10.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/11.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/12.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/13.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/14.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/15.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/16.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/17.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/18.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/19.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/20.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/21.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/22.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/23.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/24.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/25.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/26.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/27.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/28.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/29.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/30.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/31.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/32.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/33.webp)" }}
        />
      </div>
    </section>
    <section className="content_service content_service--full">
      <div className="grid_service grid_service--small" data-grid-fourth-v2="" ref={gridRef}>
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/15.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/32.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/9.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/41.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/6.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/21.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/13.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/2.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/27.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/37.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/14.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/10.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/29.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/1.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/19.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/38.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/5.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/25.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/11.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/40.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/22.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/3.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/30.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/18.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/33.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/4.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/36.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/28.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/23.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/35.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/16.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/31.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/7.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/26.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/9.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/42.webp)" }}
        />
      </div>
    </section>
    <section className="content_service content_service--padded">
      <h4 className="type-tiny">Inspiration</h4>
      <p className="content_service__text">
        Lennox draws inspiration from the quiet, in-between moments of everyday
        life—the fleeting light at dawn, the subtle movement of shadows, the way
        stillness can carry untold stories. He’s moved by the fragility of human
        existence, finding beauty in imperfection and transience. Nature plays a
        role too, but not in grand landscapes—rather, in the soft, textured layers
        of light filtering through a window or the delicate detail of wind
        stirring leaves.
      </p>
    </section>
    <section className="content_service content_service--padded content_service--full">
      <div className="grid_service grid_service--spaced grid_service--wide" data-grid-fifth="" ref={gridRef}>
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/20.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/19.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/18.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/17.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/16.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/15.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/14.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/13.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/12.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/11.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/10.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/9.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/8.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/7.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/6.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/5.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/4.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/3.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/2.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/1.webp)" }}
        />
      </div>
      <div className="content_service__title">
        <h2 className="content_service__title-main">Explorations</h2>
        <p className="type-tiny right end">Nothing left unseen</p>
      </div>
    </section>
    <section className="content_service content_service--padded">
      <h4 className="type-tiny">Process</h4>
      <p className="content_service__text">
        The creative process begins with stillness and observation, letting the
        moment speak before any action is taken. It’s about immersing in the
        environment, feeling the quiet shifts in light, texture, and mood. Rather
        than forcing a scene, there’s a deep patience—waiting for the right
        interplay of shadow or the soft touch of light on a surface.{" "}
      </p>
    </section>
    <section className="content_service content_service--full content_service--cutoff">
      <div className="grid_service grid_service--spaced grid_service--zoomed" data-grid-sixth="" ref={gridRef} >
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/42.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/10.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/40.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/19.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/1.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/12.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/38.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/13.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/36.webp)" }}
        />
      </div>
      <div className="content_service__title">
        <h2 className="content_service__title-main">Unspoken</h2>
        <p className="type-tiny right end">Love will not save us</p>
      </div>
    </section>
    <section className="content_service content_service--padded">
      <h4 className="type-tiny">Collaborations</h4>
      <p className="content_service__text">
        Known for his openness to new ideas and innovative approaches, Lennox
        thrives on the energy that comes from working with fellow artists,
        designers, and creative professionals. By blending unique perspectives and
        exploring diverse techniques, collaborations with Lennox result in work
        that pushes artistic boundaries and connects with a wider audience.
      </p>
    </section>
    <section className="content_service content_service--full content_service--padded">
      <div className="grid_service grid_service--column" data-grid-seventh="" ref={gridRef}>
        <div className="grid_service__item span-3">
          <h4 className="type-tiny">Opalescent</h4>
          <p>Their hearts glow softly, bound by a love so pure.</p>
        </div>
        <div className="grid_service__img ar-rect span-2">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/2.webp)" }}
          />
        </div>
        <div className="grid_service__img ar-wide">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/4.webp)" }}
          />
        </div>
        <div className="grid_service__img ar-wide span-2">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/6.webp)" }}
          />
        </div>
        <div className="grid_service__img span-2 ar-narrow">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/8.webp)" }}
          />
        </div>
        <div className="grid_service__img ar-wide">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/10.webp)" }}
          />
        </div>
        <div className="grid_service__img ar-wide span-2">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/12.webp)" }}
          />
        </div>
        <div className="grid_service__img span-2 ar-narrow">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/14.webp)" }}
          />
        </div>
        <div className="grid_service__item span-3">
          <h4 className="type-tiny">Softness</h4>
          <p>Blissful serenity embraces their world in gentle tones.</p>
        </div>
        <div className="grid_service__img span-2 ar-narrow">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/16.webp)" }}
          />
        </div>
        <div className="grid_service__img ar-wide span-2">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/18.webp)" }}
          />
        </div>
        <div className="grid_service__img ar-rect">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/20.webp)" }}
          />
        </div>
        <div className="grid_service__img ar-wide span-2">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/22.webp)" }}
          />
        </div>
        <div className="grid_service__img ar-narrow span-2">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/24.webp)" }}
          />
        </div>
        <div className="grid_service__img ar-wide span-3">
          <div
            className="grid_service__img-inner"
            style={{ backgroundImage: "url(/img/26.webp)" }}
          />
        </div>
      </div>
    </section>
    <section className="content_service content_service--padded">
      <h4 className="type-tiny">Style</h4>
      <p className="content_service__text">
        His style is rooted in subtlety and restraint, capturing the delicate
        balance between light and shadow, presence and absence. He gravitates
        toward muted, natural tones that evoke a sense of quiet intimacy, favoring
        soft textures and a timeless, understated aesthetic. There’s a rawness in
        his work, yet it never feels harsh—rather, it reveals the fragility and
        beauty found in life’s simplest moments.
      </p>
    </section>
    <section className="content_service content_service--full">
      <div className="grid_service grid_service--tiny" data-grid-eighth="" ref={gridRef}>
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/28.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/29.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/30.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/1.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/2.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/3.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/4.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/5.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/6.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/7.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/8.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/9.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/10.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/11.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/12.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/13.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/14.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/15.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/16.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/17.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/18.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/19.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/20.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/21.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/22.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/23.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/24.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/25.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/26.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/27.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/28.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/29.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/30.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/31.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/32.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/33.webp)" }}
        />
      </div>
    </section>
    <section className="content_service content_service--padded">
      <h4 className="type-tiny">Future</h4>
      <p className="content_service__text">
        Looking ahead, Lennox envisions his work diving deeper into the
        exploration of intimacy and impermanence. He’s drawn to the idea of
        capturing moments that feel almost invisible—those fleeting seconds
        between stillness and motion, light and shadow. In the future, he hopes to
        experiment more with multimedia projects, blending photography with film
        and sound to create immersive, sensory experiences that evoke emotion
        beyond the frame.
      </p>
    </section>
    <section className="content_service content_service--full">
      <div className="grid_service grid_service--columns" data-grid-ninth="">
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/35.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/31.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/20.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/34.webp)" }}
        />
        <div
          className="grid_service__img"
          style={{ backgroundImage: "url(/img/38.webp)" }}
        />
      </div>
    </section>
    <section className="content_service content_service--padded">
      <h4 className="type-tiny">Contact</h4>
      <p className="content_service__text">
        Interested in collaborating or just want to say hello? Reach out to
        Lennox. He’s always open to new projects and conversations.
      </p>
    </section>
    <footer className="page-footer_service type-tiny">
      <span>
        Created by <a href="https://x.com/codrops">@codrops</a> 2024
      </span>
      <span>
        <a href="https://tympanus.net/codrops/demos/">More demos</a>
      </span>
      <a href="https://tympanus.net/codrops/collective/">
        Subscribe to our frontend newsletter
      </a>
    </footer>
  </main>

  )
}

export default page;