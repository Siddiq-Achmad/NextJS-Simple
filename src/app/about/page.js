'use client'
import React from "react";
import Head from 'next/head'
import Link from "next/link";
import './page.css'
import MenuBottom from "../components/menu/MenuBottom";
import { motion } from "framer-motion";

const page = () => {
    return (
      <motion.div
        animate={{ x: "0%", opacity: 1 }}
          initial={{ x: "-100%", opacity: 0 }}
          transition={{ delay: 0.5  , duration: 0.5}}
      >
        <section
        className="content_about">
        <nav className="content_about__nav">
          <Link href="/about">About</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="content_about__header">
          <motion.h2
            animate={{ y: "0%", opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ delay: 1.4, duration: 1}}
          >LUXIMA Studio</motion.h2>
        </div>
        <div className="content_about__text">
          <motion.p 
          animate={{ y: "0%", opacity: 1 }} initial={{ y: "100%", opacity: 0 }} transition={{ delay: 1.4, duration: 1}} 
          className="right">
            At <strong>Luxima</strong>Studio®, our team of creative artists and tech
            experts work together to explore new possibilities. Each project shows
            our dedication to new ideas and high quality, whether it's a commercial,
            film, or interactive display.
          </motion.p>
          <motion.p 
            animate={{ x: "0%", opacity: 1 }}
              initial={{ x: "100%", opacity: 0 }}
              transition={{ delay: 1.6, duration: 1}}
          className="highlight">
            We believe motion design can tell stories, evoke emotions, and inspire
            imaginations.
          </motion.p>
          <motion.p 
            animate={{ y: "0%", opacity: 1 }}
            initial={{ y: "100%", opacity: 0 }}
            transition={{ delay: 1.2, duration: 1}}>
            Our clients are at the core of everything we do at <strong>Luxima</strong>
            Studio®. We pride ourselves on building strong, lasting relationships
            based on trust, communication, and mutual respect. We listen carefully
            to your needs and goals, ensuring we fully understand your vision.{" "}
          </motion.p>
          <motion.p 
            animate={{ y: "0%", opacity: 1 }}
            initial={{ y: "100%", opacity: 0 }}
            transition={{ delay: 1.2, duration: 1}}>
            By collaborating closely, we tailor our approach to meet your unique
            requirements, delivering results that exceed expectations. Whether you
            are a small business or a large corporation, we are committed to helping
            you succeed. With <strong>Luxima</strong>Studio®, you are not just a
            client; you are a valued partner in creating exceptional visual stories.
          </motion.p>
        </div>
        <footer className="content_about__footer">
          <span>
            Made by <a href="#">LUXIMA.ID</a>
          </span>
          <a href="#">
            Subscribe to our frontend news
          </a>
        </footer>
      </section>

      </motion.div>
    )
};

export default page;