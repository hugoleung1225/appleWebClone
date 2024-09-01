import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';

/**
 * Function 1: auto play video onLoad
 * 1. onLoadedMetadata will add videos to loadedData
 * 2. one useEffect will re-render and keep track the length of loadedData
 * 3. play the video with initial videoId (0) until the length reached the list fetched
 * 
 * Function 2: When user click the span, the correct slide shows and play the video
 * @returns 
 */

const VideoCarousel = () => {

  /*
  all have the corresponding html ref
  {(el) => ( x.current[i] = el )}
  */
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video , setVideo] = useState({
    isEnd: false,
    isLastVideo: false,
    startPlay: false,
    videoId: 0,
    isPlaying:false
  });

  const [loadedData, setLoadedData] =  useState([])
  const { isEnd , isLastVideo , startPlay, videoId, isPlaying } = video;

  useGSAP(()=>{
    //set the animation of the slider 
    gsap.to('#slider',{
      transform: `translateX(${-100* videoId}%)`,
      //x seconds
      duration: 2
    })

    gsap.to('#video', {
      scrollTrigger:{
        //what is in view
        trigger:'#video',
        //only toggle case 1
        toggleActions:'restart none none none'
      },
      onComplete: ()=>{
        setVideo((pre)=>({
          ...pre,
          startPlay:true,
          isPlaying: true
        }))
      }
    })
  }, [isEnd, videoId])

  //due with the playing of the video
  useEffect(() => {
    if ( loadedData.length > 3){
      if( !isPlaying ){
        videoRef.current[videoId].pause();
      }else{
        startPlay && videoRef.current[videoId].play()
      }
    }
  
  }, [startPlay, videoId, isPlaying, loadedData ])
  
  //play / pause until loadedMetaData > 3
  const handleLoadedMetaData = (i,e)=>{
    setLoadedData( (pre)=> [...pre, e] )
  }

  //span animation
  useEffect(()=>{
    let currentProgress = 0 ;
    let span = videoSpanRef.current; 
    if (span[videoId]){
      //animate the progress of the video
      let anim =  gsap.to( span[videoId], {
        onUpdate: ()=>{
          const progress = Math.ceil( anim.progress()* 100);

          if ( progress  != currentProgress ){
            currentProgress = progress;

            //animate the outer span, expend the span with id = current videoId
            gsap.to( videoDivRef.current[videoId], {
              width: window.innerWidth >= 1200 ? '4vw' : '10vw'
            })
            
            //animate the inner span, the change in color = the playing progress of the video
            gsap.to(span[videoId],{
              width: `${currentProgress}%`,
              backgroundColor:'white'
            })
            
          }
        },
        onComplete: ()=>{
          //when finished , reverse the animation to the original
          if(isPlaying){
            gsap.to(videoDivRef.current[videoId],{
              width: '12px'
            })

            gsap.to(span[videoId],{
              backgroundColor:'#afafaf'
            })
          }

        }
      })

      /*
      if ( videoId ===0 ){
        anim.restart();
      }
        */

      const animUpdate = ()=>{
        //current time (from video html) /  total time
        anim.progress( videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration )
      }

      //executes on every tick after the core engine updates
      if(isPlaying){
        gsap.ticker.add(animUpdate);
      }else{
        //to remove the listener
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [ videoId, startPlay ])

  const handlePlayProcess = (action, i)=>{
    switch(action){
      case 'replay':
        setVideo( (pre)=> ({...pre, isLastVideo: false, videoId: 0}) )
        break;
      case 'play':
      case 'pause':
        setVideo( (pre)=> ({...pre, isPlaying: !pre.isPlaying}) )
        break;
      case 'video-end':
        setVideo( (pre)=> ({...pre, isEnd: true, videoId : i+1}) )
        break;
      case 'video-last':
        setVideo( (pre)=> ({...pre, isLastVideo: true}) )
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className='flex items-center'>
        {hightlightsSlides.map( (list, i)=>(
          <div key={list.id} id="slider"className='sm:pr-20 pr-10'>
            <div className='video-carousel_container'> 
              <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                <video
                  id ="video"
                  playsInline={true}
                  preload='auto'
                  muted
                  className='pointer-events-none'
                  //videoRef
                  ref={(el)=> ( videoRef.current[i] = el ) }

                  onEnded={()=>{
                    i !== 3 ? handlePlayProcess('video-end',i): handlePlayProcess('video-last')
                  }}

                  onPlay={()=>{
                    setVideo((prevVideo)=>({
                      ...prevVideo, isPlaying: true
                    }))
                  }}
                  //Call a function when meta data for a video is loaded:
                  onLoadedMetadata={(i,e)=> handleLoadedMetaData(i,e)}
                >
                  <source src={list.video} type="video/mp4"></source>
                </video>
              </div>

              <div className='absolute top-12 left-[5%]'>
                {list.textLists.map((text)=>( 
                  <p key={text} className='md:test-2xl text-xl font-medium'>{text}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>   

      {/**
       * span and the play button
       */}
       <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
            {videoRef.current.map(( videoDummy, i)=>(
              <span
                key = {i}
                ref = {(el)=>(videoDivRef.current[i] = el)}
                className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
              >
                <span
                  ref = {(el)=>(videoSpanRef.current[i] = el)}
                  className='absolute w-full h-full bg-gray-200 rounded-full'
                >
                </span>
              </span>
            ))}
        </div>

        <button className='control-btn'>
            <img src={isLastVideo? replayImg: (isPlaying? pauseImg: playImg )}
              alt={isLastVideo? 'replay': (isPlaying? 'pause': 'play') }
              onClick={ isLastVideo? ()=>handlePlayProcess('replay')
                :  (isPlaying? ()=>handlePlayProcess('pause'): ()=>handlePlayProcess('play') )
               }
            ></img>
        </button>
       </div>
    </>

  )
}


export default VideoCarousel 