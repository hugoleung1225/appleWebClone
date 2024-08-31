import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { heroVideo, smallHeroVideo } from "../utils"
import { useEffect, useState } from "react"

const Hero = () => {
  const [ videoSrc, setVideoSrc] =  useState( window.innerWidth < 760 ? smallHeroVideo: heroVideo );

  const handlVideoSrc = ()=>{
    if (window.innerWidth < 760){
      setVideoSrc(smallHeroVideo);
    }else{
      setVideoSrc(heroVideo);
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', handlVideoSrc);

    //return cleanup callBack
    return ()=>{
      window.removeEventListener('resize', handlVideoSrc)
    }
  }, [])

  useGSAP(()=>{
    gsap.to( '#hero', {opacity:1 , delay:2} )

    //start from -50
    gsap.to("#cta", {opacity:1 , y: -50 , delay:2})
  }, [])

  return (
    //at height lower then navbar, relative size
    <section className='w-full nav-height bg-black relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
        {/** opacity: zero initially*/}
        <p id="hero" className='hero-title'>iPhone 15 Pro</p>
        <div className="h-10/12 w-9/12">
          {/**pointer-events-none => not allow any action to the video */}
          <video className="pointer-events-none" autoPlay={true} muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4"></source>
          </video>
        </div>
        {/**
         * translate-y-20 => multiple actions: moves > rotates > skew X (斜) > skew Y (斜) > Scles along horizontal direction (X) > Scles along vertical direction (Y)
         */}
        <div id='cta' className="flex flex-col items-center opacity-0 translate-y-20">
          <a href="#highlights" className="btn">Buy</a>

          <p className="font-normal text-xl">From $199/month or $999</p>
        </div>


      </div>
    </section>
  )
}

export default Hero