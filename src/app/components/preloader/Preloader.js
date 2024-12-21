'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';


   

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.to({}, {
      duration: 1.6, // Simulate loading time (3 seconds)
      ease: "power3.out",
      onUpdate: function () {
        // Update progress from 0 to 100
        const currentProgress = Math.round(this.progress() * 100);
        setProgress(currentProgress);
      },
      onComplete: function () {
         gsap.to('.preloader', { opacity: 0, y: 20, duration: 0.4, ease: 'power3.inOut' });
        
        setTimeout(() => {
          onComplete(); // Call the onComplete function after loading
        }, 20); // Delay of 0.2 seconds before removing the preloader
      }
    });
  }, [onComplete]);

  return (
    <main>
    <div ref={preloaderRef} className="preloader">
      {/* Preloader content */}
      <div className='preloader__content'>
        <img src="/img/loader.png" alt="loader" />
        <div className='preloader__text'>
          <h1 className='preloader__title'>Loading</h1>
          <p>please wait</p>
        </div>
        
        <div className='preloader__status'>
            <div className='preloader__progress'></div>
             <div className='preloader__progress-bar' style={{ width: `${progress}%` }}></div>
            <div className='preloader__progress-percent'></div>
            <div className='preloader__progress-text'>{progress}%</div>
        </div>
      </div>
    </div>
    </main>
  );
};

export default Preloader;
