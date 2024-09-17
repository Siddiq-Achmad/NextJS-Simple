import imagesLoaded from 'imagesloaded';
/**
 * Preloads images specified by the CSS selector.
 * @function
 * @param {string} [selector='img'] - CSS selector for target images.
 * @returns {Promise} - Resolves when all specified images are loaded.
 */
// export const preloadImages = (selector = 'img') => {
//   return new Promise((resolve) => {
//       // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
//       imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
//   });
// };

// // Linear interpolation
// export const lerp = (a, b, n) => (1 - n) * a + n * b;

// // Gets the mouse position
// export const getMousePos = e => {
//   return { 
//       x : e.clientX, 
//       y : e.clientY 
//   };
// };



export const preloadImages = (selector) => {
  return new Promise((resolve) => {
    const images = [...document.querySelectorAll(selector)];
    let loaded = 0;
    const total = images.length;

    images.forEach((img) => {
      const image = new Image();
      image.src = img.src;
      image.onload = () => {
        loaded++;
        if (loaded === total) {
          resolve();
        }
      };
    });
  });
};

export const preloadFonts = (id) => {
  return new Promise((resolve) => {
      WebFont.load({
          typekit: {
              id: id
          },
          active: resolve
      });
  });
};


export const getMousePos = (e) => {
  return { x: e.clientX, y: e.clientY };
};

export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const wrapElements = (elems, wrapType, wrapClass) => {
  elems.forEach(char => {
        // add a wrap for every char (overflow hidden)
        const wrapEl = document.createElement(wrapType);
        wrapEl.classList = wrapClass;
        char.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(char);
    });
}
export const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

export const distance = (x1,y1,x2,y2) => {
  var a = x1 - x2;
  var b = y1 - y2;

  return Math.hypot(a,b);
}

export const calcWinsize = () => {
  return {width: window.innerWidth, height: window.innerHeight};
};