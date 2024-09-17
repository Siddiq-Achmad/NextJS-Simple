import React from "react";
import Head from 'next/head'
import Link from "next/link";
import './page.css'

const page = () => {
    return (
        

        <section className="content_about">
        <nav className="content_about__nav">
          <Link href="/about">About</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="content_about__header">
          <h2>LUXIMA Studio</h2>
        </div>
        <div className="content_about__text">
          <p className="right">
            At <strong>Luxima</strong>Studio®, our team of creative artists and tech
            experts work together to explore new possibilities. Each project shows
            our dedication to new ideas and high quality, whether it's a commercial,
            film, or interactive display.
          </p>
          <p className="highlight">
            We believe motion design can tell stories, evoke emotions, and inspire
            imaginations.
          </p>
          <p>
            Our clients are at the core of everything we do at <strong>Nova</strong>
            Motion®. We pride ourselves on building strong, lasting relationships
            based on trust, communication, and mutual respect. We listen carefully
            to your needs and goals, ensuring we fully understand your vision.{" "}
          </p>
          <p>
            By collaborating closely, we tailor our approach to meet your unique
            requirements, delivering results that exceed expectations. Whether you
            are a small business or a large corporation, we are committed to helping
            you succeed. With <strong>Nova</strong>Motion®, you are not just a
            client; you are a valued partner in creating exceptional visual stories.
          </p>
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

      
    )
};

export default page;