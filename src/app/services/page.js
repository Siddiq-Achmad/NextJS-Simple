'use client';
import styles from './page.module.css'
import { useState } from 'react';
import Service from '../components/service/';
import Modal from '../components/modal/';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Creative Studio",
    subTitle: "Workspace & Studio",
    src: "35.jpg",
    color: "#000000"
  },
  {
    title: "Photo Studio",
    subTitle: "Photography",
    src: "38.jpg",
    color: "#8C8C8C"
  },
  {
    title: "Weddings",
    subTitle: "Photography",
    src: "30.jpg",
    color: "#EFE8D3"
  },
  {
    title: "Web Development",
    subTitle: "Tech & System",
    src: "27.jpg",
    color: "#706D63"
  },
  {
    title: "Server & System",
    subTitle: "Tech & System",
    src: "28.jpg",
    color: "#FEFEFE"
  }

]
export default function page() {
    const [modal, setModal] = useState({active: false, index: 0})
  return (
   <main className={styles.main}>

    <motion.div 
      animate={{ y: "0%", opacity: 1 }}
      initial={{ y: "100%", opacity: 0 }}
      transition={{ delay: 0.6  , duration: 1}}
      className={styles.body}>

      {

        services.map( (service, index) => {

          return <Service index={index} title={service.title} subTitle={service.subTitle} setModal={setModal} key={index}/>

        })

      }

    </motion.div>

    <Modal modal={modal} services={services}/>

  </main>
  )
}
