import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
export const initSmoothScrolling = () => {
    const lenis = new Lenis({
      lerp: 0.2, // Lower values create a smoother scroll effect
      smoothWheel: true, // Enables smooth scrolling for mouse wheel events
    });

    // Update ScrollTrigger on scroll
    lenis.on('scroll', () => ScrollTrigger.update());

    gsap.ticker.add(time => {
      lenis.raf(time * 1000); // Convert GSAP's time to milliseconds for Lenis.
    });
    
    // Turn off GSAP's default lag smoothing to avoid conflicts with Lenis.
    gsap.ticker.lagSmoothing(0);
  };

