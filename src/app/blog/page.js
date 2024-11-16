'use client'
import Image from 'next/image'
import './style.css'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdArrowForward } from "react-icons/md";
import { motion } from 'framer-motion';




const Blog = () => {
  const [posts, setPosts] = useState([]); // Inisialisasi dengan array kosong
  const [loading, setLoading] = useState(true); // Tambahkan state untuk loading

  useEffect(() => {
    // Mengambil data dari FakeAPI
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://api.luxima.id/api/blogs");
        const data = await response.json();
        setPosts(data.data); // Simpan data ke dalam state
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Set loading ke false setelah data diterima atau terjadi error
      }
    };

    fetchPosts();

  }, []);

  if (loading) {
    return (
     <div className="preloader">
        <div className="loader">
        </div>
        <img src="/img/loader.png" alt="loader" className="absolute" />
    </div>
    )
  }
  return (
    <>
    
    <div className='content_blog'>
      <div className="content_blog__header">
          <motion.h2
            animate={{ y: "0%", opacity: 1 }}
              initial={{ y: "100%", opacity: 0 }}
              transition={{ delay: 0.5, duration: 1}}
          >Blog</motion.h2>
        </div>
      <div className="content_blog__text">
        <ul 
          
        >
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <h2 className='content_blog_title'>{post.title}</h2>
              </Link>
              <div className='content_blog_article'>
                <div className='left'>
                  <Image src="/img/42.webp" alt="image" width={300} height={150} className='content_img' />
                  <div className='content_blog_author'>
                    {post.author.name}
                  </div>
                </div>
                <div className='right'>
                <p>{post.content.substring(0, 100)}...</p>
                <div className='readMore'>
                <Link href={`/blog/${post.id}`} >Read More <span className='arrow'><MdArrowForward style={{ rotate: '-45deg' , width: '2rem', height: '2rem' }} /></span></Link>
                </div>
              </div>
              
              </div>
           
          </li>
        ))}
        </ul>
      
      </div>

      <footer className="content_blog__footer">
          <span>
            Made by <a href="https://luxima.id">LUXIMA.ID</a>
          </span>
          <a href="#">
            Subscribe to our frontend news
          </a>
        </footer>
    </div>
    
    </>
  )
}

export default Blog
