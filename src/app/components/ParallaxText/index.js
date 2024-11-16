import React from 'react'
import './style.css'
import ParallaxText from './ParallaxText'

const ParallaxInfo = () => {
  return (
    <div className='parallax-text'>
      <ParallaxText baseVelocity={-2}>web dev _ wedding _ photography _ studio _ </ParallaxText>
      <ParallaxText baseVelocity={2}>LUXIMA.ID - Studio & Digital Development | </ParallaxText>
    </div>
  )
}

export default ParallaxInfo
