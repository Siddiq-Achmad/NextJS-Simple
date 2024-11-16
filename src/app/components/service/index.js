'use client';
import React from 'react'
import styles from './style.module.css';

export default function index({index, title, subTitle, setModal}) {

    return (
        <div onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}} className={styles.service}>
            <h2>{title}</h2>
            <p>{subTitle}</p>
        </div>
    )
}