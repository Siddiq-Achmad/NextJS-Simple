"use client";
import React, { useState, useRef, useEffect } from 'react';  
import Link from 'next/link';
import Image from 'next/image';
import "./menu.css";
import { RiHeartFill, RiMenuLine } from "@remixicon/react";

const menuLinks = [
    {path : "/", name : "Home"},
    {path : "/about", name : "About"},
    {path : "/work", name : "Work"},
    {path : "/services", name : "Service"},
    {path : "/contact", name : "Contact"},
];

import {gsap} from 'gsap';
import { useGSAP } from '@gsap/react';


const Menu = () => {
    const container = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const tl = useRef();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useGSAP(
        () => {
            gsap.set(".menu-link-item-holder", { y : 75 });
            tl.current = gsap
                .timeline({ paused : true })
                .to(".menu-overlay", {
                    duration : 1,
                    clipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    ease : "power4.out"
                })
                .to(".menu-link-item-holder", {
                    y : 0,
                    duration : 1,
                    stagger : 0.1,
                    ease : "power4.out",
                    delay : -0.75,
                })
                .to(".menu-info-col-item", {
                    y : 0,
                    duration : 1,
                    stagger : 0.1,
                    ease : "power4.in",
                    delay : -0.75,
                });
        },
        {
            scope: container
        }
    );

    useEffect(() => {
        if (isMenuOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={container}>
        <div className="menu-bar">
            <div className="menu-logo">
                <Link href="/"><Image src="img/logoIcon.svg" alt="logo" width={120} height={36} /></Link>
            </div>
            <div className="menu-open" onClick={toggleMenu}>
                <div className="menu-button">
                <button className='button menu-title'>
                    <span>Menu</span>
                </button>
                <RiMenuLine
                    size={36} // set custom `width` and `height`
                    color="#fff" // set `fill` color
                    className="menu-icon" // add custom class name
                />
                </div>
            </div>
        </div>
        <div className="menu-overlay">
            <div className="menu-overlay-bar">
                <div className="menu-logo">
                    <Link href="/">LUXIMA</Link>
                </div>
                <div className="menu-close" onClick={toggleMenu}>
                    <p>Close</p>
                </div>
            </div>
            
            <div className="menu-close-icon" onClick={toggleMenu}>
                <p>&#x2715;</p>
            </div>
            <div className="menu-copy">
                <div className="menu-links">
                    {menuLinks.map((link, index) => (
                        <div className="menu-link-item" key={index}>
                            <div className="menu-link-item-holder" onClick={toggleMenu}>
                                <Link href={link.path} className="menu-link">{link.name}</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="menu-info">
                    <div className="menu-info-col">
                        <a className="menu-info-col-item" href="#">X &#8599;</a>
                        <a className="menu-info-col-item" href="#">Instagram &#8599;</a>
                        <a className="menu-info-col-item" href="#">LinkedIn &#8599;</a>
                        <a className="menu-info-col-item" href="#">Behance &#8599;</a>
                        <a className="menu-info-col-item" href="#">Dribble &#8599;</a>
                    </div>
                    <div className="menu-info-col">
                        <p>info@luxima.id</p>
                        <p>+628 123 456 789</p>
                    </div>
                </div>
            </div>
            <div className="menu-preview">
                <p>View Showreel</p>
            </div>
            
        </div>
        
    </div>
  )
}

export default Menu;
