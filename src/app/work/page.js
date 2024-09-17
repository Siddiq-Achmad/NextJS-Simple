"use client";
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import {Preview} from './preview';
import {Item} from './item';
import './page.css';

const page = () => {
    
    const bodyRef = useRef(null);
    const contentElRef = useRef(null);
    const previewRef = useRef(null);
    const itemRef = useRef(null);
    const frameElRef = useRef(null);
    const overlayRowsRef = useRef([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          const body = bodyRef.current;
          const contentEl = contentElRef.current;
          const frameEl = frameElRef.current;
          const overlayRows = [...document.querySelectorAll('.overlay_work__row')];
    
          const previews = [];
          document.querySelectorAll('.preview').forEach(preview => {
            previews.push(new Preview(preview));
          });
    
          const items = [];
          document.querySelectorAll('.item').forEach((item, pos) => {
            items.push(new Item(item, previews[pos]));
          });
    
          const openItem = (item) => {
            gsap.timeline({
              defaults: {
                duration: 1,
                ease: 'power3.inOut',
              },
            })
              .add(() => {
                contentEl.classList.add('content_work--hidden');
              }, 'start')
              .addLabel('start', 0)
              .set([item.preview.DOM.innerElements, item.preview.DOM.backCtrl], {
                opacity: 0,
              }, 'start')
              .to(overlayRows, {
                scaleY: 1,
              }, 'start')
              .addLabel('content_work', 'start+=0.6')
              .add(() => {
                body.classList.add('preview-visible');
                gsap.set(frameEl, {
                  opacity: 0,
                }, 'start');
                item.preview.DOM.el.classList.add('preview--current');
              }, 'content_work')
              .to([item.preview.DOM.image, item.preview.DOM.imageInner], {
                startAt: { y: pos => (pos ? '101%' : '-101%') },
                y: '0%',
              }, 'content_work')
              .add(() => {
                for (const line of item.preview.multiLines) {
                  line.in();
                }
                gsap.set(item.preview.DOM.multiLineWrap, {
                  opacity: 1,
                  delay: 0.1,
                });
              }, 'content_work')
              .to(frameEl, {
                ease: 'expo',
                startAt: { y: '-100%', opacity: 0 },
                opacity: 1,
                y: '0%',
              }, 'content_work+=0.3')
              .to(item.preview.DOM.innerElements, {
                ease: 'expo',
                startAt: { yPercent: 101 },
                yPercent: 0,
                opacity: 1,
              }, 'content_work+=0.3')
              .to(item.preview.DOM.backCtrl, {
                opacity: 1,
              }, 'content_work');
          };
    
          const closeItem = (item) => {
            gsap.timeline({
              defaults: {
                duration: 1,
                ease: 'power3.inOut',
              },
            })
              .addLabel('start', 0)
              .to(item.preview.DOM.innerElements, {
                yPercent: -101,
                opacity: 0,
              }, 'start')
              .add(() => {
                for (const line of item.preview.multiLines) {
                  line.out();
                }
              }, 'start')
              .to(item.preview.DOM.backCtrl, {
                opacity: 0,
              }, 'start')
              .to(item.preview.DOM.image, {
                y: '101%',
              }, 'start')
              .to(item.preview.DOM.imageInner, {
                y: '-101%',
              }, 'start')
              .to(frameEl, {
                opacity: 0,
                y: '-100%',
                onComplete: () => {
                  body.classList.remove('preview-visible');
                  gsap.set(frameEl, {
                    opacity: 1,
                    y: '0%',
                  });
                },
              }, 'start')
              .addLabel('grid', 'start+=0.6')
              .to(overlayRows, {
                scaleY: 0,
                onComplete: () => {
                  item.preview.DOM.el.classList.remove('preview--current');
                  contentEl.classList.remove('content_work--hidden');
                },
              }, 'grid');
          };
    
          items.forEach((item) => {
            item.DOM.link.addEventListener('click', () => openItem(item));
            item.preview.DOM.backCtrl.addEventListener('click', () => closeItem(item));
          });
        }
      }, []);


  return (
    <div className='page-content' ref={bodyRef}>
      <div className='page-work'>
        <div className="content_work" ref={contentElRef}>
            <div className="item" ref={itemRef}>
            <span className="item__meta">2020</span>
            <h2 className="item__title">Alex Moulder</h2>
            <div className="item__img" ref={frameElRef}>
                <div
                className="item__img-inner"
                style={{ backgroundImage: "url(img/1.jpg)" }}
                />
            </div>
            <p className="item__desc">
                I am only waiting for love to give myself up at last into his hands.
                That is why it is so late and why I have been guilty of such omissions.
            </p>
            <a className="item__link">view</a>
            </div>
            <div className="item" ref={itemRef}>
            <span className="item__meta">2021</span>
            <h2 className="item__title">Aria Bennett</h2>
            <div className="item__img">
                <div
                className="item__img-inner"
                style={{ backgroundImage: "url(img/2.jpg)" }}
                />
            </div>
            <p className="item__desc">
                They come with their laws and their codes to bind me fast; but I evade
                them ever, for I am only waiting for love to give myself up at last into
                his hands.
            </p>
            <a className="item__link">view</a>
            </div>
            <div className="item" ref={itemRef}>
            <span className="item__meta">2022</span>
            <h2 className="item__title">Jimmy Hughes</h2>
            <div className="item__img">
                <div
                className="item__img-inner"
                style={{ backgroundImage: "url(img/3.jpg)" }}
                />
            </div>
            <p className="item__desc">
                Clouds heap upon clouds and it darkens. Ah, love, why dost thou let me
                wait outside at the door all alone?
            </p>
            <a className="item__link">view</a>
            </div>
            
        </div>
        <div className="overlay_work">
            <div className="overlay_work__row" ref={(el) => (overlayRowsRef.current[0] = el)} />
            <div className="overlay_work__row" ref={(el) => (overlayRowsRef.current[0] = el)} />
        </div>
        <section className="previews" >

            <div className="preview" ref={previewRef}>
            <div className="preview__img">
                <div
                className="preview__img-inner"
                style={{ backgroundImage: "url(img/1_big.jpg)" }}
                />
            </div>
            <h2 className="preview__title oh">
                <span className="oh__inner">Moulder</span>
            </h2>
            <div className="preview__column preview__column--start">
                <span className="preview__column-title preview__column-title--main oh">
                <span className="oh__inner">Alex Moulder</span>
                </span>
                <span className="oh">
                <span className="oh__inner">2020</span>
                </span>
            </div>
            <div className="preview__column">
                <h3 className="preview__column-title oh">
                <span className="oh__inner">Location</span>
                </h3>
                <p>
                And if it rains, a closed car at four. And we shall play a game of
                chess, pressing lidless eyes and waiting for a knock upon the door.
                </p>
            </div>
            <div className="preview__column">
                <h3 className="preview__column-title oh">
                <span className="oh__inner">Material</span>
                </h3>
                <p>
                At the violet hour, when the eyes and back, turn upward from the desk,
                when the human engine waits.
                </p>
            </div>
            <button className="unbutton preview__back">
                <svg width="100px" height="18px" viewBox="0 0 50 9">
                <path
                    vectorEffect="non-scaling-stroke"
                    d="m0 4.5 5-3m-5 3 5 3m45-3h-77"
                />
                </svg>
            </button>
            </div>
            <div className="preview" ref={previewRef}>
            <div className="preview__img">
                <div
                className="preview__img-inner"
                style={{ backgroundImage: "url(img/2_big.jpg)" }}
                />
            </div>
            <h2 className="preview__title oh">
                <span className="oh__inner">Bennett</span>
            </h2>
            <div className="preview__column preview__column--start">
                <span className="preview__column-title preview__column-title--main oh">
                <span className="oh__inner">Aria Bennett</span>
                </span>
                <span className="oh">
                <span className="oh__inner">2021</span>
                </span>
            </div>
            <div className="preview__column">
                <h3 className="preview__column-title oh">
                <span className="oh__inner">Location</span>
                </h3>
                <p>
                And if it rains, a closed car at four. And we shall play a game of
                chess, pressing lidless eyes and waiting for a knock upon the door.
                </p>
            </div>
            <div className="preview__column">
                <h3 className="preview__column-title oh">
                <span className="oh__inner">Material</span>
                </h3>
                <p>
                At the violet hour, when the eyes and back, turn upward from the desk,
                when the human engine waits.
                </p>
            </div>
            <button className="unbutton preview__back">
                <svg width="100px" height="18px" viewBox="0 0 50 9">
                <path
                    vectorEffect="non-scaling-stroke"
                    d="m0 4.5 5-3m-5 3 5 3m45-3h-77"
                />
                </svg>
            </button>
            </div>
            <div className="preview" ref={previewRef}>
            <div className="preview__img">
                <div
                className="preview__img-inner"
                style={{ backgroundImage: "url(img/3_big.jpg)" }}
                />
            </div>
            <h2 className="preview__title oh">
                <span className="oh__inner">Hughes</span>
            </h2>
            <div className="preview__column preview__column--start">
                <span className="preview__column-title preview__column-title--main oh">
                <span className="oh__inner">Jimmy Hughes</span>
                </span>
                <span className="oh">
                <span className="oh__inner">2022</span>
                </span>
            </div>
            <div className="preview__column">
                <h3 className="preview__column-title oh">
                <span className="oh__inner">Location</span>
                </h3>
                <p>
                And if it rains, a closed car at four. And we shall play a game of
                chess, pressing lidless eyes and waiting for a knock upon the door.
                </p>
            </div>
            <div className="preview__column">
                <h3 className="preview__column-title oh">
                <span className="oh__inner">Material</span>
                </h3>
                <p>
                At the violet hour, when the eyes and back, turn upward from the desk,
                when the human engine waits.
                </p>
            </div>
            <button className="unbutton preview__back">
                <svg width="100px" height="18px" viewBox="0 0 50 9">
                <path
                    vectorEffect="non-scaling-stroke"
                    d="m0 4.5 5-3m-5 3 5 3m45-3h-77"
                />
                </svg>
            </button>
            </div>
        </section>
        </div>

    </div>
  )
}

export default page
