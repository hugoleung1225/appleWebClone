import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {

  useGSAP(()=>{
    gsap.to( '#title', {opacity:1, y: 0} )
    gsap.to( '.link', {opacity:1, y: 0, duration:1 , stagger:0.25} )
  })

  return (
    /**
     * overflow-hidden => hidden scroll bars
     */
    <section id="highlights" className='w-screen overflow-hidden h-full mt-10 bg-zinc'>
      <div className='screen-max-width'>
        {/**
         * margin bottom
         * items-end => align-items: flex-end;
         */}
        <div className='mb-12 w-full md:flex items-end justify-between'>
          <h1 id="title" className='section-heading'>
            Get the highlights.
          </h1>

          <div className='flex flex-wrap items-end gap-5'>
            <p className='link'>
              Watch the film
              <img src={watchImg} alt="watch" className='ml-2'></img>
            </p>

            <p className='link'>
              Watch the evnet
              <img src={rightImg} alt="right" className='ml-2'></img>
            </p>
          </div>
        </div>
        <VideoCarousel/>
      </div>
    </section>
  )
}

export default Highlights